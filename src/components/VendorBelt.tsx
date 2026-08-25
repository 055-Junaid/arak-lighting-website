import Image from "next/image";
import styles from "./VendorBelt.module.css";

const VENDORS = [
  { file: "neom.png", name: "NEOM" },
  { file: "qiddiya.png", name: "Qiddiya" },
  { file: "roshn.png", name: "Roshn" },
  { file: "red-sea.png", name: "The Red Sea Development Company" },
  { file: "dgda.png", name: "Diriyah Gate Development Authority" },
  { file: "saudi-aramco.png", name: "Saudi Aramco" },
  { file: "saudi-electricity.png", name: "Saudi Electricity Company" },
  { file: "stc.png", name: "STC" },
  { file: "riyadh-airports.png", name: "Riyadh Airports" },
  { file: "nhc.png", name: "National Housing Company" },
  { file: "national-water.png", name: "National Water Company" },
  { file: "rcjy.svg", name: "Royal Commission for Jubail & Yanbu" },
  { file: "mngha.png", name: "Ministry of National Guard Health Affairs" },
];

function Logo({ file, name, hidden }: { file: string; name: string; hidden?: boolean }) {
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
  return (
    <div style={{ position: "relative", margin: "0 -48px", overflow: "hidden", borderBlock: "1px solid rgba(17,17,17,.13)", background: "#FFFFFF" }}>
      <div className={styles.track} style={{ display: "flex", alignItems: "center", width: "max-content" }}>
        {VENDORS.map((v) => (
          <Logo key={v.file} {...v} />
        ))}
        {VENDORS.map((v) => (
          <Logo key={`${v.file}-dup`} {...v} hidden />
        ))}
      </div>
    </div>
  );
}
