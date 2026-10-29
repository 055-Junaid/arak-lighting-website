"use server";
import { randomUUID } from "node:crypto";
import { rm } from "node:fs/promises";
import { redirect } from "next/navigation";
import { revalidatePath } from "next/cache";
import { requireMember, signIn, signOut } from "./auth";
import { assertLocalBlogs, postById, savePost } from "./storage";
import { saveUploadedBlogImage } from "./media";
import { blogBodyText, decodeRichBody, RICH_BODY_PREFIX } from "./rich-text";
import { CATEGORIES, type ActionResult, type BlogPost, blogPath } from "./types";

// Local development has a single process. Production publishing is disabled.
const attempts = new Map<string, { count: number; until: number }>();
export async function loginAction(_: ActionResult, form: FormData): Promise<ActionResult> {
  assertLocalBlogs();
  const email = String(form.get("email") || "").trim().toLowerCase().slice(0, 254);
  const password = String(form.get("password") || "");
  if (!email || password.length < 1 || password.length > 256) return { error: "Enter your team email and password." };
  const now = Date.now();
  for (const [key, value] of attempts) if (value.until < now) attempts.delete(key);
  const attempt = attempts.get(email) || { count: 0, until: now + 15 * 60 * 1000 };
  if (attempt.count >= 8) return { error: "Too many sign-in attempts. Try again in 15 minutes." };
  attempt.count += 1;
  attempts.set(email, attempt);
  if (!await signIn(email, password)) return { error: "The email or password is incorrect. Contact your website administrator if you need access." };
  attempts.delete(email);
  redirect("/team/blogs");
}
export async function logoutAction() { await signOut(); redirect("/team/login"); }

function text(form: FormData, key: string, max: number) {
  const value = String(form.get(key) || "").trim();
  if (value.length > max) throw new Error(`${key} is too long (maximum ${max} characters).`);
  return value;
}
export async function saveBlogAction(_: ActionResult, form: FormData): Promise<ActionResult> {
  const member = await requireMember();
  assertLocalBlogs();
  let saved: BlogPost;
  let uploadedPath: string | undefined;
  const isNew = !form.get("id");
  try {
    const id = text(form, "id", 80) || randomUUID();
    const existing = await postById(id);
    if (!isNew && !existing) return { error: "This blog no longer exists. Return to the blog workspace." };
    const title = text(form, "title", 160);
    const excerpt = text(form, "excerpt", 320);
    const body = text(form, "body", 80000).replace(/\r\n/g, "\n");
    if (body.startsWith(RICH_BODY_PREFIX) && !decodeRichBody(body)) return { error: "The article format could not be read. Reopen the editor and try again." };
    const slug = text(form, "slug", 100);
    const coverAlt = text(form, "coverAlt", 240);
    const category = text(form, "category", 40) as BlogPost["category"];
    const locale = text(form, "locale", 2);
    const intent = form.get("intent");
    if (!title || !slug) return { error: "Add a title and a blog URL before saving." };
    if (!/^[a-z0-9]+(?:-[a-z0-9]+)*$/.test(slug)) return { error: "Use lowercase English letters, numbers, and single hyphens for the URL." };
    if (!CATEGORIES.includes(category) || !["en", "ar"].includes(locale)) return { error: "Choose a valid category and language." };
    const status = intent === "publish" ? "published" : intent === "unpublish" ? "draft" : existing?.status || "draft";
    let cover = existing?.cover || "";
    const upload = form.get("coverFile");
    if (upload instanceof File && upload.size > 0) {
      const image = await saveUploadedBlogImage(upload);
      uploadedPath = image.file;
      cover = image.url;
    }
    if (status === "published" && (!excerpt || !blogBodyText(body).trim() || !cover || !coverAlt)) throw new Error("Before publishing, add a summary, article text, cover image, and image description.");
    const now = new Date().toISOString();
    saved = { id, title, slug, excerpt, body, category, locale: locale as BlogPost["locale"], cover, coverAlt, author: existing?.sample ? member.name : existing?.author || member.name, status, createdAt: existing?.createdAt || now, updatedAt: now, publishedAt: status === "published" ? existing?.publishedAt || now : existing?.publishedAt };
    await savePost(saved, text(form, "updatedAt", 40) || undefined);
    uploadedPath = undefined;
    revalidatePath("/blogs"); revalidatePath("/ar/blogs"); revalidatePath("/team/blogs"); revalidatePath("/sitemap.xml");
    revalidatePath(blogPath(saved));
    if (existing) revalidatePath(blogPath(existing));
  } catch (error) {
    if (uploadedPath) await rm(uploadedPath, { force: true });
    return { error: error instanceof Error ? error.message : "The blog could not be saved. Try again." };
  }
  if (isNew) redirect(`/team/blogs/${saved.id}?saved=1`);
  return { success: saved.status === "published" ? "Published. Your changes are now visible on the website." : "Draft saved. Only the team can see it.", id: saved.id, updatedAt: saved.updatedAt, status: saved.status, cover: saved.cover };
}

export async function uploadBlogImageAction(form: FormData): Promise<{ url?: string; error?: string }> {
  await requireMember();
  assertLocalBlogs();
  try {
    const upload = form.get("image");
    if (!(upload instanceof File) || !upload.size) return { error: "Choose an image to insert." };
    const image = await saveUploadedBlogImage(upload);
    return { url: image.url };
  } catch (error) { return { error: error instanceof Error ? error.message : "The image could not be uploaded." }; }
}
