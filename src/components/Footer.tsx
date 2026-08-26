"use client";

import Image from "next/image";
import Link from "next/link";
import { useLang } from "@/lib/lang";
import { localePath } from "@/lib/site";
import { SOCIALS, MAPS_PLACE_URL } from "@/lib/social-data";
import styles from "./Footer.module.css";

const SITE_LINKS = [
  { href: "/", en: "Home", ar: "الرئيسية" },
  { href: "/about", en: "About", ar: "عن الشركة" },
  { href: "/services", en: "Services", ar: "خدماتنا" },
  { href: "/projects", en: "Projects", ar: "مشاريعنا" },
  { href: "/contact", en: "Contact", ar: "اتصل بنا" },
] as const;

/** Plain text, not links: these name service lines rather than route to them. */
const SERVICE_ITEMS = [
  { en: "Indoor & outdoor lighting", ar: "الإضاءة الداخلية والخارجية" },
  { en: "Lighting design", ar: "تصميم الإضاءة" },
  { en: "Facade lighting", ar: "إضاءة الواجهات" },
  { en: "KNX lighting controls", ar: "أنظمة التحكم KNX" },
  { en: "Home automation", ar: "الأتمتة المنزلية" },
] as const;

export function Footer() {
  const { lang } = useLang();
  const ar = lang === "ar";

  return (
    <footer className={styles.footer}>
      <div className={styles.inner}>
        <div className={styles.grid}>
          <div className={styles.brand}>
            <Image src="/arak-logo-black.png" alt="ARAK Lighting Solutions" height={54} width={154} />
            <p>
              {ar
                ? "شركة إضاءة ومزوّد لحلول الإضاءة الذكية، الرياض، المملكة العربية السعودية. منذ عام 1976."
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

          <nav className={styles.col} aria-label={ar ? "روابط الموقع" : "Site"}>
            <span className={styles.colHead}>{ar ? "الموقع" : "Site"}</span>
            {SITE_LINKS.map((l) => (
              <Link key={l.href} href={localePath(l.href, lang)} className={styles.link}>
                {ar ? l.ar : l.en}
              </Link>
            ))}
          </nav>

          <div className={styles.col}>
            <span className={styles.colHead}>{ar ? "الخدمات" : "Services"}</span>
            {SERVICE_ITEMS.map((s) => (
              <span key={s.en} className={styles.item}>
                {ar ? s.ar : s.en}
              </span>
            ))}
            <Link href={localePath("/services/smart-poles", lang)} className={styles.link}>
              {ar ? "الأعمدة الذكية" : "Smart poles"}
            </Link>
          </div>

          <div className={styles.col}>
            <span className={styles.colHead}>{ar ? "تواصل معنا" : "Contact"}</span>
            <a
              href={MAPS_PLACE_URL}
              target="_blank"
              rel="noopener noreferrer"
              className={styles.link}
            >
              {ar
                ? "مخرج 2، طريق الدائري الشمالي الفرعي، حطين، الرياض 13513"
                : "Exit 2, Northern Ring Branch Road, Hittin, Riyadh 13513"}
            </a>
            <a href={MAPS_PLACE_URL} target="_blank" rel="noopener noreferrer" className={styles.mapCue}>
              {ar ? "عرض على الخريطة" : "View on map"}
            </a>
            <a href="tel:+966114411131" dir="ltr" className={styles.link}>
              +966 11 441 1131
            </a>
            <a href="mailto:info@arak-sa.com" className={styles.link}>
              info@arak-sa.com
            </a>
          </div>
        </div>

        <div className={styles.legal}>
          <span>
            {ar
              ? "© 2026 أراك لحلول الإضاءة. جميع الحقوق محفوظة."
              : "© 2026 ARAK Lighting Solutions. All rights reserved."}
          </span>
          <span>{ar ? "الرياض، المملكة العربية السعودية" : "Riyadh, Kingdom of Saudi Arabia"}</span>
        </div>
      </div>
    </footer>
  );
}
