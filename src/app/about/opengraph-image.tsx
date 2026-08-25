import { ogCard, OG_SIZE, OG_CONTENT_TYPE } from "@/lib/og";

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
