import { BlogsPage, listingMetadata } from "@/lib/blog/pages";
export const dynamic = "force-dynamic";
export const metadata = listingMetadata("en");
export default function Page() { return <BlogsPage locale="en" />; }
