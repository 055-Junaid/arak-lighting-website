import "server-only";
import { randomUUID } from "node:crypto";
import { mkdir, readFile, rm, writeFile } from "node:fs/promises";
import path from "node:path";
import { purgeCache } from "@netlify/cache";
import sharp from "sharp";
import { assertBlogStorage, BLOG_DATA_DIR, sharedBlogsEnabled, sharedBlogStore } from "./storage";
import { MAX_BLOG_IMAGE_BYTES, MAX_BLOG_IMAGE_LABEL } from "./types";

const mediaKey = (filename: string) => `media/${filename}`;
const mediaFile = (filename: string) => path.join(BLOG_DATA_DIR, "media", filename);

// Both inline images and covers use the same server-side validation and re-encoding.
export async function saveUploadedBlogImage(upload: File) {
  assertBlogStorage();
  if (upload.size > MAX_BLOG_IMAGE_BYTES) throw new Error(`Choose an image smaller than ${MAX_BLOG_IMAGE_LABEL}.`);
  if (!["image/jpeg", "image/png", "image/webp"].includes(upload.type)) throw new Error("Choose a JPG, PNG, or WebP image.");
  return storeBlogImage(Buffer.from(await upload.arrayBuffer()), "This image could not be opened. Try a different JPG, PNG, or WebP file.");
}

// Decodes, strips metadata, resizes and re-encodes, so stored files are always plain WebP.
export async function storeBlogImage(input: Buffer, unreadable = "This image could not be opened.") {
  assertBlogStorage();
  let image: Buffer;
  let width: number;
  let height: number;
  try {
    // Decide by the bytes, not the file name or browser-reported type: sharp also
    // decodes SVG and HEIF, which this site never needs to accept.
    const { format } = await sharp(input, { limitInputPixels: 40_000_000 }).metadata();
    if (!["jpeg", "png", "webp", "gif"].includes(format || "")) throw new Error("unsupported");
    ({ data: image, info: { width, height } } = await sharp(input, { limitInputPixels: 40_000_000 }).rotate().resize({ width: 2048, withoutEnlargement: true }).webp({ quality: 82 }).toBuffer({ resolveWithObject: true }));
  } catch { throw new Error(unreadable); }
  const filename = `${randomUUID()}.webp`;
  if (sharedBlogsEnabled()) {
    await sharedBlogStore().set(mediaKey(filename), new Uint8Array(image).buffer);
  } else {
    await mkdir(path.join(BLOG_DATA_DIR, "media"), { recursive: true, mode: 0o700 });
    await writeFile(mediaFile(filename), image, { mode: 0o600 });
  }
  return { filename, url: `/blog-media/${filename}`, width, height };
}

export async function readBlogImage(filename: string): Promise<ArrayBuffer | null> {
  if (sharedBlogsEnabled()) return sharedBlogStore().get(mediaKey(filename), { type: "arrayBuffer" });
  try {
    const bytes = await readFile(mediaFile(filename));
    return new Uint8Array(bytes).buffer;
  } catch (error) {
    if ((error as NodeJS.ErrnoException).code === "ENOENT") return null;
    throw error;
  }
}

export const blogImageCacheTag = (filename: string) => `blog-media-${filename.replace(/\.webp$/, "")}`;

// Removes images from Netlify's CDN so one that stops being public is not served from cache.
export async function purgeBlogImages(urls: string[]) {
  if (!sharedBlogsEnabled() || !urls.length) return;
  await purgeCache({ tags: urls.map(url => blogImageCacheTag(url.replace("/blog-media/", ""))) });
}

export async function removeBlogImage(filename: string) {
  if (sharedBlogsEnabled()) await sharedBlogStore().delete(mediaKey(filename));
  else await rm(mediaFile(filename), { force: true });
}
