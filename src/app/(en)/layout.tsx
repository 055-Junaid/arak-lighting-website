import type { Metadata, Viewport } from "next";
import { Sora, IBM_Plex_Sans, IBM_Plex_Sans_Arabic } from "next/font/google";
import { RootShell } from "@/components/RootShell";
import { ICONS, SITE_NAME, SITE_URL, localeAlternates } from "@/lib/site";
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

/**
 * Opens by saying what the company is, because a result is read by people who
 * have not heard of it: a list of services says nothing about who is offering
 * them. This is the positioning line the company already uses of itself — see
 * SITE_TAGLINE — with the work named after it.
 *
 * "since 1976" rather than "for fifty years". The two say the same thing this
 * year and only one of them is still true next year.
 *
 * Kept under about 150 characters, which is where a result stops printing.
 */
const DESCRIPTION =
  "A lighting company and smart lighting solutions provider in Riyadh since 1976. Lighting design, supply, KNX controls, automation and smart poles.";

/**
 * The home page's own title. Every other route sets its own and picks up
 * "| Arak Lighting" from the template below, so this string is the home page
 * alone.
 *
 * Longer than the name on purpose. A result heading gets around sixty
 * characters and the bare name spent a third of them saying nothing to
 * anyone who had not already heard of the company; the rest of the line is
 * the work itself, in the words somebody would actually search for.
 *
 * The name still leads, and that is not decoration. Google reads the home
 * page title as one of the signals for the name it prints above the URL, and
 * the form it accepts is the name first, then a short description of the
 * site — which is exactly this shape. Put the description first and the
 * signal is lost, and it has to fall back to the bare domain again.
 */
const HOME_TITLE = "Arak Lighting | Lighting Design, KNX & Smart Poles, Riyadh";

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: { default: HOME_TITLE, template: `%s | ${SITE_NAME}` },
  description: DESCRIPTION,
  applicationName: SITE_NAME,
  icons: ICONS,
  alternates: localeAlternates("/", "en"),
  openGraph: {
    type: "website",
    siteName: SITE_NAME,
    locale: "en",
    alternateLocale: ["ar"],
    title: HOME_TITLE,
    description: DESCRIPTION,
    url: "/",
  },
  twitter: { card: "summary_large_image", title: HOME_TITLE, description: DESCRIPTION },
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
