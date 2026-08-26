import { projectParams, projectMetadata, ProjectRoute } from "@/lib/detail-routes";

export const generateStaticParams = projectParams;

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  return projectMetadata(slug, "ar");
}

export default async function ProjectArabicPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  return <ProjectRoute slug={slug} locale="ar" />;
}
