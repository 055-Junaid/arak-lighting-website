"use client";

import Image from "next/image";
import Link from "next/link";
import { useLang } from "@/lib/lang";
import { SOCIALS, MAPS_PLACE_URL } from "@/lib/social-data";
import styles from "./Footer.module.css";

export function Footer() {
  const { lang } = useLang();

  return (
    <footer style={{ borderTop: "1px solid rgba(17,17,17,.13)", background: "#F6F5F3" }}>
      <div style={{ maxWidth: "1360px", margin: "0 auto", padding: "80px 48px 44px" }}>
        <div style={{ display: "grid", gridTemplateColumns: "1.4fr 1fr 1fr 1fr", gap: "60px" }}>
          <div>
            <Image
              src="/arak-logo-black.png"
              alt="ARAK Lighting Solutions"
              height={54}
              width={223}
              style={{ height: "54px", width: "auto" }}
            />
            <p style={{ font: "400 15px/1.7 var(--font-plex-sans),sans-serif", color: "rgba(17,17,17,.58)", margin: "26px 0 0", maxWidth: "34ch" }}>
              {lang === "ar"
                ? "شركة إضاءة ومزوّد لحلول الإضاءة الذكية، الرياض، المملكة العربية السعودية. منذ عام ١٩٧٦."
                : "A Lighting Company and Smart Lighting Solutions Provider, Riyadh, Kingdom of Saudi Arabia. Since 1976."}
            </p>
            <div className={styles.socials}>
              {SOCIALS.map((s) => (
                <a
                  key={s.name}
                  href={s.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={`${s.name} — ${s.handle}`}
                  title={`${s.name} — ${s.handle}`}
                  className={styles.social}
                >
                  <svg viewBox="0 0 24 24" aria-hidden="true" focusable="false">
                    <path d={s.path} />
                  </svg>
                </a>
              ))}
            </div>
          </div>
          <div style={{ display: "flex", flexDirection: "column", gap: "14px" }}>
            <span style={{ font: "500 11px/1 var(--font-plex-sans),sans-serif", letterSpacing: ".2em", textTransform: "uppercase", color: "rgba(17,17,17,.68)", marginBottom: "6px" }}>
              {lang === "ar" ? "الموقع" : "Site"}
            </span>
            <Link href="/" style={{ font: "400 15px/1 var(--font-plex-sans),sans-serif", color: "rgba(17,17,17,.72)", cursor: "pointer" }} className={styles.link}>
              {lang === "ar" ? "الرئيسية" : "Home"}
            </Link>
            <Link href="/about" style={{ font: "400 15px/1 var(--font-plex-sans),sans-serif", color: "rgba(17,17,17,.72)", cursor: "pointer" }} className={styles.link}>
              {lang === "ar" ? "عن الشركة" : "About"}
            </Link>
            <Link href="/services" style={{ font: "400 15px/1 var(--font-plex-sans),sans-serif", color: "rgba(17,17,17,.72)", cursor: "pointer" }} className={styles.link}>
              {lang === "ar" ? "خدماتنا" : "Services"}
            </Link>
            <Link href="/projects" style={{ font: "400 15px/1 var(--font-plex-sans),sans-serif", color: "rgba(17,17,17,.72)", cursor: "pointer" }} className={styles.link}>
              {lang === "ar" ? "مشاريعنا" : "Projects"}
            </Link>
            <Link href="/contact" style={{ font: "400 15px/1 var(--font-plex-sans),sans-serif", color: "rgba(17,17,17,.72)", cursor: "pointer" }} className={styles.link}>
              {lang === "ar" ? "اتصل بنا" : "Contact"}
            </Link>
          </div>
          <div style={{ display: "flex", flexDirection: "column", gap: "14px" }}>
            <span style={{ font: "500 11px/1 var(--font-plex-sans),sans-serif", letterSpacing: ".2em", textTransform: "uppercase", color: "rgba(17,17,17,.68)", marginBottom: "6px" }}>
              {lang === "ar" ? "الخدمات" : "Services"}
            </span>
            <span style={{ font: "400 15px/1 var(--font-plex-sans),sans-serif", color: "rgba(17,17,17,.72)" }}>{lang === "ar" ? "الإضاءة الداخلية والخارجية" : "Indoor & outdoor lighting"}</span>
            <span style={{ font: "400 15px/1 var(--font-plex-sans),sans-serif", color: "rgba(17,17,17,.72)" }}>{lang === "ar" ? "تصميم الإضاءة" : "Lighting design"}</span>
            <span style={{ font: "400 15px/1 var(--font-plex-sans),sans-serif", color: "rgba(17,17,17,.72)" }}>{lang === "ar" ? "إضاءة الواجهات" : "Facade lighting"}</span>
            <span style={{ font: "400 15px/1 var(--font-plex-sans),sans-serif", color: "rgba(17,17,17,.72)" }}>{lang === "ar" ? "أنظمة التحكم KNX" : "KNX lighting controls"}</span>
            <span style={{ font: "400 15px/1 var(--font-plex-sans),sans-serif", color: "rgba(17,17,17,.72)" }}>{lang === "ar" ? "الأتمتة المنزلية" : "Home automation"}</span>
            <Link href="/services/smart-poles" style={{ font: "400 15px/1 var(--font-plex-sans),sans-serif", color: "rgba(17,17,17,.72)", cursor: "pointer" }} className={styles.link}>
              {lang === "ar" ? "الأعمدة الذكية" : "Smart poles"}
            </Link>
          </div>
          <div style={{ display: "flex", flexDirection: "column", gap: "14px" }}>
            <span style={{ font: "500 11px/1 var(--font-plex-sans),sans-serif", letterSpacing: ".2em", textTransform: "uppercase", color: "rgba(17,17,17,.68)", marginBottom: "6px" }}>
              {lang === "ar" ? "تواصل معنا" : "Contact"}
            </span>
            <a
              href={MAPS_PLACE_URL}
              target="_blank"
              rel="noopener noreferrer"
              style={{ font: "400 15px/1.6 var(--font-plex-sans),sans-serif", color: "rgba(17,17,17,.72)", cursor: "pointer" }}
              className={styles.link}
            >
              {lang === "ar"
                ? "مخرج ٢، طريق الدائري الشمالي الفرعي، حطين، الرياض ١٣٥١٣"
                : "Exit 2, Northern Ring Branch Road, Hittin, Riyadh 13513"}
            </a>
            <a href={MAPS_PLACE_URL} target="_blank" rel="noopener noreferrer" className={styles.mapCue}>
              {lang === "ar" ? "عرض على الخريطة ↖" : "View on map ↗"}
            </a>
            <a href="tel:+966114411131" dir="ltr" style={{ font: "400 15px/1 var(--font-plex-sans),sans-serif", color: "rgba(17,17,17,.72)" }} className={styles.link}>
              +966 11 441 1131
            </a>
            <a href="mailto:info@arak-sa.com" style={{ font: "400 15px/1 var(--font-plex-sans),sans-serif", color: "rgba(17,17,17,.72)" }} className={styles.link}>
              info@arak-sa.com
            </a>
          </div>
        </div>
        <div style={{ marginTop: "64px", paddingTop: "26px", borderTop: "1px solid rgba(17,17,17,.13)", display: "flex", justifyContent: "space-between", gap: "24px", flexWrap: "wrap" }}>
          <span style={{ font: "400 13px/1 var(--font-plex-sans),sans-serif", color: "rgba(17,17,17,.58)" }}>
            {lang === "ar"
              ? "© 2026 أراك لحلول الإضاءة. جميع الحقوق محفوظة."
              : "© 2026 ARAK Lighting Solutions. All rights reserved."}
          </span>
          <span style={{ font: "400 13px/1 var(--font-plex-sans),sans-serif", color: "rgba(17,17,17,.58)" }}>
            {lang === "ar" ? "الرياض، المملكة العربية السعودية" : "Riyadh, Kingdom of Saudi Arabia"}
          </span>
        </div>
      </div>
    </footer>
  );
}
