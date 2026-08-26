import { Breadcrumbs } from "@/components/StructuredData";
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
      <SmartPolesView />
    </>
  );
}
