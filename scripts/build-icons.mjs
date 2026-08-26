/**
 * Cuts the raster icons from src/app/icon.svg, which holds the company mark —
 * the "A" traced off the logo, with the wordmark and the ™ dropped.
 *
 * WHAT IS PRODUCED
 * ----------------
 *   src/app/favicon.ico   16 / 32 / 48, the fallback for a browser that
 *                         cannot use the SVG in the tab
 *   src/app/apple-icon.png    180, iOS home screen
 *   public/icon-192.png       192, the manifest's small icon
 *   public/icon-512.png       512, the manifest's large icon
 *
 * The last two are named in src/app/manifest.ts; the rest are picked up by
 * Next from their filenames in src/app, which is why they live there rather
 * than in public.
 *
 * THE MARK IS NOT PUT ON A BACKGROUND — EXCEPT WHERE IT HAS TO BE
 * ---------------------------------------------------------------
 * In the tab it is the bare mark on nothing, and icon.svg switches it between
 * black and white so it stays visible whichever way the browser is themed.
 * The .ico cannot do that — the format has no way to ask about the theme — so
 * it is the black mark, and a browser old enough to fall back to it is a
 * browser old enough to have a light tab strip.
 *
 * The home screen icons are the exception: iOS composites a transparent icon
 * onto black, which would lose a black mark entirely, and Android is free to
 * put one on any wallpaper. Those two are drawn on white, which is where the
 * logo sits on everything else the company prints. They are also inset rather
 * than full-bleed, because both systems round the corners off.
 *
 * Run with: node scripts/build-icons.mjs
 */

import { readFile, writeFile } from "node:fs/promises";
import sharp from "sharp";

const SOURCE = "src/app/icon.svg";

/** The mark's own box, and its outline, lifted out of the SVG. */
const svg = await readFile(SOURCE, "utf8");
const path = svg.match(/<path[^>]*\sd="([^"]+)"/)[1];
const viewBox = svg.match(/viewBox="([^"]+)"/)[1];
const [, , boxWidth, boxHeight] = viewBox.split(/\s+/).map(Number);
const transform = svg.match(/transform="([^"]+)"/)?.[1] ?? "";

/**
 * The mark drawn in `ink` at `width` of a square, centred. `background` is
 * left out for the tab icon and set for the two home screen icons.
 */
function icon(size, { width, ink, background }) {
  const scale = (size * width) / boxWidth;
  const left = (size - boxWidth * scale) / 2;
  const top = (size - boxHeight * scale) / 2;
  const plate = background ? `<rect width="${size}" height="${size}" fill="${background}"/>` : "";

  return sharp(
    Buffer.from(
      `<svg xmlns="http://www.w3.org/2000/svg" width="${size}" height="${size}">${plate}` +
        `<g transform="translate(${left} ${top}) scale(${scale})">` +
        `<path fill-rule="evenodd" fill="${ink}" transform="${transform}" d="${path}"/>` +
        `</g></svg>`,
    ),
  ).png({ compressionLevel: 9 });
}

/**
 * Packs PNGs into an .ico. The format is a six-byte header, a sixteen-byte
 * directory entry per image, then the images themselves — and since Vista an
 * entry's payload may be a PNG rather than a bitmap, so the buffers go in
 * untouched.
 */
function ico(images) {
  const header = Buffer.alloc(6);
  header.writeUInt16LE(0, 0); // reserved
  header.writeUInt16LE(1, 2); // 1 = icon
  header.writeUInt16LE(images.length, 4);

  let offset = 6 + images.length * 16;
  const entries = images.map(({ size, data }) => {
    const entry = Buffer.alloc(16);
    entry.writeUInt8(size >= 256 ? 0 : size, 0); // 0 means 256
    entry.writeUInt8(size >= 256 ? 0 : size, 1);
    entry.writeUInt8(0, 2); // palette colours: none, this is truecolour
    entry.writeUInt8(0, 3); // reserved
    entry.writeUInt16LE(1, 4); // colour planes
    entry.writeUInt16LE(32, 6); // bits per pixel
    entry.writeUInt32LE(data.length, 8);
    entry.writeUInt32LE(offset, 12);
    offset += data.length;
    return entry;
  });

  return Buffer.concat([header, ...entries, ...images.map((i) => i.data)]);
}

/** Edge to edge: nothing rounds a tab icon's corners off, and the mark is
    wider than it is tall, so the width is what caps how big it can be drawn.
    This matches icon.svg, whose path already spans its whole viewBox.

    Black, which is icon.svg's own default. The .ico has no way to ask which
    theme it is on, so it cannot follow the tab strip the way the SVG does —
    it takes the light-strip colour, and only a browser too old for an SVG
    favicon ever sees it. */
const TAB = { width: 1, ink: "#000000" };
/** Black on the white the logo is normally printed on: these two are drawn
    over a wallpaper or a home screen, so they cannot be transparent and the
    mark cannot be white. Inset, but only enough to clear the corner rounding
    iOS and Android apply. */
const TILE = { width: 0.86, ink: "#000000", background: "#ffffff" };

const icoSizes = [16, 32, 48];
const packed = [];
for (const size of icoSizes) {
  packed.push({ size, data: await icon(size, TAB).toBuffer() });
}
await writeFile("src/app/favicon.ico", ico(packed));
console.log(`src/app/favicon.ico  (${icoSizes.join(", ")})`);

await icon(180, TILE).toFile("src/app/apple-icon.png");
console.log("src/app/apple-icon.png  (180)");

for (const size of [192, 512]) {
  await icon(size, TILE).toFile(`public/icon-${size}.png`);
  console.log(`public/icon-${size}.png  (${size})`);
}
