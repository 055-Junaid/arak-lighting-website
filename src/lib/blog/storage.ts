import "server-only";
import { mkdir, readFile, rename, writeFile, rm } from "node:fs/promises";
import path from "node:path";
import { randomUUID } from "node:crypto";
import { getStore } from "@netlify/blobs";
import { SAMPLE_POSTS } from "./samples";
import type { BlogPost } from "./types";

export const BLOG_DATA_DIR = path.join(process.cwd(), ".blog-data");
// Development uses local files. Production uses the Netlify Blobs store named
// by BLOG_STORE; give production and deploy previews different names, because
// a site-wide store is otherwise shared by every deploy context.
export const localBlogsEnabled = () => process.env.NODE_ENV === "development" || process.env.NODE_ENV === "test";
export const sharedBlogsEnabled = () => !localBlogsEnabled() && Boolean(process.env.BLOG_STORE);
export const blogStorageEnabled = () => localBlogsEnabled() || sharedBlogsEnabled();
export function assertLocalBlogs() { if (!localBlogsEnabled()) throw new Error("Password sign-in is only available in local development."); }
export function assertBlogStorage() { if (!blogStorageEnabled()) throw new Error("Blog storage is not configured."); }
// Next's fetch would otherwise dedupe these reads within a render and hang on an
// empty 404 body; the signal opts out of that and bounds a storage outage.
const blobFetch: typeof fetch = (input, init) => fetch(input, { ...init, cache: "no-store", signal: init?.signal ?? AbortSignal.timeout(15_000) });
export const sharedBlogStore = () => getStore({ name: process.env.BLOG_STORE!, consistency: "strong", fetch: blobFetch });

const postsFile = path.join(BLOG_DATA_DIR, "posts.json");
const POSTS_KEY = "posts.json";

export async function allPosts(): Promise<BlogPost[]> {
  if (sharedBlogsEnabled()) return (await sharedBlogStore().get(POSTS_KEY, { type: "json" }) as BlogPost[] | null) || [];
  if (!localBlogsEnabled()) return [];
  let saved: BlogPost[] = [];
  try { saved = JSON.parse(await readFile(postsFile, "utf8")); }
  catch (error) { if ((error as NodeJS.ErrnoException).code !== "ENOENT") throw error; }
  const authored = saved.filter(post => !post.sample);
  return sortPosts([...authored, ...SAMPLE_POSTS.filter(sample => !authored.some(post => post.id === sample.id))]);
}
export async function publishedPosts(locale?: string) { return sortPosts((await allPosts()).filter(post => post.status === "published" && (!locale || post.locale === locale))); }
export async function postById(id: string) { return (await allPosts()).find(post => post.id === id); }
export async function publishedPost(slug: string, locale: string) { return (await publishedPosts(locale)).find(post => post.slug === slug); }

function sortPosts(posts: BlogPost[]) { return [...posts].sort((a, b) => (b.publishedAt || b.updatedAt).localeCompare(a.publishedAt || a.updatedAt)); }
function withSavedPost(posts: BlogPost[], post: BlogPost, expectedUpdatedAt?: string) {
  const existing = posts.find(p => p.id === post.id);
  if (existing && existing.updatedAt !== expectedUpdatedAt) throw new Error("This blog was changed in another window. Reload before saving so you do not overwrite those changes.");
  if (posts.some(p => p.id !== post.id && p.locale === post.locale && p.slug === post.slug)) throw new Error("This URL is already used by another blog. Choose a different URL.");
  return [post, ...posts.filter(p => p.id !== post.id)];
}

function withoutPost(posts: BlogPost[], id: string, expectedUpdatedAt?: string) {
  const existing = posts.find(p => p.id === id);
  if (!existing) throw new Error("This blog no longer exists.");
  if (existing.updatedAt !== expectedUpdatedAt) throw new Error("This blog was changed in another window. Reload before deleting it.");
  return posts.filter(p => p.id !== id);
}

async function changeSharedPosts(change: (posts: BlogPost[]) => BlogPost[]) {
  const store = sharedBlogStore();
  // Compare-and-swap: a write only lands if nobody changed the file since it was read.
  for (let attempt = 0; attempt < 5; attempt++) {
    const current = await store.getWithMetadata(POSTS_KEY, { type: "json" });
    const posts = change((current?.data as BlogPost[] | undefined) || []);
    const result = await store.setJSON(POSTS_KEY, posts, current?.etag ? { onlyIfMatch: current.etag } : { onlyIfNew: true });
    if (result.modified) return;
  }
  throw new Error("Another save is in progress. Try again.");
}

export const savePost = (post: BlogPost, expectedUpdatedAt?: string) => changePosts(posts => withSavedPost(posts, post, expectedUpdatedAt));
export const deletePost = (id: string, expectedUpdatedAt?: string) => changePosts(posts => withoutPost(posts, id, expectedUpdatedAt));

async function changePosts(change: (posts: BlogPost[]) => BlogPost[]) {
  assertBlogStorage();
  if (sharedBlogsEnabled()) return changeSharedPosts(change);
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
    await writeFile(temporary, JSON.stringify(change(await allPosts()), null, 2), { mode: 0o600 });
    await rename(temporary, postsFile);
  } finally { await rm(temporary, { force: true }); await rm(lock, { recursive: true, force: true }); }
}
