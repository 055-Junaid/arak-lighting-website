import {
  COMPANY,
  SITE_NAME,
  SITE_NAME_AR,
  SITE_NAME_VARIANTS,
  SITE_TAGLINE,
  SITE_TAGLINE_AR,
  SITE_URL,
  url,
  localePath,
  type Locale,
} from "@/lib/site";
import { SOCIALS, MAPS_PLACE_URL } from "@/lib/social-data";
import { SERVICES, SMART_POLES } from "@/lib/services-data";

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
        alternateName: [ar ? SITE_NAME : SITE_NAME_AR, ...SITE_NAME_VARIANTS],
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
        hasMap: MAPS_PLACE_URL,
        // What ARAK is an authority on, in the terms buyers and AI answers
        // use. Every item is a service line or system the site sells.
        knowsAbout: [
          "Lighting design",
          "Architectural lighting",
          "Facade lighting",
          "Outdoor and street lighting",
          "KNX",
          "DALI",
          "Lighting control systems",
          "Home automation",
          "Hotel guest room management (GRMS)",
          "Smart poles",
          "3D projection mapping",
        ],
        // The service lines, each pointing at the Service node its own page
        // emits (see ServiceData), so search engines and AI answers can tie
        // "lighting design in Riyadh" to this company rather than inferring it.
        hasOfferCatalog: {
          "@type": "OfferCatalog",
          name: ar ? "خدمات أراك" : "ARAK services",
          itemListElement: [...SERVICES, SMART_POLES].map((s) => ({
            "@type": "Offer",
            itemOffered: {
              "@type": "Service",
              "@id": serviceId(s.slug, lang),
              name: ar ? s.ar : s.en,
            },
          })),
        },
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

/**
 * FAQPage for a page that prints its own questions and answers.
 *
 * Google shows FAQ rich results for very few sites now, so this is not about
 * a snippet. It is the plainest way to hand search engines and AI answer
 * engines the exact question a buyer types — "KNX or DALI?" — next to our
 * answer to it. Every entry is also on the page, word for word, which is the
 * condition for marking it up at all.
 */
export function FaqData({ faqs }: { faqs: { q: string; a: string }[] }) {
  const graph = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: faqs.map((faq) => ({
      "@type": "Question",
      name: faq.q,
      acceptedAnswer: { "@type": "Answer", text: faq.a },
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

/** One @id per service page and language, shared by the catalogue and the page. */
const serviceId = (slug: string, lang: Locale) => url(`${localePath(`/services/${slug}`, lang)}#service`);

function JsonLd({ graph }: { graph: object }) {
  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{
        __html: JSON.stringify(graph).replace(/</g, "\\u003c"),
      }}
    />
  );
}

/**
 * A service page, as a Service offered by the organisation.
 *
 * Until now these pages carried breadcrumbs and nothing that said what they
 * sold or who sold it, so "lighting design consultant riyadh" had to be
 * inferred from prose. `serviceType` is the plain name, `name` the searched
 * title, and the provider is the same @id the site-wide Organization uses.
 */
export function ServiceData({
  slug,
  name,
  serviceType,
  description,
  image,
  lang,
}: {
  slug: string;
  name: string;
  serviceType: string;
  description: string;
  image?: string;
  lang: Locale;
}) {
  return (
    <JsonLd
      graph={{
        "@context": "https://schema.org",
        "@type": "Service",
        "@id": serviceId(slug, lang),
        name,
        serviceType,
        description,
        url: url(localePath(`/services/${slug}`, lang)),
        ...(image ? { image: url(image) } : {}),
        provider: { "@id": url("/#organization") },
        areaServed: { "@type": "Country", name: "Saudi Arabia" },
        availableLanguage: ["en", "ar"],
        inLanguage: lang,
      }}
    />
  );
}

/**
 * A project page: the building it is about, and its photographs captioned
 * with the work ARAK did there.
 *
 * Image search sends these photographs to people searching the building's
 * name and nothing on the result says who lit it. Each ImageObject carries the
 * same caption as the alt text, naming the scope and ARAK. No creator or
 * licence is claimed: who holds the rights to each photograph is not recorded.
 */
export function ProjectPageData({
  slug,
  name,
  description,
  locality,
  images,
  caption,
  lang,
}: {
  slug: string;
  name: string;
  description: string;
  locality: string;
  images: string[];
  caption: string;
  lang: Locale;
}) {
  const pageUrl = url(localePath(`/projects/${slug}`, lang));
  const photos = images.map((src) => ({ "@type": "ImageObject", contentUrl: url(src), caption }));
  return (
    <JsonLd
      graph={{
        "@context": "https://schema.org",
        "@type": "WebPage",
        "@id": `${pageUrl}#webpage`,
        url: pageUrl,
        name,
        description,
        inLanguage: lang,
        isPartOf: { "@id": url(`${localePath("/", lang)}#website`) },
        publisher: { "@id": url("/#organization") },
        about: {
          "@type": "Place",
          name,
          address: { "@type": "PostalAddress", addressLocality: locality, addressCountry: "SA" },
        },
        primaryImageOfPage: photos[0],
        image: photos,
      }}
    />
  );
}

