"use client";

import { useCallback, useEffect, useId, useRef, useState, type FormEvent } from "react";
import { createPortal } from "react-dom";
import { useLang } from "@/lib/lang";
import {
  ENQUIRY_ENDPOINT,
  INBOX,
  MIN_FILL_MS,
  TRAP_FIELD,
  mailtoFallback,
  sendEnquiry,
  type Enquiry,
} from "@/lib/enquiry";
import styles from "./ContactForm.module.css";

/** The one field list on the site, in both languages. */
const PROJECT_TYPES: [string, string][] = [
  ["Hotel / hospitality", "فندق / ضيافة"],
  ["Villa / palace", "فيلا / قصر"],
  ["Commercial / office", "تجاري / مكاتب"],
  ["Government / institutional", "حكومي / مؤسسي"],
  ["Industrial", "صناعي"],
  ["Outdoor / facade", "خارجي / واجهات"],
  ["Controls & automation only", "أنظمة تحكم وأتمتة فقط"],
];

type FieldName = "name" | "company" | "email" | "phone" | "projectType" | "brief";
type Errors = Partial<Record<FieldName, string>>;
type Status = "idle" | "sending" | "sent" | "failed";

/** How long the success notice stays up before it withdraws itself, in ms.
 *  Only the success one is timed. A failure notice carries the `mailto:`
 *  fallback and has to wait for the visitor, not the clock. */
const NOTICE_MS = 8000;

/**
 * The enquiry form.
 *
 * Submitting posts the brief to the enquiries Sheet (see src/lib/enquiry.ts).
 * It used to compose a `mailto:` instead, which meant any visitor without a
 * mail client configured lost their enquiry silently — no error, no record.
 * The `mailto:` survives as the fallback when the post fails, so a visitor who
 * has written a brief never loses it to a network error.
 *
 * OUTCOME, ANNOUNCED
 * ------------------
 * The result used to be reported only by swapping the text of the small muted
 * line under the button — the same line that already held the "we read every
 * enquiry ourselves" helper text. Nothing moved, nothing changed colour, and
 * on a phone the line often sat below the fold, so a visitor who had just
 * pressed Send had no way to tell whether anything had happened. Enquiries
 * were landing in the Sheet while the sender was left guessing.
 *
 * So the outcome is now also raised as a notice pinned to the top of the
 * viewport, which cannot be scrolled past or missed. The line under the button
 * still carries the same words afterwards: the notice is the announcement, the
 * line is the record that survives dismissing it.
 */
