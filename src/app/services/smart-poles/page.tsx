"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useMemo, useState } from "react";
import { useLang } from "@/lib/lang";
import { Reveal } from "@/components/Reveal";
import {
  ARAK_ROLE,
  POLES,
  POLE_FAMILIES,
  POLE_FUNCTIONS,
  POLE_LAYERS,
  type Pole,
  type PoleFamily,
} from "@/lib/smart-poles-data";
import styles from "./page.module.css";

const PITCH = [
  {
    title: "It is already there.",
    body: "Street lighting is the only public infrastructure that already stands every few dozen metres, already has a power feed, and already looks down at the street. Everything else a smart city wants to install has to find a home. Lighting has one.",
  },
  {
    title: "One foundation, nine services.",
    body: "Every device you hang on a pole is a device you do not dig a separate trench for, pour a separate base for, or negotiate a separate wayleave for. The civil works are the expensive part of a smart city, and the pole pays them once.",
  },
  {
    title: "It earns twice.",
    body: "Once in the energy an LED head and an intelligent control profile save against a legacy installation, and once in the cabinets, ducting and site works that never get built because the mast already carries the network.",
  },
];

const FAMILY_LABEL: Record<PoleFamily, string> = {
  city: "Smart city mast",
  pedestrian: "Pedestrian and park",
  heritage: "Heritage and ornamental",
};

const CONTEXT_SHOTS = [
  {
    src: "/smart-poles/ctx-street.jpg",
    alt: "Smart poles along a landscaped city boulevard carrying luminaires, cameras and vertical display panels",
    cap: "Boulevards and arterial roads, where the mast carries the road luminaire, the small cell and the signage face on one shaft.",
  },
  {
    src: "/smart-poles/ctx-park.jpg",
    alt: "White smart poles lining a waterfront park promenade",
    cap: "Waterfront promenades and parks, at the pedestrian scale, with banner panels and public WiFi built in.",
  },
  {
    src: "/smart-poles/ctx-facade.jpg",
    alt: "Slim dark smart poles standing in front of a lit stone facade at dusk",
    cap: "Retail streets and civic frontages, where the pole has to stay slim enough not to compete with the building behind it.",
  },
  {
    src: "/smart-poles/ctx-residential.jpg",
    alt: "Ornamental smart poles on a residential street lined with houses",
    cap: "Residential districts and compounds, using the ornamental crowns that carry the same sensors as the modern masts.",
  },
];

