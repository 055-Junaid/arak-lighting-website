// Read-only integration checks against the local development server.
// Run from the checkout: node scripts/check-blog-access.mjs http://127.0.0.1:3010
import assert from "node:assert/strict";
import { readFile } from "node:fs/promises";
import { createHmac } from "node:crypto";
const origin = process.argv[2] || "http://127.0.0.1:3010";
if (!["localhost", "127.0.0.1", "[::1]"].includes(new URL(origin).hostname)) throw new Error("These checks are for a local server only.");
const get = (route, cookie) => fetch(new URL(route, origin), { redirect: "manual", headers: cookie ? { Cookie: `arak-blog-team=${cookie}` } : {} });
const listing = await get("/blogs");
assert.equal(listing.status, 200, "Public blog listing loads");
assert.equal((await get("/ar/blogs")).status, 200, "Arabic blog listing loads");
for (const route of ["/team/blogs", "/team/blogs/new", "/team/blogs/unknown/preview"]) {
  const response = await get(route);
  assert.equal(response.status, 307, `${route} requires sign-in`);
  assert.equal(response.headers.get("location"), "/team/login");
}
assert.equal((await get("/blogs/unknown-access-check")).status, 404);
assert.match(await (await get("/team/login")).text(), /noindex/);
assert.equal((await get("/blog-media/00000000-0000-0000-0000-000000000000.webp")).status, 404);
let posts = [];
try { posts = JSON.parse(await readFile(".blog-data/posts.json", "utf8")); } catch (error) { if (error.code !== "ENOENT") throw error; }
for (const post of posts.filter(p => !p.sample)) {
  const route = `${post.locale === "ar" ? "/ar" : ""}/blogs/${post.slug}`;
  assert.equal((await get(route)).status, post.status === "published" ? 200 : 404, `Article visibility: ${post.slug}`);
  const inlineImages = article => {
    const body = article.body.replace(/\r\n/g, "\n");
    if (!body.startsWith("ARAK-DOCUMENT-1\n")) return Array.from(body.matchAll(/^!\[[^\]\n]*\]\((\/blog-media\/[a-f0-9-]{36}\.webp)\)$/gm), match => match[1]);
    const images = [];
    const visit = node => { if (node.type === "image" && /^\/blog-media\/[a-f0-9-]{36}\.webp$/.test(node.attrs?.src)) images.push(node.attrs.src); for (const child of node.content || []) visit(child); };
    visit(JSON.parse(body.slice("ARAK-DOCUMENT-1\n".length)));
    return images;
  };
  const images = [...new Set([post.cover, ...inlineImages(post)])].filter(src => src.startsWith('/blog-media/'));
  for (const image of images) {
    const sharedWithPublished = posts.some(p => p.status === "published" && (p.cover === image || inlineImages(p).includes(image)));
    assert.equal((await get(image)).status, sharedWithPublished ? 200 : 404, `Cover/inline image visibility: ${post.slug}`);
  }
}
let team;
try { team = JSON.parse(await readFile(".blog-data/team.json", "utf8")); } catch (error) { if (error.code !== "ENOENT") throw error; }
if (team?.members.length) {
  const member = team.members[0];
  const token = expires => {
    const payload = Buffer.from(JSON.stringify({ email: member.email, version: createHmac("sha256", team.secret).update(member.hash).digest("hex"), expires })).toString("base64url");
    return `${payload}.${createHmac("sha256", team.secret).update(payload).digest("base64url")}`;
  };
  assert.equal((await get("/team/blogs", token(Date.now() + 60000))).status, 200, "Approved session is accepted");
  assert.equal((await get("/team/blogs", token(Date.now() - 1000))).status, 307, "Expired session is rejected");
  assert.equal((await get("/team/blogs", `${token(Date.now() + 60000)}tampered`)).status, 307, "Tampered session is rejected");
}
console.log("Blog access checks passed: public routes, private routes, draft/media visibility, and session validation.");
