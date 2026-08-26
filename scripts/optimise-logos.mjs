/**
 * Converts the logo walls (clients, brands, vendors) from PNG to WebP and
 * fits them to the size they are actually drawn at.
 *
 * WHY THESE ARE NOT LEFT TO next/image
 * -----------------------------------
 * Every /_next/image request is a function invocation that reads the source,
 * decodes it and re-encodes it. That is a fair trade for a 2560px project
 * photograph. It is a bad trade for a logo, where the source is already small
 * and the transform saves almost nothing — the home page carries 84 of them,
 * so it was paying 84 invocations to shave a few KB in total.
 *
 * A plain file under /clients, /brands or /vendors skips all of that: it is
 * served straight from the CDN as a static asset, on the long-lived
 * Cache-Control public/_headers gives it.
 *
 * The marks are therefore pre-sized here, once, at commit time, and rendered
 * with `unoptimized` so they are served as files rather than transformed.
 *
 * SIZING
 * ------
 * LogoGrid.module.css gives every mark a 48px band, and the grid cell caps the
 * width near 130px. FIT_HEIGHT/FIT_WIDTH below are those bounds at 3x, which
 * covers the densest screens anyone brings to this site. `withoutEnlargement`
 * means a mark that is already smaller than the box is left at its own size
 * rather than being blown up.
 *
 * SVG marks are skipped: they are vectors, they resize for free, and they are
 * already served untouched.
 *
 * Originals are copied to _originals/ (gitignored) before the PNG is removed,
 * so a mark can always be regenerated at a different size.
 *
 * Run with: node scripts/optimise-logos.mjs
 */

import { existsSync, mkdirSync, copyFileSync, readdirSync, statSync, unlinkSync } from "node:fs";
import path from "node:path";
import sharp from "sharp";

const DIRS = ["clients", "brands", "vendors"];

/** The 48px logo band and ~130px cell width, at 3x device pixel ratio. */
const FIT_HEIGHT = 144;
const FIT_WIDTH = 390;

/** High enough that flat brand colour and thin lettering stay clean. */
const QUALITY = 82;

const root = process.cwd();
const kb = (n) => (n / 1024).toFixed(1) + "KB";

let before = 0;
let after = 0;
let count = 0;

for (const dir of DIRS) {
  const publicDir = path.join(root, "public", dir);
  if (!existsSync(publicDir)) continue;

  const backupDir = path.join(root, "_originals", "public", dir);
  mkdirSync(backupDir, { recursive: true });

  for (const file of readdirSync(publicDir).sort()) {
    if (!file.endsWith(".png")) continue;

    const src = path.join(publicDir, file);
    const out = src.replace(/\.png$/, ".webp");
    const srcSize = statSync(src).size;

    const backup = path.join(backupDir, file);
    if (!existsSync(backup)) copyFileSync(src, backup);

    await sharp(backup)
      .resize({ height: FIT_HEIGHT, width: FIT_WIDTH, fit: "inside", withoutEnlargement: true })
      .webp({ quality: QUALITY, effort: 6 })
      .toFile(out);

    const outSize = statSync(out).size;
    unlinkSync(src);

    before += srcSize;
    after += outSize;
    count++;
    console.log(`  ${dir}/${file.padEnd(30)} ${kb(srcSize).padStart(8)} -> ${kb(outSize).padStart(8)}`);
  }
}

console.log(
  `\n${count} marks: ${kb(before)} of PNG -> ${kb(after)} of WebP ` +
    `(${(100 - (after / before) * 100).toFixed(0)}% smaller, and no longer transformed at request time)`,
);
