import { pageMetadata } from "@/lib/seo";

export const metadata = pageMetadata({
  title: "Services",
  description:
    "Ten service lines covering a lighting project end to end: indoor and outdoor fittings, lighting design, facade schemes, KNX controls, installation, project management, projection mapping, home automation and smart poles.",
  path: "/services",
});

export default function ServicesLayout({ children }: LayoutProps<"/services">) {
  return children;
}
