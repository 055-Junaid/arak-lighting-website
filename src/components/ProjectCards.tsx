"use client";

import Link from "next/link";
import { useLang } from "@/lib/lang";
import { localePath } from "@/lib/site";
import { FEATURED_PROJECTS, type FeaturedProject } from "@/lib/projects-data";
import { PhotoSlot } from "@/components/PhotoSlot";
import { Reveal } from "@/components/Reveal";
import styles from "./ProjectCards.module.css";

/**
 * Top projects as cards. `slugs` names an exact set, in the order given, for
 * teasers that pick their own projects; otherwise `limit` trims the list and
 * `imagesOnly` skips projects still awaiting photography so a teaser never
 * leads with a placeholder. The projects page renders all of them.
 */
export function ProjectCards({
  limit,
  imagesOnly,
  slugs,
}: {
  limit?: number;
  imagesOnly?: boolean;
  slugs?: string[];
}) {
  const { lang } = useLang();
  const selected = slugs
    ? slugs
        .map((slug) => FEATURED_PROJECTS.find((p) => p.slug === slug))
        .filter((p): p is FeaturedProject => Boolean(p))
    : FEATURED_PROJECTS;
  const pool = imagesOnly ? selected.filter((p) => p.image) : selected;
  const projects = limit ? pool.slice(0, limit) : pool;

  return (
    <div className={styles.grid}>
      {projects.map((project, i) => (
        <Reveal key={project.slug} delay={(i % 3) * 70} className={styles.card}>
          {project.image ? (
            // Only projects with photography have a page worth opening.
            <Link href={localePath(`/projects/${project.slug}`, lang)} className={styles.link}>
              <Card project={project} priority={i < 3} ar={lang === "ar"} />
            </Link>
          ) : (
            <Card project={project} priority={i < 3} ar={lang === "ar"} />
          )}
        </Reveal>
      ))}
    </div>
  );
}

function Card({
  project,
  priority,
  ar,
}: {
  project: FeaturedProject;
  priority: boolean;
  ar: boolean;
}) {
  const extras = project.gallery.length - 1;

  return (
    <>
      <div className={styles.frame}>
        {project.image ? (
          <>
            <PhotoSlot
              src={project.image}
              alt={ar ? `${project.arName}، ${project.arLoc}` : `${project.name}, ${project.loc}`}
              priority={priority}
            />
            {extras > 0 && <span className={styles.count}>+{extras}</span>}
          </>
        ) : (
          <div className={styles.pending}>
            <span className={styles.pendingLabel}>
              {ar ? "الصور قيد الإعداد" : "Photography to follow"}
            </span>
          </div>
        )}
      </div>
      <div className={styles.meta}>
        <h3 className={styles.name}>{ar ? project.arName : project.name}</h3>
        <p className={styles.loc}>{ar ? project.arLoc : project.loc}</p>
        <p className={styles.scope}>{ar ? project.arScope : project.scope}</p>
      </div>
    </>
  );
}
