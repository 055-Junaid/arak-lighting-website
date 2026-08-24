import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Services | ARAK Lighting Solutions",
  description:
    "Ten service lines covering a lighting project end to end: indoor and outdoor fittings, lighting design, facade schemes, KNX controls, installation, project management, projection mapping, home automation and smart poles.",
};

export default function ServicesLayout({ children }: LayoutProps<"/services">) {
  return children;
}
