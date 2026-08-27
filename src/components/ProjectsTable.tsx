"use client";

import { useMemo } from "react";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { useLang } from "@/lib/lang";
import { PROJECT_ROWS } from "@/lib/projects-data";
import styles from "./ProjectsTable.module.css";

type Filter = "all" | "fittings" | "controls";

const FILTERS: [Filter, string, string][] = [
  ["all", "All", "الكل"],
  ["fittings", "Light fittings", "وحدات الإضاءة"],
  ["controls", "Controls & automation", "أنظمة التحكم والأتمتة"],
];

const IS_FILTER = (v: string | null): v is Filter =>
  v === "all" || v === "fittings" || v === "controls";

const matches = (category: string, filter: Filter) => filter === "all" || category === filter;

/** The query parameter the active filter is published under. */
const PARAM = "scope";

/**
 * The full project reference list.
 *
 * This is a table — four columns, a header row, one project per row — and it
 * used to be built from divs and spans, which meant a screen reader read each
 * row as an undifferentiated run of text with no idea which value was the
 * location and which the scope of work. It is real table markup now, with the
 * ARIA roles restated because the CSS overrides `display` on every element to
 * keep the grid layout, and changing a table's display can drop its semantics
 * in Safari.
 *
 * The filter is published to the URL so a reference list can be sent to
 * someone — "our controls projects" is a link now, not an instruction to
 * arrive and press a button.
 */
export function ProjectsTable() {
  const { lang } = useLang();
  const ar = lang === "ar";
  const router = useRouter();
  const pathname = usePathname();
  const params = useSearchParams();

  // The URL is the state. Holding it in useState as well would mean two
  // sources of truth to keep in step, and syncing one into the other in an
  // effect is the cascading-render pattern React warns about.
  const fromUrl = params.get(PARAM);
  const filter: Filter = IS_FILTER(fromUrl) ? fromUrl : "all";

  const choose = (next: Filter) => {
    const query = new URLSearchParams(params.toString());
    if (next === "all") query.delete(PARAM);
    else query.set(PARAM, next);
    const search = query.toString();
    // replace, not push: three chips would otherwise fill the back button with
    // states nobody wants to step back through. scroll: false keeps the reader
    // where they are rather than throwing them to the top of the page.
    router.replace(search ? `${pathname}?${search}` : pathname, { scroll: false });
  };

  const rows = useMemo(() => PROJECT_ROWS.filter((r) => matches(r.category, filter)), [filter]);

  const columns = [
    ar ? "م" : "No.",
    ar ? "المشروع" : "Project",
    ar ? "الموقع" : "Location",
    ar ? "نطاق العمل" : "Scope",
  ];

  return (
    <>
      <div className={styles.filters}>
        {FILTERS.map(([value, label, labelAr]) => (
          <button
            key={value}
            type="button"
            onClick={() => choose(value)}
            // The active chip was styled black and said nothing. aria-pressed
            // is what tells a screen reader which of the three is applied.
            aria-pressed={filter === value}
            className={[styles.filter, filter === value ? styles.filterActive : ""]
              .filter(Boolean)
              .join(" ")}
          >
            {ar ? labelAr : label}
            <span className={styles.filterCount}>
              {PROJECT_ROWS.filter((r) => matches(r.category, value)).length}
            </span>
          </button>
        ))}
      </div>

      <table className={styles.list} role="table">
        <thead className={styles.thead} role="rowgroup">
          <tr className={styles.head} role="row">
            {columns.map((c) => (
              <th key={c} scope="col" role="columnheader" className={styles.headCell}>
                {c}
              </th>
            ))}
          </tr>
        </thead>
        <tbody className={styles.tbody} role="rowgroup">
          {rows.map((row, i) => (
            <tr key={`${row.name}-${row.loc}`} className={styles.row} role="row">
              <td role="cell" className={styles.index}>
                {String(i + 1).padStart(2, "0")}
              </td>
              <th scope="row" role="cell" className={styles.name}>
                {ar ? row.arName : row.name}
              </th>
              <td role="cell" className={styles.loc}>
                {ar ? row.arLoc : row.loc}
              </td>
              <td role="cell" className={styles.scope}>
                {ar ? row.arScope : row.scope}
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {/* Announced, because filtering changes the list silently otherwise. */}
      <p className={styles.note} role="status" aria-live="polite">
        {ar
          ? `${rows.length} مرجعًا إضافيًا. القائمة الكاملة للمشاريع متاحة عند الطلب.`
          : `${rows.length} further references. Full project list available on request.`}
      </p>
    </>
  );
}
