import { ogCard, OG_SIZE, OG_CONTENT_TYPE } from "@/lib/og";

export const alt = "ARAK Lighting Solutions, a lighting company and smart lighting solutions provider in Riyadh";
export const size = OG_SIZE;
export const contentType = OG_CONTENT_TYPE;

export default async function Image() {
  return ogCard({
    // Not "Since 1976" — the card's own footer already carries that line.
    eyebrow: "Lighting · Controls · Smart Poles",
    title: "Fifty years of light across the Kingdom.",
    note: "Fittings, lighting design, KNX control, home automation and smart poles.",
  });
}
