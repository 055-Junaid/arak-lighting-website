import { pageMetadata } from "@/lib/seo";

export const metadata = pageMetadata({
  title: "تواصل معنا",
  description:
    "احجز استشارة إضاءة مع أراك. أرسل المخططات أو جدول وحدات الإضاءة أو الفكرة وحدها، وسيعود إليك فريقنا في الرياض بدراسة إضاءة وعرض سعر. صالة العرض في مخرج 2، طريق الدائري الشمالي الفرعي، حطين، الرياض.",
  route: "/contact",
  locale: "ar",
});

export default function ContactArabicLayout({ children }: { children: React.ReactNode }) {
  return children;
}
