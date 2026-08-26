import { Breadcrumbs } from "@/components/StructuredData";
import { SmartPolesView } from "./SmartPolesView";

/**
 * Server wrapper around the client view.
 *
 * The breadcrumbs live here rather than in `layout.tsx` because a layout also
 * wraps `[slug]`, so a trail declared there would appear on every pole page
 * alongside that page's own deeper trail — two BreadcrumbLists describing the
 * same page at different depths. This file is the index and nothing else.
 */
const TRAIL = [
  { name: "Services", route: "/services" },
  { name: "Smart Poles", route: "/services/smart-poles" },
];

export default function SmartPolesPage() {
  return (
    <>
      <Breadcrumbs trail={TRAIL} lang="en" />
      <SmartPolesView />
    </>
  );
}
