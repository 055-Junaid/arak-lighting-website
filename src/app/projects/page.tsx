"use client";

import { useLang } from "@/lib/lang";
import { ProjectCards } from "@/components/ProjectCards";
import { ProjectsTable } from "@/components/ProjectsTable";
import styles from "./page.module.css";

export default function ProjectsPage() {
  const { lang } = useLang();
  const ar = lang === "ar";

  return (
    <main>
      <section className={styles.section}>
        <div className={styles.label}>
          <span className={styles.eyebrow}>{ar ? "مشاريعنا" : "Projects"}</span>
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
          <span className={styles.eyebrow}>{ar ? "أبرز المشاريع" : "Top projects"}</span>
          <span className={styles.rule} />
        </div>
        <ProjectCards />
      </section>

      <section className={`${styles.section} ${styles.sectionLast}`}>
        <div className={`${styles.label} ${styles.labelRule}`}>
          <span className={styles.eyebrow}>{ar ? "مشاريع أخرى" : "Further references"}</span>
          <span className={styles.rule} />
        </div>
        <ProjectsTable />
      </section>
    </main>
  );
}
