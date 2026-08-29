import { serviceParams, serviceMetadata, ServiceRoute } from "@/lib/detail-routes";

export const generateStaticParams = serviceParams;

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  return serviceMetadata(slug, "ar");
}

export default async function ServiceArabicPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  return <ServiceRoute slug={slug} locale="ar" />;
}
