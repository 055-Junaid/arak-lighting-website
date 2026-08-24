import Image from "next/image";
import styles from "./PhotoSlot.module.css";

export function PhotoSlot({
  src,
  alt,
  priority,
}: {
  src: string;
  alt: string;
  priority?: boolean;
}) {
  return (
    <div className={styles.slot}>
      <Image
        src={src}
        alt={alt}
        fill
        sizes="(max-width: 768px) 100vw, 50vw"
        style={{ objectFit: "cover" }}
        priority={priority}
      />
      <a
        href="https://unsplash.com"
        target="_blank"
        rel="noopener noreferrer"
        className={styles.credit}
      >
        Photo: Unsplash
      </a>
    </div>
  );
}
