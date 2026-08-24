import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { FEATURED_PROJECTS, getFeaturedProject } from "@/lib/projects-data";
import { ProjectDetail } from "./ProjectDetail";

/** Only projects that actually have photography get a page. */
const PHOTOGRAPHED = FEATURED_PROJECTS.filter((project) => project.gallery.length > 0);

export function generateStaticParams() {
  return PHOTOGRAPHED.map((project) => ({ slug: project.slug }));
}

export async function generateMetadata({
  params,
}: PageProps<"/projects/[slug]">): Promise<Metadata> {
  const { slug } = await params;
  const project = getFeaturedProject(slug);
  if (!project) return {};

  return {
    title: `${project.name}, ${project.loc} | ARAK Lighting Solutions`,
    description: project.blurb,
  };
}

export default async function ProjectPage({ params }: PageProps<"/projects/[slug]">) {
  const { slug } = await params;
  const project = getFeaturedProject(slug);
  if (!project || project.gallery.length === 0) notFound();

  const at = PHOTOGRAPHED.findIndex((p) => p.slug === project.slug);
  const previous = PHOTOGRAPHED[at - 1];
  const next = PHOTOGRAPHED[at + 1];

  // Only the slug and name cross into the client component — the neighbours'
  // galleries and blurbs would otherwise ride along in the payload.
  const trim = (p: (typeof PHOTOGRAPHED)[number] | undefined) =>
    p ? { slug: p.slug, name: p.name } : undefined;

  return <ProjectDetail project={project} previous={trim(previous)} next={trim(next)} />;
}
