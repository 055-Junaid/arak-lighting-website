import type { Metadata } from "next";
import { Sora, IBM_Plex_Sans, IBM_Plex_Sans_Arabic } from "next/font/google";
import { LanguageProvider } from "@/lib/lang";
import { COLOR_MODE_BOOT_SCRIPT } from "@/lib/color-mode";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { ColorToggle } from "@/components/ColorToggle";
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

// Not preloaded. All four weights are needed once the page flips to Arabic, but
// an English page only ever renders one Arabic glyph — the "ع" on the language
// toggle — so preloading pushed 138 KB of Plex Arabic ahead of first paint to
// serve a single character. Dropping the preload leaves the @font-face rules in
// place, so the browser still fetches whichever weights the page actually uses,
// just on demand and off the critical path.
const plexSansArabic = IBM_Plex_Sans_Arabic({
  variable: "--font-plex-sans-arabic",
  subsets: ["arabic"],
  weight: ["300", "400", "500", "600"],
  preload: false,
});

export const metadata: Metadata = {
  title: "ARAK Lighting Solutions",
  description:
    "Five decades of fixtures, lighting design, KNX control, home automation and smart poles, delivered across hotels, airports, palaces and national projects in Saudi Arabia.",
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang="en"
      data-scroll-behavior="smooth"
      className={`${sora.variable} ${plexSans.variable} ${plexSansArabic.variable}`}
    >
      <head>
        {/* Applies a saved "lights on" choice before first paint, so a
            returning visitor never sees a flash of black and white. */}
        <script dangerouslySetInnerHTML={{ __html: COLOR_MODE_BOOT_SCRIPT }} />
      </head>
      <body>
        <LanguageProvider>
          <Header />
          {children}
          <Footer />
          <ColorToggle />
        </LanguageProvider>
      </body>
    </html>
  );
}
