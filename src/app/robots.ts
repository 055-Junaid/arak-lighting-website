import type { MetadataRoute } from "next";
import { url } from "@/lib/site";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: "*",
      allow: "/",
      // Nothing is disallowed. /_next/static/chunks/ used to be, to save crawl
      // budget, but it holds the JavaScript and CSS Google needs to render a
      // page the way a visitor sees it, and Google's guidance is never to
      // block those. On an 88-page site crawl budget is not the constraint.
    },
    sitemap: url("/sitemap.xml"),
    host: url("/"),
  };
}
