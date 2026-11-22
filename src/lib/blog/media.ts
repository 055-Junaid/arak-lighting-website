import "server-only";
import { randomUUID } from "node:crypto";
import { mkdir, readFile, rm, writeFile } from "node:fs/promises";
import path from "node:path";
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
  let image: Buffer;
  try {
    image = await sharp(Buffer.from(await upload.arrayBuffer()), { limitInputPixels: 40_000_000 }).rotate().resize({ width: 2048, withoutEnlargement: true }).webp({ quality: 82 }).toBuffer();
  } catch { throw new Error("This image could not be opened. Try a different JPG, PNG, or WebP file."); }
  const filename = `${randomUUID()}.webp`;
  if (sharedBlogsEnabled()) {
    await sharedBlogStore().set(mediaKey(filename), new Uint8Array(image).buffer);
  } else {
    await mkdir(path.join(BLOG_DATA_DIR, "media"), { recursive: true, mode: 0o700 });
    await writeFile(mediaFile(filename), image, { mode: 0o600 });
  }
  return { filename, url: `/blog-media/${filename}` };
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

export async function removeBlogImage(filename: string) {
  if (sharedBlogsEnabled()) await sharedBlogStore().delete(mediaKey(filename));
  else await rm(mediaFile(filename), { force: true });
}
