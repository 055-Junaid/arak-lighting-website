"use client";

import { useLang } from "@/lib/lang";
import { ContactForm } from "@/components/ContactForm";
import { MapEmbed } from "@/components/MapEmbed";
import { SOCIALS, MAPS_PLACE_URL } from "@/lib/social-data";
import { COMPANY, SITE_URL } from "@/lib/site";
import styles from "./page.module.css";

export default function ContactPage() {
  const { lang } = useLang();

  return (
    <main id="main" tabIndex={-1}>
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
                      {COMPANY.streetAr}
                      <br />
                      {COMPANY.cityAr} {COMPANY.postalCode}، {COMPANY.countryNameAr}
                    </>
                  ) : (
                    <>
                      {COMPANY.street}
                      <br />
                      {COMPANY.city} {COMPANY.postalCode}, {COMPANY.countryName}
                    </>
                  )}
                </div>
              </div>
              <div className={styles.row}>
                <div className={styles.rowLabel}>{lang === "ar" ? "الهاتف" : "Phone"}</div>
                <a href={`tel:${COMPANY.phone}`} dir="ltr" className={styles.rowLink}>
                  {COMPANY.phoneDisplay}
                </a>
              </div>
              <div className={styles.row}>
                <div className={styles.rowLabel}>{lang === "ar" ? "البريد الإلكتروني" : "Email"}</div>
                <a href={`mailto:${COMPANY.email}`} className={styles.rowLink}>
                  {COMPANY.email}
                </a>
              </div>
              {/* The page invites people to visit the showroom and never said
                  when it is open. Same figures as the openingHours in the
                  structured data — both read COMPANY.hours. */}
              <div className={styles.row}>
                <div className={styles.rowLabel}>{lang === "ar" ? "ساعات العمل" : "Hours"}</div>
                <div className={styles.rowValue}>
                  {lang === "ar" ? (
                    <>
                      الأحد – الخميس، 9:00 – 18:00
                      <br />
                      الجمعة والسبت: مغلق
                    </>
                  ) : (
                    <>
                      Sunday – Thursday, 8:00 AM – 5:00 PM
                      <br />
                      Friday &amp; Saturday: closed
                    </>
                  )}
                </div>
              </div>
              <div className={styles.row}>
                <div className={styles.rowLabel}>{lang === "ar" ? "الموقع" : "Web"}</div>
                <a href={SITE_URL} className={styles.rowLink}>
                  arak-sa.com
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
                      aria-label={`${s.name}, ${s.handle}`}
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
          <MapEmbed />
        </div>
      </section>
    </main>
  );
}
