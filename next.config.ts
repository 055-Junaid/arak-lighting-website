import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    // Next 16 requires every quality the app asks for to be listed here;
    // anything else silently falls back to 75. 45 is for the service
    // spotlight's backdrops, which sit at 13% opacity behind a white wash
    // and would be wasting bytes at full quality.
    qualities: [45, 75],
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
};

export default nextConfig;
