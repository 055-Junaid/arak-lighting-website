import { blogBodyText } from "./rich-text";
export const CATEGORIES = ["Lighting design", "Smart controls", "Project stories", "Company news"] as const;
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
  status: "draft" | "published";
  createdAt: string;
  updatedAt: string;
  publishedAt?: string;
  sample?: boolean;
};
export type BlogSummary = Omit<BlogPost, "body"> & { minutes: number };
export type ActionResult = { error?: string; success?: string; id?: string; updatedAt?: string; status?: "draft" | "published"; cover?: string };
export function readingMinutes(body: string) { return Math.max(1, Math.ceil(blogBodyText(body).trim().split(/\s+/).length / 200)); }
export function blogPath(post: Pick<BlogPost, "locale" | "slug">) { return `${post.locale === "ar" ? "/ar" : ""}/blogs/${post.slug}`; }
export function formatDate(value: string, locale = "en") { return new Intl.DateTimeFormat(locale === "ar" ? "ar-SA" : "en-GB", { day: "numeric", month: "long", year: "numeric", timeZone: "Asia/Riyadh" }).format(new Date(value)); }
