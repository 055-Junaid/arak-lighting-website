import {
  COMPANY,
  SITE_NAME,
  SITE_NAME_AR,
  SITE_TAGLINE,
  SITE_TAGLINE_AR,
  SITE_URL,
  url,
  localePath,
  type Locale,
} from "@/lib/site";
import { SOCIALS } from "@/lib/social-data";

/**
 * Schema.org description of the company, emitted once on every page.
 *
 * This is what puts the showroom address, the phone number and the founding
 * year into a Google knowledge panel and a local result, rather than leaving
 * search engines to infer them from body copy. `LocalBusiness` is the right
 * type here over a bare `Organization` because ARAK has a single trading
 * address the public can visit.
 *
 * Rendered from a server component, so it costs the client nothing.
 */
export function StructuredData({ lang }: { lang: Locale }) {
  const ar = lang === "ar";
  const graph = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": ["Organization", "LocalBusiness"],
        "@id": url("/#organization"),
        name: ar ? SITE_NAME_AR : SITE_NAME,
        alternateName: ar ? SITE_NAME : SITE_NAME_AR,
        legalName: COMPANY.legalName,
        description: ar ? SITE_TAGLINE_AR : SITE_TAGLINE,
        url: SITE_URL,
        foundingDate: COMPANY.founded,
        email: COMPANY.email,
        telephone: COMPANY.phone,
        logo: {
          "@type": "ImageObject",
          url: url("/arak-logo-black.png"),
        },
        image: url("/opengraph-image"),
        address: {
          "@type": "PostalAddress",
          streetAddress: COMPANY.street,
          addressLocality: COMPANY.city,
          postalCode: COMPANY.postalCode,
          addressCountry: COMPANY.country,
        },
        geo: {
          "@type": "GeoCoordinates",
          latitude: COMPANY.latitude,
          longitude: COMPANY.longitude,
        },
        areaServed: {
          "@type": "Country",
          name: "Saudi Arabia",
        },
        // A LocalBusiness with a walk-in address is asked for these by every
        // local result. The contact page prints the same figures.
        openingHoursSpecification: [
          {
            "@type": "OpeningHoursSpecification",
            dayOfWeek: [...COMPANY.hours.days],
            opens: COMPANY.hours.opens,
            closes: COMPANY.hours.closes,
          },
        ],
        // The handles the footer and contact page already link to. Declaring
        // them here is what lets a search engine tie the accounts to the
        // company rather than treating them as unrelated profiles.
        sameAs: SOCIALS.map((s) => s.href),
        contactPoint: {
          "@type": "ContactPoint",
          contactType: "sales",
          telephone: COMPANY.phone,
          email: COMPANY.email,
          areaServed: "SA",
          availableLanguage: ["en", "ar"],
        },
      },
      {
        // One WebSite node per language, each at its own id and url, so the
        // two are described as translations rather than as one site that
        // happens to change language.
        "@type": "WebSite",
        "@id": url(`${localePath("/", lang)}#website`),
        url: url(localePath("/", lang)),
        // This `name` is the line a search result prints above the URL, and
        // it is deliberately the same string as the page titles — see
        // SITE_NAME. The registered name is declared alongside it rather than
        // instead of it, so a search engine can still tie the two together.
        name: ar ? SITE_NAME_AR : SITE_NAME,
        alternateName: COMPANY.legalName,
        publisher: { "@id": url("/#organization") },
        inLanguage: ar ? "ar" : "en",
      },
    ],
  };

  return (
    <script
      type="application/ld+json"
      // Serialised rather than templated so the payload is always valid JSON.
      // `<` is escaped because a literal `</script>` inside the string would
      // otherwise close this tag early.
      dangerouslySetInnerHTML={{
        __html: JSON.stringify(graph).replace(/</g, "\\u003c"),
      }}
    />
  );
}

/**
 * `BreadcrumbList` for a page that sits below the top level.
 *
 * Google uses this to replace the bare URL in a result with a readable trail —
 * "arak-sa.com › Services › Smart Poles" — and to understand that the smart
 * pole pages are part of Services rather than a flat set of unrelated pages.
 * The site already draws these crumbs on screen; this states the same
 * hierarchy in the form a crawler reads.
 *
 * `trail` is the ancestry without the home page, which is added here so every
 * caller cannot forget it, and in the site's own English route form —
 * `localePath` applies the locale prefix.
 */
export function Breadcrumbs({
  trail,
  lang,
}: {
  trail: { name: string; route: string }[];
  lang: Locale;
}) {
  const ar = lang === "ar";
  const items = [{ name: ar ? "الرئيسية" : "Home", route: "/" }, ...trail];

  const graph = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: items.map((item, index) => ({
      "@type": "ListItem",
      position: index + 1,
      name: item.name,
      // The last crumb is the page itself. Schema.org allows dropping `item`
      // on it, but naming it is what lets the trail be clicked through in a
      // result, so every position carries its URL.
      item: url(localePath(item.route, lang)),
    })),
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{
        __html: JSON.stringify(graph).replace(/</g, "\\u003c"),
      }}
    />
  );
}
