"use client";

import Image from "next/image";
import Link from "next/link";
import { useLang } from "@/lib/lang";
import { localePath } from "@/lib/site";
import { PHOTO_QUALITY } from "@/lib/images";
import type { Service } from "@/lib/services-data";
import type { ServiceDetail as Detail } from "@/lib/service-details";
import { PROJECT_ROWS } from "@/lib/projects-data";
import { ProjectGallery } from "@/components/ProjectGallery";
import { ProjectCards } from "@/components/ProjectCards";
import { PhotoSlot } from "@/components/PhotoSlot";
import { LogoGrid } from "@/components/LogoGrid";
import { BRANDS } from "@/components/BrandGrid";
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
  // Named references without a page of their own, looked up in the reference
  // list so the location and scope printed here are the ones /projects prints.
  const references = (detail.references ?? [])
    .map((name) => PROJECT_ROWS.find((row) => row.name === name))
    .filter((row): row is (typeof PROJECT_ROWS)[number] => Boolean(row));
  const brands = (detail.brands ?? [])
    .map((name) => BRANDS.find((brand) => brand.name === name))
    .filter((brand): brand is (typeof BRANDS)[number] => Boolean(brand));
  const close = detail.close;
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
              <h1 className={styles.heroTitle}>
                {(ar ? service.arHeading : service.heading) ?? name}
              </h1>
              <p className={styles.heroLead}>{ar ? service.arLead : service.lead}</p>
              <p className={styles.heroBody}>{ar ? service.arBody : service.body}</p>
              <div className={styles.heroActions}>
                <Link href={localePath(close?.href ?? "/contact", lang)} className={styles.cta}>
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
                loading="eager" fetchPriority="high"
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

      {/* ---------- Applications ---------- */}
      {detail.applications && detail.applications.length > 0 && (
        <section className={styles.band}>
          <div className={styles.shell}>
            <Reveal>
              <span className={styles.eyebrow}>
                {ar ? detail.applicationsHead?.arEyebrow : detail.applicationsHead?.eyebrow}
              </span>
              <h2 className={styles.sectionTitle}>
                {ar ? detail.applicationsHead?.arTitle : detail.applicationsHead?.title}
              </h2>
            </Reveal>
            <div className={styles.apps}>
              {detail.applications.map((app, i) => {
                const body = (
                  <>
                    <div className={styles.appFrame}>
                      <PhotoSlot
                        src={app.image.src}
                        alt={ar ? app.image.arCaption : app.image.caption}
                        sizes="(max-width: 640px) 100vw, (max-width: 1000px) 50vw, 33vw"
                      />
                      {app.stock && (
                        <span className={styles.appTag}>{ar ? "صورة توضيحية" : "Illustrative"}</span>
                      )}
                    </div>
                    <h3 className={styles.appTitle}>{ar ? app.arTitle : app.title}</h3>
                    <p className={styles.appBody}>{ar ? app.arBody : app.body}</p>
                    {app.proof && (
                      <p className={styles.appProof}>
                        <span>{ar ? "من مشاريعنا" : "On our reference list"}</span>
                        {ar ? app.arProof : app.proof}
                      </p>
                    )}
                  </>
                );
                return (
                  <Reveal key={app.title} delay={(i % 3) * 70} className={styles.app}>
                    {app.href ? (
                      <Link href={localePath(app.href, lang)} className={styles.appLink}>
                        {body}
                      </Link>
                    ) : (
                      body
                    )}
                  </Reveal>
                );
              })}
            </div>
          </div>
        </section>
      )}

      {/* ---------- Delivered projects ---------- */}
      {detail.projects.length > 0 && (
        <section className={`${styles.band} ${styles.bandPaper}`}>
          <div className={styles.shell}>
            <Reveal>
              <div className={styles.sectionHead}>
                <div>
                  <span className={styles.eyebrow}>{ar ? "مشاريع منفّذة" : "Delivered"}</span>
                  <h2 className={styles.sectionTitle}>
                    {ar ? "أين نفّذناه" : "Where we have delivered it"}
                  </h2>
                </div>
                <Link href={localePath("/projects", lang)} className={styles.sectionLink}>
                  {ar ? "كل المشاريع" : "All projects"}
                  <span aria-hidden="true">{ar ? "←" : "→"}</span>
                </Link>
              </div>
            </Reveal>
            <ProjectCards
              slugs={detail.projects}
              columns={detail.projects.length === 4 ? 4 : 3}
            />
            {(references.length > 0 || detail.referencesNote) && (
              <Reveal>
                <div className={styles.refs}>
                  <h3 className={styles.refsHead}>{ar ? "ومن قائمة مشاريعنا أيضًا" : "Also on our reference list"}</h3>
                  <ul className={styles.refsList}>
                    {references.map((row) => (
                      <li key={row.name}>
                        <span className={styles.refName}>{ar ? row.arName : row.name}</span>
                        <span className={styles.refMeta}>
                          {ar ? `${row.arLoc} · ${row.arScope}` : `${row.loc} · ${row.scope}`}
                        </span>
                      </li>
                    ))}
                  </ul>
                  {detail.referencesNote && (
                    <p className={styles.refsNote}>
                      {ar ? detail.referencesNote.ar : detail.referencesNote.en}
                    </p>
                  )}
                </div>
              </Reveal>
            )}
          </div>
        </section>
      )}

      {/* ---------- Why now ---------- */}
      {detail.drivers && detail.drivers.length > 0 && (
        <section className={`${styles.band} ${styles.bandDark}`}>
          <div className={styles.shell}>
            <Reveal>
              <span className={styles.eyebrowDark}>{ar ? "لماذا الآن" : "Why owners are asking now"}</span>
              <h2 className={`${styles.sectionTitle} ${styles.sectionTitleDark}`}>
                {ar ? "ما الذي تغيّر في المملكة" : "What has changed in the Kingdom"}
              </h2>
            </Reveal>
            <div className={styles.drivers}>
              {detail.drivers.map((driver, i) => (
                <Reveal key={driver.title} delay={i * 80}>
                  <article className={styles.driver}>
                    <h3 className={styles.driverTitle}>{ar ? driver.arTitle : driver.title}</h3>
                    <p className={styles.driverBody}>{ar ? driver.arBody : driver.body}</p>
                  </article>
                </Reveal>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* ---------- How a project runs, and what it is built from ---------- */}
      {detail.steps && detail.steps.length > 0 && (
        <section className={styles.band}>
          <div className={styles.shell}>
            <Reveal>
              <span className={styles.eyebrow}>{ar ? "من المعاينة إلى التسليم" : "From survey to handover"}</span>
              <h2 className={styles.sectionTitle}>
                {ar ? "كيف يسير مشروع التحكّم" : "How a controls project runs"}
              </h2>
            </Reveal>
            <ol className={styles.steps}>
              {detail.steps.map((step, i) => (
                <li key={step.title} className={styles.step}>
                  <Reveal delay={(i % 5) * 60}>
                    <span className={styles.stepNo}>{String(i + 1).padStart(2, "0")}</span>
                    <h3 className={styles.stepTitle}>{ar ? step.arTitle : step.title}</h3>
                    <p className={styles.stepBody}>{ar ? step.arBody : step.body}</p>
                  </Reveal>
                </li>
              ))}
            </ol>

            {brands.length > 0 && (
              <Reveal>
                <div className={styles.brands}>
                  <div className={styles.brandsHead}>
                    <h3 className={styles.brandsTitle}>
                      {ar ? "علامات التحكّم والأتمتة التي نورّدها" : "Control and automation brands we supply"}
                    </h3>
                    <p className={styles.brandsNote}>
                      {ar
                        ? "نختار المنصّة لتناسب المشروع، لا العكس، وكلّها على معايير مفتوحة."
                        : "We pick the platform to suit the project, not the other way round, and all of it sits on open standards."}
                    </p>
                  </div>
                  <LogoGrid items={brands} basePath="/brands" collapsedRows={1} />
                </div>
              </Reveal>
            )}
          </div>
        </section>
      )}

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

      {/* ---------- Questions ---------- */}
      {detail.faqs && detail.faqs.length > 0 && (
        <section className={`${styles.band} ${styles.bandPaper}`}>
          <div className={`${styles.shell} ${styles.faqGrid}`}>
            <Reveal>
              <div>
                <span className={styles.eyebrow}>{ar ? "أسئلة شائعة" : "Questions we are asked"}</span>
                <h2 className={styles.sectionTitle}>
                  {ar ? `قبل أن تطلب ${name}` : `Before you specify ${service.en.toLowerCase()}`}
                </h2>
              </div>
            </Reveal>
            <div className={styles.faqs}>
              {detail.faqs.map((faq) => (
                <details key={faq.q} className={styles.faq}>
                  <summary className={styles.faqQ}>
                    <span>{ar ? faq.arQ : faq.q}</span>
                    <span className={styles.faqIcon} aria-hidden="true" />
                  </summary>
                  <p className={styles.faqA}>{ar ? faq.arA : faq.a}</p>
                </details>
              ))}
            </div>
          </div>
        </section>
      )}

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
                {close
                  ? ar ? close.arTitle : close.title
                  : ar ? "لنُضئ مشروعك القادم" : "Tell us what the space has to do."}
              </h2>
              <p className={styles.closeLead}>
                {close
                  ? ar ? close.arLead : close.lead
                  : ar
                    ? "أرسل المخططات أو جدول وحدات الإضاءة أو الفكرة وحدها، وسيعود إليك فريقنا في الرياض بدراسة إضاءة وعرض سعر."
                    : "Send drawings, a fixture schedule, or just the brief. Our Riyadh team will come back with a lighting study and a quotation."}
              </p>
              <Link href={localePath(close?.href ?? "/contact", lang)} className={styles.closeCta}>
                {close
                  ? ar ? close.arCta : close.cta
                  : ar ? "احجز استشارة إضاءة" : "Book a consultation"}
                <span aria-hidden="true">{ar ? "←" : "→"}</span>
              </Link>
            </div>
          </Reveal>
        </div>
      </section>
    </main>
  );
}
