import { pageMetadata } from "@/lib/seo";

export const metadata = pageMetadata({
  title: "الأعمدة الذكية وأعمدة الإنارة الذكية في السعودية",
  description:
    "إضاءة LED ومحطات الجيل الخامس المصغّرة ومراقبة عالية الدقّة وأجهزة استشعار بيئية وواي فاي عام وبثّ عام ولوحات رقمية ونداء طوارئ على عمود واحد. عشرون تصميمًا من سلسلة C°LB، توريدًا وتركيبًا وتكاملًا وصيانةً من أراك في مختلف أنحاء المملكة.",
  route: "/services/smart-poles",
  locale: "ar",
});

export default function ServicesSmartPolesArabicLayout({ children }: { children: React.ReactNode }) {
  return children;
}
