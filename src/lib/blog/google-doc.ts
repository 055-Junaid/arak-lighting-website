// Converts the HTML that Google Docs exports ("Download > Web page") into the
// blog's rich document. Pure and dependency-light so it can be tested directly.
import { parse, type HTMLElement, type Node } from "node-html-parser";
import { GOOGLE_IMAGE_PREFIX, safeBlogLink, type RichMark, type RichNode } from "./rich-text";
export { GOOGLE_IMAGE_PREFIX };
export type GoogleDocImage = { name: string; alt: string; caption: string };
export type GoogleDocImport = {
  title: string;
  excerpt: string;
  locale: "en" | "ar";
  doc: RichNode;
  cover?: GoogleDocImage;
  images: string[];
  notes: string[];
};

const DOC_LINK = /^https:\/\/docs\.google\.com\/document\/(?:u\/\d+\/)?d\/([a-zA-Z0-9_-]{20,})(?:[/?#].*)?$/;
export function googleDocId(link: string) { return DOC_LINK.exec(link.trim())?.[1] || null; }
export const isGoogleDocImageName = (name: string) => /^images\/image\d{1,3}\.(png|jpe?g|gif|webp)$/.test(name);

type Style = { bold?: boolean; italic?: boolean; size?: number };
type Inline = { text: string; bold?: boolean; italic?: boolean; href?: string; size?: number };
// Paragraph-level item before titles, captions and the summary are picked out.
type Item =
  | { kind: "text"; tag: string; inline: Inline[]; text: string }
  | { kind: "image"; image: GoogleDocImage }
  | { kind: "list"; ordered: boolean; nested: boolean; items: Inline[][] }
  | { kind: "table"; rows: Inline[][][]; merged: boolean }
  | { kind: "blank" };

function stylesheet(root: HTMLElement) {
  const classes = new Map<string, Style>();
  const css = root.querySelectorAll("style").map(style => style.text).join("\n");
  for (const [, names, body] of css.matchAll(/((?:\.[a-zA-Z0-9_-]+\s*,?\s*)+)\{([^}]*)\}/g)) {
    const style = declarations(body);
    for (const name of names.split(",").map(part => part.trim().replace(/^\./, ""))) if (name && !name.includes(" ")) classes.set(name, { ...classes.get(name), ...style });
  }
  return classes;
}
function declarations(css: string): Style {
  const style: Style = {};
  const weight = /font-weight:\s*(\d+|bold|normal)/.exec(css)?.[1];
  if (weight) style.bold = weight === "bold" || Number(weight) >= 600;
  const fontStyle = /font-style:\s*(italic|normal)/.exec(css)?.[1];
  if (fontStyle) style.italic = fontStyle === "italic";
  const size = /font-size:\s*([\d.]+)pt/.exec(css)?.[1];
  if (size) style.size = Number(size);
  return style;
}

// Google wraps every link in a redirect: https://www.google.com/url?q=<real>&sa=…
function realLink(href: string | undefined) {
  if (!href) return undefined;
  try {
    const url = new URL(href);
    if (/^(www\.)?google\.com$/.test(url.hostname) && url.pathname === "/url" && url.searchParams.get("q")) href = url.searchParams.get("q")!;
  } catch { /* relative or malformed: checked below */ }
  return safeBlogLink(href) ? href : undefined;
}

const clean = (text: string) => text.replace(/[   ]/g, " ").replace(/[​-‍﻿]/g, "");
const plain = (inline: Inline[]) => inline.map(part => part.text).join("").replace(/\s+/g, " ").trim();
const elements = (node: Node) => node.childNodes.filter((child): child is HTMLElement => child.nodeType === 1);

function inlineParts(node: Node, classes: Map<string, Style>, inherited: Style & { href?: string } = {}): Inline[] {
  if (node.nodeType === 3) return [{ text: clean(node.text), ...inherited }];
  if (node.nodeType !== 1) return [];
  const element = node as HTMLElement;
  const tag = element.tagName.toLowerCase();
  if (tag === "br") return [{ text: "\n", ...inherited }];
  if (["img", "style", "script"].includes(tag)) return [];
  let style: Style & { href?: string } = { ...inherited };
  for (const name of (element.getAttribute("class") || "").split(/\s+/)) Object.assign(style, classes.get(name));
  Object.assign(style, declarations(element.getAttribute("style") || ""));
  if (tag === "b" || tag === "strong") style.bold = true;
  if (tag === "i" || tag === "em") style.italic = true;
  if (tag === "a") style = { ...style, href: realLink(element.getAttribute("href")) };
  return element.childNodes.flatMap(child => inlineParts(child, classes, style));
}

function images(element: HTMLElement): GoogleDocImage[] {
  return element.querySelectorAll("img").flatMap(img => {
    const name = img.getAttribute("src") || "";
    if (!isGoogleDocImageName(name)) return [];
    return [{ name, alt: clean(img.getAttribute("alt") || img.getAttribute("title") || "").trim().slice(0, 240), caption: "" }];
  });
}

function collect(root: HTMLElement, classes: Map<string, Style>): Item[] {
  const items: Item[] = [];
  const walk = (parent: HTMLElement) => {
    for (const element of elements(parent)) {
      const tag = element.tagName.toLowerCase();
      if (["div", "section", "article"].includes(tag)) { walk(element); continue; }
      if (tag === "ul" || tag === "ol") {
        const nested = /lst-kix_[a-z0-9]+-[1-9]/.test(element.getAttribute("class") || "");
        const listItems = elements(element).filter(li => li.tagName === "LI").map(li => trimInline(inlineParts(li, classes)));
        const previous = items.at(-1);
        // Google exports each nesting level as its own sibling list; keep them together.
        if (previous?.kind === "list" && nested) { previous.items.push(...listItems); previous.nested = true; }
        else items.push({ kind: "list", ordered: tag === "ol", nested, items: listItems });
        continue;
      }
      if (tag === "table") {
        const rows = element.querySelectorAll("tr").map(row => elements(row).filter(cell => ["TD", "TH"].includes(cell.tagName)));
        const merged = rows.some(row => row.some(cell => Number(cell.getAttribute("colspan") || 1) > 1 || Number(cell.getAttribute("rowspan") || 1) > 1));
        items.push({ kind: "table", merged, rows: rows.map(row => row.map(cell => trimInline(elements(cell).flatMap((block, i) => [...(i ? [{ text: "\n" }] : []), ...inlineParts(block, classes)])))) });
        continue;
      }
      if (tag === "hr" || tag === "style" || tag === "script") continue;
      for (const image of images(element)) items.push({ kind: "image", image });
      const inline = trimInline(inlineParts(element, classes));
      const text = plain(inline);
      if (text) items.push({ kind: "text", tag: element.classList.contains("title") ? "h1" : element.classList.contains("subtitle") ? "subtitle" : tag, inline, text });
      else if (!images(element).length) items.push({ kind: "blank" });
    }
  };
  walk(root.querySelector("body") || root);
  return items;
}

// Merge neighbours with the same formatting and drop the edge spaces Google leaves behind.
function trimInline(parts: Inline[]): Inline[] {
  const merged: Inline[] = [];
  for (const part of parts) {
    const last = merged.at(-1);
    if (last && !!last.bold === !!part.bold && !!last.italic === !!part.italic && last.href === part.href) last.text += part.text;
    else if (part.text) merged.push({ ...part });
  }
  for (const part of merged) part.text = part.text.replace(/[ \t]+/g, " ").replace(/ ?\n ?/g, "\n");
  while (merged.length && !merged[0].text.trim()) merged.shift();
  while (merged.length && !merged.at(-1)!.text.trim()) merged.pop();
  if (merged.length) { merged[0].text = merged[0].text.trimStart(); merged[merged.length - 1].text = merged.at(-1)!.text.trimEnd(); }
  return merged;
}

function richText(inline: Inline[], { keepBold = true } = {}): RichNode[] {
  return inline.flatMap(part => part.text.split("\n").flatMap((line, i): RichNode[] => {
    const marks: RichMark[] = [];
    if (part.bold && keepBold) marks.push({ type: "bold" });
    if (part.italic) marks.push({ type: "italic" });
    if (part.href) marks.push({ type: "link", attrs: { href: part.href } });
    return [...(i ? [{ type: "hardBreak" }] : []), ...(line ? [{ type: "text", text: line, ...(marks.length ? { marks } : {}) }] : [])];
  }));
}
const paragraph = (inline: Inline[], options?: { keepBold?: boolean }): RichNode => ({ type: "paragraph", content: richText(inline, options) });
const allItalic = (inline: Inline[]) => inline.filter(part => part.text.trim()).every(part => part.italic);
const allBold = (inline: Inline[]) => inline.filter(part => part.text.trim()).every(part => part.bold);
const largest = (inline: Inline[]) => Math.max(0, ...inline.filter(part => part.text.trim()).map(part => part.size || 0));
const CONTACT_MARKER = /^[([]?\s*(?:add|insert|place)?\s*(?:a|the)?\s*(?:contact(?:\s+us)?|cta|call[\s-]to[\s-]action)\s+button\s*(?:here)?\s*[)\]]?\.?$/i;
const short = (text: string) => text.length > 70 ? `${text.slice(0, 67)}…` : text;

export function convertGoogleDocHtml(html: string): GoogleDocImport {
  const root = parse(html, { comment: false, blockTextElements: { style: true, script: false } });
  const classes = stylesheet(root);
  const items = collect(root, classes);
  const notes: string[] = [];
  const content: RichNode[] = [];
  const bodyImages: GoogleDocImage[] = [];
  let title = "";
  let excerpt = "";
  let cover: GoogleDocImage | undefined;
  let lastImage: GoogleDocImage | undefined;
  let headingSeen = false;
  const promoted: string[] = [];

  for (let index = 0; index < items.length; index++) {
    const item = items[index];
    if (item.kind === "blank") continue;
    if (item.kind === "image") {
      lastImage = item.image;
      if (!title && !cover) cover = item.image;
      else { bodyImages.push(item.image); content.push({ type: "image", attrs: { src: GOOGLE_IMAGE_PREFIX + item.image.name, alt: item.image.alt, caption: "" } }); }
      continue;
    }
    const image = lastImage;
    lastImage = undefined;
    if (item.kind === "list") {
      if (item.ordered) notes.push("A numbered list was imported as bullet points, which is the only list style the blog uses.");
      if (item.nested) notes.push("A list with indented sub-points was flattened into one level.");
      content.push({ type: "bulletList", content: item.items.filter(inline => plain(inline)).map(inline => ({ type: "listItem", content: [paragraph(inline)] })) });
      continue;
    }
    if (item.kind === "table") {
      const width = item.rows[0]?.length || 0;
      if (item.merged || width < 2 || width > 8 || item.rows.some(row => row.length !== width)) {
        notes.push(`A table ${item.merged ? "with merged cells" : `with ${width} column${width === 1 ? "" : "s"}`} cannot be shown as a table on the website, so its cells were imported as paragraphs.`);
        for (const row of item.rows) for (const cell of row) if (plain(cell)) content.push(paragraph(cell));
        continue;
      }
      content.push({ type: "table", content: item.rows.map((row, r) => ({ type: "tableRow", content: row.map(cell => ({ type: r ? "tableCell" : "tableHeader", content: [paragraph(cell, { keepBold: r > 0 })] })) })) });
      continue;
    }
    // Text: a short italic line right under an image is that image's caption.
    if (image && item.text.length <= 240 && allItalic(item.inline)) {
      image.caption = item.text;
      if (!image.alt) image.alt = item.text.slice(0, 240);
      const node = content.findLast(node => node.type === "image" && node.attrs?.src === GOOGLE_IMAGE_PREFIX + image.name);
      if (node) node.attrs = { ...node.attrs, alt: image.alt, caption: image.caption };
      continue;
    }
    if (CONTACT_MARKER.test(item.text)) { content.push({ type: "contactButton" }); continue; }
    if (!title && (item.tag === "h1" || /^h[2-6]$/.test(item.tag))) { title = item.text.slice(0, 160); continue; }
    if (item.tag === "subtitle" && !excerpt) { excerpt = item.text; continue; }
    const looksLikeHeading = item.tag === "p" && item.text.length <= 150 && allBold(item.inline) && largest(item.inline) >= 14 && !/[.:]$/.test(item.text);
    if (/^h[1-6]$/.test(item.tag) || looksLikeHeading) {
      if (looksLikeHeading) promoted.push(item.text);
      headingSeen = true;
      content.push({ type: "heading", attrs: { level: /^h[34]$/.test(item.tag) ? 3 : 2 }, content: richText(item.inline, { keepBold: false }) });
      continue;
    }
    // The first paragraph after the title is the article's introduction.
    if (title && !excerpt && !headingSeen && !content.length && item.text.length <= 320) { excerpt = item.text; continue; }
    content.push(paragraph(item.inline));
  }

  if (!title) notes.push("No title was found. Give the title in the doc the Heading 1 or Title style, or type it in the editor.");
  if (!excerpt) notes.push("No short introduction was found. The first paragraph under the title becomes the introduction when it is under 320 characters. Add one in the editor.");
  if (!cover) {
    cover = bodyImages[0];
    if (cover) notes.push("The doc has no image above the title, so the first image in the article was also used as the cover photo. Change it in the editor if needed.");
    else notes.push("The doc has no images. Add a cover photo in the editor before publishing.");
  }
  for (const text of promoted) notes.push(`"${short(text)}" is formatted as large bold text in the doc rather than as a heading. It was imported as a section heading. Set it to Heading 2 in the doc so future imports match.`);
  const undescribed = [...(cover && !cover.alt ? [cover] : []), ...bodyImages.filter(image => !image.alt)].length;
  if (undescribed) notes.push(`${undescribed} image${undescribed === 1 ? " has" : "s have"} no description for screen readers and search engines. Add one in the editor (click the image, then Edit image), or in Google Docs with right-click > Alt text.`);
  const allText = [title, excerpt, ...items.flatMap(item => item.kind === "text" ? [item.text] : [])].join("\n");
  const dashes = allText.match(/—/g)?.length || 0;
  if (dashes) notes.push(`The text contains ${dashes} em dash${dashes === 1 ? "" : "es"} (—). The website style avoids them; replace each with a comma, colon or parentheses before publishing.`);
  const leftovers = items.flatMap(item => item.kind === "text" && /^\(.*(add|insert|place|todo|tbd).*\)$/i.test(item.text) && !CONTACT_MARKER.test(item.text) ? [item.text] : []);
  for (const text of leftovers) notes.push(`The doc contains the note "${short(text)}". It was imported as text; delete it or replace it in the editor.`);
  if (content.some(node => node.type === "contactButton")) notes.push("The \"(add contact button)\" note was turned into a contact button that links to the contact page.");

  const ar = /[؀-ۿ]/.test(title || excerpt);
  return {
    title, excerpt: excerpt.slice(0, 320), locale: ar ? "ar" : "en",
    doc: { type: "doc", content: content.length ? content : [{ type: "paragraph" }] },
    cover, images: [...new Set([...(cover ? [cover.name] : []), ...bodyImages.map(image => image.name)])], notes: [...new Set(notes)],
  };
}
