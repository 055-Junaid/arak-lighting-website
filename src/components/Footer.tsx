"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useLang } from "@/lib/lang";
import { COMPANY, localePath, routeOf } from "@/lib/site";
import { SOCIALS, MAPS_PLACE_URL } from "@/lib/social-data";
import styles from "./Footer.module.css";

const SITE_LINKS = [
  { href: "/", en: "Home", ar: "الرئيسية" },
  { href: "/about", en: "About", ar: "عن الشركة" },
  { href: "/services", en: "Services", ar: "خدماتنا" },
  { href: "/projects", en: "Projects", ar: "مشاريعنا" },
  { href: "/blogs", en: "Blogs", ar: "المدونة" },
  { href: "/contact", en: "Contact", ar: "اتصل بنا" },
] as const;

/**
 * Every service line, linked. These used to be plain text naming the lines
 * rather than routing to them, which left the line pages with almost no
 * internal links: on 2026-10-20 Google had not indexed lighting design,
 * lighting controls, facade or outdoor lighting in either language. A footer
 * link is on every page, so it is the strongest signal the site can give.
 */
const SERVICE_LINKS = [
  { href: "/services/indoor-lighting", en: "Indoor lighting", ar: "الإضاءة الداخلية" },
  { href: "/services/outdoor-lighting", en: "Outdoor lighting", ar: "الإضاءة الخارجية" },
  { href: "/services/lighting-design", en: "Lighting design consultancy", ar: "استشارات تصميم الإضاءة" },
  { href: "/services/facade-lighting", en: "Facade lighting", ar: "إضاءة الواجهات" },
  { href: "/services/lighting-controls", en: "KNX lighting controls", ar: "أنظمة التحكم بالإضاءة KNX" },
  { href: "/services/home-automation", en: "Home automation and GRMS", ar: "الأتمتة المنزلية وإدارة الغرف" },
  { href: "/services/lighting-installation", en: "Lighting installation", ar: "تركيب الإضاءة" },
  { href: "/services/project-management", en: "Project management", ar: "إدارة المشاريع" },
  { href: "/services/projection-mapping", en: "3D projection mapping", ar: "الإسقاط الضوئي ثلاثي الأبعاد" },
  { href: "/services/smart-poles", en: "Smart poles", ar: "الأعمدة الذكية" },
] as const;

export function Footer() {
  const pathname = usePathname();
  const reading = /^\/blogs(?:\/|$)/.test(routeOf(pathname));
  const { lang } = useLang();
  const ar = lang === "ar";
  const year = new Date().getFullYear();

  if (pathname.startsWith("/team/blogs")) return null;

  return (
    <footer className={`${styles.footer} ${reading ? styles.reading : ""}`}>
      <div className={styles.inner}>
        <div className={styles.grid}>
          <div className={styles.brand}>
            <Image
              src="/arak-logo-black.png"
              alt={ar ? "أراك لحلول الإضاءة" : "ARAK Lighting Solutions"}
              height={54}
              width={154}
            />
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
                  aria-label={`${s.name}, ${s.handle}`}
                  title={`${s.name}, ${s.handle}`}
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

          <nav className={styles.col} aria-label={ar ? "الخدمات" : "Services"}>
            <span className={styles.colHead}>{ar ? "الخدمات" : "Services"}</span>
            {SERVICE_LINKS.map((l) => (
              <Link key={l.href} href={localePath(l.href, lang)} className={styles.link}>
                {ar ? l.ar : l.en}
              </Link>
            ))}
          </nav>

          <div className={styles.col}>
            <span className={styles.colHead}>{ar ? "تواصل معنا" : "Contact"}</span>
            <a
              href={MAPS_PLACE_URL}
              target="_blank"
              rel="noopener noreferrer"
              className={styles.link}
            >
              {ar
                ? `${COMPANY.streetAr}، ${COMPANY.cityAr} ${COMPANY.postalCode}`
                : `${COMPANY.street}, ${COMPANY.city} ${COMPANY.postalCode}`}
            </a>
            <a href={MAPS_PLACE_URL} target="_blank" rel="noopener noreferrer" className={styles.mapCue}>
              {ar ? "عرض على الخريطة" : "View on map"}
            </a>
            <a href={`tel:${COMPANY.phone}`} dir="ltr" className={styles.link}>
              {COMPANY.phoneDisplay}
            </a>
            <a href={`mailto:${COMPANY.email}`} className={styles.link}>
              {COMPANY.email}
            </a>
          </div>
        </div>

        <div className={styles.legal}>
          {/* The year was written out, and would have quietly said 2026 for the
              whole of 2027. Read at render rather than typed. */}
          <span>
            {ar
              ? `© ${year} أراك لحلول الإضاءة. جميع الحقوق محفوظة.`
              : `© ${year} ARAK Lighting Solutions. All rights reserved.`}
          </span>
          <span>
            {ar
              ? `${COMPANY.cityAr}، ${COMPANY.countryNameAr}`
              : `${COMPANY.city}, ${COMPANY.countryName}`}
          </span>
        </div>
      </div>
    </footer>
  );
}