export function ContactForm() {
  const { lang } = useLang();
  const ar = lang === "ar";
  const uid = useId();
  const formRef = useRef<HTMLFormElement>(null);
  const [errors, setErrors] = useState<Errors>({});
  const [status, setStatus] = useState<Status>("idle");

  /** When the form became fillable — half of the spam check. Set in the effect
   *  below rather than at render, which would be reading the clock during a
   *  render pass. Until it runs the check simply passes, which is the right
   *  way round: a guard that fails open never blocks a real enquiry. */
  const mountedAt = useRef(0);
  /** Held so the fallback link can be offered with the brief already in it. */
  const [fallbackHref, setFallbackHref] = useState<string>("");

  /** Whether the outcome notice is currently raised. Separate from `status`,
   *  which stays put after the notice is dismissed so the line under the
   *  button keeps reporting what happened. */
  const [noticeOpen, setNoticeOpen] = useState(false);

  useEffect(() => {
    mountedAt.current = Date.now();
  }, []);

  const closeNotice = useCallback(() => setNoticeOpen(false), []);

  // A success notice withdraws itself; a failure one stays until dismissed,
  // because it holds the fallback link. Nothing is lost either way — the same
  // words remain in the line under the button — so the timer does not put a
  // visitor under one to read it.
  useEffect(() => {
    if (!noticeOpen || status !== "sent") return;
    const timer = window.setTimeout(closeNotice, NOTICE_MS);
    return () => window.clearTimeout(timer);
  }, [noticeOpen, status, closeNotice]);

  // Escape dismisses, the way every other transient thing on the web does.
  useEffect(() => {
    if (!noticeOpen) return;
    const onKey = (event: KeyboardEvent) => {
      if (event.key === "Escape") closeNotice();
    };
    document.addEventListener("keydown", onKey);
    return () => document.removeEventListener("keydown", onKey);
  }, [noticeOpen, closeNotice]);

  const fid = (n: FieldName) => `${uid}-${n}`;
  const eid = (n: FieldName) => `${uid}-${n}-error`;

  const t = {
    name: ar ? "الاسم" : "Name",
    company: ar ? "الجهة" : "Company",
    email: ar ? "البريد الإلكتروني" : "Email",
    phone: ar ? "الهاتف" : "Phone",
    type: ar ? "نوع المشروع" : "Project type",
    brief: ar ? "موجز المشروع" : "Brief",
    optional: ar ? "(اختياري)" : "(optional)",
    namePh: ar ? "الاسم الكامل" : "Full name",
    companyPh: ar ? "الشركة أو الجهة" : "Company or entity",
    briefPh: ar
      ? "نطاق العمل، المخططات المتوفرة، التواريخ المستهدفة…"
      : "Scope, drawings available, target dates…",
    submit: ar ? "إرسال الطلب" : "Send request",
    sending: ar ? "جارٍ الإرسال…" : "Sending…",
    sentTitle: ar ? "تم إرسال طلبك" : "Request sent",
    // Not "تعذّر إرسال الطلب", which is how the sentence under it already
    // opens — the two would run together and say the same words twice. The
    // English pair reads the same way round: a flat "Request not sent" over a
    // body that explains it in different words.
    failedTitle: ar ? "لم يُرسَل الطلب" : "Request not sent",
    dismiss: ar ? "إغلاق الإشعار" : "Dismiss notification",
  };

  /** The one sentence that says an enquiry arrived. Written once: the notice
   *  announces it, the line under the button keeps it. */
  const sentBody = ar
    ? "وصلنا طلبك. سيعود إليك فريقنا في الرياض خلال يوم عمل واحد."
    : "Your enquiry has reached us. Our Riyadh team will come back to you within one working day.";

  /** Likewise for the failure, fallback link and all. */
  const failedBody = ar ? (
    <>
      تعذّر إرسال الطلب — قد تكون المشكلة في الاتصال. بياناتك ما تزال في النموذج:{" "}
      <a href={fallbackHref}>أرسلها عبر بريدك</a> أو راسلنا على{" "}
      <a href={`mailto:${INBOX}`}>{INBOX}</a>.
    </>
  ) : (
    <>
      We couldn’t send that — it may be your connection. Nothing is lost:{" "}
      <a href={fallbackHref}>send it from your email app</a> instead, or write to{" "}
      <a href={`mailto:${INBOX}`}>{INBOX}</a>.
    </>
  );

  // Each message says what to do next, not just that something is wrong.
  const missingName = ar ? "أدخل اسمك حتى نعرف بمن نتواصل." : "Enter your name so we know who to reply to.";
  const missingEmail = ar
    ? "أدخل بريدك الإلكتروني حتى نتمكّن من الرد."
    : "Enter your email address so we can reply.";
  const badEmail = ar
    ? "أدخل بريدًا إلكترونيًا صحيحًا، مثل name@company.com"
    : "Enter a valid email address, for example name@company.com";
  const missingBrief = ar
    ? "صف المشروع باختصار — نطاق العمل أو المخططات المتوفرة يكفي للبدء."
    : "Describe the project briefly — the scope or the drawings you have is enough to start.";

  const validate = (data: FormData): Errors => {
    const next: Errors = {};
    const get = (k: FieldName) => String(data.get(k) ?? "").trim();

    if (!get("name")) next.name = missingName;
    if (!get("email")) next.email = missingEmail;
    else if (!/^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(get("email"))) next.email = badEmail;
    if (!get("brief")) next.brief = missingBrief;

    return next;
  };

  const onSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (status === "sending") return;

    const data = new FormData(event.currentTarget);
    const found = validate(data);
    setErrors(found);

    // Move the caret to the first thing that needs fixing rather than leaving
    // the visitor to hunt for the red border.
    const first = (["name", "email", "brief"] as FieldName[]).find((n) => found[n]);
    if (first) {
      setStatus("idle");
      formRef.current?.querySelector<HTMLElement>(`#${CSS.escape(fid(first))}`)?.focus();
      return;
    }

    const get = (k: FieldName) => String(data.get(k) ?? "").trim();

    // Spam guards. A filled trap field or an instant submission is a script,
    // and both are answered with the ordinary success state rather than an
    // error — telling a bot which check caught it only helps it past the next.
    const trapped = String(data.get(TRAP_FIELD) ?? "").trim().length > 0;
    const tooFast = Date.now() - mountedAt.current < MIN_FILL_MS;
    if (trapped || tooFast) {
      setStatus("sent");
      setNoticeOpen(true);
      return;
    }

    const enquiry: Enquiry = {
      name: get("name"),
      company: get("company"),
      email: get("email"),
      phone: get("phone"),
      projectType: get("projectType"),
      brief: get("brief"),
      lang: ar ? "ar" : "en",
      source: typeof window === "undefined" ? "" : window.location.pathname,
    };

    setStatus("sending");
    try {
      await sendEnquiry(enquiry);
      setStatus("sent");
      formRef.current?.reset();
    } catch {
      // Nothing is lost: the brief stays in the fields, and the fallback link
      // below carries it into the visitor's mail client already written out.
      setFallbackHref(mailtoFallback(enquiry));
      setStatus("failed");
    }
    // Raised for either outcome. A visitor who pressed Send is owed an answer
    // as plainly when it failed as when it worked.
    setNoticeOpen(true);
  };

  const fieldClass = (n: FieldName) =>
    [styles.field, errors[n] ? styles.invalid : ""].filter(Boolean).join(" ");

  const describedBy = (n: FieldName) => (errors[n] ? eid(n) : undefined);

  return (
    <form ref={formRef} className={styles.form} onSubmit={onSubmit} noValidate>
      <div className={styles.pair}>
        <div className={styles.label}>
          <label className={styles.labelText} htmlFor={fid("name")}>
            {t.name}
          </label>
          <input
            id={fid("name")}
            name="name"
            type="text"
            autoComplete="name"
            required
            aria-invalid={errors.name ? true : undefined}
            aria-describedby={describedBy("name")}
            placeholder={t.namePh}
            className={fieldClass("name")}
          />
          {errors.name && (
            <span id={eid("name")} className={styles.error}>
              {errors.name}
            </span>
          )}
        </div>

        <div className={styles.label}>
          <label className={styles.labelText} htmlFor={fid("company")}>
            {t.company} <span className={styles.optional}>{t.optional}</span>
          </label>
          <input
            id={fid("company")}
            name="company"
            type="text"
            autoComplete="organization"
            placeholder={t.companyPh}
            className={styles.field}
          />
        </div>
      </div>

      <div className={styles.pair}>
        <div className={styles.label}>
          <label className={styles.labelText} htmlFor={fid("email")}>
            {t.email}
          </label>
          <input
            id={fid("email")}
            name="email"
            type="email"
            dir="ltr"
            inputMode="email"
            autoComplete="email"
            spellCheck={false}
            autoCapitalize="off"
            required
            aria-invalid={errors.email ? true : undefined}
            aria-describedby={describedBy("email")}
            placeholder="name@company.com"
            className={fieldClass("email")}
          />
          {errors.email && (
            <span id={eid("email")} className={styles.error}>
              {errors.email}
            </span>
          )}
        </div>

        <div className={styles.label}>
          <label className={styles.labelText} htmlFor={fid("phone")}>
            {t.phone} <span className={styles.optional}>{t.optional}</span>
          </label>
          <input
            id={fid("phone")}
            name="phone"
            type="tel"
            dir="ltr"
            inputMode="tel"
            autoComplete="tel"
            spellCheck={false}
            placeholder="+966 5X XXX XXXX"
            className={styles.field}
          />
        </div>
      </div>

      <div className={styles.label}>
        <label className={styles.labelText} htmlFor={fid("projectType")}>
          {t.type}
        </label>
        <select
          id={fid("projectType")}
          name="projectType"
          defaultValue={ar ? PROJECT_TYPES[0][1] : PROJECT_TYPES[0][0]}
          className={`${styles.field} ${styles.select}`}
        >
          {PROJECT_TYPES.map(([en, arabic]) => (
            <option key={en} value={ar ? arabic : en}>
              {ar ? arabic : en}
            </option>
          ))}
        </select>
      </div>

      <div className={styles.label}>
        <label className={styles.labelText} htmlFor={fid("brief")}>
          {t.brief}
        </label>
        <textarea
          id={fid("brief")}
          name="brief"
          rows={5}
          required
          aria-invalid={errors.brief ? true : undefined}
          aria-describedby={describedBy("brief")}
          placeholder={t.briefPh}
          className={`${fieldClass("brief")} ${styles.textarea}`}
        />
        {errors.brief && (
          <span id={eid("brief")} className={styles.error}>
            {errors.brief}
          </span>
        )}
        {/* The brief used to be capped at 1,200 characters, because a `mailto:`
            URL is truncated past roughly 2,000 and percent-encoding triples
            every space. Posting has no such ceiling, so the cap is gone and
            with it the counter that policed it. */}
      </div>

      {/* Honeypot. Off-screen rather than display:none — some bots skip
          anything that is not rendered — and hidden from assistive tech and
          from tabbing, so nobody using the form ever meets it. */}
      <div className={styles.trap} aria-hidden="true">
        <label htmlFor={`${uid}-${TRAP_FIELD}`}>
          {ar ? "لا تملأ هذا الحقل" : "Do not fill this in"}
        </label>
        <input
          id={`${uid}-${TRAP_FIELD}`}
          name={TRAP_FIELD}
          type="text"
          tabIndex={-1}
          autoComplete="off"
          defaultValue=""
        />
      </div>

      {/* Enabled until the request actually starts, then disabled with the
          label carrying the state — there is no separate spinner to miss. */}
      <button type="submit" className={styles.submit} disabled={status === "sending"}>
        {status === "sending" ? t.sending : t.submit}
      </button>

      {/* The record of what happened. No longer a live region: the notice
          below announces the outcome, and having both would say it twice to
          anyone listening. The fallback link still lives here, so dismissing
          the notice never takes it away. */}
      <p className={styles.status}>
        {status === "sent" ? (
          <span className={styles.statusNote}>{sentBody}</span>
        ) : status === "failed" ? (
          <span className={styles.statusNote}>{failedBody}</span>
        ) : ENQUIRY_ENDPOINT ? (
          ar
            ? "نقرأ كل طلب بأنفسنا، ونعود إليك خلال يوم عمل واحد."
            : "We read every enquiry ourselves, and reply within one working day."
        ) : (
          // The endpoint is not configured yet. Say so plainly rather than
          // letting a visitor press a button that cannot work.
          <>
            {ar ? "راسلنا مباشرة على " : "Write to us directly at "}
            <a href={`mailto:${INBOX}`}>{INBOX}</a>.
          </>
        )}
      </p>

      {/* Portalled to <body> so the notice is positioned against the viewport
          whatever the form happens to be nested in — a transformed or
          overflow-clipped ancestor would otherwise capture a fixed element
          and strand it mid-page.

          No "have we mounted yet" guard: `noticeOpen` only ever turns true in
          a submit handler, so by the time this runs there is a document to
          portal into and nothing was rendered on the server to mismatch. */}
      {noticeOpen &&
        (status === "sent" || status === "failed") &&
        createPortal(
          <div
            className={`${styles.notice} ${status === "sent" ? styles.noticeOk : styles.noticeBad}`}
            // Polite for the success, assertive for the failure: one is news
            // that can wait for a pause, the other is something the visitor
            // has to act on before they leave the page.
            role={status === "sent" ? "status" : "alert"}
            aria-live={status === "sent" ? "polite" : "assertive"}
          >
            <div className={styles.noticeBody}>
              <strong className={styles.noticeTitle}>
                {status === "sent" ? t.sentTitle : t.failedTitle}
              </strong>
              <span className={styles.noticeText}>
                {status === "sent" ? sentBody : failedBody}
              </span>
            </div>
            <button
              type="button"
              className={styles.noticeClose}
              onClick={closeNotice}
              aria-label={t.dismiss}
            >
              {/* Drawn rather than typed: a multiplication sign renders at a
                  different weight in the Arabic and Latin faces. */}
              <svg viewBox="0 0 16 16" width="14" height="14" aria-hidden="true" focusable="false">
                <path
                  d="M3 3l10 10M13 3L3 13"
                  stroke="currentColor"
                  strokeWidth="1.4"
                  fill="none"
                />
              </svg>
            </button>
          </div>,
          document.body,
        )}
    </form>
  );
}
