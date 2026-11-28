import { BlogsPage, listingMetadata } from "@/lib/blog/pages";
export const dynamic = "force-dynamic";
export const metadata = listingMetadata("ar");
export default function Page() { return <BlogsPage locale="ar" />; }
