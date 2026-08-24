import type { Metadata } from "next";
import { Sora, IBM_Plex_Sans, IBM_Plex_Sans_Arabic } from "next/font/google";
import { LanguageProvider } from "@/lib/lang";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import "./globals.css";

const sora = Sora({
  variable: "--font-sora",
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
});

const plexSans = IBM_Plex_Sans({
  variable: "--font-plex-sans",
  subsets: ["latin"],
  weight: ["300", "400", "500", "600"],
});

const plexSansArabic = IBM_Plex_Sans_Arabic({
  variable: "--font-plex-sans-arabic",
  subsets: ["arabic"],
  weight: ["300", "400", "500", "600"],
});

export const metadata: Metadata = {
  title: "ARAK Lighting Solutions",
  description:
    "Forty-five years of fixtures, lighting design, KNX controls and home automation, delivered across hotels, airports, palaces and national projects in Saudi Arabia.",
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang="en"
      data-scroll-behavior="smooth"
      className={`${sora.variable} ${plexSans.variable} ${plexSansArabic.variable}`}
    >
      <body>
        <LanguageProvider>
          <Header />
          {children}
          <Footer />
        </LanguageProvider>
      </body>
    </html>
  );
}
