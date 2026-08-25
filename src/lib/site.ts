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

/** The company's own Arabic name, used for titles on the /ar tree. */
export const SITE_NAME_AR = "أراك لحلول الإضاءة";

export const SITE_TAGLINE =
  "A Lighting Company and Smart Lighting Solutions Provider, Riyadh, Kingdom of Saudi Arabia. Since 1976.";

export const SITE_TAGLINE_AR =
  "شركة إضاءة ومزوّد لحلول الإضاءة الذكية، الرياض، المملكة العربية السعودية. منذ عام 1976.";

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

/* --- Locales ---------------------------------------------------------------
   English is served unprefixed and Arabic under /ar, rather than putting both
   behind a prefix. That keeps every English URL exactly where it already is —
   the ones in the published sitemap, in the Open Graph cards, and in anything
   already linked or indexed — while giving Arabic its own crawlable address
   for the first time.

   Each locale has its own root layout (see the (en) and (ar) route groups),
   which is what lets <html lang> and dir be correct per language instead of
   being fixed to English with the direction patched on a wrapper div. */

export type Locale = "en" | "ar";

export const LOCALES: Locale[] = ["en", "ar"];

export const DEFAULT_LOCALE: Locale = "en";

/** BCP-47 tags for hreflang. Region-less: this is language targeting. */
export const HREFLANG: Record<Locale, string> = { en: "en", ar: "ar" };

/**
 * Site-relative path for `route` in `locale`. `route` is always the English,
 * unprefixed form — "/about", "/" — so callers never build prefixes by hand.
 */
export function localePath(route: string, locale: Locale): string {
  const clean = route === "/" ? "" : route.replace(/\/$/, "");
  return locale === "ar" ? `/ar${clean}` : clean || "/";
}

/** Strips the /ar prefix, giving the canonical English route for a pathname. */
export function routeOf(pathname: string): string {
  const stripped = pathname.replace(/^\/ar(?=\/|$)/, "");
  return stripped || "/";
}

/**
 * The `alternates` block for a page: a canonical plus one hreflang entry per
 * locale, and `x-default` pointing at English. Search engines need both sides
 * of the pair to agree before they will treat them as translations rather
 * than as competing duplicates.
 */
export function localeAlternates(route: string, locale: Locale) {
  return {
    canonical: localePath(route, locale),
    languages: {
      en: localePath(route, "en"),
      ar: localePath(route, "ar"),
      "x-default": localePath(route, "en"),
    },
  };
}
