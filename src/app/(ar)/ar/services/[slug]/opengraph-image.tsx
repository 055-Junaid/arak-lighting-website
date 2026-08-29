import { ogCard, OG_SIZE, OG_CONTENT_TYPE } from "@/lib/og";
import { SERVICES } from "@/lib/services-data";

export const alt = "ARAK service line";
export const size = OG_SIZE;
export const contentType = OG_CONTENT_TYPE;

/** One card per service line, generated at build alongside the pages. */
export function generateStaticParams() {
  return SERVICES.map((service) => ({ slug: service.slug }));
}

export default async function Image({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const service = SERVICES.find((s) => s.slug === slug);

  if (!service) {
    return ogCard({
      eyebrow: "Services",
      title: "Everything a lighting scope needs, under one contract.",
    });
  }

  return ogCard({ eyebrow: `Service line ${service.no}`, title: service.en, note: service.lead });
}
