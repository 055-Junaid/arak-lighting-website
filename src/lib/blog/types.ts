import { blogBodyText } from "./rich-text";
export const CATEGORIES = ["Lighting design", "Smart controls", "Project stories", "Company news"] as const;
// Netlify rejects larger function requests, and uploads pass through a function.
export const MAX_BLOG_IMAGE_BYTES = 4 * 1024 * 1024;
export const MAX_BLOG_IMAGE_LABEL = "4 MB";
export type BlogPost = {
  id: string;
  slug: string;
  title: string;
  excerpt: string;
  body: string;
  category: typeof CATEGORIES[number];
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
