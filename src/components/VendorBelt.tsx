"use client";

import Image from "next/image";
import { useLang } from "@/lib/lang";
import styles from "./VendorBelt.module.css";

/**
 * Also read by the home page, which sets these as a static grid inside the
 * credentials block rather than as this marquee. The About page keeps the belt.
 */
/**
 * Arabic names are the entities' own official ones, not translations — these
 * are the forms they use on their own sites and in tender documents.
 */
export const VENDORS = [
  { file: "neom.webp", name: "NEOM", ar: "نيوم" },
  { file: "qiddiya.webp", name: "Qiddiya", ar: "القدية" },
  { file: "roshn.webp", name: "Roshn", ar: "روشن" },
  { file: "red-sea.webp", name: "The Red Sea Development Company", ar: "شركة البحر الأحمر للتطوير" },
  { file: "dgda.webp", name: "Diriyah Gate Development Authority", ar: "هيئة تطوير بوابة الدرعية" },
  { file: "saudi-aramco.webp", name: "Saudi Aramco", ar: "أرامكو السعودية" },
  { file: "saudi-electricity.webp", name: "Saudi Electricity Company", ar: "الشركة السعودية للكهرباء" },
  { file: "stc.webp", name: "STC", ar: "شركة الاتصالات السعودية" },
  { file: "riyad-bank.webp", name: "Riyad Bank", ar: "بنك الرياض" },
  { file: "riyadh-airports.webp", name: "Riyadh Airports", ar: "مطارات الرياض" },
  { file: "nhc.webp", name: "National Housing Company", ar: "الشركة الوطنية للإسكان" },
  { file: "national-water.webp", name: "National Water Company", ar: "شركة المياه الوطنية" },
  { file: "rcjy.svg", name: "Royal Commission for Jubail & Yanbu", ar: "الهيئة الملكية للجبيل وينبع" },
  { file: "mngha.webp", name: "Ministry of National Guard Health Affairs", ar: "الشؤون الصحية بوزارة الحرس الوطني" },
];

function Logo({
  file,
  name,
  hidden,
}: {
  file: string;
  /** Already resolved to the reader's language by the caller. */
  name: string;
  hidden?: boolean;
}) {
  return (
    <div className={styles.cell} aria-hidden={hidden || undefined}>
      <Image
        src={`/vendors/${file}`}
        alt={name}
        title={name}
        width={168}
        height={74}
        loading="lazy"
        // As in LogoGrid: pre-sized WebP served straight from Workers Assets.
        // The belt renders every mark twice for the marquee, so optimising
        // here would have cost two Worker invocations per vendor.
        unoptimized
        className={styles.logo}
      />
    </div>
  );
}

export function VendorBelt() {
  const { lang } = useLang();
  const ar = lang === "ar";

  return (
    // Bleeds out to the page edge by exactly the gutter the shell put on.
    // This was a hardcoded -48px against a --gutter that clamps down to 20px on
    // a phone, so on small screens it pulled 28px further than there was room
    // for — invisible only because of the overflow: hidden on the same element.
    <div
      style={{
        position: "relative",
        marginInline: "calc(var(--gutter) * -1)",
        overflow: "hidden",
        borderBlock: "1px solid var(--hair)",
        background: "var(--white)",
      }}
    >
      <div className={styles.track} style={{ display: "flex", alignItems: "center", width: "max-content" }}>
        {VENDORS.map((v) => (
          <Logo key={v.file} file={v.file} name={ar ? v.ar : v.name} />
        ))}
        {VENDORS.map((v) => (
          <Logo key={`${v.file}-dup`} file={v.file} name={ar ? v.ar : v.name} hidden />
        ))}
      </div>
    </div>
  );
}
