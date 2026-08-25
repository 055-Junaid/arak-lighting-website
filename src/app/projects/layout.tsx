import { pageMetadata } from "@/lib/seo";

export const metadata = pageMetadata({
  title: "Projects",
  description:
    "Lighting and control references across the Kingdom: hotels, airports, hospitals, universities, palaces and national facilities, supplied, installed and commissioned by ARAK.",
  path: "/projects",
});

export default function ProjectsLayout({ children }: LayoutProps<"/projects">) {
  return children;
}
