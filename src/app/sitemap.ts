import type { MetadataRoute } from "next";
import { LOCALES, ROUTES, localePath, url } from "@/lib/site";
import { FEATURED_PROJECTS } from "@/lib/projects-data";
import { POLES } from "@/lib/smart-poles-data";
import { SERVICES } from "@/lib/services-data";

/**
 * Every page a visitor can reach, in both languages.
 *
 * Each entry carries `alternates.languages`, which is the sitemap form of
 * hreflang. Declaring the pair here as well as in the page's own <head> is
 * belt and braces, but it is the form Google reads most reliably for a site
 * whose translations live on separate URLs.
 */
export default function sitemap(): MetadataRoute.Sitemap {
  const lastModified = new Date();

  /** The hreflang map for one route — the same for every locale's entry. */
  const languages = (route: string) =>
    Object.fromEntries(LOCALES.map((l) => [l, url(localePath(route, l))]));

  const entry = (route: string, priority: number, changeFrequency: MetadataRoute.Sitemap[number]["changeFrequency"]) =>
    LOCALES.map((locale) => ({
      url: url(localePath(route, locale)),
      lastModified,
      changeFrequency,
      priority,
      alternates: { languages: languages(route) },
    }));

  const staticPages = ROUTES.flatMap((r) => entry(r.path, r.priority, r.changeFrequency));

  // Mirrors the filter in projects/[slug]: a project without photography has
  // no page, so listing it would publish a 404.
  const projects = FEATURED_PROJECTS.filter((p) => p.gallery.length > 0).flatMap((p) =>
    entry(`/projects/${p.slug}`, 0.6, "yearly")
  );

  const poles = POLES.flatMap((p) => entry(`/services/smart-poles/${p.slug}`, 0.6, "yearly"));

  // The nine service lines' own pages. Ranked above a project page and below
  // /services itself: these are the terms people search for — "facade
  // lighting Riyadh" — and each one is the page that should answer.
  const services = SERVICES.flatMap((s) => entry(`/services/${s.slug}`, 0.7, "monthly"));

  return [...staticPages, ...services, ...projects, ...poles];
}
