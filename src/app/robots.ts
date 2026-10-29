import type { MetadataRoute } from "next";
import { url } from "@/lib/site";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: "*",
      allow: "/",
      // /_next/static/chunks/ is NOT blocked: it holds the JavaScript and CSS
      // Google renders pages with, and Google's guidance is never to block it.
      // The blog's private publishing workspace and its upload route are.
      disallow: ["/team/", "/blog-media/"],
    },
    sitemap: url("/sitemap.xml"),
    host: url("/"),
  };
}
