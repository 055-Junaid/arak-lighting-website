import type { NextConfig } from "next";
import { fileURLToPath } from "node:url";

const nextConfig: NextConfig = {
  // Turbopack infers the workspace root by walking up for a lockfile, and finds
  // a stray package-lock.json in the home directory above this repo. Pinning the
  // root to this directory stops it reaching outside the project — without it
  // every build prints a warning and the inferred root is simply wrong.
  turbopack: {
    root: fileURLToPath(new URL(".", import.meta.url)),
  },
  experimental: {
    // Turns on src/app/global-not-found.tsx. This site has two root layouts —
    // one per language group — so an unmatched URL has no single layout to
    // build a 404 from, which is the case this flag exists for.
    globalNotFound: true,
  },
  images: {
    // Every quality the app asks for has to be listed here. A request for one
    // that is not returns **400, not a fallback** — an <Image> left on Next's
    // default 75 would be a broken picture, not a slightly worse one. (The
    // note that used to sit here said it silently fell back to 75; it does
    // not. Verified against this build: /_next/image?...&q=75 -> 400.)
    //
    // So this list and the quality props have to be changed together. All 70
    // pages were crawled after the last change: only 60 and 45 are ever asked
    // for, across 883 distinct image URLs, with no non-200 responses.
    //
    // 60 is PHOTO_QUALITY in src/lib/images.ts, which every photograph is
    // served at — see that file for why it is 60 rather than Next's 75. 45 is
    // for the service spotlight's backdrops, which sit at 13% opacity behind a
    // white wash and would be wasting bytes at full quality.
    qualities: [45, 60],
    // Next's default list ends at 3840. Nothing here is worth serving that
    // wide: the largest original on the site is 3400px, so a 3840 request
    // just re-encodes the whole source at full size — measured at 246KB for
    // the home hero against 97KB at 1200. A full-bleed image on a 1368px
    // viewport at DPR 2.5 asks for 3420 and was getting exactly that.
    // 2048 is the ceiling a retina laptop actually resolves.
    deviceSizes: [640, 750, 828, 1080, 1200, 1920, 2048],
    remotePatterns: [
      {
        protocol: "https",
        hostname: "images.unsplash.com",
      },
    ],
    dangerouslyAllowSVG: true,
    contentDispositionType: "attachment",
    contentSecurityPolicy: "default-src 'self'; script-src 'none'; sandbox;",
  },

  /**
   * Security headers.
   *
   * Declared here rather than in public/_headers because that file is only
   * read for responses the CDN serves from the publish directory — as the
   * comment at the top of it says, anything served by a function is
   * unaffected, and that is exactly the HTML these headers need to be on.
   * Next applies these to every response it serves, static or not, and they
   * travel with the app if it is ever hosted somewhere other than Netlify.
   *
   * There is deliberately no Content-Security-Policy here. A useful one would
   * have to allow the colour-mode boot script and Next's own inline
   * bootstrap, which means per-request nonces and therefore middleware on
   * every route — a change with real breakage risk that should be made on
   * its own rather than folded into a headers pass.
   */
  async headers() {
    return [
      {
        source: "/:path*",
        headers: [
          // Stop a browser second-guessing a declared Content-Type, which is
          // what turns an uploaded file into a script.
          { key: "X-Content-Type-Options", value: "nosniff" },
          // Send the full URL to ourselves, only the origin to anyone else,
          // and nothing at all when leaving HTTPS.
          { key: "Referrer-Policy", value: "strict-origin-when-cross-origin" },
          // No third party has a reason to frame this site.
          { key: "X-Frame-Options", value: "SAMEORIGIN" },
          { key: "Content-Security-Policy", value: "frame-ancestors 'self'" },
          // The site asks for none of these, so nothing embedded in it should
          // be able to either.
          {
            key: "Permissions-Policy",
            value: "camera=(), microphone=(), geolocation=(), interest-cohort=()",
          },
          // Two years, subdomains included. The site is HTTPS-only behind
          // Netlify already; this stops the first request being the one that
          // gets downgraded.
          {
            key: "Strict-Transport-Security",
            value: "max-age=63072000; includeSubDomains; preload",
          },
        ],
      },
    ];
  },
};

export default nextConfig;
