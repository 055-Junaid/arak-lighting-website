import Link from "next/link";
import { ROUTES, localePath, type Locale } from "@/lib/site";
import styles from "./NotFound.module.css";

/**
 * The body of a 404, in one language.
 *
 * Rendered from three places — the English tree's `not-found`, the Arabic
 * tree's, and `global-not-found` for URLs that match no route at all — so the
 * wording and the way back are written once rather than three times.
 *
 * A server component: nothing here needs the client, and the 404 should not
 * pull a bundle to say a page is missing.
 */

/** The nav labels, keyed by the routes already declared in site.ts, so a new
 *  section appears here as soon as it is added to the navigation. */
const LABELS: Record<string, { en: string; ar: string }> = {
  "/": { en: "Home", ar: "الرئيسية" },
  "/about": { en: "About", ar: "من نحن" },
  "/services": { en: "Services", ar: "الخدمات" },
  "/services/smart-poles": { en: "Smart Poles", ar: "الأعمدة الذكية" },
  "/projects": { en: "Projects", ar: "المشاريع" },
  "/contact": { en: "Contact", ar: "تواصل معنا" },
};

export function NotFound({ lang }: { lang: Locale }) {
  const ar = lang === "ar";

  return (
    <main id="main" tabIndex={-1} className={styles.wrap}>
      <p className={styles.eyebrow}>404</p>
      <h1 className={styles.title}>
        {ar ? "لم نعثر على هذه الصفحة" : "We could not find that page"}
      </h1>
      <p className={styles.lead}>
        {ar
          ? "قد يكون الرابط قديمًا أو أن الصفحة قد نُقلت. تجد أدناه أقسام الموقع كاملة."
          : "The link may be out of date, or the page may have moved. Every section of the site is listed below."}
      </p>

      <nav aria-label={ar ? "أقسام الموقع" : "Site sections"}>
        <ul className={styles.links}>
          {ROUTES.map((route) => (
            <li key={route.path}>
              <Link href={localePath(route.path, lang)} className={styles.link}>
                <span>{ar ? LABELS[route.path].ar : LABELS[route.path].en}</span>
                <span className={styles.arrow} aria-hidden="true">
                  →
                </span>
              </Link>
            </li>
          ))}
        </ul>
      </nav>
    </main>
  );
}
