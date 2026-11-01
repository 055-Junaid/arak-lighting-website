import { Breadcrumbs, ServiceData } from "@/components/StructuredData";
import { SMART_POLES } from "@/lib/services-data";
import { SmartPolesView } from "../../../../(en)/services/smart-poles/SmartPolesView";

/** Arabic services/smart-poles. Same view as /services/smart-poles, under the
 *  Arabic root layout, with the trail in Arabic. */
const TRAIL = [
  { name: "الخدمات", route: "/services" },
  { name: "الأعمدة الذكية", route: "/services/smart-poles" },
];

export default function SmartPolesArabicPage() {
  return (
    <>
      <Breadcrumbs trail={TRAIL} lang="ar" />
      <ServiceData
        slug={SMART_POLES.slug}
        name={"الأعمدة الذكية وأعمدة الإنارة الذكية في السعودية"}
        serviceType={SMART_POLES.ar}
        description={`${SMART_POLES.arLead} ${SMART_POLES.arBody}`}
        image="/smart-poles/hero.jpg"
        lang="ar"
      />
      <SmartPolesView />
    </>
  );
}
