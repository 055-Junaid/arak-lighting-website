import { notFound } from "next/navigation";
import { FEATURED_PROJECTS, getFeaturedProject } from "@/lib/projects-data";
import { getPole, getPoleNeighbours, FAMILY_LABEL, POLES } from "@/lib/smart-poles-data";
import { SERVICES } from "@/lib/services-data";
import { getServiceDetail } from "@/lib/service-details";
import { clampDescription, pageMetadata } from "@/lib/seo";
import type { Locale } from "@/lib/site";
import { ProjectDetail } from "@/components/ProjectDetail";
import { PoleDetail } from "@/components/PoleDetail";
import { ServiceDetail, type ServiceNeighbour } from "@/components/ServiceDetail";
import { Breadcrumbs } from "@/components/StructuredData";

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

export function ProjectRoute({ slug, locale = "en" }: { slug: string; locale?: Locale }) {
  const project = getFeaturedProject(slug);
  if (!project || project.gallery.length === 0) notFound();
  const ar = locale === "ar";

  const at = PHOTOGRAPHED.findIndex((p) => p.slug === project.slug);

  // Only the slug and names cross into the client component — the neighbours'
  // galleries and blurbs would otherwise ride along in the payload.
  const trim = (p: (typeof PHOTOGRAPHED)[number] | undefined) =>
    p ? { slug: p.slug, name: p.name, arName: p.arName } : undefined;

  return (
    <>
      {/* Emitted from here rather than from ProjectDetail, which is a client
          component: this is the nearest server component that has the
          project's own name to put in the trail. */}
      <Breadcrumbs
        trail={[
          { name: ar ? "المشاريع" : "Projects", route: "/projects" },
          { name: ar ? project.arName : project.name, route: `/projects/${project.slug}` },
        ]}
        lang={locale}
      />
      <ProjectDetail
        project={project}
        previous={trim(PHOTOGRAPHED[at - 1])}
        next={trim(PHOTOGRAPHED[at + 1])}
      />
    </>
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
    // the catalogue copy carries the rest — clamped, because the two together
    // ran to 370 characters in English and 465 in Arabic, well past what a
    // result will show.
    description: clampDescription(
      ar ? `${pole.arTagline}. ${pole.arBody}` : `${pole.tagline}. ${pole.body}`
    ),
    route: `/services/smart-poles/${pole.slug}`,
    locale,
  });
}

export function PoleRoute({ slug, locale = "en" }: { slug: string; locale?: Locale }) {
  const pole = getPole(slug);
  if (!pole) notFound();
  const ar = locale === "ar";

  const { previous, next } = getPoleNeighbours(slug);
  const trim = (p: typeof pole | undefined) => (p ? { slug: p.slug, name: p.name } : undefined);

  return (
    <>
      <Breadcrumbs
        trail={[
          { name: ar ? "الخدمات" : "Services", route: "/services" },
          { name: ar ? "الأعمدة الذكية" : "Smart Poles", route: "/services/smart-poles" },
          {
            name: ar ? `عمود ${pole.name} الذكي` : `${pole.name} Smart Pole`,
            route: `/services/smart-poles/${pole.slug}`,
          },
        ]}
        lang={locale}
      />
      <PoleDetail
        pole={pole}
        family={FAMILY_LABEL[pole.family]}
        previous={trim(previous)}
        next={trim(next)}
      />
    </>
  );
}

/* ---------- Services ---------- */

/**
 * The nine service lines get a page each. Smart Poles is deliberately absent:
 * it is its own section at /services/smart-poles with a series index and
 * twenty designs under it, and a static segment wins over this dynamic one
 * anyway.
 */
export function serviceParams() {
  return SERVICES.map((service) => ({ slug: service.slug }));
}

export function serviceMetadata(slug: string, locale: Locale) {
  const service = SERVICES.find((s) => s.slug === slug);
  if (!service) return {};
  const ar = locale === "ar";
  return pageMetadata({
    title: ar ? service.ar : service.en,
    // The lead is one sentence and reads as a strapline rather than as a
    // description of the page, so the body follows it and the pair is
    // clamped to what a result will actually print.
    description: clampDescription(
      ar ? `${service.arLead} ${service.arBody}` : `${service.lead} ${service.body}`
    ),
    route: `/services/${service.slug}`,
    locale,
  });
}

export function ServiceRoute({ slug, locale = "en" }: { slug: string; locale?: Locale }) {
  const at = SERVICES.findIndex((service) => service.slug === slug);
  const service = SERVICES[at];
  const detail = getServiceDetail(slug);
  if (!service || !detail) notFound();
  const ar = locale === "ar";

  // The list is a loop: the ninth line leads back to the first rather than
  // stopping, which is how the pole pager already behaves.
  const step = (by: number): ServiceNeighbour => {
    const neighbour = SERVICES[(at + by + SERVICES.length) % SERVICES.length];
    if (!neighbour || neighbour.slug === slug) return undefined;
    return { slug: neighbour.slug, en: neighbour.en, ar: neighbour.ar };
  };

  return (
    <>
      <Breadcrumbs
        trail={[
          { name: ar ? "الخدمات" : "Services", route: "/services" },
          { name: ar ? service.ar : service.en, route: `/services/${service.slug}` },
        ]}
        lang={locale}
      />
      <ServiceDetail
        service={service}
        detail={detail}
        previous={step(-1)}
        next={step(1)}
      />
    </>
  );
}
