import type { MetadataRoute } from "next";
import { url } from "@/lib/site";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: "*",
      allow: "/",
      // Next's build manifests and internal chunks. Nothing here is secret;
      // keeping crawlers out of it just stops the crawl budget being spent
      // on files that will never be a search result.
      disallow: ["/_next/static/chunks/"],
    },
    sitemap: url("/sitemap.xml"),
    host: url("/"),
  };
}
