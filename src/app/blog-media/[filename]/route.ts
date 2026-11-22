import { postUsesMedia } from "@/lib/blog/content";
import { currentMember } from "@/lib/blog/auth";
import { readBlogImage } from "@/lib/blog/media";
import { blogStorageEnabled, publishedPosts } from "@/lib/blog/storage";
export const dynamic = "force-dynamic";
export async function GET(_: Request, { params }: { params: Promise<{ filename: string }> }) {
  const { filename } = await params;
  if (!blogStorageEnabled() || !/^[a-f0-9-]{36}\.webp$/.test(filename)) return new Response(null, { status: 404 });
  const published = (await publishedPosts()).some(post => postUsesMedia(post, `/blog-media/${filename}`));
  if (!published && !await currentMember()) return new Response(null, { status: 404 });
  const bytes = await readBlogImage(filename);
  if (!bytes) return new Response(null, { status: 404 });
  // Recheck publication on each request; unpublished covers must not stay public in caches.
  return new Response(bytes, { headers: { "Content-Type": "image/webp", "Cache-Control": "private, no-store", "X-Content-Type-Options": "nosniff" } });
}
