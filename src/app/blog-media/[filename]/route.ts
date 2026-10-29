import { readFile } from "node:fs/promises";
import path from "node:path";
import { postUsesMedia } from "@/lib/blog/content";
import { currentMember } from "@/lib/blog/auth";
import { BLOG_DATA_DIR, localBlogsEnabled, publishedPosts } from "@/lib/blog/storage";
export const dynamic = "force-dynamic";
export async function GET(_: Request, { params }: { params: Promise<{ filename: string }> }) {
  const { filename } = await params;
  if (!localBlogsEnabled() || !/^[a-f0-9-]{36}\.webp$/.test(filename)) return new Response(null, { status: 404 });
  const published = (await publishedPosts()).some(post => postUsesMedia(post, `/blog-media/${filename}`));
  if (!published && !await currentMember()) return new Response(null, { status: 404 });
  try {
    const bytes = await readFile(path.join(BLOG_DATA_DIR, "media", filename));
    // Recheck publication on each request; unpublished covers must not stay public in caches.
    return new Response(bytes, { headers: { "Content-Type": "image/webp", "Cache-Control": "private, no-store", "X-Content-Type-Options": "nosniff" } });
  } catch (error) { if ((error as NodeJS.ErrnoException).code !== "ENOENT") throw error; return new Response(null, { status: 404 }); }
}
