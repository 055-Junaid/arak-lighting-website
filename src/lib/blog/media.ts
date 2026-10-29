import "server-only";
import { randomUUID } from "node:crypto";
import { mkdir, writeFile } from "node:fs/promises";
import path from "node:path";
import sharp from "sharp";
import { assertLocalBlogs, BLOG_DATA_DIR } from "./storage";

// Both inline images and covers use the same server-side validation and re-encoding.
export async function saveUploadedBlogImage(upload: File) {
  assertLocalBlogs();
  if (upload.size > 5 * 1024 * 1024) throw new Error("Choose an image smaller than 5 MB.");
  if (!["image/jpeg", "image/png", "image/webp"].includes(upload.type)) throw new Error("Choose a JPG, PNG, or WebP image.");
  let image: Buffer;
  try {
    image = await sharp(Buffer.from(await upload.arrayBuffer()), { limitInputPixels: 40_000_000 }).rotate().resize({ width: 2048, withoutEnlargement: true }).webp({ quality: 82 }).toBuffer();
  } catch { throw new Error("This image could not be opened. Try a different JPG, PNG, or WebP file."); }
  await mkdir(path.join(BLOG_DATA_DIR, "media"), { recursive: true, mode: 0o700 });
  const filename = `${randomUUID()}.webp`;
  const file = path.join(BLOG_DATA_DIR, "media", filename);
  await writeFile(file, image, { mode: 0o600 });
  return { file, url: `/blog-media/${filename}` };
}
