import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { BlogListing } from "@/components/blog/BlogListing";
import { BlogArticle } from "@/components/blog/BlogArticle";
import { publishedPost, publishedPosts } from "./storage";
import { blogPath, readingMinutes } from "./types";
import { SITE_NAME, url, type Locale } from "@/lib/site";
export function listingMetadata(locale: Locale): Metadata {
  const ar = locale === "ar";
  const route = ar ? "/ar/blogs" : "/blogs";
  const title = ar ? "المدونة | أراك للإضاءة" : "Blogs | Arak Lighting";
  const description = ar ? "أفكار وقصص من فريق أراك حول تصميم الإضاءة والعمارة والتحكم الذكي." : "Ideas and stories from the ARAK team on lighting design, architecture, and smart controls.";
  return { title: { absolute: title }, description, alternates: { canonical: route, languages: { en: "/blogs", ar: "/ar/blogs" } }, openGraph: { title, description, url: route }, twitter: { title, description } };
}
export async function BlogsPage({ locale }: { locale: Locale }) {
  const posts = (await publishedPosts(locale)).map(({ body, ...post }) => ({ ...post, minutes: readingMinutes(body) }));
  return <BlogListing posts={posts} locale={locale} />;
}
export async function articleMetadata(slug: string, locale: Locale): Promise<Metadata> {
  const post = await publishedPost(slug, locale);
  if (!post) return { title: "Blog not found", robots: { index: false, follow: false } };
  return { title: { absolute: `${post.title} | ${SITE_NAME}` }, description: post.excerpt, alternates: { canonical: blogPath(post) }, robots: post.sample ? { index: false, follow: false } : undefined, openGraph: { type: "article", title: post.title, description: post.excerpt, url: blogPath(post), publishedTime: post.publishedAt, modifiedTime: post.updatedAt, authors: [post.author], images: post.cover ? [{ url: post.cover, alt: post.coverAlt }] : [] }, twitter: { card: "summary_large_image", title: post.title, description: post.excerpt, images: post.cover ? [post.cover] : [] } };
}
export async function BlogArticlePage({ slug, locale }: { slug: string; locale: Locale }) {
  const post = await publishedPost(slug, locale);
  if (!post) notFound();
  const schema = { "@context": "https://schema.org", "@type": "BlogPosting", headline: post.title, description: post.excerpt, datePublished: post.publishedAt, dateModified: post.updatedAt, inLanguage: post.locale, author: { "@type": "Person", name: post.author }, publisher: { "@id": url("/#organization") }, image: url(post.cover), mainEntityOfPage: url(blogPath(post)) };
  return <><script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(schema).replace(/</g, "\\u003c") }} /><BlogArticle post={post} /></>;
}
