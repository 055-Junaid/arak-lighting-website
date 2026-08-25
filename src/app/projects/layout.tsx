import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Projects | ARAK Lighting Solutions",
  description:
    "Lighting and control references across the Kingdom: hotels, airports, hospitals, universities, palaces and national facilities, supplied, installed and commissioned by ARAK.",
};

export default function ProjectsLayout({ children }: LayoutProps<"/projects">) {
  return children;
}
