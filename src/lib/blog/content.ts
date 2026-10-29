import { decodeRichBody, isBlogImagePath, richInline, richNodeText, type BlogInline, type RichNode } from "./rich-text";
export { isBlogImagePath } from "./rich-text";
// Shared by the renderer, contents navigation, and uploaded-media access checks.
export type BlogBlock =
  | { kind: "heading"; level: 2 | 3; text: string; inline?: BlogInline[]; id: string }
  | { kind: "paragraph" | "quote"; text: string; inline?: BlogInline[] }
  | { kind: "list"; items: string[]; richItems?: BlogInline[][] }
  | { kind: "image"; src: string; alt: string }
  | { kind: "table"; headers: string[]; rows: string[][]; richHeaders?: BlogInline[][]; richRows?: BlogInline[][][] };
export type BlogSection = { id: string; text: string };

const cells = (row: string) => row.trim().replace(/^\|/, "").replace(/\|$/, "").split("|").map(cell => cell.trim());

function richBlocks(doc: RichNode): BlogBlock[] {
  return (doc.content || []).flatMap((node, index): BlogBlock[] => {
    const text = richNodeText(node);
    if (node.type === "heading") return [{ kind: "heading", level: node.attrs?.level === 3 ? 3 : 2, text, inline: richInline(node.content), id: `section-${index + 1}` }];
    if (node.type === "image") {
      const src = node.attrs?.src;
      return typeof src === "string" && isBlogImagePath(src) ? [{ kind: "image", src, alt: typeof node.attrs?.alt === "string" ? node.attrs.alt : "" }] : [];
    }
    if (node.type === "bulletList") return [{ kind: "list", items: (node.content || []).map(richNodeText), richItems: (node.content || []).map(item => richInline(item.content)) }];
    if (node.type === "table") {
      const rows = (node.content || []).map(row => row.content || []);
      const width = rows[0]?.length || 0;
      if (width < 2 || width > 8 || rows.some(row => row.length !== width)) return [{kind: "paragraph", text}];
      return [{ kind: "table", headers: rows[0].map(richNodeText), rows: rows.slice(1).map(row => row.map(richNodeText)), richHeaders: rows[0].map(cell => richInline(cell.content)), richRows: rows.slice(1).map(row => row.map(cell => richInline(cell.content))) }];
    }
    return [{ kind: node.type === "blockquote" ? "quote" : "paragraph", text, inline: richInline(node.content) }];
  });
}
export function parseBlogBody(body: string): BlogBlock[] {
  const rich = decodeRichBody(body);
  if (rich) return richBlocks(rich);
  return body.replace(/\r\n/g, "\n").split(/\n\s*\n/).filter(Boolean).map((raw, index): BlogBlock => {
    const block = raw.trim();
    const heading = /^(#{2,3})\s+([^\n]+)$/.exec(block);
    if (heading) return { kind: "heading", level: heading[1].length as 2 | 3, text: heading[2], id: `section-${index + 1}` };
    const image = /^!\[([^\]\n]*)\]\(([^\s)]+)\)$/.exec(block);
    if (image && isBlogImagePath(image[2])) return { kind: "image", alt: image[1], src: image[2] };
    if (block.startsWith("> ")) return { kind: "quote", text: block.replace(/^> ?/gm, "") };
    const lines = block.split("\n");
    if (lines.every(line => line.startsWith("- "))) return { kind: "list", items: lines.map(line => line.slice(2)) };
    if (lines.length >= 3 && lines[0].includes("|") && cells(lines[1]).every(cell => /^:?-{3,}:?$/.test(cell))) {
      const headers = cells(lines[0]);
      const rows = lines.slice(2).map(cells);
      if (headers.length > 1 && headers.length <= 8 && cells(lines[1]).length === headers.length && rows.every(row => row.length === headers.length)) return { kind: "table", headers, rows };
    }
    return { kind: "paragraph", text: block };
  });
}
export function articleSections(blocks: BlogBlock[]): BlogSection[] {
  return blocks.flatMap(block => block.kind === "heading" && block.level === 2 ? [{ id: block.id, text: block.text.replace(/\*\*/g, "") }] : []);
}
export function postUsesMedia(post: { cover: string; body: string }, url: string) {
  return post.cover === url || parseBlogBody(post.body).some(block => block.kind === "image" && block.src === url);
}
