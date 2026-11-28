"use client";
import { useState } from "react";
import Link from "next/link";
import { createImportedDraftAction, importGoogleDocImageAction, readGoogleDocAction } from "@/lib/blog/google-doc-actions";
import { encodeRichBody, GOOGLE_IMAGE_PREFIX, type RichNode } from "@/lib/blog/rich-text";
import shared from "./Blogs.module.css";
import styles from "./Team.module.css";

type Phase = { step: "idle" } | { step: "reading" } | { step: "images"; done: number; total: number } | { step: "saving" } | { step: "done"; id: string; title: string; notes: string[] };

function withImages(node: RichNode, urls: Map<string, string>): RichNode {
  const src = node.attrs?.src;
  const attrs = node.type === "image" && typeof src === "string" && src.startsWith(GOOGLE_IMAGE_PREFIX) ? { ...node.attrs, src: urls.get(src.slice(GOOGLE_IMAGE_PREFIX.length)) } : node.attrs;
  return { ...node, ...(attrs ? { attrs } : {}), ...(node.content ? { content: node.content.map(child => withImages(child, urls)) } : {}) };
}

export function GoogleDocImport() {
  const [link, setLink] = useState("");
  const [phase, setPhase] = useState<Phase>({ step: "idle" });
  const [error, setError] = useState("");
  const busy = phase.step === "reading" || phase.step === "images" || phase.step === "saving";

  async function start(event: React.FormEvent) {
    event.preventDefault();
    if (busy) return;
    setError("");
    try {
      setPhase({ step: "reading" });
      const read = await readGoogleDocAction(link);
      if (!read.doc) throw new Error(read.error || "The doc could not be read.");
      const imported = read.doc;
      const { images, cover } = imported;
      const urls = new Map<string, string>();
      const sizes = new Map<string, { width?: number; height?: number }>();
      let done = 0;
      setPhase({ step: "images", done, total: images.length });
      // A few at a time: each request downloads the doc again, so keep the load modest.
      const queue = [...images];
      await Promise.all(Array.from({ length: Math.min(3, queue.length) }, async () => {
        for (let name = queue.shift(); name; name = queue.shift()) {
          const result = await importGoogleDocImageAction(link, name);
          if (!result.url) throw new Error(result.error || "An image could not be imported.");
          urls.set(name, result.url); sizes.set(name, { width: result.width, height: result.height });
          setPhase({ step: "images", done: ++done, total: images.length });
        }
      }));
      setPhase({ step: "saving" });
      const saved = await createImportedDraftAction({
        title: imported.title, excerpt: imported.excerpt, locale: imported.locale, body: encodeRichBody(withImages(imported.doc, urls)),
        cover: cover ? urls.get(cover.name) || "" : "", coverAlt: cover?.alt || "", coverCaption: cover?.caption || "",
        coverWidth: cover ? sizes.get(cover.name)?.width : undefined, coverHeight: cover ? sizes.get(cover.name)?.height : undefined,
      });
      if (!saved.id) throw new Error(saved.error || "The draft could not be saved.");
      setPhase({ step: "done", id: saved.id, title: imported.title, notes: imported.notes });
    } catch (problem) {
      setError(problem instanceof Error ? problem.message : "The import did not finish. Try again.");
      setPhase({ step: "idle" });
    }
  }

  if (phase.step === "done") return <section className={styles.importPanel} aria-labelledby="import-done">
    <p className={styles.success} role="status">Imported as a private draft. Nothing is public yet.</p>
    <h2 id="import-done">{phase.title || "Imported article"}</h2>
    {phase.notes.length > 0 && <><h3>Check before publishing</h3><ul className={styles.importNotes}>{phase.notes.map(note => <li key={note}>{note}</li>)}</ul></>}
    <div className={styles.actions}><Link className={shared.button} href={`/team/blogs/${phase.id}`}>Open the draft</Link><button type="button" className={shared.secondary} onClick={() => { setLink(""); setPhase({ step: "idle" }); }}>Import another doc</button></div>
  </section>;

  return <form className={styles.importPanel} onSubmit={start} noValidate>
    <label className={styles.field}>Google Doc link
      <input type="url" inputMode="url" value={link} onChange={event => setLink(event.target.value)} placeholder="https://docs.google.com/document/d/…" required disabled={busy} />
      <small>In Google Docs, click Share and set General access to &ldquo;Anyone with the link&rdquo; as Viewer. The website copies the text and images once; later changes in the doc are not synced.</small>
    </label>
    {error && <p className={styles.error} role="alert">{error}</p>}
    <div className={styles.actions}>
      <button type="submit" className={shared.button} disabled={busy || !link.trim()}>{busy ? "Importing…" : "Import as draft"}</button>
      <Link href="/team/blogs" className={styles.textButton}>Cancel</Link>
    </div>
    <p className={styles.hint} role="status" aria-live="polite">
      {phase.step === "reading" ? "Reading the doc…" : phase.step === "images" ? `Copying images: ${phase.done} of ${phase.total}` : phase.step === "saving" ? "Saving the draft…" : ""}
    </p>
    <details className={styles.importGuide}>
      <summary>How the doc is converted</summary>
      <ul>
        <li>The image above the title becomes the cover photo. An italic line right under an image becomes its caption.</li>
        <li>The Heading 1 becomes the article title. The first paragraph under it becomes the introduction.</li>
        <li>Heading 2 becomes a section in the contents list; Heading 3 becomes a subheading.</li>
        <li>Bold, italic, links, bullet lists, tables and images are kept. Fonts and colours follow the website design.</li>
        <li>A line that says &ldquo;(add contact button)&rdquo; becomes a button to the contact page.</li>
      </ul>
    </details>
  </form>;
}
