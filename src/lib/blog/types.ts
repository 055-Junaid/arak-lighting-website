import { blogBodyText } from "./rich-text";
// The three subjects the blog publishes on. The English label is what is stored.
export const CATEGORIES = ["Media façade", "Smart poles", "Maintenance"] as const;
export type BlogCategory = typeof CATEGORIES[number];
const CATEGORY_AR: Record<BlogCategory, string> = { "Media façade": "الواجهات الإعلامية", "Smart poles": "الأعمدة الذكية", "Maintenance": "الصيانة" };
export const isCategory = (value: string): value is BlogCategory => (CATEGORIES as readonly string[]).includes(value);
// Drafts may have no category yet (or one from before these three existed).
export function categoryLabel(category: string, locale: string) {
  if (isCategory(category)) return locale === "ar" ? CATEGORY_AR[category] : category;
  return locale === "ar" ? "بدون تصنيف" : "No category";
}
// Netlify rejects larger function requests, and uploads pass through a function.
export const MAX_BLOG_IMAGE_BYTES = 4 * 1024 * 1024;
export const MAX_BLOG_IMAGE_LABEL = "4 MB";
export type BlogPost = {
  id: string;
  slug: string;
  title: string;
  excerpt: string;
  body: string;
  // Empty, or a retired category, until a writer chooses one; publishing requires one of CATEGORIES.
  category: string;
  locale: "en" | "ar";
  author: string;
  cover: string;
  coverAlt: string;
  // Optional text shown under the cover. Size lets portrait photos show uncropped.
  coverCaption?: string;
  coverWidth?: number;
  coverHeight?: number;
  status: "draft" | "published";
  createdAt: string;
  updatedAt: string;
  publishedAt?: string;
  sample?: boolean;
};
export type BlogSummary = Omit<BlogPost, "body"> & { minutes: number };
export type ActionResult = { error?: string; success?: string; id?: string; updatedAt?: string; status?: "draft" | "published"; cover?: string; coverWidth?: number; coverHeight?: number };
export function readingMinutes(body: string) { return Math.max(1, Math.ceil(blogBodyText(body).trim().split(/\s+/).length / 200)); }
// Articles are published under the company name; `author` records which team member wrote it.
export function blogByline(locale: string) { return locale === "ar" ? "أراك للإضاءة" : "ARAK Lighting"; }
export function blogPath(post: Pick<BlogPost, "locale" | "slug">) { return `${post.locale === "ar" ? "/ar" : ""}/blogs/${post.slug}`; }
export function formatDate(value: string, locale = "en") { return new Intl.DateTimeFormat(locale === "ar" ? "ar-SA" : "en-GB", { day: "numeric", month: "long", year: "numeric", timeZone: "Asia/Riyadh" }).format(new Date(value)); }
