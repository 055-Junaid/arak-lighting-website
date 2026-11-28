import { postUsesMedia } from "@/lib/blog/content";
import { currentMember } from "@/lib/blog/auth";
import { blogImageCacheTag, readBlogImage } from "@/lib/blog/media";
import { blogStorageEnabled, publishedPosts } from "@/lib/blog/storage";
export const dynamic = "force-dynamic";
const privateHeaders = { "Cache-Control": "private, no-store" };
export async function GET(_: Request, { params }: { params: Promise<{ filename: string }> }) {
  const { filename } = await params;
  if (!blogStorageEnabled() || !/^[a-f0-9-]{36}\.webp$/.test(filename)) return new Response(null, { status: 404, headers: privateHeaders });
  const published = (await publishedPosts()).some(post => postUsesMedia(post, `/blog-media/${filename}`));
  if (!published && !await currentMember()) return new Response(null, { status: 404, headers: privateHeaders });
  const bytes = await readBlogImage(filename);
  if (!bytes) return new Response(null, { status: 404, headers: privateHeaders });
  // Only published images reach the CDN. Saving a post purges any image that stops being public.
  const cache = published
    ? { "Cache-Control": "public, max-age=0, must-revalidate", "Netlify-CDN-Cache-Control": "public, s-maxage=86400, durable", "Netlify-Cache-Tag": blogImageCacheTag(filename), ETag: `"${filename}"` }
    : privateHeaders;
  return new Response(bytes, { headers: { "Content-Type": "image/webp", "X-Content-Type-Options": "nosniff", ...cache } });
}
