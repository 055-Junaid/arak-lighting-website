import type { MetadataRoute } from "next";
import { SITE_NAME, SITE_TAGLINE } from "@/lib/site";

/**
 * Web app manifest.
 *
 * This is what a phone reads when a visitor adds the site to their home
 * screen: without it the shortcut takes its name from the page title and its
 * icon from a screenshot. It is also one of the things an audit looks for
 * under installability.
 *
 * `display: "browser"` rather than "standalone" is deliberate. This is a
 * company site, not an app — opening it chromeless would take away the back
 * button and the address bar that a visitor reading about a supplier expects
 * to have.
 */
export default function manifest(): MetadataRoute.Manifest {
  return {
    name: SITE_NAME,
    short_name: "ARAK",
    description: SITE_TAGLINE,
    start_url: "/",
    display: "browser",
    background_color: "#ffffff",
    theme_color: "#111111",
    // English is the default tree, and the manifest is a single document —
    // the Arabic side is reached by the language link like any other page.
    lang: "en",
    dir: "ltr",
    icons: [
      {
        src: "/icon-192.png",
        sizes: "192x192",
        type: "image/png",
        purpose: "any",
      },
      {
        src: "/icon-512.png",
        sizes: "512x512",
        type: "image/png",
        purpose: "any",
      },
    ],
  };
}
