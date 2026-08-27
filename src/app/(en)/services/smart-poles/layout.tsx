import { pageMetadata } from "@/lib/seo";

export const metadata = pageMetadata({
  title: "Smart Poles",
  description:
    "LED lighting, 5G micro base stations, HD surveillance, environmental sensors, public WiFi, public broadcast, digital signage and emergency call on a single mast. Twenty C°LB smart pole designs, supplied, installed, integrated and maintained by ARAK across Saudi Arabia.",
  route: "/services/smart-poles",
});

export default function SmartPolesLayout({
  children,
}: LayoutProps<"/services/smart-poles">) {
  return children;
}
