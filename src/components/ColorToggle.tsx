"use client";

import { useColorMode } from "@/lib/color-mode";
import { useLang } from "@/lib/lang";
import styles from "./ColorToggle.module.css";

/**
 * The site's light switch, floating over the bottom-right of every page:
 * flipping it lifts every photograph, logo and map out of black and white
 * into full colour. Off by default.
 *
 * It lives here rather than in the header because the whole point is that
 * visitors find it — a control tucked in among the nav items reads as chrome
 * and goes unused.
 */
export function ColorToggle() {
  const { color, toggleColor, nudge } = useColorMode();
  const { lang } = useLang();
  const ar = lang === "ar";

  // Two words, set in the same micro-caps as the rest of the site's labels.
  // The bulb and the track carry the state; the label carries the action.
  const label = ar ? (color ? "شغّل الإضاءة" : "أطفئ الإضاءة") : color ? "Lights on" : "Lights off";

  const hint = ar
    ? color
      ? "إطفاء الإضاءة — عرض الموقع بالأبيض والأسود"
      : "تشغيل الإضاءة — عرض صور المشاريع بالألوان"
    : color
      ? "Turn the lights off — view the site in black and white"
      : "Turn the lights on — see our projects in full colour";

  return (
    <button
      type="button"
      role="switch"
      aria-checked={color}
      aria-label={hint}
      title={hint}
      data-nudge={nudge}
      onClick={toggleColor}
      className={styles.dock}
    >
      <svg className={styles.bulb} viewBox="0 0 24 24" fill="none" aria-hidden="true">
        <path
          d="M12 2.6a6.4 6.4 0 0 0-3.7 11.6c.6.45.95 1.1.95 1.8v.4h5.5v-.4c0-.7.35-1.35.95-1.8A6.4 6.4 0 0 0 12 2.6Z"
          stroke="currentColor"
          strokeWidth="1.7"
          strokeLinejoin="round"
        />
        <path d="M9.6 19h4.8M10.4 21.6h3.2" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" />
      </svg>
      <span className={styles.label}>{label}</span>
      <span className={styles.track} aria-hidden="true">
        <span className={styles.thumb} />
      </span>
    </button>
  );
}
