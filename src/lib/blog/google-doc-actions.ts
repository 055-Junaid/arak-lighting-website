"use server";
import { randomUUID } from "node:crypto";
import { revalidatePath } from "next/cache";
import { unzipSync } from "fflate";
import { requireMember } from "./auth";
import { convertGoogleDocHtml, googleDocId, GOOGLE_IMAGE_PREFIX, isGoogleDocImageName, type GoogleDocImport } from "./google-doc";
import { storeBlogImage } from "./media";
import { decodeRichBody, encodeRichBody } from "./rich-text";
import { allPosts, assertBlogStorage, savePost } from "./storage";
import type { BlogPost } from "./types";

// Import runs as several short requests (the doc, then one per image) so no
// single request comes near the hosting platform's function time limit.
const MAX_DOWNLOAD = 80 * 1024 * 1024;
const MAX_FILE = 30 * 1024 * 1024;
const NOT_SHARED = "Google did not let the website open this doc. In Google Docs, click Share, set General access to \"Anyone with the link\" as Viewer, and try again.";

async function downloadDoc(link: string) {
  const id = googleDocId(link);
  if (!id) throw new Error("Paste the link to a Google Doc. It starts with https://docs.google.com/document/d/");
  let response: Response;
  try {
    // The host is fixed here; only the validated document id comes from the user.
    response = await fetch(`https://docs.google.com/document/d/${id}/export?format=zip`, { cache: "no-store", signal: AbortSignal.timeout(25_000) });
  } catch { throw new Error("Google Docs did not respond. Try again in a minute."); }
  if (response.status === 404) throw new Error("This Google Doc was not found. Check the link.");
  if (!response.ok || !(response.headers.get("content-type") || "").includes("zip")) throw new Error(NOT_SHARED);
  if (Number(response.headers.get("content-length") || 0) > MAX_DOWNLOAD) throw new Error("This doc is too large to import. Use smaller images in the doc.");
  const reader = response.body!.getReader();
  const chunks: Uint8Array[] = [];
  let size = 0;
  for (;;) {
    const { done, value } = await reader.read();
    if (done) break;
    size += value.byteLength;
    if (size > MAX_DOWNLOAD) { await reader.cancel(); throw new Error("This doc is too large to import. Use smaller images in the doc."); }
    chunks.push(value);
  }
  const zip = new Uint8Array(size);
  let offset = 0;
  for (const chunk of chunks) { zip.set(chunk, offset); offset += chunk.byteLength; }
  return zip;
}

function unzipOne(zip: Uint8Array, match: (name: string) => boolean) {
  let files: Record<string, Uint8Array>;
  try { files = unzipSync(zip, { filter: file => match(file.name) && file.originalSize <= MAX_FILE }); }
  catch { throw new Error("Google sent a file that could not be opened. Try again."); }
  return Object.values(files)[0];
}

const failure = (error: unknown, fallback: string) => ({ error: error instanceof Error ? error.message : fallback });

export async function readGoogleDocAction(link: string): Promise<{ doc?: GoogleDocImport; error?: string }> {
  await requireMember();
  try {
    assertBlogStorage();
    const html = unzipOne(await downloadDoc(link), name => /^[^/]+\.html$/.test(name));
    if (!html) throw new Error("The doc could not be read. Try again.");
    return { doc: convertGoogleDocHtml(new TextDecoder().decode(html)) };
  } catch (error) { console.error("Google Doc import failed", error); return failure(error, "The doc could not be read. Try again."); }
}

export async function importGoogleDocImageAction(link: string, name: string): Promise<{ url?: string; width?: number; height?: number; error?: string }> {
  await requireMember();
  try {
    if (!isGoogleDocImageName(name)) throw new Error("This image could not be found in the doc.");
    const bytes = unzipOne(await downloadDoc(link), file => file === name);
    if (!bytes) throw new Error("An image in the doc is missing or larger than 30 MB.");
    const image = await storeBlogImage(Buffer.from(bytes), "An image in the doc could not be opened. Replace it with a JPG or PNG in the doc.");
    return { url: image.url, width: image.width, height: image.height };
  } catch (error) { return failure(error, "An image could not be imported. Try again."); }
}

const slugify = (value: string) => value.toLowerCase().normalize("NFKD").replace(/[̀-ͯ]/g, "").replace(/[^a-z0-9]+/g, "-").replace(/^-|-$/g, "").slice(0, 90).replace(/-$/, "");
const blogMedia = /^\/blog-media\/[a-f0-9-]{36}\.webp$/;

export type ImportedDraft = Pick<BlogPost, "title" | "excerpt" | "locale" | "body" | "cover" | "coverAlt"> & { coverCaption: string; coverWidth?: number; coverHeight?: number };
export async function createImportedDraftAction(input: ImportedDraft): Promise<{ id?: string; error?: string }> {
  const member = await requireMember();
  try {
    assertBlogStorage();
    const title = String(input.title || "").trim().slice(0, 160) || "Imported article";
    const body = String(input.body || "");
    const doc = decodeRichBody(body);
    if (!doc || body.length > 80000) throw new Error("The imported article is too long or could not be read.");
    if (body.includes(GOOGLE_IMAGE_PREFIX)) throw new Error("Some images did not finish importing. Try again.");
    if (input.cover && !blogMedia.test(input.cover)) throw new Error("The cover image did not finish importing. Try again.");
    const locale = input.locale === "ar" ? "ar" : "en";
    const taken = new Set((await allPosts()).filter(post => post.locale === locale).map(post => post.slug));
    const base = slugify(title) || `article-${randomUUID().slice(0, 8)}`;
    let slug = base;
    for (let n = 2; taken.has(slug); n++) slug = `${base}-${n}`;
    const size = (value: unknown) => Number.isInteger(value) && (value as number) > 0 && (value as number) <= 10000 ? value as number : undefined;
    const now = new Date().toISOString();
    const post: BlogPost = {
      id: randomUUID(), title, slug, excerpt: String(input.excerpt || "").trim().slice(0, 320), body: encodeRichBody(doc), category: "", locale,
      cover: input.cover || "", coverAlt: String(input.coverAlt || "").trim().slice(0, 240),
      ...(input.coverCaption?.trim() ? { coverCaption: input.coverCaption.trim().slice(0, 240) } : {}),
      coverWidth: size(input.coverWidth), coverHeight: size(input.coverHeight),
      author: member.name, status: "draft", createdAt: now, updatedAt: now,
    };
    await savePost(post);
    revalidatePath("/team/blogs");
    return { id: post.id };
  } catch (error) { return failure(error, "The draft could not be saved. Try again."); }
}
