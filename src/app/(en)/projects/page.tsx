"use client";

import { Suspense } from "react";
import { useLang } from "@/lib/lang";
import { ProjectCards } from "@/components/ProjectCards";
import { ProjectsTable } from "@/components/ProjectsTable";
import styles from "./page.module.css";

export default function ProjectsPage() {
  const { lang } = useLang();
  const ar = lang === "ar";

  return (
    <main id="main" tabIndex={-1}>
      <section className={styles.section}>
        <div className={styles.label}>
          <span className={styles.eyebrow}>{ar ? "مشاريعنا" : "Our Projects"}</span>
        </div>
        <h1 className={styles.title}>{ar ? "مراجع المشاريع" : "Project references"}</h1>
        <p className={styles.lead}>
          {ar
            ? "فنادق ومطارات ومستشفيات وجامعات وقصور ومنشآت وطنية في مختلف أنحاء المملكة. توريدًا وتركيبًا وتشغيلًا."
            : "Hotels, airports, hospitals, universities, palaces and national facilities across the Kingdom. Supplied, installed and commissioned."}
        </p>
      </section>

      <section className={`${styles.section} ${styles.sectionMid}`}>
        <div className={`${styles.label} ${styles.labelRule}`}>
          {/* A heading, not a label: these name the two sections under the
              page's h1, and as spans the card titles below them made the
              document jump straight from h1 to h3. */}
          <h2 className={styles.eyebrow}>{ar ? "أبرز المشاريع" : "Top projects"}</h2>
          <span className={styles.rule} />
        </div>
        <ProjectCards />
      </section>

      <section className={`${styles.section} ${styles.sectionLast}`}>
        <div className={`${styles.label} ${styles.labelRule}`}>
          <h2 className={styles.eyebrow}>{ar ? "مشاريع أخرى" : "Further references"}</h2>
          <span className={styles.rule} />
        </div>
        {/* ProjectsTable reads the filter from the query string. Reading search
            params on a statically rendered page has to sit behind a boundary,
            or the whole page opts out of static rendering. */}
        <Suspense fallback={null}>
          <ProjectsTable />
        </Suspense>
      </section>
    </main>
  );
}
