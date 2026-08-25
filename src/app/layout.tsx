import type { Metadata, Viewport } from "next";
import { Sora, IBM_Plex_Sans, IBM_Plex_Sans_Arabic } from "next/font/google";
import { LanguageProvider } from "@/lib/lang";
import { COLOR_MODE_BOOT_SCRIPT } from "@/lib/color-mode";
import { Header } from "@/components/Header";
import { StructuredData } from "@/components/StructuredData";
import { Footer } from "@/components/Footer";
import { ColorToggle } from "@/components/ColorToggle";
import { SITE_NAME, SITE_URL } from "@/lib/site";
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

const DESCRIPTION =
  "Five decades of fixtures, lighting design, KNX control, home automation and smart poles, delivered across hotels, airports, palaces and national projects in Saudi Arabia.";

export const metadata: Metadata = {
  // Open Graph and sitemaps need absolute URLs. With metadataBase set, every
  // page can declare a relative canonical and Next resolves it against the
  // live origin — so nothing hardcodes the domain a second time.
  metadataBase: new URL(SITE_URL),
  title: {
    default: SITE_NAME,
    // Page layouts supply their own full titles; this keeps any that don't
    // from losing the company name.
    template: `%s | ${SITE_NAME}`,
  },
  description: DESCRIPTION,
  applicationName: SITE_NAME,
  alternates: { canonical: "/" },
  openGraph: {
    type: "website",
    siteName: SITE_NAME,
    locale: "en",
    title: SITE_NAME,
    description: DESCRIPTION,
    url: "/",
  },
  twitter: {
    card: "summary_large_image",
    title: SITE_NAME,
    description: DESCRIPTION,
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      // Lets Google show a full-size image and an untruncated snippet
      // instead of defaulting to a thumbnail and a short one.
      "max-image-preview": "large",
      "max-snippet": -1,
      "max-video-preview": -1,
    },
  },
};

/** Matches the header, so the browser chrome does not flash white on mobile. */
export const viewport: Viewport = {
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "#ffffff" },
    { media: "(prefers-color-scheme: dark)", color: "#111111" },
  ],
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
        <StructuredData />
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
