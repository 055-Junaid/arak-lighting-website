/**
 * One source of truth for everything that has to agree across metadata,
 * the sitemap, robots.txt and the structured data: the canonical origin,
 * the company's own details, and the list of routes.
 *
 * Absolute URLs are required by Open Graph and by sitemaps, so every page's
 * metadata resolves against SITE_URL rather than hardcoding the domain.
 */

/** Canonical origin. No trailing slash — `url()` below adds the separator. */
export const SITE_URL = "https://www.arak-sa.com";

export const SITE_NAME = "ARAK Lighting Solutions";

export const SITE_TAGLINE =
  "A Lighting Company and Smart Lighting Solutions Provider, Riyadh, Kingdom of Saudi Arabia. Since 1976.";

/** Absolute URL for a site-relative path. */
export const url = (path = "/") => new URL(path, SITE_URL).toString();

export const COMPANY = {
  legalName: "ARAK Lighting Solutions",
  founded: "1976",
  email: "info@arak-sa.com",
  /** E.164, which is the format structured data expects. */
  phone: "+966114411131",
  phoneDisplay: "+966 11 441 1131",
  street: "Exit 2, Northern Ring Branch Road, Hittin",
  city: "Riyadh",
  postalCode: "13513",
  country: "SA",
  latitude: 24.7453023,
  longitude: 46.6078328,
} as const;

/**
 * Static routes, in the order they appear in the navigation. `priority` and
 * `changeFrequency` are hints, not instructions — search engines weigh them
 * lightly, so these stay deliberately plain.
 */
export const ROUTES = [
  { path: "/", priority: 1.0, changeFrequency: "monthly" },
  { path: "/about", priority: 0.8, changeFrequency: "yearly" },
  { path: "/services", priority: 0.9, changeFrequency: "monthly" },
  { path: "/services/smart-poles", priority: 0.9, changeFrequency: "monthly" },
  { path: "/projects", priority: 0.8, changeFrequency: "monthly" },
  { path: "/contact", priority: 0.7, changeFrequency: "yearly" },
] as const;
