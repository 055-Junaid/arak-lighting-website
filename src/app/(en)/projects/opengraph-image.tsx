import { ogCard, OG_SIZE, OG_CONTENT_TYPE } from "@/lib/og";

export const alt = "Lighting projects delivered by ARAK across Saudi Arabia";
export const size = OG_SIZE;
export const contentType = OG_CONTENT_TYPE;

export default async function Image() {
  return ogCard({
    eyebrow: "Projects",
    title: "Hotels, airports, palaces and national projects.",
    note: "Supplied, installed and commissioned across the Kingdom.",
  });
}
