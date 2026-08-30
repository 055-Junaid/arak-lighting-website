/**
 * Prepares the AI-generated imagery in public/generated/ for the repository.
 *
 * This is a sibling to optimise-photos.mjs rather than part of it. That script
 * encodes one doctrine — these are photographs, JPEG at q82, never resize past
 * 2048 — and the generated set breaks two of its assumptions:
 *
 *   1. Half of it is flat diagram art, not photography. Line work and set text
 *      on a plain ground is the one thing JPEG is worst at: q82 puts visible
 *      ringing along every rule and letter edge. Those files want PNG with a
 *      quantised palette, which is lossless spatially and only reduces colour
 *      depth — on art that holds a dozen colours to begin with, that is a 90%+
 *      saving for no visible change at all.
 *
 *   2. The extensions lie. As they came off the fal.ai run, eight files ending
 *      .jpg hold PNG data and four ending .png are photographic composites.
 *      Nothing was broken by that — Next and every browser sniff the content
 *      and ignore the name — but it means neither the name nor the old
 *      extension can be trusted to pick an encoder.
 *
 * So the encoder is chosen from the image itself. Shannon entropy separates the
 * two populations cleanly and with a wide margin: the flat diagrams measure
 * 2.0-3.9, the photographic frames 6.9-7.4. Nothing sits near the boundary, so
 * the threshold below is not a fine judgement call.
 *
 * Files are renamed to match what they actually contain, and the script prints
 * the renames as a list for src/lib/service-details.ts, which holds every
 * reference to these paths (and is the only place that does).
 *
 * Originals are copied to _originals/ (gitignored) before anything is
 * overwritten, and a file is only replaced if the result is genuinely smaller,
 * so re-running this never degrades an image twice.
 *
 * Run with: node scripts/optimise-generated.mjs
 */

import { existsSync, mkdirSync, copyFileSync, readdirSync, statSync, writeFileSync, rmSync } from "node:fs";
import path from "node:path";
import sharp from "sharp";

/** Must not exceed the largest entry in `images.deviceSizes` in next.config.ts. */
const MAX_WIDTH = 2048;

/** Matches optimise-photos.mjs. High enough to keep gradients and dark falloff clean. */
const JPEG_QUALITY = 82;

/**
 * Below this, an image is flat art and is stored as a quantised PNG; above it,
 * the image is photographic and is stored as JPEG. Measured entropy on this set
 * lands at 2.0-3.9 and 6.9-7.4, so anything in the middle is a new kind of
 * image and worth looking at by eye before trusting the choice made here.
 */
const FLAT_ART_ENTROPY = 5;

/** Enough for line work and anti-aliased text; far more than the art actually uses. */
const PALETTE_COLOURS = 128;

const root = process.cwd();
const dir = path.join(root, "public", "generated");
const mb = (n) => (n / 1024 / 1024).toFixed(2) + "MB";

function walk(d) {
  return readdirSync(d, { withFileTypes: true }).flatMap((entry) => {
    const full = path.join(d, entry.name);
    return entry.isDirectory() ? walk(full) : [full];
  });
}

const files = walk(dir).filter((f) => /\.(jpg|jpeg|png)$/i.test(f));

let before = 0;
let after = 0;
const renames = [];

for (const file of files) {
  const srcSize = statSync(file).size;
  before += srcSize;

  const rel = path.relative(path.join(root, "public"), file);
  const backup = path.join(root, "_originals", "public", rel);
  mkdirSync(path.dirname(backup), { recursive: true });
  if (!existsSync(backup)) copyFileSync(file, backup);

  const pipeline = sharp(backup).resize({ width: MAX_WIDTH, withoutEnlargement: true });
  const { entropy } = await sharp(backup).stats();
  const flat = entropy < FLAT_ART_ENTROPY;

  const buffer = flat
    ? await pipeline.png({ palette: true, colours: PALETTE_COLOURS, effort: 10 }).toBuffer()
    : await pipeline.jpeg({ quality: JPEG_QUALITY, mozjpeg: true }).toBuffer();

  const wantExt = flat ? ".png" : ".jpg";
  const target = file.replace(/\.(jpg|jpeg|png)$/i, wantExt);
  const renamed = target !== file;

  // Never rewrite a file to make it bigger — but a rename still has to happen
  // if the extension was wrong, so carry the original bytes over to the new name.
  const keep = buffer.length < srcSize;
  if (!keep && !renamed) {
    after += srcSize;
    continue;
  }

  writeFileSync(target, keep ? buffer : Buffer.from(await sharp(backup).toBuffer()));
  if (renamed) {
    rmSync(file);
    renames.push([
      "/" + path.relative(path.join(root, "public"), file),
      "/" + path.relative(path.join(root, "public"), target),
    ]);
  }
  after += statSync(target).size;

  console.log(
    `  ${rel.padEnd(50)} ${flat ? "flat " : "photo"} ` +
      `${(srcSize / 1024).toFixed(0).padStart(5)}KB -> ${(statSync(target).size / 1024).toFixed(0).padStart(5)}KB` +
      `${renamed ? "  renamed " + path.extname(target) : ""}`,
  );
}

console.log(
  `\n${files.length} files: ${mb(before)} -> ${mb(after)} ` +
    `(${(100 - (after / before) * 100).toFixed(0)}% smaller)`,
);

if (renames.length) {
  console.log(`\n${renames.length} renames to apply in src/lib/service-details.ts:`);
  for (const [from, to] of renames) console.log(`  ${from}\n    -> ${to}`);
}
