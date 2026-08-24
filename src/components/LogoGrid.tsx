import Image from "next/image";
import styles from "./LogoGrid.module.css";

export type LogoItem = {
  name: string;
  /** File inside `basePath`. Omit when we hold no usable mark — the name is set as a wordmark instead. */
  file?: string;
};

/** Shared ruled logo wall used by both the partner brands and the client list. */
export function LogoGrid({ items, basePath }: { items: LogoItem[]; basePath: string }) {
  return (
    <div className={styles.grid}>
      {items.map((item) => (
        <div key={item.name} className={styles.cell}>
          {item.file ? (
            <>
              {/* Fixed-height band so logos align across a row no matter how
                  many lines the caption beneath them runs to. */}
              <span className={styles.logoWrap}>
                <Image
                  src={`${basePath}/${item.file}`}
                  alt={item.name}
                  title={item.name}
                  width={210}
                  height={84}
                  // The optimiser rejects SVG unless dangerouslyAllowSVG is set;
                  // vectors need no resizing anyway, so serve them as-is.
                  unoptimized={item.file.endsWith(".svg")}
                  className={styles.logo}
                />
              </span>
              <span className={styles.name}>{item.name}</span>
            </>
          ) : (
            <span className={styles.wordmark}>{item.name}</span>
          )}
        </div>
      ))}
    </div>
  );
}
