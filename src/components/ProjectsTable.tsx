"use client";

import { useMemo, useState } from "react";
import { useLang } from "@/lib/lang";
import { PROJECT_ROWS } from "@/lib/projects-data";
import styles from "./ProjectsTable.module.css";

type Filter = "all" | "fittings" | "controls";

const FILTERS: [Filter, string, string][] = [
  ["all", "All", "الكل"],
  ["fittings", "Light fittings", "وحدات الإضاءة"],
  ["controls", "Controls & automation", "أنظمة التحكم والأتمتة"],
];

const matches = (category: string, filter: Filter) => filter === "all" || category === filter;

export function ProjectsTable() {
  const { lang } = useLang();
  const ar = lang === "ar";
  const [filter, setFilter] = useState<Filter>("all");

  const rows = useMemo(
    () => PROJECT_ROWS.filter((r) => matches(r.category, filter)),
    [filter]
  );

  return (
    <>
      <div className={styles.filters}>
        {FILTERS.map(([value, label, labelAr]) => (
          <button
            key={value}
            type="button"
            onClick={() => setFilter(value)}
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

      <div className={styles.list}>
        <div className={styles.head}>
          <span className={styles.headCell}>{ar ? "م" : "No."}</span>
          <span className={styles.headCell}>{ar ? "المشروع" : "Project"}</span>
          <span className={styles.headCell}>{ar ? "الموقع" : "Location"}</span>
          <span className={styles.headCell}>{ar ? "نطاق العمل" : "Scope"}</span>
        </div>

        {rows.map((row, i) => (
          <div key={`${row.name}-${row.loc}`} className={styles.row}>
            <span className={styles.index}>{String(i + 1).padStart(2, "0")}</span>
            <span className={styles.name}>{ar ? row.arName : row.name}</span>
            <span className={styles.loc}>{ar ? row.arLoc : row.loc}</span>
            <span className={styles.scope}>{ar ? row.arScope : row.scope}</span>
          </div>
        ))}
      </div>

      <p className={styles.note}>
        {ar
          ? `${rows.length} مرجعًا إضافيًا. القائمة الكاملة للمشاريع متاحة عند الطلب.`
          : `${rows.length} further references. Full project list available on request.`}
      </p>
    </>
  );
}
