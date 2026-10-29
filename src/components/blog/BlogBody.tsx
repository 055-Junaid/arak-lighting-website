import { Fragment } from "react";
import Image from "next/image";
import type { BlogBlock } from "@/lib/blog/content";
import type { BlogInline } from "@/lib/blog/rich-text";
import styles from "./Article.module.css";

function inline(text: string, rich?: BlogInline[]) {
  if (rich) return rich.map((part, i) => {
    let child = <Fragment>{part.text}</Fragment>;
    if (part.bold) child = <strong>{child}</strong>;
    if (part.italic) child = <em>{child}</em>;
    if (part.href) child = <a href={part.href} rel="noopener noreferrer">{child}</a>;
    return <Fragment key={i}>{child}</Fragment>;
  });
  return text.split(/(\*\*[^*]+\*\*)/g).map((part, i) => part.startsWith("**") && part.endsWith("**") ? <strong key={i}>{part.slice(2, -2)}</strong> : <Fragment key={i}>{part}</Fragment>);
}
// Raw HTML and unsupported Markdown remain plain text. Image paths are validated by the parser.
export function BlogBody({ blocks, articleId }: { blocks: BlogBlock[]; articleId: string }) {
  return <div className={styles.prose}>{blocks.map((block, i) => {
    if (block.kind === "heading") {
      const props = { id: `${articleId}-${block.id}`, tabIndex: -1 };
      return block.level === 2 ? <h2 key={i} {...props}>{inline(block.text, block.inline)}</h2> : <h3 key={i} {...props}>{inline(block.text, block.inline)}</h3>;
    }
    if (block.kind === "quote") return <blockquote key={i}>{inline(block.text, block.inline)}</blockquote>;
    if (block.kind === "list") return <ul key={i}>{block.items.map((item, j) => <li key={j}>{inline(item, block.richItems?.[j])}</li>)}</ul>;
    if (block.kind === "image") return <figure className={styles.figure} key={i}><div className={styles.inlineImage}><Image src={block.src} alt={block.alt} width={1600} height={1000} sizes="(max-width: 960px) 100vw, 850px" quality={60} unoptimized={block.src.startsWith("/blog-media/")} /></div>{block.alt && <figcaption>{block.alt}</figcaption>}</figure>;
    if (block.kind === "table") return <div className={styles.tableScroll} key={i} role="region" aria-label="Article table" tabIndex={0}><table><thead><tr>{block.headers.map((cell, j) => <th key={j} scope="col">{inline(cell, block.richHeaders?.[j])}</th>)}</tr></thead><tbody>{block.rows.map((row, j) => <tr key={j}>{row.map((cell, k) => <td key={k}>{inline(cell, block.richRows?.[j]?.[k])}</td>)}</tr>)}</tbody></table></div>;
    return <p key={i}>{inline(block.text, block.inline)}</p>;
  })}</div>;
}
