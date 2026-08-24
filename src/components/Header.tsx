"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useLang } from "@/lib/lang";
import styles from "./Header.module.css";

const ON = "#111111";
const OFF = "rgba(17,17,17,.55)";

export function Header() {
  const pathname = usePathname();
  const { lang, toggleLang } = useLang();
  const langDirLabel = lang === "ar" ? "EN" : "ع";

  const colorFor = (path: string) => (pathname === path ? ON : OFF);

  return (
    <header
      style={{
        position: "sticky",
        top: 0,
        zIndex: 60,
        background: "rgba(255,255,255,.88)",
        backdropFilter: "blur(14px)",
        borderBottom: "1px solid rgba(17,17,17,.13)",
      }}
    >
      <div
        style={{
          maxWidth: "1360px",
          margin: "0 auto",
          padding: "0 clamp(24px,3vw,48px)",
          height: "82px",
          display: "flex",
          alignItems: "center",
          gap: "clamp(20px,2.5vw,40px)",
        }}
      >
        <Link href="/" style={{ height: 58, flex: "none", display: "flex", alignItems: "center" }}>
          <Image
            src="/arak-logo-black.png"
            alt="ARAK Lighting Solutions"
            height={58}
            width={239}
            style={{ height: "58px", width: "auto", cursor: "pointer" }}
            priority
          />
        </Link>
        <nav
          style={{
            display: "flex",
            alignItems: "center",
            gap: "clamp(18px,2vw,34px)",
            marginInlineStart: "auto",
            minWidth: 0,
            overflow: "hidden",
          }}
        >
          <Link
            href="/"
            style={{
              font: "500 12px/1 var(--font-plex-sans),sans-serif",
              letterSpacing: ".16em",
              textTransform: "uppercase",
              cursor: "pointer",
              color: colorFor("/"),
            }}
            className={styles.navLink}
          >
            {lang === "ar" ? "الرئيسية" : "Home"}
          </Link>
          <Link
            href="/about"
            style={{
              font: "500 12px/1 var(--font-plex-sans),sans-serif",
              letterSpacing: ".16em",
              textTransform: "uppercase",
              cursor: "pointer",
              color: colorFor("/about"),
            }}
            className={styles.navLink}
          >
            {lang === "ar" ? "عن الشركة" : "About"}
          </Link>
          <Link
            href="/services"
            style={{
              font: "500 12px/1 var(--font-plex-sans),sans-serif",
              letterSpacing: ".16em",
              textTransform: "uppercase",
              cursor: "pointer",
              color: colorFor("/services"),
            }}
            className={styles.navLink}
          >
            {lang === "ar" ? "خدماتنا" : "Services"}
          </Link>
          <Link
            href="/projects"
            style={{
              font: "500 12px/1 var(--font-plex-sans),sans-serif",
              letterSpacing: ".16em",
              textTransform: "uppercase",
              cursor: "pointer",
              color: colorFor("/projects"),
            }}
            className={styles.navLink}
          >
            {lang === "ar" ? "مشاريعنا" : "Projects"}
          </Link>
          <Link
            href="/contact"
            style={{
              font: "500 12px/1 var(--font-plex-sans),sans-serif",
              letterSpacing: ".16em",
              textTransform: "uppercase",
              cursor: "pointer",
              color: colorFor("/contact"),
            }}
            className={styles.navLink}
          >
            {lang === "ar" ? "اتصل بنا" : "Contact"}
          </Link>
        </nav>
        <div style={{ display: "flex", alignItems: "center", gap: "clamp(10px,1.2vw,18px)", flex: "none" }}>
          <button
            type="button"
            onClick={toggleLang}
            style={{
              font: "500 15px/1 var(--font-plex-sans-arabic),var(--font-plex-sans),sans-serif",
              letterSpacing: ".08em",
              color: "rgba(17,17,17,.7)",
              cursor: "pointer",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              minWidth: "40px",
              height: "34px",
              padding: "0 10px",
              border: "1px solid rgba(17,17,17,.16)",
              background: "transparent",
            }}
            className={styles.langToggle}
          >
            {langDirLabel}
          </button>
          <Link
            href="/contact"
            style={{
              font: "500 12px/1 var(--font-plex-sans),sans-serif",
              letterSpacing: ".14em",
              textTransform: "uppercase",
              color: "#FFFFFF",
              background: "#111111",
              padding: "14px 20px",
              cursor: "pointer",
              display: "inline-block",
              whiteSpace: "nowrap",
            }}
            className={styles.cta}
          >
            {lang === "ar" ? "احجز استشارة إضاءة" : "Book a consultation"}
          </Link>
        </div>
      </div>
    </header>
  );
}
