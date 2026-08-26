import { poleParams, poleMetadata, PoleRoute } from "@/lib/detail-routes";

export const generateStaticParams = poleParams;

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  return poleMetadata(slug, "ar");
}

export default async function PoleArabicPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  return <PoleRoute slug={slug} locale="ar" />;
}
