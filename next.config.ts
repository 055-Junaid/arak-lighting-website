import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    // Next 16 requires every quality the app asks for to be listed here;
    // anything else silently falls back to 75. 45 is for the service
    // spotlight's backdrops, which sit at 13% opacity behind a white wash
    // and would be wasting bytes at full quality.
    qualities: [45, 75],
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
