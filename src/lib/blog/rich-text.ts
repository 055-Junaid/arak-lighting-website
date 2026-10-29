// A small, versioned document format shared by the editor and safe public renderer.
// Existing Markdown articles remain supported; new edits store structured content.
export type RichMark = { type: string; attrs?: { href?: string } };
export type RichNode = { type: string; text?: string; attrs?: Record<string, unknown>; marks?: RichMark[]; content?: RichNode[] };
export const RICH_BODY_PREFIX = "ARAK-DOCUMENT-1\n";
export function isBlogImagePath(src: string) { return /^\/((blog-media|home|projects|services|generated)\/[a-zA-Z0-9/_-]+\.(jpg|jpeg|png|webp))$/.test(src); }
export function safeBlogLink(href: string) {
  if (/^\/(?!\/)[^\s\\]*$/.test(href) || /^#[a-zA-Z0-9_-]+$/.test(href)) return true;
  try { const url = new URL(href); return ["https:", "http:", "mailto:"].includes(url.protocol) && !/[\s\x00-\x1f]/.test(href); } catch { return false; }
}
export function decodeRichBody(body: string): RichNode | null {
  body = body.replace(/\r\n/g, "\n");
  if (!body.startsWith(RICH_BODY_PREFIX)) return null;
  try {
    const doc = JSON.parse(body.slice(RICH_BODY_PREFIX.length));
    let count = 0;
    function valid(node: RichNode, depth = 0): boolean {
      if (!node || typeof node !== "object" || typeof node.type !== "string" || ++count > 10000 || depth > 30) return false;
      if (node.text !== undefined && typeof node.text !== "string") return false;
      if (node.attrs !== undefined && (!node.attrs || typeof node.attrs !== "object" || Array.isArray(node.attrs))) return false;
      if (node.marks !== undefined && (!Array.isArray(node.marks) || !node.marks.every(mark => mark && typeof mark.type === "string" && (mark.attrs === undefined || (mark.attrs && typeof mark.attrs === "object"))))) return false;
      return node.content === undefined || (Array.isArray(node.content) && node.content.every(child => valid(child, depth + 1)));
    }
    return doc.type === "doc" && valid(doc) ? doc : null;
  } catch { return null; }
}
export function encodeRichBody(doc: RichNode) { return RICH_BODY_PREFIX + JSON.stringify(doc); }
export function richNodeText(node: RichNode): string {
  if (node.type === "text") return node.text || "";
  if (node.type === "hardBreak") return "\n";
  return (node.content || []).map(richNodeText).join(["doc", "bulletList", "listItem", "blockquote", "table", "tableRow"].includes(node.type) ? "\n" : "");
}
export function blogBodyText(body: string) { const doc = decodeRichBody(body); return doc ? richNodeText(doc) : body; }
export type BlogInline = { text: string; bold?: boolean; italic?: boolean; href?: string };
export function richInline(nodes: RichNode[] = []): BlogInline[] {
  return nodes.flatMap((node, index) => {
    if (node.type === "hardBreak") return [{ text: "\n" }];
    if (node.type !== "text") return [...(index && ["paragraph", "heading", "listItem", "bulletList", "blockquote"].includes(node.type) ? [{text: "\n"}] : []), ...richInline(node.content)];
    const link = node.marks?.find(mark => mark.type === "link")?.attrs?.href;
    return [{ text: node.text || "", bold: node.marks?.some(mark => mark.type === "bold"), italic: node.marks?.some(mark => mark.type === "italic"), href: typeof link === "string" && safeBlogLink(link) ? link : undefined }];
  });
}
