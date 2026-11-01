import { pageMetadata } from "@/lib/seo";

export const metadata = pageMetadata({
  // "saudi lighting company" lands here or on the home page; say it.
  title: "About ARAK, a Saudi Lighting Company Since 1976",
  description:
    "ARAK began in 1976 as an extension of the Abdul Rahman Abdul Kader Corporation and is now a Saudi lighting company and smart lighting solutions provider, carrying 40+ partner brands across fittings, KNX controls, home automation and smart poles.",
  route: "/about",
});

export default function AboutLayout({ children }: LayoutProps<"/about">) {
  return children;
}
