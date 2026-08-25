import { ogCard, OG_SIZE, OG_CONTENT_TYPE } from "@/lib/og";
import { FAMILY_LABEL, POLES, getPole } from "@/lib/smart-poles-data";

/**
 * The Arabic route's card, rendered with the English wording on purpose.
 *
 * Satori — the renderer behind ImageResponse — does not implement the Unicode
 * bidirectional algorithm in this version: multi-word Arabic comes out with
 * its words in reverse order, and explicit U+202B/U+202C controls render as
 * visible tofu. Both were verified against a card whose word order was known.
 * A garbled Arabic card is worse than an English one, so this stays English
 * until the page can be given a properly designed static Arabic image.
 *
 * The og:title and og:description on this page are Arabic either way, and
 * that is the headline most platforms show beside the image.
 */
export const alt = "ARAK smart pole";
export const size = OG_SIZE;
export const contentType = OG_CONTENT_TYPE;

export function generateStaticParams() {
  return POLES.map((pole) => ({ slug: pole.slug }));
}

export default async function Image({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const pole = getPole(slug);

  if (!pole) {
    return ogCard({ eyebrow: "Smart Poles", title: "One pole. The whole street on it." });
  }

  return ogCard({
    eyebrow: FAMILY_LABEL[pole.family].en,
    title: pole.name,
    note: pole.tagline,
  });
}
