// Regenerates src/lib/og-assets.ts from the binaries in src/assets.
// Run after changing the OG card's fonts or wordmark:  node scripts/build-og-assets.mjs
import { readFile, writeFile } from "node:fs/promises";

const FILES = {
  SORA_REGULAR: "src/assets/fonts/Sora-Regular.ttf",
  SORA_SEMIBOLD: "src/assets/fonts/Sora-SemiBold.ttf",
  LOGO_WHITE: "src/assets/arak-logo-white-og.png",
};

const header = `/* GENERATED FILE — do not edit by hand.
 *
 * The Open Graph card's font and wordmark bytes, inlined as base64.
 *
 * They used to be read from src/assets with node:fs at render time. That works
 * under \`next build\`, but Cloudflare Workers have no filesystem: the deployed
 * worker resolved them to /bundle/src/assets/... and every card returned a 500.
 * Inlining puts them in the JS bundle, where the runtime can actually reach
 * them.
 *
 * Regenerate with scripts/build-og-assets.mjs after changing either asset.
 */

`;

let out = header;
for (const [name, path] of Object.entries(FILES)) {
  const buf = await readFile(path);
  out += `/** ${path.split("/").pop()} — ${buf.length.toLocaleString()} bytes */\nexport const ${name} =\n  "${buf.toString("base64")}";\n\n`;
}
out += `/** base64 -> bytes, using the Web API that exists in both Node and workerd. */
export function bytes(b64: string): ArrayBuffer {
  const bin = atob(b64);
  const buf = new Uint8Array(bin.length);
  for (let i = 0; i < bin.length; i++) buf[i] = bin.charCodeAt(i);
  return buf.buffer;
}
`;
await writeFile("src/lib/og-assets.ts", out);
console.log("src/lib/og-assets.ts regenerated");
