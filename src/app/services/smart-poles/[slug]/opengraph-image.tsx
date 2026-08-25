import { ogCard, OG_SIZE, OG_CONTENT_TYPE } from "@/lib/og";
import { FAMILY_LABEL, POLES, getPole } from "@/lib/smart-poles-data";

export const alt = "ARAK smart pole";
export const size = OG_SIZE;
export const contentType = OG_CONTENT_TYPE;

/** One card per design, generated at build alongside the pages themselves. */
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
