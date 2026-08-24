import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Smart Poles | ARAK Lighting Solutions",
  description:
    "LED lighting, 5G micro base stations, HD surveillance, environmental sensors, public broadcast, digital signage and emergency call on a single mast. Twenty C°LB smart pole designs, supplied, installed, integrated and maintained by ARAK across Saudi Arabia.",
};

export default function SmartPolesLayout({
  children,
}: LayoutProps<"/services/smart-poles">) {
  return children;
}
