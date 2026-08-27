import Image from "next/image";
import styles from "./PhotoSlot.module.css";
import { PHOTO_QUALITY } from "@/lib/images";

export function PhotoSlot({
  src,
  alt,
  priority,
  sizes = "(max-width: 768px) 100vw, 50vw",
}: {
  src: string;
  alt: string;
  priority?: boolean;
  /**
   * How wide the slot actually is at a given viewport. The default assumes a
   * half-width column that goes full width at 768px, which is what most
   * callers do — pass your own when the layout stacks somewhere else, or the
   * browser picks a candidate for a column width that is no longer true.
   */
  sizes?: string;
}) {
  return (
    <div className={styles.slot}>
      <Image
        quality={PHOTO_QUALITY}
        src={src}
        alt={alt}
        fill
        sizes={sizes}
        style={{ objectFit: "cover" }}
        priority={priority}
      />
    </div>
  );
}
