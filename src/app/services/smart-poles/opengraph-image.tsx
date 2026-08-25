import { ogCard, OG_SIZE, OG_CONTENT_TYPE } from "@/lib/og";

export const alt = "The C°LB Smart Light Pole Series supplied and installed by ARAK";
export const size = OG_SIZE;
export const contentType = OG_CONTENT_TYPE;

export default async function Image() {
  return ogCard({
    eyebrow: "Smart Poles",
    title: "One pole. The whole street on it.",
    note: "Lighting, 5G, cameras, sensors and signage on a single foundation.",
  });
}
