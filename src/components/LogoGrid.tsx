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
  /** File inside `basePath`. Omit when we hold no usable mark — the name is set as a wordmark instead. */
  file?: string;
};

/**
 * Ruleless logo wall, clipped to `collapsedRows` with a control that opens the
 * rest. Every mark is in the DOM at all times — the list is the credential, so
 * none of it is trimmed away; the clip only decides how much of it is standing
 * up at once.
 *
 * The captions are gone. For most of these the logo already sets the name, so
 * a label under each one had you reading the same word twice in two type
 * styles, seventy-odd times, which is what made the wall read as a table
 * rather than a credential. The name survives as `title` and `alt`.
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
              {item.file ? (
                <Image
                  src={`${basePath}/${item.file}`}
                  alt={item.name}
                  title={item.name}
                  width={220}
                  height={90}
                  // The optimiser rejects SVG unless dangerouslyAllowSVG is set;
                  // vectors need no resizing anyway, so serve them as-is.
                  unoptimized={item.file.endsWith(".svg")}
                  className={styles.logo}
                />
              ) : (
                <span className={styles.wordmark} title={item.name}>
                  {item.name}
                </span>
              )}
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
