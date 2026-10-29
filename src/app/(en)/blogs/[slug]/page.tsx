import { articleMetadata, BlogArticlePage } from "@/lib/blog/pages";
export const dynamic = "force-dynamic";
type Props = { params: Promise<{ slug: string }> };
export async function generateMetadata({ params }: Props) { return articleMetadata((await params).slug, "en"); }
export default async function Page({ params }: Props) { return <BlogArticlePage slug={(await params).slug} locale="en" />; }
