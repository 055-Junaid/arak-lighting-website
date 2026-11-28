"use client";

import { useEffect, useState } from "react";
import type { BlogSection } from "@/lib/blog/content";
import styles from "./Article.module.css";

export function ArticleContents({ sections, articleId, ar, preview }: { sections: BlogSection[]; articleId: string; ar: boolean; preview: boolean }) {
  const [active, setActive] = useState(sections[0]?.id || "");
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
  // Phones: the floating Lights switch steps aside while reading down, and return on scroll up or at the end.
  useEffect(() => {
    if (preview) return;
    const root = document.documentElement;
    let last = window.scrollY;
    const onScroll = () => {
      const y = window.scrollY;
      const atEnd = y + window.innerHeight >= root.scrollHeight - 80;
      if (y < 120 || atEnd || y < last - 6) delete root.dataset.articleReading;
      else if (y > last + 6) root.dataset.articleReading = "true";
      if (Math.abs(y - last) > 6) last = y;
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => { window.removeEventListener("scroll", onScroll); delete root.dataset.articleReading; };
  }, [preview]);

  if (!sections.length) return null;
  const current = sections.some(section => section.id === active) ? active : sections[0].id;
  const label = ar ? "في هذا المقال" : "In this article";
  const list = () => <ol className={styles.contentsList}>{sections.map(section => <li key={section.id}><a href={`#${articleId}-${section.id}`} aria-current={current === section.id ? "location" : undefined} onClick={() => {
    document.getElementById(`${articleId}-${section.id}`)?.focus({ preventScroll: true });
  }}>{section.text}</a></li>)}</ol>;

  return <>
    <aside className={styles.contents} aria-label={label}>
      <nav className={styles.desktopContents} aria-label={label}><p>{label}</p>{list()}</nav>
      <details className={styles.mobileContents}><summary>{label}<span aria-hidden="true">+</span></summary><nav aria-label={label}>{list()}</nav></details>
    </aside>
  </>;
}
