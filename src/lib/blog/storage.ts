import "server-only";
import { mkdir, readFile, rename, writeFile, rm } from "node:fs/promises";
import path from "node:path";
import { randomUUID } from "node:crypto";
import { SAMPLE_POSTS } from "./samples";
import type { BlogPost } from "./types";

export const BLOG_DATA_DIR = path.join(process.cwd(), ".blog-data");
// Local disk is intentionally disabled in production/serverless deployments.
export const localBlogsEnabled = () => process.env.NODE_ENV === "development" || process.env.NODE_ENV === "test";
export function assertLocalBlogs() { if (!localBlogsEnabled()) throw new Error("Local publishing is disabled in production. Connect shared storage and company sign-in before deployment."); }
const postsFile = path.join(BLOG_DATA_DIR, "posts.json");
export async function allPosts(): Promise<BlogPost[]> {
  if (!localBlogsEnabled()) return [];
  let saved: BlogPost[] = [];
  try { saved = JSON.parse(await readFile(postsFile, "utf8")); }
  catch (error) { if ((error as NodeJS.ErrnoException).code !== "ENOENT") throw error; }
  const authored = saved.filter(post => !post.sample);
  return [...authored, ...SAMPLE_POSTS.filter(sample => !authored.some(post => post.id === sample.id))].sort((a, b) => (b.publishedAt || b.updatedAt).localeCompare(a.publishedAt || a.updatedAt));
}
export async function publishedPosts(locale?: string) { return (await allPosts()).filter(post => post.status === "published" && (!locale || post.locale === locale)); }
export async function postById(id: string) { return (await allPosts()).find(post => post.id === id); }
export async function publishedPost(slug: string, locale: string) { return (await publishedPosts(locale)).find(post => post.slug === slug); }

export async function savePost(post: BlogPost, expectedUpdatedAt?: string) {
  assertLocalBlogs();
  await mkdir(BLOG_DATA_DIR, { recursive: true, mode: 0o700 });
  const lock = path.join(BLOG_DATA_DIR, "write.lock");
  // An exclusive directory lock also serializes separate Next.js worker processes.
  let acquired = false;
  for (let attempt = 0; attempt < 30; attempt++) {
    try { await mkdir(lock); acquired = true; break; }
    catch (error) { if ((error as NodeJS.ErrnoException).code !== "EEXIST") throw error; await new Promise(resolve => setTimeout(resolve, 50)); }
  }
  if (!acquired) throw new Error("Another save is in progress. Try again. If the server stopped during a save, remove .blog-data/write.lock and restart it.");
  const temporary = `${postsFile}.${randomUUID()}.tmp`;
  try {
    const posts = await allPosts();
    const existing = posts.find(p => p.id === post.id);
    if (existing && existing.updatedAt !== expectedUpdatedAt) throw new Error("This blog was changed in another window. Reload before saving so you do not overwrite those changes.");
    if (posts.some(p => p.id !== post.id && p.locale === post.locale && p.slug === post.slug)) throw new Error("This URL is already used by another blog. Choose a different URL.");
    await writeFile(temporary, JSON.stringify([post, ...posts.filter(p => p.id !== post.id)], null, 2), { mode: 0o600 });
    await rename(temporary, postsFile);
  } finally { await rm(temporary, { force: true }); await rm(lock, { recursive: true, force: true }); }
}
