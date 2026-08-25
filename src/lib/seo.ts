import type { Metadata } from "next";
import {
  DEFAULT_LOCALE,
  SITE_NAME,
  SITE_NAME_AR,
  localeAlternates,
  localePath,
  type Locale,
} from "./site";

/**
 * Builds a page's metadata so the title, the description, the canonical, the
 * hreflang pair and the Open Graph and X cards can never drift apart — they
 * are all derived from the route, the locale and two strings.
 *
 * The Open Graph image is deliberately not set here: Next picks up each
 * segment's `opengraph-image.tsx` on its own and fills in the url, type and
 * dimensions. Setting it manually would override that with a worse guess.
 */
export function pageMetadata({
  title,
  description,
  route,
  locale = DEFAULT_LOCALE,
}: {
  /** Page title without the company name; the suffix is added here. */
  title: string;
  description: string;
  /** The English, unprefixed route — "/about". The locale prefix is applied here. */
  route: string;
  locale?: Locale;
}): Metadata {
  const siteName = locale === "ar" ? SITE_NAME_AR : SITE_NAME;
  const fullTitle = `${title} | ${siteName}`;

  return {
    // `absolute` rather than a bare string, because each root layout defines a
    // title template. A plain string would collect the company name twice on a
    // direct child of root and zero times on a page nested two levels down,
    // whose nearest ancestor sets a plain title so no template is in scope.
    title: { absolute: fullTitle },
    description,
    alternates: localeAlternates(route, locale),
    openGraph: {
      type: "website",
      siteName,
      locale,
      alternateLocale: [locale === "ar" ? "en" : "ar"],
      title: fullTitle,
      description,
      url: localePath(route, locale),
    },
    twitter: { card: "summary_large_image", title: fullTitle, description },
  };
}
