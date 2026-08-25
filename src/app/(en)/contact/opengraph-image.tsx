import { ogCard, OG_SIZE, OG_CONTENT_TYPE } from "@/lib/og";

export const alt = "Contact ARAK Lighting Solutions in Riyadh";
export const size = OG_SIZE;
export const contentType = OG_CONTENT_TYPE;

export default async function Image() {
  return ogCard({
    eyebrow: "Contact",
    title: "Book a lighting consultation.",
    note: "Send drawings, a fixture schedule, or just the brief.",
  });
}
