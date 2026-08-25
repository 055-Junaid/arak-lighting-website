"use client";

import { useLang } from "@/lib/lang";
import { ContactForm } from "@/components/ContactForm";
import { SOCIALS, MAPS_PLACE_URL, MAPS_COORDS } from "@/lib/social-data";
import styles from "./page.module.css";

export default function ContactPage() {
  const { lang } = useLang();

  return (
    <main>
      <section className={styles.section}>
        <div className={styles.label}>
          <span className={styles.eyebrow}>{lang === "ar" ? "تواصل معنا" : "Contact"}</span>
        </div>
        <h1 className={styles.title}>
          {lang === "ar" ? "احجز استشارة إضاءة" : "Book a lighting consultation"}
        </h1>
        <p className={styles.lead}>
          {lang === "ar"
            ? "شاركنا تفاصيل مشروعك وسنعاود التواصل معك. يمكنك أيضاً التواصل معنا مباشرة عبر البيانات أدناه أو زيارة صالة العرض في الرياض."
            : "Share a few details about your project and we will get back to you. You can also reach us directly using the details below, or visit the Riyadh showroom."}
        </p>

        <div className={styles.layout}>
          <ContactForm />

          <div>
            <div className={styles.rows}>
              <div className={styles.row}>
                <div className={styles.rowLabel}>{lang === "ar" ? "العنوان" : "Address"}</div>
                <div className={styles.rowValue}>
                  {lang === "ar" ? (
                    <>
                      مخرج 2، طريق الدائري الشمالي الفرعي، حطين
                      <br />
                      الرياض 13513، المملكة العربية السعودية
                    </>
                  ) : (
                    <>
                      Exit 2, Northern Ring Branch Road, Hittin
                      <br />
                      Riyadh 13513, Kingdom of Saudi Arabia
                    </>
                  )}
                </div>
              </div>
              <div className={styles.row}>
                <div className={styles.rowLabel}>{lang === "ar" ? "الهاتف" : "Phone"}</div>
                <a href="tel:+966114411131" dir="ltr" className={styles.rowLink}>
                  +966 11 441 1131
                </a>
              </div>
              <div className={styles.row}>
                <div className={styles.rowLabel}>{lang === "ar" ? "البريد الإلكتروني" : "Email"}</div>
                <a href="mailto:info@arak-sa.com" className={styles.rowLink}>
                  info@arak-sa.com
                </a>
              </div>
              <div className={styles.row}>
                <div className={styles.rowLabel}>{lang === "ar" ? "الموقع" : "Web"}</div>
                <a href="https://www.arak-sa.com" className={styles.rowLink}>
                  www.arak-sa.com
                </a>
              </div>
              <div style={{ padding: "24px 0" }}>
                <div className={styles.rowLabel}>{lang === "ar" ? "تابعنا" : "Social"}</div>
                <div className={styles.socials}>
                  {SOCIALS.map((s) => (
                    <a
                      key={s.name}
                      href={s.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      aria-label={`${s.name} — ${s.handle}`}
                      className={styles.social}
                    >
                      <svg viewBox="0 0 24 24" aria-hidden="true" focusable="false">
                        <path d={s.path} />
                      </svg>
                      {s.handle}
                    </a>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className={styles.mapBlock}>
          <div className={styles.mapHead}>
            <div>
              <div className={styles.rowLabel}>{lang === "ar" ? "الموقع" : "Find us"}</div>
              <div className={styles.mapName}>
                {lang === "ar" ? "أراك للإنارة · الرياض" : "ARAK Lighting · Riyadh"}
              </div>
            </div>
            <a href={MAPS_PLACE_URL} target="_blank" rel="noopener noreferrer" className={styles.mapLink}>
              {lang === "ar" ? "افتح في خرائط جوجل ↖" : "Open in Google Maps ↗"}
            </a>
          </div>
          <div className={styles.mapFrame}>
            <iframe
              title={lang === "ar" ? "خريطة موقع أراك للإنارة" : "Map showing the ARAK Lighting showroom"}
              // `/maps?...&output=embed` now 301s with X-Frame-Options: SAMEORIGIN,
              // which blanks the frame. This is that redirect's own target, which
              // serves 200 with no framing restriction and needs no API key.
              src={`https://www.google.com/maps/embed?origin=mfe&pb=!1m3!2m1!1s${MAPS_COORDS}!6i16!3m1!1s${lang === "ar" ? "ar" : "en"}!5m1!1s${lang === "ar" ? "ar" : "en"}`}
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              allowFullScreen
            />
          </div>
        </div>
      </section>
    </main>
  );
}
