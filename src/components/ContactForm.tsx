"use client";

import { useId, useRef, useState, type FormEvent } from "react";
import { useLang } from "@/lib/lang";
import styles from "./ContactForm.module.css";

/** Where enquiries are addressed. Matches the address published on this page. */
const INBOX = "info@arak-sa.com";

/**
 * Ceiling on the brief. Some mail clients stop reading a `mailto:` URL at
 * around 2,000 characters, and percent-encoding roughly triples every space
 * and newline — so the raw text has to stay well under that to survive the
 * trip intact. The rest of the message is about 250 encoded characters.
 */
const BRIEF_MAX = 1200;

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

/**
 * The enquiry form. Submitting composes the message and hands it to the
 * visitor's own mail client through a `mailto:` link — nothing is posted to a
 * server, so there is no inbox to monitor and no delivery to fail silently.
 * The trade-off is that the send is finished in the visitor's mail app, which
 * is what the status line under the button explains.
 */
export function ContactForm() {
  const { lang } = useLang();
  const ar = lang === "ar";
  const uid = useId();
  const formRef = useRef<HTMLFormElement>(null);
  const [errors, setErrors] = useState<Errors>({});
  const [handedOff, setHandedOff] = useState(false);
  const [briefLength, setBriefLength] = useState(0);

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
  };

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

  const onSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    const found = validate(data);
    setErrors(found);

    // Move the caret to the first thing that needs fixing rather than leaving
    // the visitor to hunt for the red border.
    const first = (["name", "email", "brief"] as FieldName[]).find((n) => found[n]);
    if (first) {
      setHandedOff(false);
      formRef.current?.querySelector<HTMLElement>(`#${CSS.escape(fid(first))}`)?.focus();
      return;
    }

    const get = (k: FieldName) => String(data.get(k) ?? "").trim();
    const line = (label: string, value: string) => (value ? `${label}: ${value}\n` : "");

    const subject = ar
      ? `طلب استشارة إضاءة — ${get("projectType")}`
      : `Lighting enquiry — ${get("projectType")}`;

    const body = ar
      ? `الاسم: ${get("name")}\n` +
        line("الجهة", get("company")) +
        `البريد الإلكتروني: ${get("email")}\n` +
        line("الهاتف", get("phone")) +
        `نوع المشروع: ${get("projectType")}\n\n` +
        `موجز المشروع:\n${get("brief")}\n`
      : `Name: ${get("name")}\n` +
        line("Company", get("company")) +
        `Email: ${get("email")}\n` +
        line("Phone", get("phone")) +
        `Project type: ${get("projectType")}\n\n` +
        `Brief:\n${get("brief")}\n`;

    // encodeURIComponent leaves newlines as %0A, which every mail client
    // accepts in a mailto body.
    window.location.href = `mailto:${INBOX}?subject=${encodeURIComponent(
      subject
    )}&body=${encodeURIComponent(body)}`;

    setHandedOff(true);
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
          maxLength={BRIEF_MAX}
          onChange={(e) => setBriefLength(e.currentTarget.value.length)}
          aria-invalid={errors.brief ? true : undefined}
          aria-describedby={
            [describedBy("brief"), briefLength > BRIEF_MAX - 200 ? eid("brief") + "-count" : null]
              .filter(Boolean)
              .join(" ") || undefined
          }
          placeholder={t.briefPh}
          className={`${fieldClass("brief")} ${styles.textarea}`}
        />
        {errors.brief && (
          <span id={eid("brief")} className={styles.error}>
            {errors.brief}
          </span>
        )}
        {/* Only surfaces near the ceiling. A mailto: URL is capped at roughly
            2,000 characters in some mail clients, and a brief that overran it
            would be truncated with nothing to show for it. */}
        {briefLength > BRIEF_MAX - 200 && (
          <span id={eid("brief") + "-count"} className={styles.count} aria-live="polite">
            {ar
              ? `بقي ${BRIEF_MAX - briefLength} حرفًا. للمواصفات الأطول، أرفق ملفًا برسالتك.`
              : `${BRIEF_MAX - briefLength} characters left. For anything longer, attach a file to the email instead.`}
          </span>
        )}
      </div>

      <button type="submit" className={styles.submit}>
        {t.submit}
      </button>

      {/* Announced rather than merely shown: handing off to a mail client is
          not something the page can confirm, so say exactly what happened and
          give the address as a fallback if nothing opened. */}
      <p className={styles.status} role="status" aria-live="polite">
        {handedOff ? (
          <span className={styles.statusNote}>
            {ar ? (
              <>
                فتحنا تطبيق البريد لديك ورسالتك جاهزة — اضغط إرسال لإتمام الطلب. إن لم يفتح، راسلنا
                مباشرة على <a href={`mailto:${INBOX}`}>{INBOX}</a>.
              </>
            ) : (
              <>
                Your email app should have opened with the message ready — press send there to
                finish. If nothing opened, write to <a href={`mailto:${INBOX}`}>{INBOX}</a> instead.
              </>
            )}
          </span>
        ) : (
          <>
            {ar
              ? "يفتح هذا الزر تطبيق البريد لديك برسالة معبّأة مسبقًا، لتراجعها قبل الإرسال."
              : "This opens your own email app with the message filled in, so you can read it over before it sends."}
          </>
        )}
      </p>
    </form>
  );
}
