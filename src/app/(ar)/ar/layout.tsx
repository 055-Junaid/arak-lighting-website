import type { Metadata, Viewport } from "next";
import { Sora, IBM_Plex_Sans, IBM_Plex_Sans_Arabic } from "next/font/google";
import { RootShell } from "@/components/RootShell";
import { SITE_NAME_AR, SITE_URL, localeAlternates } from "@/lib/site";
import "../../globals.css";

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

// Preloaded here, unlike on the English tree: on an Arabic page this is the
// body face for effectively every word, so it belongs ahead of first paint.
const plexSansArabic = IBM_Plex_Sans_Arabic({
  variable: "--font-plex-sans-arabic",
  subsets: ["arabic"],
  weight: ["300", "400", "500", "600"],
});

const DESCRIPTION_AR =
  "خمسة عقود من وحدات الإضاءة وتصميم الإضاءة والتحكّم عبر KNX والأتمتة المنزلية والأعمدة الذكية، في الفنادق والمطارات والقصور والمشاريع الوطنية في المملكة العربية السعودية.";

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: { default: SITE_NAME_AR, template: `%s | ${SITE_NAME_AR}` },
  description: DESCRIPTION_AR,
  applicationName: SITE_NAME_AR,
  alternates: localeAlternates("/", "ar"),
  openGraph: {
    type: "website",
    siteName: SITE_NAME_AR,
    locale: "ar",
    alternateLocale: ["en"],
    title: SITE_NAME_AR,
    description: DESCRIPTION_AR,
    url: "/ar",
  },
  twitter: { card: "summary_large_image", title: SITE_NAME_AR, description: DESCRIPTION_AR },
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

export default function ArabicRootLayout({ children }: { children: React.ReactNode }) {
  return (
    <RootShell
      lang="ar"
      fontClassName={`${sora.variable} ${plexSans.variable} ${plexSansArabic.variable}`}
    >
      {children}
    </RootShell>
  );
}
