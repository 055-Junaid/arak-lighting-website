import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "About | ARAK Lighting Solutions",
  description:
    "ARAK began in 1976 as an extension of the Abdul Rahman Abdul Kadir Corporation and is now a Saudi lighting company and smart lighting solutions provider, carrying 40+ partner brands across fittings, KNX controls, home automation and smart poles.",
};

export default function AboutLayout({ children }: LayoutProps<"/about">) {
  return children;
}
