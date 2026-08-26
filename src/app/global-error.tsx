"use client";

import { useEffect } from "react";
import { Sora, IBM_Plex_Sans } from "next/font/google";
import { ErrorBody } from "@/components/ErrorBody";
import "./globals.css";

/**
 * Last-resort boundary: a fault in a root layout itself, which the per-tree
 * `error.tsx` files sit inside and so cannot catch.
 *
 * It replaces the whole document, so like `global-not-found` it has to carry
 * its own <html>, stylesheet and fonts. `plainLinks` is set because the router
 * that next/link depends on is part of what has failed here — the links have
 * to be ordinary anchors that reload the page.
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

export default function GlobalError({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    console.error("Unhandled root error", error.digest ?? error);
  }, [error]);

  return (
    <html lang="en" dir="ltr" className={`${sora.variable} ${plexSans.variable}`}>
      <body>
        <ErrorBody lang="en" reset={reset} plainLinks />
      </body>
    </html>
  );
}
