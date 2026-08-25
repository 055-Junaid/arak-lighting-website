import type { Metadata } from "next";
import { SITE_NAME } from "./site";

/**
 * Builds a page's metadata so the title, the description, the canonical and
 * the Open Graph and X cards can never drift apart — they are all derived
 * from the same two strings.
 *
 * The Open Graph image is deliberately not set here: Next picks up each
 * segment's `opengraph-image.tsx` on its own and fills in the url, type and
 * dimensions. Setting it manually would override that with a worse guess.
 */
export function pageMetadata({
  title,
  description,
  path,
}: {
  /** Page title without the company name; the suffix is added here. */
  title: string;
  description: string;
  /** Site-relative, resolved against metadataBase from the root layout. */
  path: string;
}): Metadata {
  const fullTitle = `${title} | ${SITE_NAME}`;

  return {
    // `absolute` rather than a bare string, because the root layout defines a
    // title template. A plain string would collect the company name twice on
    // a direct child of root (`About | ARAK | ARAK`) while a page nested two
    // levels down — whose nearest ancestor sets a plain title, so no template
    // is in scope — would get it zero times. This pins the exact title on
    // every page regardless of depth.
    title: { absolute: fullTitle },
    description,
    alternates: { canonical: path },
    openGraph: {
      type: "website",
      siteName: SITE_NAME,
      locale: "en",
      title: fullTitle,
      description,
      url: path,
    },
    twitter: {
      card: "summary_large_image",
      title: fullTitle,
      description,
    },
  };
}
