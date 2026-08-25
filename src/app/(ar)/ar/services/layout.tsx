import { pageMetadata } from "@/lib/seo";

export const metadata = pageMetadata({
  title: "خدماتنا",
  description:
    "عشرة خطوط خدمة تغطّي مشروع الإضاءة من طرفه إلى طرفه: وحدات الإضاءة الداخلية والخارجية، وتصميم الإضاءة، وإضاءة الواجهات، وأنظمة التحكّم KNX، والتركيب، وإدارة المشاريع، والإسقاط الضوئي، والأتمتة المنزلية، والأعمدة الذكية.",
  route: "/services",
  locale: "ar",
});

export default function ServicesArabicLayout({ children }: { children: React.ReactNode }) {
  return children;
}
