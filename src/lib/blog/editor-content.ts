import { parseBlogBody } from "./content";
import { decodeRichBody, type RichNode } from "./rich-text";
function text(value: string): RichNode[] {
  return value.split(/(\*\*[^*]+\*\*)/g).filter(Boolean).flatMap(part => {
    const bold = part.startsWith("**") && part.endsWith("**");
    return (bold ? part.slice(2, -2) : part).split("\n").flatMap((line, i) => [ ...(i ? [{type: "hardBreak"}] : []), ...(line ? [{ type: "text", text: line, ...(bold ? {marks: [{type: "bold"}]} : {}) }] : []) ]);
  });
}
const paragraph = (value: string): RichNode => ({type: "paragraph", content: text(value)});
export function editorDocument(body: string): RichNode {
  const rich = decodeRichBody(body);
  if (rich) return rich;
  return { type: "doc", content: parseBlogBody(body).map(block => {
    if (block.kind === "heading") return {type: "heading", attrs: {level: block.level}, content: text(block.text)};
    if (block.kind === "quote") return {type: "blockquote", content: [paragraph(block.text)]};
    if (block.kind === "list") return {type: "bulletList", content: block.items.map(item => ({type: "listItem", content: [paragraph(item)]}))};
    if (block.kind === "image") return {type: "image", attrs: {src: block.src, alt: block.alt}};
    if (block.kind === "table") return {type: "table", content: [block.headers, ...block.rows].map((row, i) => ({type: "tableRow", content: row.map(cell => ({type: i ? "tableCell" : "tableHeader", content: [paragraph(cell)]}))}))};
    return paragraph(block.text);
  }).concat(body.trim() ? [] : [paragraph("")]) };
}
