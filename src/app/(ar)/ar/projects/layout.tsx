import { pageMetadata } from "@/lib/seo";

export const metadata = pageMetadata({
  title: "مشاريعنا",
  description:
    "مراجع الإضاءة وأنظمة التحكّم في مختلف أنحاء المملكة: فنادق ومطارات ومستشفيات وجامعات وقصور ومنشآت وطنية، توريدًا وتركيبًا وتشغيلًا من أراك.",
  route: "/projects",
  locale: "ar",
});

export default function ProjectsArabicLayout({ children }: { children: React.ReactNode }) {
  return children;
}
