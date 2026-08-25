import { pageMetadata } from "@/lib/seo";

export const metadata = pageMetadata({
  title: "عن الشركة",
  description:
    "بدأت أراك عام 1976 امتدادًا لمؤسسة عبدالرحمن عبدالقادر، وهي اليوم شركة إضاءة سعودية ومزوّد لحلول الإضاءة الذكية، تحمل أكثر من 40 علامة شريكة في وحدات الإضاءة وأنظمة التحكّم KNX والأتمتة المنزلية والأعمدة الذكية.",
  route: "/about",
  locale: "ar",
});

export default function AboutArabicLayout({ children }: { children: React.ReactNode }) {
  return children;
}
