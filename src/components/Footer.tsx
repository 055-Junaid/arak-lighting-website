"use client";

import Image from "next/image";
import Link from "next/link";
import { useLang } from "@/lib/lang";
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
              A Lighting Company and Smart Lighting Solutions Provider, Riyadh, Kingdom of Saudi Arabia. Since 1976.
            </p>
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
            <span style={{ font: "400 15px/1 var(--font-plex-sans),sans-serif", color: "rgba(17,17,17,.72)" }}>Indoor &amp; outdoor lighting</span>
            <span style={{ font: "400 15px/1 var(--font-plex-sans),sans-serif", color: "rgba(17,17,17,.72)" }}>Lighting design</span>
            <span style={{ font: "400 15px/1 var(--font-plex-sans),sans-serif", color: "rgba(17,17,17,.72)" }}>Facade lighting</span>
            <span style={{ font: "400 15px/1 var(--font-plex-sans),sans-serif", color: "rgba(17,17,17,.72)" }}>KNX lighting controls</span>
            <span style={{ font: "400 15px/1 var(--font-plex-sans),sans-serif", color: "rgba(17,17,17,.72)" }}>Home automation</span>
            <Link href="/services/smart-poles" style={{ font: "400 15px/1 var(--font-plex-sans),sans-serif", color: "rgba(17,17,17,.72)", cursor: "pointer" }} className={styles.link}>
              Smart poles
            </Link>
          </div>
          <div style={{ display: "flex", flexDirection: "column", gap: "14px" }}>
            <span style={{ font: "500 11px/1 var(--font-plex-sans),sans-serif", letterSpacing: ".2em", textTransform: "uppercase", color: "rgba(17,17,17,.68)", marginBottom: "6px" }}>
              {lang === "ar" ? "تواصل معنا" : "Contact"}
            </span>
            <span style={{ font: "400 15px/1.6 var(--font-plex-sans),sans-serif", color: "rgba(17,17,17,.72)" }}>
              Exit 2, Northern Ring Branch Road, Hittin, Riyadh 13513
            </span>
            <a href="tel:+966114411131" style={{ font: "400 15px/1 var(--font-plex-sans),sans-serif", color: "rgba(17,17,17,.72)" }} className={styles.link}>
              +966 11 441 1131
            </a>
            <a href="mailto:info@arak-sa.com" style={{ font: "400 15px/1 var(--font-plex-sans),sans-serif", color: "rgba(17,17,17,.72)" }} className={styles.link}>
              info@arak-sa.com
            </a>
          </div>
        </div>
        <div style={{ marginTop: "64px", paddingTop: "26px", borderTop: "1px solid rgba(17,17,17,.13)", display: "flex", justifyContent: "space-between", gap: "24px", flexWrap: "wrap" }}>
          <span style={{ font: "400 13px/1 var(--font-plex-sans),sans-serif", color: "rgba(17,17,17,.58)" }}>
            © 2026 ARAK Lighting Solutions. All rights reserved.
          </span>
          <span style={{ font: "400 13px/1 var(--font-plex-sans),sans-serif", color: "rgba(17,17,17,.58)" }}>
            Riyadh, Kingdom of Saudi Arabia
          </span>
        </div>
      </div>
    </footer>
  );
}
