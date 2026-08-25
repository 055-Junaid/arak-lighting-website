"use client";

import Link from "next/link";
import { useLang } from "@/lib/lang";
import { localePath } from "@/lib/site";
import type { FeaturedProject } from "@/lib/projects-data";
import { ProjectGallery } from "@/components/ProjectGallery";
import styles from "./ProjectDetail.module.css";

/** Just enough of a neighbouring project to link to it. */
type Neighbour = { slug: string; name: string } | undefined;

/**
 * The body of a project page. It lives apart from the route file because the
 * route has to stay a server component — it owns `generateStaticParams` and
 * `generateMetadata` — while every label on the page has to follow the
 * language switch, which is client state.
 *
 * The project's own copy (name, location, scope, blurb) stays in English: it
 * is client-supplied reference text and has no Arabic original yet.
 */
export function ProjectDetail({
  project,
  previous,
  next,
}: {
  project: FeaturedProject;
  previous: Neighbour;
  next: Neighbour;
}) {
  const { lang } = useLang();
  const ar = lang === "ar";
  const count = project.gallery.length;

  // Arabic counts photographs in four forms rather than two.
  const photographs = ar
    ? count === 1
      ? "صورة واحدة"
      : count === 2
        ? "صورتان"
        : count <= 10
          ? `${count} صور`
          : `${count} صورة`
    : `${count} ${count === 1 ? "photograph" : "photographs"}`;

  return (
    <main>
      <section className={`${styles.wrap} ${styles.intro}`}>
        <Link href={localePath("/projects", lang)} className={styles.back}>
          {/* Back points the way the page reads. */}
          <span aria-hidden="true">{ar ? "→" : "←"}</span> {ar ? "جميع المشاريع" : "All projects"}
        </Link>
        <h1 className={styles.title}>{ar ? project.arName : project.name}</h1>
        <p className={styles.blurb}>{ar ? project.arBlurb : project.blurb}</p>

        <div className={styles.facts}>
          <div>
            <span className={styles.factLabel}>{ar ? "الموقع" : "Location"}</span>
            <span className={styles.factValue}>{ar ? project.arLoc : project.loc}</span>
          </div>
          <div>
            <span className={styles.factLabel}>{ar ? "نطاق العمل" : "Scope"}</span>
            <span className={styles.factValue}>{ar ? project.arScope : project.scope}</span>
          </div>
          <div>
            <span className={styles.factLabel}>{ar ? "التخصص" : "Discipline"}</span>
            <span className={styles.factValue}>
              {project.category === "controls"
                ? ar
                  ? "أنظمة التحكم والأتمتة"
                  : "Controls & automation"
                : ar
                  ? "وحدات الإضاءة"
                  : "Light fittings"}
            </span>
          </div>
        </div>
      </section>

      <section className={`${styles.wrap} ${styles.gallerySection}`}>
        <div className={styles.galleryHead}>
          <span className={styles.galleryLabel}>{photographs}</span>
          <span className={styles.rule} />
        </div>
        <ProjectGallery images={project.gallery} projectName={ar ? project.arName : project.name} />
      </section>

      <section className={styles.wrap}>
        <nav className={styles.pager}>
          {previous && (
            <Link href={localePath(`/projects/${previous.slug}`, lang)} className={styles.pagerLink}>
              <span className={styles.pagerLabel}>{ar ? "السابق" : "Previous"}</span>
              <span className={styles.pagerName}>{previous.name}</span>
            </Link>
          )}
          {next && (
            <Link
              href={localePath(`/projects/${next.slug}`, lang)}
              className={`${styles.pagerLink} ${styles.pagerNext}`}
            >
              <span className={styles.pagerLabel}>{ar ? "التالي" : "Next"}</span>
              <span className={styles.pagerName}>{next.name}</span>
            </Link>
          )}
        </nav>
      </section>
    </main>
  );
}
