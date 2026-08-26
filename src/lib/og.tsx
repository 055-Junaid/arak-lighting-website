import { ImageResponse } from "next/og";
import { LOGO_WHITE, SORA_REGULAR, SORA_SEMIBOLD, bytes } from "./og-assets";

/**
 * The shared Open Graph card. Every route's `opengraph-image.tsx` is a thin
 * wrapper around this, so all six cards are one design with one set of type
 * sizes rather than six that drifted apart.
 *
 * These are generated once at build and served as static files, so the cost
 * of reading the fonts and the wordmark here is paid by the build, not by a
 * crawler waiting on a response.
 */

/** Open Graph's standard card. Also what X renders as a large summary image. */
export const OG_SIZE = { width: 1200, height: 630 };
export const OG_CONTENT_TYPE = "image/png";

/**
 * Satori needs real font binaries — it cannot use next/font, whose output is
 * hashed woff2 that only the browser ever sees. These two are static instances
 * cut from the Sora variable font, so the card is set in the same face as the
 * site's headings.
 *
 * The bytes are inlined rather than read from disk. That started as a hard
 * constraint on Cloudflare Workers, which have no filesystem — a node:fs read
 * here returned a 500 for every card while working fine under `next build`.
 * It stays now the site builds for Netlify because a serverless bundle only
 * carries the files Next's output tracing found, and tracing cannot follow a
 * path built at runtime. See src/lib/og-assets.ts.
 */
function brandFonts() {
  return [
    { name: "Sora", data: bytes(SORA_REGULAR), weight: 400 as const, style: "normal" as const },
    { name: "Sora", data: bytes(SORA_SEMIBOLD), weight: 600 as const, style: "normal" as const },
  ];
}

export async function ogCard({
  eyebrow,
  title,
  note,
}: {
  /** Small tracked label above the title — usually the section name. */
  eyebrow: string;
  title: string;
  /** One supporting line. Kept short; long text shrinks the title's impact. */
  note?: string;
}) {
  const fonts = brandFonts();
  // Satori resolves `src` as a string, so the wordmark goes in as a data URI.
  const logo = `data:image/png;base64,${LOGO_WHITE}`;

  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          background: "#111111",
          padding: "72px 80px",
          fontFamily: "Sora",
          position: "relative",
        }}
      >
        {/* The same warm lift the site's dark sections carry, so a shared link
            and the page it opens read as one piece. */}
        <div
          style={{
            position: "absolute",
            top: -260,
            right: -160,
            width: 760,
            height: 760,
            borderRadius: 760,
            background: "radial-gradient(circle, rgba(255,236,196,0.13) 0%, rgba(17,17,17,0) 68%)",
            display: "flex",
          }}
        />

        {/* Satori renders this to a PNG at build time — there is no browser
            and no next/image loader involved, so the usual <Image> advice
            does not apply here. */}
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src={logo}
          width={252}
          height={88}
          alt=""
          style={{ objectFit: "contain" }}
        />

        <div style={{ display: "flex", flexDirection: "column" }}>
          <div
            style={{
              fontSize: 22,
              fontWeight: 400,
              letterSpacing: "0.26em",
              textTransform: "uppercase",
              color: "rgba(255,255,255,0.56)",
              display: "flex",
            }}
          >
            {eyebrow}
          </div>
          <div
            style={{
              fontSize: title.length > 46 ? 62 : 76,
              fontWeight: 600,
              letterSpacing: "-0.035em",
              lineHeight: 1.04,
              color: "#ffffff",
              marginTop: 24,
              display: "flex",
              maxWidth: 940,
            }}
          >
            {title}
          </div>
          {note && (
            <div
              style={{
                fontSize: 26,
                fontWeight: 400,
                lineHeight: 1.5,
                color: "rgba(255,255,255,0.62)",
                marginTop: 26,
                display: "flex",
                maxWidth: 820,
              }}
            >
              {note}
            </div>
          )}
        </div>

        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            borderTop: "1px solid rgba(255,255,255,0.18)",
            paddingTop: 26,
            fontSize: 21,
            color: "rgba(255,255,255,0.52)",
          }}
        >
          <div style={{ display: "flex" }}>Riyadh, Kingdom of Saudi Arabia</div>
          <div style={{ display: "flex" }}>Since 1976</div>
        </div>
      </div>
    ),
    { ...OG_SIZE, fonts }
  );
}
