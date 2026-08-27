"use client";

import Link from "next/link";
import { COMPANY, localePath, type Locale } from "@/lib/site";
import styles from "./ErrorBody.module.css";

/**
 * The body of an error page, in one language.
 *
 * An error boundary is always a client component — React needs `reset` to be
 * callable from the browser — so this one is too, and the two locale
 * boundaries and `global-error` all render it rather than repeating the copy.
 *
 * `reset` re-renders the segment that threw, which is worth offering first:
 * most render faults here would be transient. The link out and the address
 * are for the ones that are not.
 */
export function ErrorBody({
  lang,
  reset,
  /** Set by global-error, where next/link has no router to work with. */
  plainLinks = false,
}: {
  lang: Locale;
  reset?: () => void;
  plainLinks?: boolean;
}) {
  const ar = lang === "ar";
  const home = localePath("/", lang);
  const contact = localePath("/contact", lang);

  const homeLabel = ar ? "العودة إلى الرئيسية" : "Back to home";
  const contactLabel = ar ? "تواصل معنا" : "Contact us";

  return (
    <main id="main" tabIndex={-1} className={styles.wrap}>
      <p className={styles.eyebrow}>{ar ? "خطأ" : "Error"}</p>
      <h1 className={styles.title}>{ar ? "حدث خطأ ما" : "Something went wrong"}</h1>
      <p className={styles.lead}>
        {ar
          ? "تعذّر عرض هذه الصفحة. غالبًا ما تكفي إعادة المحاولة؛ فإن تكرّر الخطأ فأخبرنا به."
          : "This page could not be displayed. Trying again usually resolves it — if it keeps happening, please tell us."}
      </p>

      <div className={styles.actions}>
        {reset && (
          <button type="button" onClick={reset} className={styles.button}>
            {ar ? "إعادة المحاولة" : "Try again"}
          </button>
        )}
        {plainLinks ? (
          <a href={home} className={styles.secondary}>
            {homeLabel}
          </a>
        ) : (
          <Link href={home} className={styles.secondary}>
            {homeLabel}
          </Link>
        )}
      </div>

      <p className={styles.contact}>
        {ar ? "أو راسلنا مباشرة على " : "Or write to us directly at "}
        <a href={`mailto:${COMPANY.email}`}>{COMPANY.email}</a>
        {ar ? "، أو عبر " : ", or via the "}
        {plainLinks ? (
          <a href={contact}>{contactLabel}</a>
        ) : (
          <Link href={contact}>{contactLabel}</Link>
        )}
        {ar ? "." : " page."}
      </p>
    </main>
  );
}
