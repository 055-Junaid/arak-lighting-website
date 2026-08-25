import { poleParams, poleMetadata, PoleRoute } from "@/lib/detail-routes";

export const generateStaticParams = poleParams;

export async function generateMetadata({ params }: PageProps<"/services/smart-poles/[slug]">) {
  const { slug } = await params;
  return poleMetadata(slug, "en");
}

export default async function PolePage({ params }: PageProps<"/services/smart-poles/[slug]">) {
  const { slug } = await params;
  return <PoleRoute slug={slug} />;
}
