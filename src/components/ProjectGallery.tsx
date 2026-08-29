"use client";

import { useCallback, useEffect, useRef, useState, type CSSProperties } from "react";
import Image from "next/image";
import { useFocusTrap } from "@/lib/focus-trap";
import { useLang } from "@/lib/lang";
import type { GalleryImage } from "@/lib/project-galleries";
import styles from "./ProjectGallery.module.css";
import { PHOTO_QUALITY } from "@/lib/images";

export function ProjectGallery({
  images,
  projectName,
  captions,
}: {
  images: GalleryImage[];
  /** What the set is of. Names the photographs when `captions` is absent. */
  projectName: string;
  /**
   * One caption per photograph, in the same order as `images`. Supplied by
   * the service pages, where each frame is there to show a different thing
   * and "photograph 4 of 7" describes none of it: the caption becomes the
   * alt text, the lightbox's label, and a line printed under the tile.
   *
   * Project pages pass nothing. A project's photographs are the same subject
   * from different angles, so numbering them is the honest description.
   */
  captions?: { en: string; ar: string; note?: { en: string; ar: string } }[];
}) {
  const { lang } = useLang();
  const ar = lang === "ar";

  // Index of the photo shown full size, or null when the lightbox is closed.
  const [open, setOpen] = useState<number | null>(null);
  const dialog = useRef<HTMLDivElement>(null);
  /** The tile that opened the lightbox, so closing puts focus back on it. */
  const opener = useRef<HTMLButtonElement | null>(null);

  // The overlay declares aria-modal="true", which promises that focus stays
  // inside it. Until this it did not: Tab walked out into the gallery behind
  // the backdrop, and closing dropped focus at the top of the document.
  useFocusTrap(dialog, open !== null, opener);

  /** What photograph `i` is called, wherever it has to be named. */
  const describe = (i: number) => {
    const caption = captions?.[i];
    if (caption) return ar ? caption.ar : caption.en;
    return ar
      ? `${projectName}، صورة ${i + 1} من ${images.length}`
      : `${projectName}, photograph ${i + 1} of ${images.length}`;
  };

  const close = useCallback(() => setOpen(null), []);
  const step = useCallback(
    (by: number) =>
      setOpen((current) =>
        current === null ? current : (current + by + images.length) % images.length
      ),
    [images.length]
  );

  useEffect(() => {
    if (open === null) return;

    const onKey = (event: KeyboardEvent) => {
      // The arrow keys follow the reading direction, not the compass: on an
      // Arabic page the next photograph is the one to the left.
      const forward = ar ? "ArrowLeft" : "ArrowRight";
      if (event.key === "Escape") close();
      else if (event.key === forward) step(1);
      else if (event.key === "ArrowLeft" || event.key === "ArrowRight") step(-1);
    };

    // Hold the page still behind the overlay.
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    window.addEventListener("keydown", onKey);

    return () => {
      document.body.style.overflow = previousOverflow;
      window.removeEventListener("keydown", onKey);
    };
  }, [open, close, step, ar]);

  const active = open === null ? null : images[open];

  return (
    <>
      <div className={styles.gallery}>
        {images.map((image, i) => {
          const tile = (
            <button
              key={image.src}
              type="button"
              className={styles.tile}
              onClick={(event) => {
                opener.current = event.currentTarget;
                setOpen(i);
              }}
              aria-label={
                ar
                  ? `عرض الصورة ${i + 1} من ${images.length} بالحجم الكامل`
                  : `View photograph ${i + 1} of ${images.length} full size`
              }
            >
              <Image
                quality={PHOTO_QUALITY}
                src={image.src}
                alt={describe(i)}
                fill
                sizes="(max-width: 640px) 100vw, (max-width: 1000px) 50vw, 33vw"
                priority={i < 3}
              />
            </button>
          );

          return captions ? (
            <figure key={image.src} className={styles.figure}>
              {tile}
              <figcaption className={styles.caption}>
                {captions[i]?.note && (
                  <span className={styles.note}>
                    {ar ? captions[i].note!.ar : captions[i].note!.en}
                  </span>
                )}
                {describe(i)}
              </figcaption>
            </figure>
          ) : (
            tile
          );
        })}
      </div>

      {active && open !== null && (
        <div
          ref={dialog}
          className={styles.backdrop}
          role="dialog"
          aria-modal="true"
          aria-label={
            ar
              ? `${describe(open)}، ${open + 1} من ${images.length}`
              : `${describe(open)}, ${open + 1} of ${images.length}`
          }
          onClick={close}
        >
          <button
            type="button"
            className={`${styles.control} ${styles.close}`}
            onClick={close}
            aria-label={ar ? "إغلاق" : "Close"}
            autoFocus
          >
            ✕
          </button>

          {images.length > 1 && (
            <>
              <button
                type="button"
                className={`${styles.control} ${styles.previous}`}
                onClick={(event) => {
                  event.stopPropagation();
                  step(-1);
                }}
                aria-label={ar ? "الصورة السابقة" : "Previous photograph"}
              >
                {/* The control sits on the leading edge, which Arabic puts on
                    the right — so the chevron has to turn round with it. */}
                {ar ? "›" : "‹"}
              </button>
              <button
                type="button"
                className={`${styles.control} ${styles.next}`}
                onClick={(event) => {
                  event.stopPropagation();
                  step(1);
                }}
                aria-label={ar ? "الصورة التالية" : "Next photograph"}
              >
                {ar ? "‹" : "›"}
              </button>
            </>
          )}

          <div
            className={styles.stage}
            style={
              {
                "--ar": `${active.w} / ${active.h}`,
                "--arnum": active.w / active.h,
                "--iw": `${active.w}px`,
              } as CSSProperties
            }
          >
            <Image
              quality={PHOTO_QUALITY}
              src={active.src}
              alt={describe(open)}
              fill
              sizes="(max-width: 640px) 100vw, 90vw"
              // Clicks on the photo itself shouldn't dismiss the overlay.
              onClick={(event) => event.stopPropagation()}
            />
          </div>

          {/* "3 / 12" is a Latin-ordered pair; without the override the
              bidi algorithm flips it to "12 / 3" on an Arabic page. */}
          <span className={styles.counter} dir="ltr">
            {open + 1} / {images.length}
          </span>
        </div>
      )}
    </>
  );
}
