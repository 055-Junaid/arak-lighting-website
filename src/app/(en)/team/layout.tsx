import type { Metadata } from "next";
export const metadata: Metadata = { title: { absolute: "Team publishing | Arak Lighting" }, robots: { index: false, follow: false }, alternates: { canonical: null, languages: {} } };
export const dynamic = "force-dynamic";
export default function TeamLayout({ children }: { children: React.ReactNode }) { return children; }
