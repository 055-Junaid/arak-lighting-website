"use client";

import Image from "next/image";
import Link from "next/link";
import { useLang } from "@/lib/lang";
import { localePath } from "@/lib/site";
import { POLE_ANATOMY, type Pole } from "@/lib/smart-poles-data";
import styles from "./PoleDetail.module.css";
import { PHOTO_QUALITY } from "@/lib/images";

type Neighbour = { slug: string; name: string } | undefined;

export function PoleDetail({
  pole,
  family,
  previous,
  next,
}: {
  pole: Pole;
  family: { en: string; ar: string };
  previous: Neighbour;
  next: Neighbour;
}) {
  const { lang } = useLang();
  const ar = lang === "ar";

  return (
    <main id="main" tabIndex={-1} className={styles.page}>
      <div className={styles.shell}>
        <nav className={styles.crumb} aria-label={ar ? "مسار التنقل" : "Breadcrumb"}>
          <Link href={localePath("/services", lang)}>{ar ? "خدماتنا" : "Services"}</Link>
          <span aria-hidden="true">/</span>
          <Link href={localePath("/services/smart-poles", lang)}>{ar ? "الأعمدة الذكية" : "Smart Poles"}</Link>
          <span aria-hidden="true">/</span>
          <span className={styles.crumbNow}>{pole.name}</span>
        </nav>

        <article className={styles.detail}>
          <div className={styles.art}>
            <Image
              quality={PHOTO_QUALITY}
              src={`/smart-poles/${pole.slug}.jpg`}
              alt={
                ar
                  ? `عمود ${pole.name} الذكي، ${pole.arTagline}`
                  : `${pole.name} smart pole, ${pole.tagline.toLowerCase()}`
              }
              fill
              priority
              sizes="(max-width: 900px) 100vw, 38vw"
              className={styles.artImg}
            />
          </div>

          <div className={styles.copy}>
            <span className={styles.family}>{ar ? family.ar : family.en}</span>
            <h1 className={styles.name}>{pole.name}</h1>
            <p className={styles.tagline}>{ar ? pole.arTagline : pole.tagline}</p>
            <p className={styles.body}>{ar ? pole.arBody : pole.body}</p>

            {/* The eight systems the anatomy diagram on the series page
                labels, rather than the first six rows of POLE_FUNCTIONS —
                that slice was an arbitrary cut of a differently-purposed list
                and stopped mid-way through the payload, so the page named 5G
                and broadband but not the display, the speakers or the
                emergency call. This is the same eight the rest of the section
                counts, and it is the set the footnote below is about. */}
            <h2 className={styles.payloadHead}>
              {ar ? "الأنظمة التي يحملها هذا العمود" : "Systems this pole carries"}
            </h2>
            <ul className={styles.payload}>
              {POLE_ANATOMY.map((item) => (
                <li key={item.no}>{ar ? item.ar : item.en}</li>
              ))}
            </ul>

            <p className={styles.foot}>
              {ar
                ? "توريد وتركيب وتكامل وصيانة من أراك. وتُحدَّد الارتفاعات والتشطيبات وحزمة الأجهزة حسب كل مشروع."
                : "Supplied, installed, integrated and maintained by ARAK. Heights, finishes and the device payload are configured per project."}
            </p>

            <div className={styles.actions}>
              <Link href={localePath("/contact", lang)} className={styles.cta}>
                {ar ? `اسأل عن ${pole.name}` : `Enquire about ${pole.name}`}
                <span aria-hidden="true">{ar ? "←" : "→"}</span>
              </Link>
              <Link href={localePath("/services/smart-poles", lang)} className={styles.ghost}>
                {ar ? "كل التصاميم العشرين" : "All twenty designs"}
              </Link>
            </div>
          </div>
        </article>

        {/* The series is a loop, so the twentieth design leads back to the
            first rather than stopping. */}
        <nav className={styles.pager} aria-label={ar ? "تصاميم أخرى" : "More designs"}>
          {previous && (
            <Link href={localePath(`/services/smart-poles/${previous.slug}`, lang)} className={styles.pagerLink}>
              <span className={styles.pagerLabel}>{ar ? "السابق" : "Previous"}</span>
              <span className={styles.pagerName}>{previous.name}</span>
            </Link>
          )}
          {next && (
            <Link
              href={localePath(`/services/smart-poles/${next.slug}`, lang)}
              className={`${styles.pagerLink} ${styles.pagerNext}`}
            >
              <span className={styles.pagerLabel}>{ar ? "التالي" : "Next"}</span>
              <span className={styles.pagerName}>{next.name}</span>
            </Link>
          )}
        </nav>
      </div>
    </main>
  );
}
