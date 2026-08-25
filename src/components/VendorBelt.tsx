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
  { file: "neom.png", name: "NEOM", ar: "نيوم" },
  { file: "qiddiya.png", name: "Qiddiya", ar: "القدية" },
  { file: "roshn.png", name: "Roshn", ar: "روشن" },
  { file: "red-sea.png", name: "The Red Sea Development Company", ar: "شركة البحر الأحمر للتطوير" },
  { file: "dgda.png", name: "Diriyah Gate Development Authority", ar: "هيئة تطوير بوابة الدرعية" },
  { file: "saudi-aramco.png", name: "Saudi Aramco", ar: "أرامكو السعودية" },
  { file: "saudi-electricity.png", name: "Saudi Electricity Company", ar: "الشركة السعودية للكهرباء" },
  { file: "stc.png", name: "STC", ar: "شركة الاتصالات السعودية" },
  { file: "riyadh-airports.png", name: "Riyadh Airports", ar: "مطارات الرياض" },
  { file: "nhc.png", name: "National Housing Company", ar: "الشركة الوطنية للإسكان" },
  { file: "national-water.png", name: "National Water Company", ar: "شركة المياه الوطنية" },
  { file: "rcjy.svg", name: "Royal Commission for Jubail & Yanbu", ar: "الهيئة الملكية للجبيل وينبع" },
  { file: "mngha.png", name: "Ministry of National Guard Health Affairs", ar: "الشؤون الصحية بوزارة الحرس الوطني" },
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
        className={styles.logo}
      />
    </div>
  );
}

export function VendorBelt() {
  const { lang } = useLang();
  const ar = lang === "ar";

  return (
    <div style={{ position: "relative", margin: "0 -48px", overflow: "hidden", borderBlock: "1px solid rgba(17,17,17,.13)", background: "#FFFFFF" }}>
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
