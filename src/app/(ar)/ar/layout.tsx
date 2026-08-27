import type { Metadata, Viewport } from "next";
import { Sora, IBM_Plex_Sans, IBM_Plex_Sans_Arabic } from "next/font/google";
import { RootShell } from "@/components/RootShell";
import { ICONS, SITE_NAME_AR, SITE_URL, localeAlternates } from "@/lib/site";
import "../../globals.css";

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

// Preloaded here, unlike on the English tree: on an Arabic page this is the
// body face for effectively every word, so it belongs ahead of first paint.
const plexSansArabic = IBM_Plex_Sans_Arabic({
  variable: "--font-plex-sans-arabic",
  subsets: ["arabic"],
  weight: ["300", "400", "500", "600"],
});

/** The same shape as DESCRIPTION on the English tree: what the company is
    first, then the work. Mirrors SITE_TAGLINE_AR's own wording. */
const DESCRIPTION_AR =
  "شركة إضاءة ومزوّد لحلول الإضاءة الذكية في الرياض منذ عام 1976. تصميم الإضاءة وتوريد الوحدات وأنظمة التحكّم KNX والأتمتة والأعمدة الذكية.";

/** The Arabic home page's title. Same shape as HOME_TITLE on the English
    tree, and for the same reasons: the name first, then the work, in the
    words somebody searching in Arabic would use. */
const HOME_TITLE_AR = "أراك للإضاءة | تصميم الإضاءة وأنظمة KNX والأعمدة الذكية، الرياض";

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: { default: HOME_TITLE_AR, template: `%s | ${SITE_NAME_AR}` },
  description: DESCRIPTION_AR,
  applicationName: SITE_NAME_AR,
  icons: ICONS,
  alternates: localeAlternates("/", "ar"),
  openGraph: {
    type: "website",
    siteName: SITE_NAME_AR,
    locale: "ar",
    alternateLocale: ["en"],
    title: HOME_TITLE_AR,
    description: DESCRIPTION_AR,
    url: "/ar",
  },
  twitter: { card: "summary_large_image", title: HOME_TITLE_AR, description: DESCRIPTION_AR },
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
  // One colour, because there is one theme. The dark entry that used to sit
  // here promised a dark page to any phone set to dark mode and got a white
  // one — `data-color` is a saturation switch, not a theme, so the page is
  // #ffffff in both. `color-scheme: light` in globals.css says the same thing
  // to the controls and the scrollbars.
  themeColor: "#ffffff",
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
