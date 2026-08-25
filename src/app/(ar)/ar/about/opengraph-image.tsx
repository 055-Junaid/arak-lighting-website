import { ogCard, OG_SIZE, OG_CONTENT_TYPE } from "@/lib/og";

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
export const alt = "About ARAK Lighting Solutions";
export const size = OG_SIZE;
export const contentType = OG_CONTENT_TYPE;

export default async function Image() {
  return ogCard({
    eyebrow: "About ARAK",
    title: "Fifty years of light, one project at a time.",
    note: "A Saudi lighting company carrying more than forty international brands.",
  });
}
