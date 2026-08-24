"use client";

import { useState } from "react";
import { useLang } from "@/lib/lang";
import styles from "./ContactForm.module.css";

const fieldStyle = {
  background: "transparent",
  border: "1px solid rgba(17,17,17,.2)",
  color: "#111111",
  font: "400 16px/1 var(--font-plex-sans),sans-serif",
  padding: "17px 16px",
  outline: "none",
} as const;

const labelStyle = {
  font: "500 11px/1 var(--font-plex-sans),sans-serif",
  letterSpacing: ".2em",
  textTransform: "uppercase",
  color: "rgba(17,17,17,.58)",
} as const;

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

export function ContactForm() {
  const { lang } = useLang();
  const ar = lang === "ar";
  const [sent, setSent] = useState(false);

  const submitLabel = sent
    ? ar
      ? "تم إرسال الطلب ✓"
      : "Request sent ✓"
    : ar
      ? "إرسال الطلب"
      : "Send request";

  return (
    <div style={{ display: "flex", flexDirection: "column", gap: "22px" }}>
      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "22px" }}>
        <label style={{ display: "flex", flexDirection: "column", gap: "10px" }}>
          <span style={labelStyle}>{ar ? "الاسم" : "Name"}</span>
          <input type="text" placeholder={ar ? "الاسم الكامل" : "Full name"} style={fieldStyle} className={styles.field} />
        </label>
        <label style={{ display: "flex", flexDirection: "column", gap: "10px" }}>
          <span style={labelStyle}>{ar ? "الجهة" : "Company"}</span>
          <input type="text" placeholder={ar ? "الشركة أو الجهة" : "Company or entity"} style={fieldStyle} className={styles.field} />
        </label>
      </div>
      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "22px" }}>
        <label style={{ display: "flex", flexDirection: "column", gap: "10px" }}>
          <span style={labelStyle}>{ar ? "البريد الإلكتروني" : "Email"}</span>
          <input type="email" dir="ltr" placeholder="name@company.com" style={fieldStyle} className={styles.field} />
        </label>
        <label style={{ display: "flex", flexDirection: "column", gap: "10px" }}>
          <span style={labelStyle}>{ar ? "الهاتف" : "Phone"}</span>
          <input type="tel" dir="ltr" placeholder="+966" style={fieldStyle} className={styles.field} />
        </label>
      </div>
      <label style={{ display: "flex", flexDirection: "column", gap: "10px" }}>
        <span style={labelStyle}>{ar ? "نوع المشروع" : "Project type"}</span>
        <select style={{ ...fieldStyle, background: "#FFFFFF" }} className={styles.field}>
          {PROJECT_TYPES.map(([en, arabic]) => (
            <option key={en}>{ar ? arabic : en}</option>
          ))}
        </select>
      </label>
      <label style={{ display: "flex", flexDirection: "column", gap: "10px" }}>
        <span style={labelStyle}>{ar ? "موجز المشروع" : "Brief"}</span>
        <textarea
          rows={5}
          placeholder={
            ar ? "نطاق العمل، المخططات المتوفرة، التواريخ المستهدفة" : "Scope, drawings available, target dates"
          }
          style={{ ...fieldStyle, font: "400 16px/1.6 var(--font-plex-sans),sans-serif", resize: "vertical" }}
          className={styles.field}
        />
      </label>
      <span
        onClick={() => setSent(true)}
        style={{
          font: "500 12px/1 var(--font-plex-sans),sans-serif",
          letterSpacing: ".14em",
          textTransform: "uppercase",
          color: "#FFFFFF",
          background: "#111111",
          padding: "20px 32px",
          cursor: "pointer",
          alignSelf: "flex-start",
          marginTop: "8px",
        }}
        className={styles.submit}
      >
        {submitLabel}
      </span>
    </div>
  );
}
