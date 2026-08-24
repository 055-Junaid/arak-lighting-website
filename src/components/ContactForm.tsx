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

export function ContactForm() {
  const { lang } = useLang();
  const [sent, setSent] = useState(false);

  const submitLabel = sent
    ? lang === "ar"
      ? "تم إرسال الطلب ✓"
      : "Request sent ✓"
    : lang === "ar"
      ? "إرسال الطلب"
      : "Send request";

  return (
    <div style={{ display: "flex", flexDirection: "column", gap: "22px" }}>
      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "22px" }}>
        <label style={{ display: "flex", flexDirection: "column", gap: "10px" }}>
          <span style={labelStyle}>Name</span>
          <input type="text" placeholder="Full name" style={fieldStyle} className={styles.field} />
        </label>
        <label style={{ display: "flex", flexDirection: "column", gap: "10px" }}>
          <span style={labelStyle}>Company</span>
          <input type="text" placeholder="Company or entity" style={fieldStyle} className={styles.field} />
        </label>
      </div>
      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "22px" }}>
        <label style={{ display: "flex", flexDirection: "column", gap: "10px" }}>
          <span style={labelStyle}>Email</span>
          <input type="email" placeholder="name@company.com" style={fieldStyle} className={styles.field} />
        </label>
        <label style={{ display: "flex", flexDirection: "column", gap: "10px" }}>
          <span style={labelStyle}>Phone</span>
          <input type="tel" placeholder="+966" style={fieldStyle} className={styles.field} />
        </label>
      </div>
      <label style={{ display: "flex", flexDirection: "column", gap: "10px" }}>
        <span style={labelStyle}>Project type</span>
        <select style={{ ...fieldStyle, background: "#FFFFFF" }} className={styles.field}>
          <option>Hotel / hospitality</option>
          <option>Villa / palace</option>
          <option>Commercial / office</option>
          <option>Government / institutional</option>
          <option>Industrial</option>
          <option>Outdoor / facade</option>
          <option>Controls &amp; automation only</option>
        </select>
      </label>
      <label style={{ display: "flex", flexDirection: "column", gap: "10px" }}>
        <span style={labelStyle}>Brief</span>
        <textarea
          rows={5}
          placeholder="Scope, drawings available, target dates"
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
