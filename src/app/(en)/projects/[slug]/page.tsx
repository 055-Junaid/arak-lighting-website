import { projectParams, projectMetadata, ProjectRoute } from "@/lib/detail-routes";

export const generateStaticParams = projectParams;

export async function generateMetadata({ params }: PageProps<"/projects/[slug]">) {
  const { slug } = await params;
  return projectMetadata(slug, "en");
}

export default async function ProjectPage({ params }: PageProps<"/projects/[slug]">) {
  const { slug } = await params;
  return <ProjectRoute slug={slug} locale="en" />;
}
