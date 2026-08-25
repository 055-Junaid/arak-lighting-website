import { notFound } from "next/navigation";
import { pageMetadata } from "@/lib/seo";
import { FAMILY_LABEL, POLES, getPole, getPoleNeighbours } from "@/lib/smart-poles-data";
import { PoleDetail } from "./PoleDetail";

/**
 * A page per design in the series. These used to exist only as a dialog on
 * the parent page, which meant twenty products shared one URL: nothing could
 * be linked, shared with a client, or indexed.
 */
export function generateStaticParams() {
  return POLES.map((pole) => ({ slug: pole.slug }));
}

export async function generateMetadata({
  params,
}: PageProps<"/services/smart-poles/[slug]">) {
  const { slug } = await params;
  const pole = getPole(slug);
  if (!pole) return {};

  return pageMetadata({
    title: `${pole.name} Smart Pole`,
    // The tagline alone is too short to be a useful snippet, so it leads and
    // the catalogue copy carries the rest.
    description: `${pole.tagline}. ${pole.body}`,
    path: `/services/smart-poles/${pole.slug}`,
  });
}

export default async function PolePage({ params }: PageProps<"/services/smart-poles/[slug]">) {
  const { slug } = await params;
  const pole = getPole(slug);
  if (!pole) notFound();

  const { previous, next } = getPoleNeighbours(slug);

  // Only what the client component renders crosses the boundary — the other
  // nineteen poles' copy would otherwise ride along in the payload.
  const trim = (p: typeof pole | undefined) =>
    p ? { slug: p.slug, name: p.name } : undefined;

  return (
    <PoleDetail
      pole={pole}
      family={FAMILY_LABEL[pole.family]}
      previous={trim(previous)}
      next={trim(next)}
    />
  );
}
