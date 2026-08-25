"use client";

import Link from "next/link";
import { useLang } from "@/lib/lang";
import { PhotoSlot } from "@/components/PhotoSlot";
import { Reveal } from "@/components/Reveal";
import { VendorBelt } from "@/components/VendorBelt";
import { CHAPTERS, PLEDGES, STATS, VALUES } from "@/lib/about-data";
import styles from "./page.module.css";

export default function AboutPage() {
  const { lang } = useLang();
  const ar = lang === "ar";

  return (
    <main className={styles.page}>
      {/* Hero */}
      <section className={styles.hero}>
        <div className={styles.heroGlow} />
        <div className={`${styles.shell} ${styles.heroInner}`}>
          <Reveal>
            <div className={styles.heroGrid}>
              <div className={styles.heroCol}>
                <span className={styles.eyebrow}>{ar ? "عن الشركة" : "About ARAK"}</span>
                <h1 className={styles.heroTitle}>
                  {ar
                    ? "خمسون عاماً من الضوء، مشروعاً تلو الآخر"
                    : "Fifty years of light, one project at a time."}
                </h1>
              </div>
              <div className={styles.heroCol}>
                <p className={styles.heroLead}>
                  ARAK started in 1976 as an extension of the Abdul Rahman Abdul Kadir Corporation.
                  Fifty years later it is a Saudi lighting company and smart lighting solutions
                  provider, carrying more than forty international brands and delivering fittings,
                  controls and automation into hotels, airports, hospitals, palaces and national
                  projects across the Kingdom.
                </p>
                <div className={styles.heroActions}>
                  <Link href="/projects" className={styles.primaryCta}>
                    {ar ? "شاهد أعمالنا" : "See the work"}
                    <span aria-hidden="true">&rarr;</span>
                  </Link>
                  <a
                    href="/docs/Arak%20Company%20Profile%202024.pdf"
                    target="_blank"
                    rel="noopener noreferrer"
                    className={styles.ghostCta}
                  >
                    {ar ? "الملف التعريفي" : "Company profile"}
                    <span aria-hidden="true">&darr;</span>
                  </a>
                </div>
              </div>
            </div>
          </Reveal>
          <Reveal delay={120}>
            <div className={styles.stats}>
              {STATS.map((s) => (
                <div key={s.value + s.en} className={styles.statCell}>
                  <div className={styles.statValue}>
                    <span className={styles.statFigure}>{s.value}</span>
                  </div>
                  <div className={styles.statLabel}>{ar ? s.ar : s.en}</div>
                </div>
              ))}
            </div>
          </Reveal>
        </div>
      </section>

      {/* The name */}
      <section className={`${styles.band} ${styles.bandDark}`}>
        <div className={styles.shell}>
          <div className={styles.name}>
            <Reveal>
              <div className={styles.nameMarkWrap}>
                <div className={styles.nameMarkGlow} />
                <span className={styles.nameMark} lang="ar" dir="rtl">
                  أراك
                </span>
                <span className={styles.nameTranslation}>I see you</span>
              </div>
            </Reveal>
            <Reveal delay={100}>
              <span className={styles.nameEyebrow}>{ar ? "الاسم" : "The name"}</span>
              <h2 className={styles.nameTitle}>
                {ar ? "أراك تعني أنني أراك" : "Our name is a promise to pay attention."}
              </h2>
              <p className={styles.nameBody}>
                أراك means <em>I see you</em> in Arabic. It is a fair description of what lighting
                actually does for a building, and of how we prefer to work: looking closely at the
                room, the client and the drawing in front of us before anyone talks about a fixture
                schedule.
              </p>
              <p className={styles.nameBodySmall}>
                The company grew out of a family trading house into a pioneering Saudi establishment
                that still runs on Saudi values. Everything below is what that turned into over
                fifty years.
              </p>
            </Reveal>
          </div>
        </div>
      </section>

      {/* Chapters */}
      <section className={styles.band}>
        <div className={styles.shell}>
          <Reveal>
            <div className={styles.sectionHead}>
              <div>
                <span className={styles.eyebrow}>{ar ? "مسيرتنا" : "How we got here"}</span>
                <h2 className={styles.sectionTitle}>{ar ? "أربعة فصول" : "Four chapters"}</h2>
              </div>
              <p className={styles.sectionNote}>
                Not a timeline of press releases. Four shifts in what the company actually sold, in
                the order they happened.
              </p>
            </div>
          </Reveal>
          <div className={styles.chapters}>
            {CHAPTERS.map((c, i) => (
              <Reveal key={c.no} delay={i * 80}>
                <article className={styles.chapter}>
                  <div className={styles.chapterNo}>{c.no}</div>
                  <h3 className={styles.chapterTitle}>{ar ? c.ar : c.en}</h3>
                  <p className={styles.chapterBody}>{c.body}</p>
                </article>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* Founder */}
      <section className={`${styles.band} ${styles.bandPaper}`}>
        <div className={styles.shell}>
          <div className={styles.founder}>
            <Reveal>
              <div className={styles.founderAside}>
                <h2 className={styles.founderLabel}>
                  {ar ? "كلمة المؤسس" : "Message from the Founder"}
                </h2>
                <div className={styles.founderMark} aria-hidden="true">
                  &ldquo;
                </div>
              </div>
            </Reveal>
            <Reveal delay={80}>
              <p className={styles.founderLead}>
                With a long history and legacy of 40+ years, ARAK Lighting became a leading national
                company in the field of lighting. Throughout the years, with hard work and
                persistence, the company has positioned itself alongside the industry&rsquo;s
                pioneering national companies, becoming a certified partner of several reputable
                international brands.
              </p>
              <p className={styles.founderBody}>
                Due to elevated knowledge and a big love for lights, ARAK Lighting became an
                embodiment of the highest standards in the lighting industry, one that strives to
                keep climbing the ladder of excellence and quality with a forever growing interest
                in all new light technologies.
              </p>
              <p className={styles.founderBody}>
                Being a leading national company, ARAK Lighting keeps innovating internally and
                growing with its mission and values. The company keeps expanding its product
                portfolio in lighting and lighting controls to continue offering the best customer
                experience solutions, in line with the Kingdom&rsquo;s 2030 vision.
              </p>
              <div className={styles.founderPull}>
                <p className={styles.founderPullText}>
                  Ease your mind with us, and know that ARAK Lighting will forever be there to light
                  your way.
                </p>
                <div className={styles.signature}>
                  <span className={styles.signatureName}>Abdul Rahman Abdul Kader</span>
                  <span className={styles.signatureRole}>{ar ? "المؤسس" : "Founder"}</span>
                </div>
              </div>
            </Reveal>
          </div>
        </div>
      </section>

      {/* Vision & mission */}
      <section className={styles.band}>
        <div className={styles.shell}>
          <Reveal>
            <div className={styles.sectionHead}>
              <div>
                <span className={styles.eyebrow}>{ar ? "إلى أين نتجه" : "Where we are going"}</span>
                <h2 className={styles.sectionTitle}>
                  {ar ? "الرؤية والمهمة" : "Vision and mission"}
                </h2>
              </div>
              <p className={styles.sectionNote}>
                One says where the company intends to end up. The other says what it refuses to
                compromise on along the way.
              </p>
            </div>
          </Reveal>
          <div className={styles.pillars}>
            <Reveal>
              <article className={`${styles.pillar} ${styles.pillarDark}`}>
                <div className={styles.pillarGlow} />
                <span className={styles.pillarNo}>01</span>
                <h3 className={styles.pillarTitle}>{ar ? "رؤيتنا" : "Our Vision"}</h3>
                <p className={styles.pillarBody}>
                  To become the leader in the lighting industry nationally and regionally, and the
                  go-to smart lighting solutions provider in the Kingdom. We aim to expand into new
                  markets and regions by partnering with high-end international brands, constantly
                  upgrading our services and diversifying what we can supply.
                </p>
              </article>
            </Reveal>
            <Reveal delay={90}>
              <article className={styles.pillar}>
                <span className={styles.pillarNo}>02</span>
                <h3 className={styles.pillarTitle}>{ar ? "مهمتنا" : "Our Mission"}</h3>
                <p className={styles.pillarBody}>
                  To always offer state-of-the-art products and service in compliance with the
                  highest international standards. Cutting-edge hardware delivered consistently, to
                  the most stringent global benchmarks, is the core of a commitment to excellence
                  that has not changed since 1976.
                </p>
              </article>
            </Reveal>
          </div>
        </div>
      </section>

      {/* Values */}
      <section className={`${styles.band} ${styles.bandPaper}`}>
        <div className={styles.shell}>
          <Reveal>
            <div className={styles.sectionHead}>
              <div>
                <span className={styles.eyebrow}>{ar ? "قيمنا" : "Our values"}</span>
                <h2 className={styles.sectionTitle}>{ar ? "لماذا أراك؟" : "Why ARAK?"}</h2>
              </div>
              <p className={styles.sectionNote}>
                Four things clients can hold us to, and the reason most of them come back with the
                next building.
              </p>
            </div>
          </Reveal>
          <div className={styles.values}>
            {VALUES.map((v, i) => (
              <Reveal key={v.no} delay={(i % 2) * 90}>
                <article className={styles.value}>
                  <div className={styles.valueHead}>
                    <span className={styles.valueNo}>{v.no}</span>
                    <h3 className={styles.valueTitle}>{ar ? v.ar : v.en}</h3>
                  </div>
                  <p className={styles.valueBody}>{v.body}</p>
                </article>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* People */}
      <section className={styles.band}>
        <div className={styles.shell}>
          <div className={styles.people}>
            <Reveal>
              <div className={styles.peopleArt}>
                <PhotoSlot
                  src="/projects/athletic-showroom/03.jpg"
                  alt="An ARAK-lit retail showroom in Riyadh with track spots, linear runs and shelf-integrated strips, seen from the shop floor"
                />
              </div>
            </Reveal>
            <Reveal delay={90}>
              <span className={styles.eyebrow}>{ar ? "فريقنا" : "Our people"}</span>
              <h2 className={styles.sectionTitle}>
                {ar ? "من ينفّذ العمل فعلياً" : "The people who actually do the work"}
              </h2>
              <p className={styles.sectionNote} style={{ marginTop: "24px", maxWidth: "52ch" }}>
                A lighting company is only as good as the person on the phone when a fitting arrives
                damaged or a bus address will not respond. So we invest in that person first.
              </p>
              <ul className={styles.peopleList}>
                {PLEDGES.map((p) => (
                  <li key={p.en} className={styles.pledge}>
                    <h3 className={styles.pledgeTitle}>{ar ? p.ar : p.en}</h3>
                    <p className={styles.pledgeBody}>{p.body}</p>
                  </li>
                ))}
              </ul>
            </Reveal>
          </div>
        </div>
      </section>

      {/* Accreditation */}
      <section className={`${styles.band} ${styles.beltBand}`}>
        <div className={styles.shell}>
          <Reveal>
            <div className={styles.sectionHead}>
              <div>
                <span className={styles.eyebrow}>{ar ? "الاعتماد" : "Accreditation"}</span>
                <h2 className={styles.sectionTitle}>
                  {ar ? "مورد معتمد لدى" : "Registered vendor with"}
                </h2>
              </div>
              <p className={styles.sectionNote}>
                Prequalified with the national developers, operators and authorities delivering the
                Kingdom&rsquo;s largest programmes.
              </p>
            </div>
          </Reveal>
          <VendorBelt />
        </div>
      </section>

      {/* Closing */}
      <section className={styles.close}>
        <div className={styles.closeGlow} />
        <div className={`${styles.shell} ${styles.closeInner}`}>
          <Reveal>
            <span className={styles.closeEyebrow}>{ar ? "لنبدأ" : "Start here"}</span>
            <h2 className={styles.closeTitle}>
              {ar ? "لنُضئ مشروعك القادم" : "Bring us the building. We will bring the light."}
            </h2>
            <p className={styles.closeLead}>
              Send drawings, a fixture schedule, or just the brief. Our Riyadh team will come back
              with a lighting study and a quotation.
            </p>
            <div className={styles.closeActions}>
              <Link href="/contact" className={styles.closeCta}>
                {ar ? "احجز استشارة إضاءة" : "Book a consultation"}
                <span aria-hidden="true">&rarr;</span>
              </Link>
              <Link href="/services" className={styles.closeGhost}>
                {ar ? "استكشف خدماتنا" : "Explore the services"}
                <span aria-hidden="true">&rarr;</span>
              </Link>
            </div>
            <p className={styles.closeAddress}>
              Exit 2, Northern Ring Branch Road, Hittin, Riyadh 13513, Kingdom of Saudi Arabia
            </p>
          </Reveal>
        </div>
      </section>
    </main>
  );
}
