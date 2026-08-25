import type { MetadataRoute } from "next";
import { ROUTES, url } from "@/lib/site";
import { FEATURED_PROJECTS } from "@/lib/projects-data";
import { POLES } from "@/lib/smart-poles-data";

/**
 * Every page a visitor can reach, including the two families of detail pages
 * that are generated from data: the photographed projects and the twenty
 * poles in the series. Both were previously unreachable to a crawler — the
 * poles because they only existed inside a dialog.
 */
export default function sitemap(): MetadataRoute.Sitemap {
  const lastModified = new Date();

  const staticPages = ROUTES.map((r) => ({
    url: url(r.path),
    lastModified,
    changeFrequency: r.changeFrequency,
    priority: r.priority,
  }));

  // Mirrors the filter in projects/[slug]: a project without photography has
  // no page, so listing it would publish a 404.
  const projects = FEATURED_PROJECTS.filter((p) => p.gallery.length > 0).map((p) => ({
    url: url(`/projects/${p.slug}`),
    lastModified,
    changeFrequency: "yearly" as const,
    priority: 0.6,
  }));

  const poles = POLES.map((p) => ({
    url: url(`/services/smart-poles/${p.slug}`),
    lastModified,
    changeFrequency: "yearly" as const,
    priority: 0.6,
  }));

  return [...staticPages, ...projects, ...poles];
}
