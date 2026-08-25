import { notFound } from "next/navigation";
import { FEATURED_PROJECTS, getFeaturedProject } from "@/lib/projects-data";
import { getPole, getPoleNeighbours, FAMILY_LABEL, POLES } from "@/lib/smart-poles-data";
import { pageMetadata } from "@/lib/seo";
import type { Locale } from "@/lib/site";
import { ProjectDetail } from "@/components/ProjectDetail";
import { PoleDetail } from "@/components/PoleDetail";

/**
 * Shared bodies for the two dynamic routes, which each exist twice — once
 * under /(en) and once under /(ar). Keeping the logic here means the Arabic
 * page is a locale argument rather than a second copy that can fall behind.
 */

/* ---------- Projects ---------- */

/** Only projects that actually have photography get a page. */
export const PHOTOGRAPHED = FEATURED_PROJECTS.filter((p) => p.gallery.length > 0);

export function projectParams() {
  return PHOTOGRAPHED.map((project) => ({ slug: project.slug }));
}

export function projectMetadata(slug: string, locale: Locale) {
  const project = getFeaturedProject(slug);
  if (!project) return {};
  const ar = locale === "ar";
  return pageMetadata({
    title: ar ? `${project.arName}، ${project.arLoc}` : `${project.name}, ${project.loc}`,
    description: ar ? project.arBlurb : project.blurb,
    route: `/projects/${project.slug}`,
    locale,
  });
}

export function ProjectRoute({ slug }: { slug: string }) {
  const project = getFeaturedProject(slug);
  if (!project || project.gallery.length === 0) notFound();

  const at = PHOTOGRAPHED.findIndex((p) => p.slug === project.slug);

  // Only the slug and names cross into the client component — the neighbours'
  // galleries and blurbs would otherwise ride along in the payload.
  const trim = (p: (typeof PHOTOGRAPHED)[number] | undefined) =>
    p ? { slug: p.slug, name: p.name, arName: p.arName } : undefined;

  return (
    <ProjectDetail
      project={project}
      previous={trim(PHOTOGRAPHED[at - 1])}
      next={trim(PHOTOGRAPHED[at + 1])}
    />
  );
}

/* ---------- Smart poles ---------- */

export function poleParams() {
  return POLES.map((pole) => ({ slug: pole.slug }));
}

export function poleMetadata(slug: string, locale: Locale) {
  const pole = getPole(slug);
  if (!pole) return {};
  const ar = locale === "ar";
  return pageMetadata({
    title: ar ? `عمود ${pole.name} الذكي` : `${pole.name} Smart Pole`,
    // The tagline alone is too short to be a useful snippet, so it leads and
    // the catalogue copy carries the rest.
    description: ar ? `${pole.arTagline}. ${pole.arBody}` : `${pole.tagline}. ${pole.body}`,
    route: `/services/smart-poles/${pole.slug}`,
    locale,
  });
}

export function PoleRoute({ slug }: { slug: string }) {
  const pole = getPole(slug);
  if (!pole) notFound();

  const { previous, next } = getPoleNeighbours(slug);
  const trim = (p: typeof pole | undefined) => (p ? { slug: p.slug, name: p.name } : undefined);

  return (
    <PoleDetail
      pole={pole}
      family={FAMILY_LABEL[pole.family]}
      previous={trim(previous)}
      next={trim(next)}
    />
  );
}
