"use client";

import { useEffect, useRef, useState } from "react";
import type { BlogSection } from "@/lib/blog/content";
import styles from "./Article.module.css";

export function ArticleContents({ sections, articleId, ar, preview }: { sections: BlogSection[]; articleId: string; ar: boolean; preview: boolean }) {
  const [active, setActive] = useState(sections[0]?.id || "");
  const dialog = useRef<HTMLDialogElement>(null);
  const ids = sections.map(section => section.id).join("|");
  useEffect(() => {
    const headings = ids.split("|").filter(Boolean).map(id => ({ id, element: document.getElementById(`${articleId}-${id}`) }));
    let frame = 0;
    const update = () => {
      frame = 0;
      let current = headings[0]?.id || "";
      for (const heading of headings) {
        if (heading.element && heading.element.getBoundingClientRect().top <= Math.min(240, window.innerHeight * .35)) current = heading.id;
      }
      setActive(current);
    };
    const onScroll = () => { if (!frame) frame = requestAnimationFrame(update); };
    frame = requestAnimationFrame(update);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => { window.removeEventListener("scroll", onScroll); cancelAnimationFrame(frame); };
  }, [articleId, ids]);

  if (!sections.length) return null;
  const current = sections.some(section => section.id === active) ? active : sections[0].id;
  const label = ar ? "في هذا المقال" : "In this article";
  const list = (inDialog = false) => <ol className={styles.contentsList}>{sections.map(section => <li key={section.id}><a href={`#${articleId}-${section.id}`} aria-current={current === section.id ? "location" : undefined} onClick={() => {
    if (inDialog) dialog.current?.close();
    document.getElementById(`${articleId}-${section.id}`)?.focus({ preventScroll: true });
  }}>{section.text}</a></li>)}</ol>;

  return <>
    <aside className={styles.contents} aria-label={label}>
      <nav className={styles.desktopContents} aria-label={label}><p>{label}</p>{list()}</nav>
      <details className={styles.mobileContents}><summary>{label}<span aria-hidden="true">+</span></summary><nav aria-label={label}>{list()}</nav></details>
    </aside>
    {!preview && <>
      <button type="button" className={styles.mapButton} aria-haspopup="dialog" onClick={() => dialog.current?.showModal()}><svg width="14" height="14" viewBox="0 0 16 16" fill="none" aria-hidden="true"><path d="M1 6V1h5M10 1h5v5M15 10v5h-5M6 15H1v-5" stroke="currentColor" /></svg>{ar ? "فهرس المقال" : "Content map"}</button>
      <dialog ref={dialog} className={styles.mapDialog} aria-labelledby={`${articleId}-map-title`} dir={ar ? "rtl" : "ltr"}>
        <div className={styles.mapHeading}><h2 id={`${articleId}-map-title`}>{label}</h2><button type="button" onClick={() => dialog.current?.close()} aria-label={ar ? "إغلاق الفهرس" : "Close content map"}>×</button></div>
        <nav aria-label={label}>{list(true)}</nav>
      </dialog>
    </>}
  </>;
}
