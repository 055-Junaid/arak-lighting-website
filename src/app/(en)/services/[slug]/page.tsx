import { serviceParams, serviceMetadata, ServiceRoute } from "@/lib/detail-routes";

export const generateStaticParams = serviceParams;

export async function generateMetadata({ params }: PageProps<"/services/[slug]">) {
  const { slug } = await params;
  return serviceMetadata(slug, "en");
}

export default async function ServicePage({ params }: PageProps<"/services/[slug]">) {
  const { slug } = await params;
  return <ServiceRoute slug={slug} locale="en" />;
}
