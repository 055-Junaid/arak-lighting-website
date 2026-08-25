import { ogCard, OG_SIZE, OG_CONTENT_TYPE } from "@/lib/og";

export const alt = "The ten service lines ARAK delivers";
export const size = OG_SIZE;
export const contentType = OG_CONTENT_TYPE;

export default async function Image() {
  return ogCard({
    eyebrow: "Services",
    title: "Everything a lighting scope needs, under one contract.",
    note: "Ten service lines, from the first sketch to the last switch.",
  });
}
