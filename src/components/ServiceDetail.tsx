"use client";

import Image from "next/image";
import Link from "next/link";
import { useLang } from "@/lib/lang";
import { localePath } from "@/lib/site";
import { PHOTO_QUALITY } from "@/lib/images";
import type { Service } from "@/lib/services-data";
import type { ServiceDetail as Detail } from "@/lib/service-details";
import { ProjectGallery } from "@/components/ProjectGallery";
import { Reveal } from "@/components/Reveal";
import styles from "./ServiceDetail.module.css";

/** Only the fields the pager prints — the neighbours' detail content would
 *  otherwise ride into the payload behind two words of link text. */
export type ServiceNeighbour = { slug: string; en: string; ar: string } | undefined;

/**
 * One service line's own page: the dark hero the OG card is cut from, the
 * summary the index already showed plus the detail behind it, four capability
 * blocks, and the photography.
 *
 * A client component because everything on it is language-switched at runtime
 * through the colour/lang context, the same way the services index is.
 */
export function ServiceDetail({
  service,
  detail,
  previous,
  next,
}: {
  service: Service;
  detail: Detail;
  previous: ServiceNeighbour;
  next: ServiceNeighbour;
}) {
  const { lang } = useLang();
  const ar = lang === "ar";

  const name = ar ? service.ar : service.en;
  const intro = ar ? detail.arIntro : detail.intro;
  const includes = ar ? service.arIncludes : service.includes;
  const captions = detail.gallery.map((g) => ({ en: g.caption, ar: g.arCaption }));
  // Most pages are photographs of delivered work and say so. The ones carrying
  // diagrams or illustrations override this, because that sentence would be a
  // claim the gallery cannot back.
  const head = detail.galleryHead ?? {
    eyebrow: "From our work",
    arEyebrow: "من مشاريعنا",
    title: "What it looks like",
    arTitle: "كيف يبدو ذلك",
    note: "Photographs from delivered projects in Riyadh. Click any frame to see it full size.",
    arNote: "صور من مشاريع سُلِّمت في الرياض. اضغط أي صورة لعرضها بالحجم الكامل.",
  };

  return (
    <main id="main" tabIndex={-1} className={styles.page}>
      {/* ---------- Hero ---------- */}
      <section className={styles.hero}>
        <div className={styles.shell}>
          <nav className={styles.crumb} aria-label={ar ? "مسار التنقل" : "Breadcrumb"}>
            <Link href={localePath("/services", lang)}>{ar ? "خدماتنا" : "Services"}</Link>
            <span aria-hidden="true">/</span>
            <span className={styles.crumbNow}>{name}</span>
          </nav>

          <div className={styles.heroGrid}>
            <div className={styles.heroCopy}>
              <span className={styles.heroEyebrow}>
                {ar ? `خط الخدمة ${service.no}` : `Service line ${service.no}`}
              </span>
              <h1 className={styles.heroTitle}>{name}</h1>
              <p className={styles.heroLead}>{ar ? service.arLead : service.lead}</p>
              <p className={styles.heroBody}>{ar ? service.arBody : service.body}</p>
              <div className={styles.heroActions}>
                <Link href={localePath("/contact", lang)} className={styles.cta}>
                  {ar ? `اسأل عن ${name}` : `Enquire about ${service.en}`}
                  <span aria-hidden="true">{ar ? "←" : "→"}</span>
                </Link>
                <Link href={localePath("/services", lang)} className={styles.ghost}>
                  {ar ? "كل خطوط الخدمة" : "All service lines"}
                </Link>
              </div>
            </div>

            <div className={styles.heroArt}>
              <Image
                quality={PHOTO_QUALITY}
                src={detail.hero.src}
                alt={ar ? detail.hero.arCaption : detail.hero.caption}
                fill
                priority
                sizes="(max-width: 1000px) 100vw, 48vw"
                className={styles.heroImg}
              />
            </div>
          </div>

          <div className={styles.facts}>
            {detail.facts.map((fact) => (
              <div key={fact.label} className={styles.fact}>
                <div className={styles.factValue}>{ar ? fact.arValue : fact.value}</div>
                <div className={styles.factLabel}>{ar ? fact.arLabel : fact.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ---------- Overview ---------- */}
      <section className={styles.band}>
        <div className={`${styles.shell} ${styles.overview}`}>
          <Reveal>
            <div className={styles.prose}>
              <span className={styles.eyebrow}>{ar ? "نظرة أقرب" : "In more detail"}</span>
              {intro.map((paragraph) => (
                <p key={paragraph.slice(0, 40)} className={styles.proseText}>
                  {paragraph}
                </p>
              ))}
            </div>
          </Reveal>
          <Reveal delay={90}>
            <aside className={styles.includes}>
              <h2 className={styles.includesHead}>{ar ? "ما يشمله هذا الخط" : "What this covers"}</h2>
              <ul className={styles.includesList}>
                {includes.map((item) => (
                  <li key={item}>{item}</li>
                ))}
              </ul>
            </aside>
          </Reveal>
        </div>
      </section>

      {/* ---------- Capabilities ---------- */}
      <section className={`${styles.band} ${styles.bandPaper}`}>
        <div className={styles.shell}>
          <Reveal>
            <span className={styles.eyebrow}>{ar ? "كيف ننفّذه" : "How we do it"}</span>
            <h2 className={styles.sectionTitle}>
              {ar ? "أربعة أمور تحسم النتيجة" : "The four things that decide the outcome"}
            </h2>
          </Reveal>
          <div className={styles.blocks}>
            {detail.blocks.map((block, i) => (
              <Reveal key={block.title} delay={(i % 2) * 80}>
                <article className={styles.block}>
                  <span className={styles.blockNo}>{String(i + 1).padStart(2, "0")}</span>
                  <h3 className={styles.blockTitle}>{ar ? block.arTitle : block.title}</h3>
                  <p className={styles.blockBody}>{ar ? block.arBody : block.body}</p>
                </article>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* ---------- Photography ---------- */}
      <section className={styles.band}>
        <div className={styles.shell}>
          <Reveal>
            <div className={styles.sectionHead}>
              <div>
                <span className={styles.eyebrow}>{ar ? head.arEyebrow : head.eyebrow}</span>
                <h2 className={styles.sectionTitle}>{ar ? head.arTitle : head.title}</h2>
              </div>
              <p className={styles.sectionNote}>{ar ? head.arNote : head.note}</p>
            </div>
          </Reveal>
          <Reveal delay={80}>
            <ProjectGallery images={detail.gallery} projectName={name} captions={captions} />
          </Reveal>
        </div>
      </section>

      {/* ---------- Pager and CTA ---------- */}
      <section className={styles.band}>
        <div className={styles.shell}>
          <nav className={styles.pager} aria-label={ar ? "خطوط خدمة أخرى" : "More service lines"}>
            {previous && (
              <Link
                href={localePath(`/services/${previous.slug}`, lang)}
                className={styles.pagerLink}
              >
                <span className={styles.pagerLabel}>{ar ? "السابق" : "Previous"}</span>
                <span className={styles.pagerName}>{ar ? previous.ar : previous.en}</span>
              </Link>
            )}
            {next && (
              <Link
                href={localePath(`/services/${next.slug}`, lang)}
                className={`${styles.pagerLink} ${styles.pagerNext}`}
              >
                <span className={styles.pagerLabel}>{ar ? "التالي" : "Next"}</span>
                <span className={styles.pagerName}>{ar ? next.ar : next.en}</span>
              </Link>
            )}
          </nav>

          <Reveal>
            <div className={styles.close}>
              <div className={styles.closeGlow} />
              <h2 className={styles.closeTitle}>
                {ar ? "لنُضئ مشروعك القادم" : "Tell us what the space has to do."}
              </h2>
              <p className={styles.closeLead}>
                {ar
                  ? "أرسل المخططات أو جدول وحدات الإضاءة أو الفكرة وحدها، وسيعود إليك فريقنا في الرياض بدراسة إضاءة وعرض سعر."
                  : "Send drawings, a fixture schedule, or just the brief. Our Riyadh team will come back with a lighting study and a quotation."}
              </p>
              <Link href={localePath("/contact", lang)} className={styles.closeCta}>
                {ar ? "احجز استشارة إضاءة" : "Book a consultation"}
                <span aria-hidden="true">{ar ? "←" : "→"}</span>
              </Link>
            </div>
          </Reveal>
        </div>
      </section>
    </main>
  );
}
