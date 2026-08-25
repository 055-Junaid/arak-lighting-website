import { ImageResponse } from "next/og";
import { readFile } from "node:fs/promises";
import { join } from "node:path";

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

const asset = (file: string) => join(process.cwd(), "src/assets", file);

/**
 * Satori reads font data through a DataView, which rejects a Node Buffer —
 * it needs the underlying ArrayBuffer, sliced to the Buffer's own view so a
 * pooled allocation does not hand over its neighbours' bytes too.
 */
const toArrayBuffer = (b: Buffer): ArrayBuffer =>
  b.buffer.slice(b.byteOffset, b.byteOffset + b.byteLength) as ArrayBuffer;

/**
 * Satori needs real font binaries — it cannot use next/font, whose output is
 * hashed woff2 that only the browser ever sees. These two are static
 * instances cut from the Sora variable font, so the card is set in the same
 * face as the site's headings.
 */
async function brandFonts() {
  const [regular, semibold] = await Promise.all([
    readFile(asset("fonts/Sora-Regular.ttf")),
    readFile(asset("fonts/Sora-SemiBold.ttf")),
  ]);
  return [
    { name: "Sora", data: toArrayBuffer(regular), weight: 400 as const, style: "normal" as const },
    { name: "Sora", data: toArrayBuffer(semibold), weight: 600 as const, style: "normal" as const },
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
  const [fonts, logoBytes] = await Promise.all([
    brandFonts(),
    readFile(asset("arak-logo-white-og.png")),
  ]);
  // Satori resolves `src` as a string; a Buffer is not a source it accepts.
  const logo = `data:image/png;base64,${logoBytes.toString("base64")}`;

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
