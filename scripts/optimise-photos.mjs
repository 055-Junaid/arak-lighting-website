/**
 * Caps the source photographs at the widest size the site will ever serve.
 *
 * next.config.ts stops `deviceSizes` at 2048, so no visitor is ever sent an
 * image wider than that. Several originals here are 2400–3400px. Those extra
 * pixels are never seen by anyone: whatever is optimising the image has to
 * read the whole source, decode it, scale it down and throw them away. A
 * 927KB source costs that much transfer and decode work to produce the same
 * output a 2048px source would.
 *
 * So the rule this enforces is simply: never store a source wider than the
 * widest width you are willing to serve.
 *
 * QUALITY
 * -------
 * q82 with mozjpeg, and no resize at all for anything already within bounds.
 * These are a lighting company's project photographs — the product is the
 * light, and the dark falloff and smooth wall-wash gradients are exactly what
 * shows compression artefacts first. 82 is chosen to stay clear of that;
 * it is not a byte-squeezing setting. A file is only rewritten if the result
 * is actually smaller, so re-running this never degrades an image twice.
 *
 * Originals are copied to _originals/ (gitignored) before anything is
 * overwritten, so the full-resolution photograph is always recoverable.
 *
 * A note on public/_headers: it marks these paths `immutable`, with a warning
 * not to replace an image in place. That warning is about changing the
 * *picture* — a viewer holding a cached copy would never see the new one.
 * Re-compression is not a content change; the old and new files show the same
 * photograph, so anyone still holding the old bytes simply keeps a slightly
 * larger version of the same image. New visitors get the smaller one.
 *
 * Run with: node scripts/optimise-photos.mjs
 */

import { existsSync, mkdirSync, copyFileSync, readdirSync, statSync, writeFileSync } from "node:fs";
import path from "node:path";
import sharp from "sharp";

/** Must not exceed the largest entry in `images.deviceSizes` in next.config.ts. */
const MAX_WIDTH = 2048;

/** High enough to keep gradients and dark falloff clean. */
const QUALITY = 82;

const root = process.cwd();
const mb = (n) => (n / 1024 / 1024).toFixed(2) + "MB";

function walk(dir) {
  return readdirSync(dir, { withFileTypes: true }).flatMap((entry) => {
    const full = path.join(dir, entry.name);
    return entry.isDirectory() ? walk(full) : [full];
  });
}

const photos = walk(path.join(root, "public")).filter((f) => /\.(jpg|jpeg)$/i.test(f));

let before = 0;
let after = 0;
let rewritten = 0;
let skipped = 0;

for (const file of photos) {
  const srcSize = statSync(file).size;
  before += srcSize;

  const rel = path.relative(path.join(root, "public"), file);
  const backup = path.join(root, "_originals", "public", rel);
  mkdirSync(path.dirname(backup), { recursive: true });
  if (!existsSync(backup)) copyFileSync(file, backup);

  const buffer = await sharp(backup)
    .resize({ width: MAX_WIDTH, withoutEnlargement: true })
    .jpeg({ quality: QUALITY, mozjpeg: true })
    .toBuffer();

  // Never rewrite a file to make it bigger.
  if (buffer.length >= srcSize) {
    after += srcSize;
    skipped++;
    continue;
  }

  writeFileSync(file, buffer);
  after += buffer.length;
  rewritten++;

  const meta = await sharp(backup).metadata();
  console.log(
    `  ${rel.padEnd(42)} ${String(meta.width).padStart(4)}px  ` +
      `${(srcSize / 1024).toFixed(0).padStart(4)}KB -> ${(buffer.length / 1024).toFixed(0).padStart(4)}KB`,
  );
}

console.log(
  `\n${photos.length} photos: ${rewritten} rewritten, ${skipped} already optimal\n` +
    `${mb(before)} -> ${mb(after)} (${(100 - (after / before) * 100).toFixed(0)}% smaller)`,
);
