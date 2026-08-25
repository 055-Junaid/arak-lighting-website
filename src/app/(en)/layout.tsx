import type { Metadata, Viewport } from "next";
import { Sora, IBM_Plex_Sans, IBM_Plex_Sans_Arabic } from "next/font/google";
import { RootShell } from "@/components/RootShell";
import { SITE_NAME, SITE_URL, localeAlternates } from "@/lib/site";
import "../globals.css";

const sora = Sora({
  variable: "--font-sora-src",
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
});

const plexSans = IBM_Plex_Sans({
  variable: "--font-plex-sans-src",
  subsets: ["latin"],
  weight: ["300", "400", "500", "600"],
});

// Not preloaded on the English tree. An English page renders at most a couple
// of Arabic glyphs — the "ع" on the language link — so preloading pushed
// 138 KB of Plex Arabic ahead of first paint to serve one character. The
// @font-face rules stay, so the browser still fetches what it actually uses.
const plexSansArabic = IBM_Plex_Sans_Arabic({
  variable: "--font-plex-sans-arabic",
  subsets: ["arabic"],
  weight: ["300", "400", "500", "600"],
  preload: false,
});

const DESCRIPTION =
  "Five decades of fixtures, lighting design, KNX control, home automation and smart poles, delivered across hotels, airports, palaces and national projects in Saudi Arabia.";

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: { default: SITE_NAME, template: `%s | ${SITE_NAME}` },
  description: DESCRIPTION,
  applicationName: SITE_NAME,
  alternates: localeAlternates("/", "en"),
  openGraph: {
    type: "website",
    siteName: SITE_NAME,
    locale: "en",
    alternateLocale: ["ar"],
    title: SITE_NAME,
    description: DESCRIPTION,
    url: "/",
  },
  twitter: { card: "summary_large_image", title: SITE_NAME, description: DESCRIPTION },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-image-preview": "large",
      "max-snippet": -1,
      "max-video-preview": -1,
    },
  },
};

export const viewport: Viewport = {
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "#ffffff" },
    { media: "(prefers-color-scheme: dark)", color: "#111111" },
  ],
};

export default function EnglishRootLayout({ children }: { children: React.ReactNode }) {
  return (
    <RootShell
      lang="en"
      fontClassName={`${sora.variable} ${plexSans.variable} ${plexSansArabic.variable}`}
    >
      {children}
    </RootShell>
  );
}
