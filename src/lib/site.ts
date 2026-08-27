/**
 * One source of truth for everything that has to agree across metadata,
 * the sitemap, robots.txt and the structured data: the canonical origin,
 * the company's own details, and the list of routes.
 *
 * Absolute URLs are required by Open Graph and by sitemaps, so every page's
 * metadata resolves against SITE_URL rather than hardcoding the domain.
 */

import type { Metadata } from "next";

/** Canonical origin. No trailing slash — `url()` below adds the separator.

    The apex, not www. Both names answer, but www is a 301 to the apex, so
    every canonical, hreflang and sitemap entry built on www was pointing at a
    URL that redirects somewhere else — search engines follow it and index the
    apex, which is what they were already showing. This says the same thing
    directly. Anything that changes here has to be changed at the DNS and
    redirect end first, or the two will disagree. */
export const SITE_URL = "https://arak-sa.com";

/**
 * What the site calls itself: every page title, the tab, the Open Graph and
 * Twitter cards, the manifest, and the name a search result prints above the
 * URL. One constant for all of them on purpose.
 *
 * The short form, not the full trading name. Google decides that name line
 * from the WebSite node's `name`, then `og:site_name`, then the home page's
 * own title, and it wants those to agree — a title saying one thing while the
 * structured data says another is the case it resolves by ignoring both and
 * printing the bare domain, which is what the result used to read. A title
 * suffix is also repeated on every page in the tab strip and in every result,
 * where the longer form was mostly eating the width the page's own title
 * needed.
 *
 * The full trading name has not gone anywhere: it is COMPANY.legalName, and
 * it still goes out in the structured data and in the footer's copyright
 * line, which are the two places that want the registered name rather than
 * the one people say.
 */
export const SITE_NAME = "Arak Lighting";

/** The same, in Arabic, for titles and metadata on the /ar tree. */
export const SITE_NAME_AR = "أراك للإضاءة";

export const SITE_TAGLINE =
  "A Lighting Company and Smart Lighting Solutions Provider, Riyadh, Kingdom of Saudi Arabia. Since 1976.";

export const SITE_TAGLINE_AR =
  "شركة إضاءة ومزوّد لحلول الإضاءة الذكية، الرياض، المملكة العربية السعودية. منذ عام 1976.";

/** Absolute URL for a site-relative path. */
export const url = (path = "/") => new URL(path, SITE_URL).toString();

/**
 * Name, address, phone — the details that have to be identical everywhere they
 * appear. They were written out again in the footer and once more on the
 * contact page, so changing the phone number meant finding four places and
 * getting all four right; only the structured data ever read this object.
 * Everything reads it now.
 */
export const COMPANY = {
  legalName: "ARAK Lighting Solutions",
  founded: "1976",
  email: "info@arak-sa.com",
  /** E.164, which is the format structured data expects. */
  phone: "+966114411131",
  phoneDisplay: "+966 11 441 1131",
  street: "Exit 2, Northern Ring Branch Road, Hittin",
  /** The same address as written for the Arabic tree. */
  streetAr: "مخرج 2، طريق الدائري الشمالي الفرعي، حطين",
  city: "Riyadh",
  cityAr: "الرياض",
  postalCode: "13513",
  country: "SA",
  countryName: "Kingdom of Saudi Arabia",
  countryNameAr: "المملكة العربية السعودية",
  latitude: 24.7453023,
  longitude: 46.6078328,
  /**
   * Showroom hours, in the shape schema.org's OpeningHoursSpecification wants.
   * The contact page prints these; a Google local result reads them from the
   * structured data. Both come from here so they cannot say different things.
   */
  hours: {
    days: ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday"],
    opens: "09:00",
    closes: "18:00",
  },
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

/* --- Icons -----------------------------------------------------------------
   Named here rather than left to Next's src/app file convention. The
   convention works, and the tab icon it produced was right, but it hangs a
   content hash off every URL — /favicon.ico?favicon.23lft1ojwmnqp.ico — and
   the one thing Google asks of a favicon, beyond being square and crawlable,
   is that its URL stays where it was. So the files sit in public/ under plain
   paths and the links are written out by hand.

   Order is browser-first, and the SVG leads because it is the only one of
   these that follows the tab strip between light and dark — a browser that
   understands it should not settle for a raster. It keeps that place because
   Chrome, Firefox and Safari all score a scalable icon above a fixed-size
   one; the .ico used to be listed first and the SVG still won the tab.

   The rasters are for everything that cannot read an SVG: an old browser
   falling back to the .ico, and a search result, which draws the icon at
   whatever size it likes on a page we do not control. icon-96 is there for
   the second case — Google asks for a square whose side is a multiple of 48,
   and 48 alone is thin once it is drawn on a retina screen. Both rasters are
   on white rather than transparent, for the reason in build-icons.mjs.

   icon-192 and icon-512 are deliberately absent: the manifest already names
   them for the home screen, and repeating them here would only add candidates
   for the tab without telling search anything icon-96 does not. */
export const ICONS: Metadata["icons"] = {
  icon: [
    { url: "/icon.svg", type: "image/svg+xml", sizes: "any" },
    { url: "/favicon.ico", type: "image/x-icon", sizes: "16x16 32x32 48x48" },
    { url: "/icon-96.png", type: "image/png", sizes: "96x96" },
  ],
  apple: [{ url: "/apple-icon.png", type: "image/png", sizes: "180x180" }],
};
