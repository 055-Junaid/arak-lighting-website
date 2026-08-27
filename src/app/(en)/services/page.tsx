"use client";

import Image from "next/image";
import Link from "next/link";
import { useLang } from "@/lib/lang";
import { localePath } from "@/lib/site";
import { PhotoSlot } from "@/components/PhotoSlot";
import { Reveal } from "@/components/Reveal";
import { ServiceSpotlight } from "@/components/ServiceSpotlight";
import {
  CONTROL_SYSTEMS,
  PROCESS,
  SECTORS,
  SERVICES,
  SMART_POLES,
} from "@/lib/services-data";
import styles from "./page.module.css";
import { PHOTO_QUALITY } from "@/lib/images";

const HERO_META = [
  { value: "1976", en: "Lighting since", ar: "نعمل منذ" },
  { value: "10", en: "Service lines", ar: "خطوط خدمة" },
  { value: "40+", en: "Partner brands", ar: "علامة شريكة" },
  { value: "1", en: "Contract, start to finish", ar: "عقد واحد" },
];

export default function ServicesPage() {
  const { lang } = useLang();
  const ar = lang === "ar";

  return (
    <main className={styles.page}>
      {/* Hero */}
      <section className={`${styles.shell} ${styles.hero}`}>
        <Reveal>
          <span className={styles.eyebrow}>{ar ? "خدماتنا" : "Services"}</span>
          <h1 className={styles.heroTitle}>
            {ar ? "من التوريد إلى التشغيل" : "Everything a lighting scope needs, under one contract."}
          </h1>
          <p className={styles.heroLead}>
            {ar
              ? "عشرة خطوط خدمة تغطّي المشروع من أول رسم حتى آخر مفتاح. نضع التصميم ونورّد وحدات الإضاءة ونمدّ نظام التحكّم ونشغّله في الموقع، ونبقى على اتصال بعد التسليم بوقت طويل."
              : "Ten service lines that cover a project from the first sketch to the last switch. We specify the scheme, supply the fittings, wire the control system, commission it on site and stay on the phone long after handover."}
          </p>
        </Reveal>
        <Reveal delay={120}>
          <div className={styles.heroMeta}>
            {HERO_META.map((m) => (
              <div key={m.value + m.en} className={styles.metaCell}>
                <div className={styles.metaValue}>{m.value}</div>
                <div className={styles.metaLabel}>{ar ? m.ar : m.en}</div>
              </div>
            ))}
          </div>
        </Reveal>
      </section>

      {/* Service cards */}
      <section className={`${styles.band} ${styles.bandPaper}`}>
        <div className={styles.shell}>
          <Reveal>
            <div className={styles.sectionHead}>
              <div>
                <span className={styles.eyebrow}>{ar ? "ما نقدمه" : "What we do"}</span>
                <h2 className={styles.sectionTitle}>
                  {ar ? "خطوط الخدمة" : "The service lines"}
                </h2>
              </div>
              <p className={styles.sectionNote}>
                {ar
                  ? "يمكن طلب كل خط خدمة على حدة أو ضمّه إلى نطاق عمل واحد. ومعظم مشاريعنا الوطنية تستخدم أربعة أو خمسة منها في آنٍ واحد."
                  : "Each line can be bought on its own or folded into a single scope. Most of our national projects use four or five of them at once."}
              </p>
            </div>
          </Reveal>

          <Reveal>
            <ServiceSpotlight services={SERVICES} ar={ar} />
          </Reveal>

          {/* Smart poles feature */}
          <Reveal delay={80}>
            <article className={styles.feature}>
              <div className={styles.featureCopy}>
                <span className={styles.featureBadge}>
                  {ar ? "محور تركيزنا القادم" : "Where we are heading next"}
                </span>
                <span className={styles.featureNo}>{SMART_POLES.no}</span>
                <h3 className={styles.featureTitle}>{ar ? SMART_POLES.ar : SMART_POLES.en}</h3>
                <p className={styles.featureLead}>{ar ? SMART_POLES.arLead : SMART_POLES.lead}</p>
                <p className={styles.featureBody}>{ar ? SMART_POLES.arBody : SMART_POLES.body}</p>
                <ul className={styles.featureList}>
                  {(ar ? SMART_POLES.arIncludes : SMART_POLES.includes).map((item) => (
                    <li key={item}>{item}</li>
                  ))}
                </ul>
                <Link href={localePath(SMART_POLES.href, lang)} className={styles.featureCta}>
                  {ar ? "استكشف الأعمدة الذكية" : "Explore smart poles"}
                  <span aria-hidden="true">&rarr;</span>
                </Link>
              </div>
              <div className={styles.featureArt}>
                <Image
                  quality={PHOTO_QUALITY}
                  src="/smart-poles/ctx-boulevard-riyadh.jpg"
                  alt={ar ? "طريق شرياني مضاء في الرياض ليلًا" : "A lit arterial road in Riyadh at night"}
                  fill
                  sizes="(max-width: 1080px) 100vw, 46vw"
                  style={{ objectFit: "cover" }}
                />
                <div className={styles.featureArtVeil} />
              </div>
            </article>
          </Reveal>
        </div>
      </section>

      {/* Process */}
      <section className={styles.band}>
        <div className={styles.shell}>
          <Reveal>
            <div className={styles.sectionHead}>
              <div>
                <span className={styles.eyebrow}>{ar ? "طريقة عملنا" : "How we work"}</span>
                <h2 className={styles.sectionTitle}>
                  {ar ? "من الفكرة إلى التسليم" : "Five steps, one team"}
                </h2>
              </div>
              <p className={styles.sectionNote}>
                {ar
                  ? "التسلسل نفسه يسري على فيلا خاصة وعلى مطار وطني. وحدها الأوراق تزداد ثقلًا."
                  : "The same sequence runs on a private villa and on a national airport. Only the paperwork gets heavier."}
              </p>
            </div>
          </Reveal>
          <div className={styles.process}>
            {PROCESS.map((step, i) => (
              <Reveal key={step.no} delay={i * 80}>
                <div className={styles.step}>
                  <div className={styles.stepNo}>{step.no}</div>
                  <h3 className={styles.stepTitle}>{ar ? step.ar : step.en}</h3>
                  <p className={styles.stepBody}>{ar ? step.arBody : step.body}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* Controls detail. Anchored: the home page controls band links here. */}
      <section id="controls" className={`${styles.band} ${styles.bandPaper}`}>
        <div className={styles.shell}>
          <div className={styles.controls}>
            <div>
              <Reveal>
                <span className={styles.eyebrow}>{ar ? "بالتفصيل" : "In detail"}</span>
                <h2 className={styles.sectionTitle}>
                  {ar ? "أنظمة التحكم والأتمتة" : "Controls and automation"}
                </h2>
                <p className={styles.sectionNote} style={{ marginTop: "22px", maxWidth: "50ch" }}>
                  {ar
                    ? "أنظمة التحكّم هي المكان الذي يستحقّ فيه مشروع الإضاءة ميزانيته أو يهدرها بصمت. وهي الجزء من عملنا الذي يستمرّ أطول ما يكون بعد التسليم."
                    : "Controls are where a lighting scheme either earns its budget or quietly wastes it. This is the part of our work that runs longest after handover."}
                </p>
              </Reveal>
              <div style={{ marginTop: "44px" }}>
                {CONTROL_SYSTEMS.map((c, i) => (
                  <Reveal key={c.title} delay={i * 70}>
                    <div className={styles.controlItem}>
                      <h3 className={styles.controlTitle}>{ar ? c.arTitle : c.title}</h3>
                      <p className={styles.controlBody}>{ar ? c.arBody : c.body}</p>
                    </div>
                  </Reveal>
                ))}
              </div>
            </div>
            <div className={styles.controlArt}>
              <PhotoSlot
                src="/projects/delfino/04.jpg"
                alt={
                  ar
                    ? "شاشة التحكّم KNX في دلفينو مايفير، الرياض، وعليها مشاهد إضاءة المطعم والتحكّم بالستائر والمظلات والتكييف في واجهة واحدة"
                    : "The KNX control screen at Delfino Mayfair, Riyadh, with the restaurant's lighting scenes, curtain, blind and air control on one interface"
                }
              />
            </div>
          </div>
        </div>
      </section>

      {/* Sectors */}
      <section className={styles.band}>
        <div className={styles.shell}>
          <Reveal>
            <div className={styles.sectionHead}>
              <div>
                <span className={styles.eyebrow}>{ar ? "نعمل مع" : "We work with"}</span>
                <h2 className={styles.sectionTitle}>
                  {ar ? "القطاعات التي نخدمها" : "Who we deliver for"}
                </h2>
              </div>
              <p className={styles.sectionNote}>
                {ar
                  ? "مورّد معتمد لدى أرامكو ونيوم والقدية وروشن وشركة الاتصالات السعودية ومطارات الرياض وشركة البحر الأحمر للتطوير والشركة السعودية للكهرباء، وغيرها."
                  : "Registered as a vendor with Aramco, NEOM, Qiddiya, Roshn, STC, Riyadh Airports, the Red Sea Development Company and the Saudi Electricity Company, among others."}
              </p>
            </div>
          </Reveal>
          <div className={styles.sectors}>
            {SECTORS.map((sector, i) => (
              <Reveal key={sector.en} delay={(i % 3) * 60}>
                <div className={styles.sector}>{ar ? sector.ar : sector.en}</div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className={styles.band} style={{ paddingBlock: 0 }}>
        <div className={`${styles.shell} ${styles.cta}`}>
          <div className={styles.ctaGlow} />
          <Reveal>
            <h2 className={styles.ctaTitle}>
              {ar ? "لنُضئ مشروعك القادم" : "Tell us what the space has to do."}
            </h2>
            <p className={styles.ctaLead}>
              {ar
                ? "أرسل المخططات أو جدول وحدات الإضاءة أو الفكرة وحدها، وسيعود إليك فريقنا في الرياض بدراسة إضاءة وعرض سعر."
                : "Send drawings, a fixture schedule, or just the brief. Our Riyadh team will come back with a lighting study and a quotation."}
            </p>
            <Link href={localePath("/contact", lang)} className={styles.ctaButton}>
              {ar ? "احجز استشارة إضاءة" : "Book a consultation"}
              <span aria-hidden="true">&rarr;</span>
            </Link>
          </Reveal>
        </div>
      </section>
    </main>
  );
}
