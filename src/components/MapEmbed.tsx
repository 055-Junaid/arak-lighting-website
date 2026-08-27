"use client";

import { useState } from "react";
import { useLang } from "@/lib/lang";
import { COMPANY } from "@/lib/site";
import { MAPS_COORDS, MAPS_PLACE_URL } from "@/lib/social-data";
import styles from "./MapEmbed.module.css";

/**
 * The showroom map, loaded only when someone asks for it.
 *
 * The iframe used to mount with the page. Google sets cookies and receives the
 * visitor's IP and referrer the moment it does, which under the Saudi PDPL —
 * and the GDPR, for enquiries out of Europe — is the kind of third-party
 * profiling that is supposed to follow consent rather than precede it. It was
 * also the heaviest thing on the page, on the one page where a slow load costs
 * an enquiry.
 *
 * So the frame is behind a button. Nothing reaches Google until it is pressed,
 * the address is on the page either way, and anyone who only wants directions
 * has the "Open in Google Maps" link that was always there.
 */
export function MapEmbed() {
  const { lang } = useLang();
  const ar = lang === "ar";
  const [loaded, setLoaded] = useState(false);

  const title = ar ? "خريطة موقع أراك للإنارة" : "Map showing the ARAK Lighting showroom";

  if (loaded) {
    return (
      <div className={styles.frame}>
        <iframe
          title={title}
          // `/maps?...&output=embed` now 301s with X-Frame-Options: SAMEORIGIN,
          // which blanks the frame. This is that redirect's own target, which
          // serves 200 with no framing restriction and needs no API key.
          src={`https://www.google.com/maps/embed?origin=mfe&pb=!1m3!2m1!1s${MAPS_COORDS}!6i16!3m1!1s${
            ar ? "ar" : "en"
          }!5m1!1s${ar ? "ar" : "en"}`}
          loading="lazy"
          referrerPolicy="no-referrer-when-downgrade"
          allowFullScreen
        />
      </div>
    );
  }

  return (
    <div className={styles.frame}>
      <div className={styles.placeholder}>
        <p className={styles.address}>
          {ar ? (
            <>
              {COMPANY.streetAr}
              <br />
              {COMPANY.cityAr} {COMPANY.postalCode}
            </>
          ) : (
            <>
              {COMPANY.street}
              <br />
              {COMPANY.city} {COMPANY.postalCode}
            </>
          )}
        </p>

        <button type="button" className={styles.load} onClick={() => setLoaded(true)}>
          {ar ? "إظهار الخريطة" : "Show Map"}
        </button>

        {/* Said plainly rather than buried: pressing the button is what sends
            anything to Google, and this is the choice being made. */}
        <p className={styles.notice}>
          {ar
            ? "يُحمّل هذا خريطة من خرائط جوجل، وقد تضع جوجل عندها ملفات تعريف ارتباط على جهازك."
            : "This loads a map from Google Maps, and Google may set cookies on your device."}
        </p>

        <a href={MAPS_PLACE_URL} target="_blank" rel="noopener noreferrer" className={styles.direct}>
          {ar ? "أو افتح في خرائط جوجل ↖" : "Or open in Google Maps ↗"}
        </a>
      </div>
    </div>
  );
}
