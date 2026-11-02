import { Breadcrumbs, ServiceData } from "@/components/StructuredData";
import { SMART_POLES } from "@/lib/services-data";
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
      <ServiceData
        slug={SMART_POLES.slug}
        name={"Smart Poles and Smart Street Light Poles in Saudi Arabia"}
        serviceType={SMART_POLES.en}
        description={`${SMART_POLES.lead} ${SMART_POLES.body}`}
        image="/smart-poles/hero.jpg"
        lang="en"
      />
      <SmartPolesView />
    </>
  );
}
