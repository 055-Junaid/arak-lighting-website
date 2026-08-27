import type { Metadata } from "next";
import { Sora, IBM_Plex_Sans } from "next/font/google";
import { NotFound } from "@/components/NotFound";
import { ICONS, SITE_NAME, SITE_URL } from "@/lib/site";
import "./globals.css";

/**
 * The 404 for URLs that match no route at all.
 *
 * The two `not-found` files under (en) and (ar) only catch a `notFound()`
 * thrown inside a segment that already resolved — a bad project slug. A URL
 * like /pricing resolves to no segment, so there is no root layout to compose
 * a 404 from: this site has two of them, one per language group, which is the
 * case the Next docs name for `global-not-found`. Enabled by
 * `experimental.globalNotFound` in next.config.ts.
 *
 * This file bypasses layout rendering entirely, so it has to bring its own
 * document, stylesheet and fonts. Plex Arabic is deliberately not among them:
 * the page is English, and pulling a second family to render nothing would
 * cost a download for no glyphs.
 */

const sora = Sora({
  variable: "--font-sora-src",
  subsets: ["latin"],
  weight: ["400", "600"],
});

const plexSans = IBM_Plex_Sans({
  variable: "--font-plex-sans-src",
  subsets: ["latin"],
  weight: ["300", "400", "500"],
});

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: `Page not found | ${SITE_NAME}`,
  description: "The page you are looking for does not exist.",
  icons: ICONS,
  // Next injects `noindex` on 404s itself; this is here so the intent is
  // readable in the file rather than only in the framework's behaviour.
  robots: { index: false, follow: true },
};

export default function GlobalNotFound() {
  return (
    <html lang="en" dir="ltr" className={`${sora.variable} ${plexSans.variable}`}>
      <body>
        <NotFound lang="en" />
      </body>
    </html>
  );
}
