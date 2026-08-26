"use client";

import Image from "next/image";
import { useCallback, useEffect, useRef, useState } from "react";
import { useLang } from "@/lib/lang";
import styles from "./LogoGrid.module.css";

/**
 * Sliver of the first hidden row left showing, so the wall reads as
 * continuing. Deep enough to catch the tops of the marks: the cell is 96px
 * and centres a 50px logo, so anything under ~45px reveals nothing but the
 * cell's own padding and the wall just looks like it ends short.
 */
const PEEK = 56;

export type LogoItem = {
  name: string;
  /** Arabic name. Falls back to `name` for marks that have no Arabic form. */
  ar?: string;
  /** File inside `basePath`. Omit when we hold no usable mark — the name is set as a wordmark instead. */
  file?: string;
};

/**
 * Ruleless logo wall, clipped to `collapsedRows` with a control that opens the
 * rest. Every mark is in the DOM at all times — the list is the credential, so
 * none of it is trimmed away; the clip only decides how much of it is standing
 * up at once.
 *
 * Each mark carries its name. Many of these are institutional seals — the
 * ministries, the universities, the air force — which stay unreadable at wall
 * scale however they are sized, and for those the name is the credential
 * rather than the crest. The logo is `alt=""` so a screen reader is not read
 * the same name twice.
 *
 * The row height is measured rather than assumed, because the grid is
 * `auto-fill` and the number of columns — and so the number of rows — changes
 * with the viewport.
 */
export function LogoGrid({
  items,
  basePath,
  collapsedRows = 2,
}: {
  items: LogoItem[];
  basePath: string;
  collapsedRows?: number;
}) {
  const { lang } = useLang();
  const ar = lang === "ar";
  const gridRef = useRef<HTMLDivElement>(null);
  const [open, setOpen] = useState(false);
  const [rowHeight, setRowHeight] = useState(0);
  const [fullHeight, setFullHeight] = useState(0);

  const measure = useCallback(() => {
    const grid = gridRef.current;
    const first = grid?.firstElementChild as HTMLElement | null;
    if (!grid || !first) return;
    setRowHeight(first.offsetHeight);
    setFullHeight(grid.scrollHeight);
  }, []);

  useEffect(() => {
    measure();
    const grid = gridRef.current;
    if (!grid || typeof ResizeObserver === "undefined") return;
    const observer = new ResizeObserver(measure);
    observer.observe(grid);
    return () => observer.disconnect();
  }, [measure]);

  // Before the first measurement, and whenever everything already fits, the
  // wall is left uncapped so it can never clip content it has no control for.
  const measured = rowHeight > 0 && fullHeight > 0;
  const rowsHeight = rowHeight * collapsedRows;
  const clips = measured && fullHeight > rowsHeight + 1;
  // Cutting flush with a row would put the fade over complete logos, which
  // reads as a rendering fault rather than an invitation. Letting the next row
  // show a sliver is what makes it obvious the wall continues.
  const collapsedHeight = rowsHeight + PEEK;

  return (
    <div className={styles.wall}>
      <div
        className={styles.viewport}
        style={clips ? { maxHeight: open ? fullHeight : collapsedHeight } : undefined}
      >
        <div className={styles.grid} ref={gridRef}>
          {items.map((item) => (
            <div key={item.name} className={styles.cell}>
              {/* Fixed band so the marks align across a row however many lines
                  the name beneath them runs to. */}
              <span className={styles.logoWrap}>
                {item.file ? (
                  <Image
                    src={`${basePath}/${item.file}`}
                    alt=""
                    width={220}
                    height={90}
                    loading="lazy"
                    // Served straight from Workers Assets rather than through
                    // /_next/image. The marks are already WebP, already cut to
                    // the size they are drawn at (scripts/optimise-logos.mjs),
                    // and vectors resize for free — so a transform would cost a
                    // Worker invocation per mark to save almost nothing. There
                    // are 84 of them on the home page.
                    unoptimized
                    className={styles.logo}
                  />
                ) : (
                  <span className={styles.wordmark}>{ar ? item.ar ?? item.name : item.name}</span>
                )}
              </span>
              <span className={styles.name}>{ar ? item.ar ?? item.name : item.name}</span>
            </div>
          ))}
        </div>
        {clips && !open && <div className={styles.fade} aria-hidden="true" />}
      </div>

      {clips && (
        <button type="button" className={styles.toggle} onClick={() => setOpen((v) => !v)} aria-expanded={open}>
          <span>
            {open
              ? ar
                ? "عرض أقل"
                : "Show fewer"
              : ar
                ? `عرض الكل (${items.length})`
                : `Show all ${items.length}`}
          </span>
          <svg className={styles.chevron} viewBox="0 0 16 16" width="14" height="14" aria-hidden="true">
            <path d="M3 6l5 5 5-5" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        </button>
      )}
    </div>
  );
}