export default function SmartPolesPage() {
  const { lang } = useLang();
  const ar = lang === "ar";
  const [family, setFamily] = useState<PoleFamily | "all">("all");
  const [open, setOpen] = useState<Pole | null>(null);

  const poles = useMemo(
    () => (family === "all" ? POLES : POLES.filter((p) => p.family === family)),
    [family]
  );

  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setOpen(null);
    };
    document.addEventListener("keydown", onKey);
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", onKey);
      document.body.style.overflow = prev;
    };
  }, [open]);

  return (
    <main className={styles.page}>
      {/* Hero */}
      <section className={styles.hero}>
        <Image
          src="/smart-poles/hero.jpg"
          alt="A modern street light glowing warm against a dusk city skyline"
          fill
          priority
          sizes="100vw"
          className={styles.heroImg}
        />
        <div className={styles.heroVeil} />
        <div className={`${styles.shell} ${styles.heroInner}`}>
          <div className={styles.crumb}>
            <Link href="/services">{ar ? "خدماتنا" : "Services"}</Link>
            <span aria-hidden="true">/</span>
            <span className={styles.crumbNow}>{ar ? "الأعمدة الذكية" : "Smart Poles"}</span>
          </div>
          <h1 className={styles.heroTitle}>
            {ar ? "عمود واحد. مدينة كاملة." : "One pole. The whole street on it."}
          </h1>
          <p className={styles.heroLead}>
            Light was only ever the first job. A smart pole also carries the network, the cameras,
            the sensors, the signage and the emergency call button, on a foundation the street
            already has.
          </p>
          <div className={styles.heroTag}>
            ARAK &nbsp;&middot;&nbsp; C&deg;LB Smart Light Pole Series &nbsp;&middot;&nbsp; Twenty
            designs
          </div>
        </div>
      </section>

      {/* Pitch */}
      <section className={styles.band} style={{ borderTop: 0 }}>
        <div className={styles.shell}>
          <div className={styles.pitch}>
            {PITCH.map((p, i) => (
              <Reveal key={p.title} delay={i * 100}>
                <div className={styles.pitchItem}>
                  <h2 className={styles.pitchTitle}>{p.title}</h2>
                  <p className={styles.pitchBody}>{p.body}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* Functions */}
      <section className={`${styles.band} ${styles.bandDark}`}>
        <div className={styles.shell}>
          <Reveal>
            <div className={styles.sectionHead}>
              <div>
                <span className={`${styles.eyebrow} ${styles.eyebrowLight}`}>
                  {ar ? "وظائف النظام" : "System functions"}
                </span>
                <h2 className={`${styles.sectionTitle} ${styles.sectionTitleLight}`}>
                  {ar ? "ماذا يحمل العمود الذكي" : "What a smart pole carries"}
                </h2>
              </div>
              <p className={`${styles.sectionNote} ${styles.sectionNoteLight}`}>
                Smart pole systems are a carrier and terminal layer for the intelligent city, built
                on IoT, cloud computing, big data and spatial information. They collect and transmit
                what a city needs for service delivery, public safety and environmental protection.
              </p>
            </div>
          </Reveal>
          <div className={styles.functions}>
            {POLE_FUNCTIONS.map((f, i) => (
              <Reveal key={f.title} delay={(i % 3) * 80}>
                <div className={styles.fn}>
                  <h3 className={styles.fnTitle}>{f.title}</h3>
                  <p className={styles.fnBody}>{f.body}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* Architecture */}
      <section className={styles.band}>
        <div className={styles.shell}>
          <Reveal>
            <div className={styles.sectionHead}>
              <div>
                <span className={styles.eyebrow}>{ar ? "المفهوم التقني" : "Technical concept"}</span>
                <h2 className={styles.sectionTitle}>
                  {ar ? "ثلاث طبقات" : "Three layers, one system"}
                </h2>
              </div>
              <p className={styles.sectionNote}>
                Smart street lighting is a stack, not a product. Keeping the layers separate is what
                lets a city change its software without re-cabling the street.
              </p>
            </div>
          </Reveal>
          <div className={styles.layers}>
            {POLE_LAYERS.map((l, i) => (
              <Reveal key={l.layer} delay={i * 90}>
                <div className={styles.layer}>
                  <h3 className={styles.layerName}>{l.layer}</h3>
                  <p className={styles.layerDetail}>{l.detail}</p>
                  <p className={styles.layerBody}>{l.body}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* The series */}
      <section className={`${styles.band} ${styles.bandRender}`}>
        <div className={styles.shell}>
          <Reveal>
            <div className={styles.sectionHead}>
              <div>
                <span className={`${styles.eyebrow} ${styles.eyebrowLight}`}>
                  {ar ? "المجموعة" : "The series"}
                </span>
                <h2 className={`${styles.sectionTitle} ${styles.sectionTitleLight}`}>
                  {ar ? "عشرون تصميماً" : "Twenty designs"}
                </h2>
              </div>
              <p className={`${styles.sectionNote} ${styles.sectionNoteLight}`}>
                From full smart-city masts down to ornamental crowns for heritage districts. Every
                design takes the same service payload. Select one to read its detail.
              </p>
            </div>
          </Reveal>

          <Reveal>
            <div className={styles.filters}>
              {POLE_FAMILIES.map((f) => (
                <button
                  key={f.id}
                  type="button"
                  onClick={() => setFamily(f.id)}
                  className={`${styles.filter} ${family === f.id ? styles.filterOn : ""}`}
                >
                  {ar ? f.ar : f.en}
                </button>
              ))}
            </div>
          </Reveal>

          <div className={styles.series}>
            {poles.map((p, i) => (
              <Reveal key={p.slug} delay={(i % 4) * 70}>
                <button type="button" className={styles.pole} onClick={() => setOpen(p)}>
                  <div className={styles.poleArt}>
                    <Image
                      src={`/smart-poles/${p.slug}.jpg`}
                      alt={`${p.name} smart pole, ${p.tagline.toLowerCase()}`}
                      fill
                      sizes="(max-width: 680px) 50vw, (max-width: 1080px) 33vw, 24vw"
                    />
                  </div>
                  <div className={styles.poleMeta}>
                    <h3 className={styles.poleName}>{p.name}</h3>
                    <p className={styles.poleTag}>{p.tagline}</p>
                    <span className={styles.poleMore}>{ar ? "التفاصيل" : "View detail"}</span>
                  </div>
                </button>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* ARAK role */}
      <section className={`${styles.band} ${styles.bandPaper}`}>
        <div className={styles.shell}>
          <Reveal>
            <div className={styles.sectionHead}>
              <div>
                <span className={styles.eyebrow}>{ar ? "دورنا" : "Our role"}</span>
                <h2 className={styles.sectionTitle}>
                  {ar ? "كيف تنفّذ أراك المشروع" : "How ARAK delivers it"}
                </h2>
              </div>
              <p className={styles.sectionNote}>
                A smart pole touches lighting, civil works, low current, networking and city
                operations. We hold all five so the client is not left arbitrating between four
                contractors when a camera drops off the network.
              </p>
            </div>
          </Reveal>
          <div className={styles.roles}>
            {ARAK_ROLE.map((r, i) => (
              <Reveal key={r.no} delay={i * 70}>
                <div className={styles.role}>
                  <div className={styles.roleNo}>{r.no}</div>
                  <h3 className={styles.roleTitle}>{r.title}</h3>
                  <p className={styles.roleBody}>{r.body}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* Context gallery */}
      <section className={styles.band}>
        <div className={styles.shell}>
          <Reveal>
            <div className={styles.sectionHead}>
              <div>
                <span className={styles.eyebrow}>{ar ? "أين تُركّب" : "Where they go"}</span>
                <h2 className={styles.sectionTitle}>{ar ? "في الموقع" : "On the ground"}</h2>
              </div>
              <p className={styles.sectionNote}>
                The right pole is the one that suits the street it stands on. Scale, finish and
                crown change. The services inside the shaft do not.
              </p>
            </div>
          </Reveal>
          <div className={styles.gallery}>
            {CONTEXT_SHOTS.map((s, i) => (
              <Reveal key={s.src} delay={(i % 2) * 90}>
                <figure className={styles.shot} style={{ margin: 0 }}>
                  <div className={styles.shotFrame}>
                    <Image
                      src={s.src}
                      alt={s.alt}
                      fill
                      sizes="(max-width: 680px) 100vw, 50vw"
                    />
                  </div>
                  <figcaption className={styles.shotCap}>{s.cap}</figcaption>
                </figure>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className={`${styles.band} ${styles.bandDark}`} style={{ paddingBlock: 0 }}>
        <div className={`${styles.shell} ${styles.cta}`}>
          <Reveal>
            <h2 className={styles.ctaTitle}>
              {ar ? "لنخطط لشبكة أعمدتك الذكية" : "Send us the road, we will send back the pole run."}
            </h2>
            <p className={styles.ctaLead}>
              Give us the alignment, the pole spacing and the services the city wants on the mast.
              Our Riyadh team will come back with a design, a device schedule and a quotation.
            </p>
            <div className={styles.ctaRow}>
              <Link href="/contact" className={styles.ctaPrimary}>
                {ar ? "تحدث إلى فريقنا" : "Talk to our team"}
                <span aria-hidden="true">&rarr;</span>
              </Link>
              <Link href="/services" className={styles.ctaGhost}>
                {ar ? "كل الخدمات" : "All services"}
              </Link>
            </div>
          </Reveal>
        </div>
      </section>

      {/* Pole detail dialog */}
      {open && (
        <div
          className={styles.overlay}
          role="dialog"
          aria-modal="true"
          aria-label={`${open.name} smart pole`}
          onClick={() => setOpen(null)}
        >
          <div className={styles.dialog} onClick={(e) => e.stopPropagation()}>
            <button
              type="button"
              className={styles.close}
              onClick={() => setOpen(null)}
              aria-label="Close"
            >
              &times;
            </button>
            <div className={styles.dialogArt}>
              <Image
                src={`/smart-poles/${open.slug}.jpg`}
                alt={`${open.name} smart pole`}
                fill
                sizes="(max-width: 1080px) 100vw, 40vw"
              />
            </div>
            <div className={styles.dialogCopy}>
              <span className={styles.dialogFamily}>{FAMILY_LABEL[open.family]}</span>
              <h3 className={styles.dialogName}>{open.name}</h3>
              <p className={styles.dialogTag}>{open.tagline}</p>
              <p className={styles.dialogBody}>{open.body}</p>
              <p className={styles.dialogFoot}>
                Supplied, installed, integrated and maintained by ARAK. Heights, finishes and the
                device payload are configured per project.
              </p>
            </div>
          </div>
        </div>
      )}
    </main>
  );
}
