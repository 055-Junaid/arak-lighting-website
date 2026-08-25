"use client";

import Image from "next/image";
import Link from "next/link";
import { useLang } from "@/lib/lang";
import { PhotoSlot } from "@/components/PhotoSlot";
import { ProjectCards } from "@/components/ProjectCards";
import { VENDORS } from "@/components/VendorBelt";
import { LogoGrid } from "@/components/LogoGrid";
import { BrandGrid } from "@/components/BrandGrid";
import { ClientGrid } from "@/components/ClientGrid";
import styles from "./page.module.css";

/**
 * The six service lines carried on the home page, in company-profile order.
 * The remaining four (project management, 3D projection mapping, home
 * automation, smart poles) live on /services; Smart Poles keeps its own
 * feature strip below the grid. Photography is from delivered ARAK projects.
 */
const HOME_SERVICES = [
  {
    no: "01",
    en: "Indoor Lighting",
    ar: "الإضاءة الداخلية",
    enText: "Decorative and architectural fittings for residential, hospitality and commercial interiors.",
    arText: "وحدات إضاءة تجميلية ومعمارية للمساحات السكنية والفندقية والتجارية.",
    photo: "/projects/ritz-carlton/01.jpg",
    alt: "Chandelier and ornamented ceiling in the grand hall of The Ritz-Carlton, Riyadh",
  },
  {
    no: "02",
    en: "Lighting Design",
    ar: "تصميم الإضاءة",
    enText: "Photometric studies, layouts and fixture schedules developed with consultants and architects.",
    arText: "دراسات ضوئية ومخططات وجداول وحدات إضاءة، نُعدّها مع الاستشاريين والمعماريين.",
    photo: "/projects/solitaire-mall/04.jpg",
    alt: "The crystal cascade over the atrium at Solitaire Mall, Riyadh",
  },
  {
    no: "03",
    en: "Facade Lighting",
    ar: "إضاءة الواجهات",
    enText: "Exterior schemes that give buildings a night identity, engineered for the Saudi climate.",
    arText: "أنظمة إضاءة خارجية تمنح المباني هويةً ليلية، مصمّمة لتناسب المناخ السعودي.",
    photo: "/projects/seder-hq/01.jpg",
    alt: "The SEDER headquarters in Riyadh lit at night, a facade lighting scheme by ARAK",
  },
  {
    no: "04",
    en: "Outdoor Lighting",
    ar: "الإضاءة الخارجية",
    enText: "Streets, landscapes, car parks and compounds, from bollards to high-mast poles.",
    arText: "الشوارع والمسطحات والمواقف والمجمّعات، من الأعمدة القصيرة إلى الصواري العالية.",
    photo: "/projects/riyadh-air/02.jpg",
    alt: "The plaza and external lighting at the Riyadh Air head office",
  },
  {
    no: "05",
    en: "Lighting Controls",
    ar: "أنظمة التحكم بالإضاءة",
    enText: "KNX/EIB systems, scene control, daylight and presence sensing, energy management.",
    arText: "أنظمة KNX/EIB، والتحكم بالمشاهد، واستشعار الضوء والحركة، وإدارة الطاقة.",
    photo: "/projects/milling-mc2/03.jpg",
    alt: "A KNX lighting control panel commissioned by ARAK at Milling Company MC-2",
  },
  {
    no: "06",
    en: "Lighting Installation",
    ar: "تركيب الإضاءة",
    enText: "Site installation, commissioning and handover by our own technical crews.",
    arText: "التركيب في الموقع والتشغيل والتسليم عبر فرقنا الفنية.",
    photo: "/projects/athletic-showroom/03.jpg",
    alt: "Track and linear lighting installed in a retail showroom fit-out",
  },
];

export default function HomePage() {
  const { lang } = useLang();
  const ar = lang === "ar";

  return (
    <main>
      <section className={styles.hero} style={{ position: "relative", overflow: "hidden", background: "#FFFFFF", display: "flex", flexDirection: "column" }}>
        <div className={styles.heroArt}>
          <Image src="/home/riyadh-air-hq-v3.jpg" alt="Riyadh Air head office in Riyadh, a lighting project delivered by ARAK" fill priority sizes="100vw" style={{ objectFit: "cover", objectPosition: "center 46%" }} />
        </div>
        <div className={styles.heroVeil}></div>
        <div style={{ position: "absolute", top: "0", insetInlineStart: "22%", width: "1px", height: "100%", background: "linear-gradient(180deg,rgba(17,17,17,0) 0%,rgba(17,17,17,.32) 45%,rgba(17,17,17,0) 100%)", animation: "beam 6s ease-in-out infinite", pointerEvents: "none" }}></div>
        <div className={styles.heroRow}>
          <div className={styles.heroCol}>
            <div style={{ display: "flex", alignItems: "center", gap: "16px", marginBottom: "30px" }}>
              <span style={{ font: "500 11px/1 var(--font-plex-sans),sans-serif", letterSpacing: ".3em", textTransform: "uppercase", color: "#6E6E6B" }}>{lang === "ar" ? "حلول الإضاءة الذكية · الرياض" : "Smart Lighting Solutions · Riyadh"}</span>
            </div>
            <h1 style={{ font: "600 clamp(46px,7vw,104px)/0.98 var(--font-sora),sans-serif", letterSpacing: "-0.035em", color: "#111111", margin: "0", maxWidth: "15ch", textWrap: "balance" }}>{lang === "ar" ? "نُضيء المملكة منذ عام ١٩٧٦" : "Lighting the Kingdom since 1976"}</h1>
            <p style={{ font: "300 clamp(17px,1.5vw,21px)/1.6 var(--font-plex-sans),sans-serif", color: "rgba(17,17,17,.72)", margin: "34px 0 0", maxWidth: "52ch" }}>
              {ar
                ? "خمسة عقود من تجهيزات الإضاءة، وتصميم الإضاءة، وأنظمة التحكم KNX، والأتمتة المنزلية — في الفنادق والمطارات والقصور والمشاريع الوطنية."
                : "Five decades of fixtures, lighting design, KNX control and home automation, delivered across hotels, airports, palaces and national projects."}
            </p>
            <div style={{ display: "flex", gap: "14px", marginTop: "46px", pointerEvents: "auto" }}>
              <Link href="/contact" style={{ font: "500 12px/1 var(--font-plex-sans),sans-serif", letterSpacing: ".14em", textTransform: "uppercase", color: "#FFFFFF", background: "#111111", padding: "19px 30px", cursor: "pointer" }} className={styles.h1}>{lang === "ar" ? "احجز استشارة إضاءة" : "Book a lighting consultation"}</Link>
              <Link href="/projects" style={{ font: "500 12px/1 var(--font-plex-sans),sans-serif", letterSpacing: ".14em", textTransform: "uppercase", color: "#111111", border: "1px solid rgba(17,17,17,.28)", padding: "19px 30px", cursor: "pointer" }} className={styles.h2}>{lang === "ar" ? "عرض المشاريع" : "View projects"}</Link>
            </div>
          </div>
          <div className={styles.heroSeal}>
            <span className={styles.sealNum}>
              50<span className={styles.sealPlus}>+</span>
            </span>
            <span className={styles.sealCaption}>{ar ? "سنة من الخبرة" : "Years of expertise"}</span>
          </div>
        </div>
      </section>
      {/* Smart Poles band, in place of the old four-figure stat bar. */}
      <section className={styles.poleBand}>
        <div className={styles.poleBandShell}>
          <div>
            <div className={styles.poleBandEyebrow}>
              <span>{ar ? "الأعمدة الذكية" : "Smart poles"}</span>
              <span aria-hidden="true">·</span>
              <span>{ar ? "سلسلة C°LB" : "C°LB series"}</span>
            </div>
            <h2 className={styles.poleBandTitle}>
              {ar
                ? "أعمدة ذكية على البنية القائمة في الشارع"
                : "Smart poles, built on the street you already have"}
            </h2>
            <p className={styles.poleBandBody}>
              {ar
                ? "إنارة الشوارع هي البنية التحتية الوحيدة التي تقف كل خمسين مترًا، بالكهرباء عند قاعدتها وإطلالة مباشرة على الطريق. نحوّل هذا العمود إلى منصة تجمع الإضاءة وشبكات الجيل الخامس والكاميرات وأجهزة الاستشعار واللوحات الرقمية ونداء الطوارئ، نورّدها وندمجها في مختلف أنحاء المملكة."
                : "Street lighting is the only infrastructure that already stands every fifty metres, with power at the base and a clear view of the road. We turn that mast into a platform carrying light, 5G, cameras, sensors, signage and emergency call, supplied and integrated across the Kingdom."}
            </p>
            <Link href="/services/smart-poles" className={styles.poleBandCta}>
              {ar ? "استعرض سلسلة الأعمدة الذكية" : "See the smart pole series"}
              <span aria-hidden="true">{ar ? "←" : "→"}</span>
            </Link>
          </div>
          <div className={styles.poleBandFacts}>
            <div className={styles.poleBandFact}>
              <div className={styles.poleBandNum}>20</div>
              <div className={styles.poleBandLabel}>{ar ? "تصميم عمود" : "Pole designs"}</div>
            </div>
            <div className={styles.poleBandFact}>
              <div className={styles.poleBandNum}>07</div>
              <div className={styles.poleBandLabel}>{ar ? "أنظمة على العمود" : "Systems per mast"}</div>
            </div>
            <div className={styles.poleBandFact}>
              <div className={styles.poleBandNum}>01</div>
              <div className={styles.poleBandLabel}>{ar ? "قاعدة واحدة" : "Foundation"}</div>
            </div>
          </div>
        </div>
      </section>
      <section style={{ maxWidth: "1360px", margin: "0 auto", padding: "130px 48px" }}>
        <div style={{ display: "grid", gridTemplateColumns: "minmax(0,1.15fr) minmax(0,1fr)", gap: "96px", alignItems: "start" }}>
          <div>
            <div style={{ display: "flex", alignItems: "center", gap: "16px", marginBottom: "34px" }}>
              <span style={{ font: "500 11px/1 var(--font-plex-sans),sans-serif", letterSpacing: ".3em", textTransform: "uppercase", color: "#6E6E6B" }}>{lang === "ar" ? "من نحن" : "Who we are"}</span>
            </div>
            <h2 style={{ font: "600 clamp(32px,4vw,58px)/1.06 var(--font-sora),sans-serif", letterSpacing: "-0.03em", color: "#111111", margin: "0", maxWidth: "20ch" }}>{lang === "ar" ? "نتألق منذ عام ١٩٧٦" : "Shining brightly since 1976"}</h2>
            <p style={{ font: "400 17px/1.75 var(--font-plex-sans),sans-serif", color: "rgba(17,17,17,.68)", margin: "36px 0 0", maxWidth: "62ch" }}>
              {ar ? (
                "«أراك» شركة إضاءة ومزوّد لحلول الإضاءة الذكية، بدأت امتدادًا لمؤسسة عبدالرحمن عبدالقادر عام ١٩٧٦م، وهي اليوم مؤسسة سعودية رائدة تجسّد القيم السعودية."
              ) : (
                <>
                  “ARAK” <span style={{ color: "#111111" }}>أراك</span>, which means “I See You” in
                  Arabic, is a Lighting Company and a Smart Lighting Solutions Provider that started
                  as an extension of Abdul Rahman Abdul Kadir Corporation in 1976 and is now a
                  pioneering Saudi Establishment that embodies Saudi values.
                </>
              )}
            </p>
            <p style={{ font: "400 17px/1.75 var(--font-plex-sans),sans-serif", color: "rgba(17,17,17,.68)", margin: "26px 0 0", maxWidth: "62ch" }}>
              {ar
                ? "من توريد وحدات الإضاءة إلى تركيب أنظمة الأتمتة المنزلية المتكاملة، تركنا بصمتنا في القطاع على مدى أكثر من خمسين عامًا من الخبرة والريادة والإضاءة المتألقة."
                : "From supplying lighting fixtures to installing full-on Home Automation Systems, we pride ourselves to have successfully marked the industry with more than 50 years of know-how, leadership, and shimmering lights."}
            </p>
            <p style={{ font: "400 17px/1.75 var(--font-plex-sans),sans-serif", color: "rgba(17,17,17,.68)", margin: "26px 0 0", maxWidth: "62ch" }}>
              {ar
                ? "وعلى مرّ السنين، رسّخت أراك مكانتها إلى جانب الشركات الوطنية الرائدة في القطاع، وأصبحت شريكًا معتمدًا لعدد من الشركات العالمية المرموقة."
                : "Throughout the years, ARAK has positioned itself alongside the industry’s pioneering national companies, becoming a certified partner of several reputable international companies."}
            </p>
            <Link href="/about" style={{ display: "inline-flex", alignItems: "center", gap: "12px", font: "500 12px/1 var(--font-plex-sans),sans-serif", letterSpacing: ".16em", textTransform: "uppercase", color: "#111111", marginTop: "44px", cursor: "pointer", borderBottom: "1px solid rgba(17,17,17,.3)", paddingBottom: "8px" }} className={styles.h3}>{lang === "ar" ? "قصتنا الكاملة" : "Our full story"}
            <span aria-hidden="true">{ar ? "←" : "→"}</span></Link>
          </div>
          <div style={{ height: "560px" }}>
            <PhotoSlot src="/projects/solitaire-mall/06.jpg" alt="The crystal cascade lighting scheme at Solitaire Mall, Riyadh" />
          </div>
        </div>
      </section>
      <section style={{ borderTop: "1px solid rgba(17,17,17,.13)", background: "#F6F5F3" }}>
        <div style={{ maxWidth: "1360px", margin: "0 auto", padding: "120px 48px" }}>
          <div style={{ display: "flex", alignItems: "flex-end", justifyContent: "space-between", gap: "40px", flexWrap: "wrap", marginBottom: "74px" }}>
            <div>
              <div style={{ display: "flex", alignItems: "center", gap: "16px", marginBottom: "30px" }}>
                <span style={{ font: "500 11px/1 var(--font-plex-sans),sans-serif", letterSpacing: ".3em", textTransform: "uppercase", color: "#6E6E6B" }}>{lang === "ar" ? "ما نقدمه" : "What we do"}</span>
              </div>
              <h2 style={{ font: "600 clamp(32px,4vw,58px)/1.06 var(--font-sora),sans-serif", letterSpacing: "-0.03em", color: "#111111", margin: "0" }}>{lang === "ar" ? "خدماتنا" : "Our services"}</h2>
            </div>
            <p style={{ font: "400 16px/1.7 var(--font-plex-sans),sans-serif", color: "rgba(17,17,17,.66)", margin: "0", maxWidth: "44ch" }}>
              {ar
                ? "التوصيف والتوريد والتشغيل والدعم بعد البيع ضمن عقد واحد، ومن فريق واحد في الرياض."
                : "Specification, supply, commissioning and after-sale support under one contract, from one Riyadh team."}
            </p>
          </div>
          <div className={styles.svcGrid}>
            {HOME_SERVICES.map((service) => (
              <Link key={service.no} href="/services" className={styles.svcCard}>
                <div className={styles.svcFrame}>
                  <Image
                    src={service.photo}
                    alt={service.alt}
                    fill
                    sizes="(max-width: 640px) 100vw, (max-width: 1000px) 50vw, 33vw"
                    className={styles.svcImg}
                  />
                </div>
                <div className={styles.svcMeta}>
                  <span className={styles.svcNo}>{service.no}</span>
                  <h3 className={styles.svcTitle}>{ar ? service.ar : service.en}</h3>
                  <p className={styles.svcText}>{ar ? service.arText : service.enText}</p>
                </div>
              </Link>
            ))}
          </div>
          <Link href="/services/smart-poles" className={styles.poleStrip}>
            <div className={styles.poleStripArt}>
              <Image
                src="/smart-poles/ctx-street.jpg"
                alt="Smart poles along a landscaped city boulevard"
                fill
                sizes="(max-width: 900px) 100vw, 42vw"
                style={{ objectFit: "cover" }}
              />
              <div className={styles.poleStripVeil} />
            </div>
            <div className={styles.poleStripCopy}>
              <span className={styles.poleStripTop}>
                <span className={styles.poleStripBadge}>{ar ? "جديد" : "New"}</span>
                <span className={styles.poleStripNo}>10</span>
              </span>
              <h3 className={styles.poleStripTitle}>{lang === "ar" ? "الأعمدة الذكية" : "Smart Poles"}</h3>
              <p className={styles.poleStripBody}>
                {ar
                  ? "الإضاءة وشبكات الجيل الخامس والكاميرات وأجهزة الاستشعار واللوحات الرقمية ونداء الطوارئ على عمود واحد. عشرون تصميمًا من شريكنا C\u00b0LB، نورّدها وندمجها في مختلف أنحاء المملكة."
                  : "Lighting, 5G, cameras, sensors, signage and emergency call on a single mast. Twenty designs from our partner C\u00b0LB, supplied and integrated across the Kingdom."}
              </p>
              <span className={styles.poleStripCta}>
                {lang === "ar" ? "استكشف الأعمدة الذكية" : "Explore smart poles"}
                <span aria-hidden="true">{ar ? "←" : "→"}</span>
              </span>
            </div>
          </Link>
          <div className={styles.svcAll}>
            <Link href="/services" className={styles.svcAllLink}>
              {ar ? "جميع الخدمات العشر" : "View all ten services"}
              <span aria-hidden="true">{ar ? "←" : "→"}</span>
            </Link>
          </div>
        </div>
      </section>
      <section className={styles.ctrlBand}>
        <div className={styles.ctrlShell}>
          <div className={styles.ctrlGrid}>
            <div className={styles.ctrlArt}>
              <PhotoSlot
                src="/projects/milling-mc2/06.jpg"
                alt="A KNX lighting control panel supplied and commissioned by ARAK"
              />
            </div>
            <div>
              <div style={{ display: "flex", alignItems: "center", gap: "16px", marginBottom: "30px" }}>
                <span style={{ font: "500 11px/1 var(--font-plex-sans),sans-serif", letterSpacing: ".3em", textTransform: "uppercase", color: "#6E6E6B" }}>{ar ? "الأنظمة الذكية" : "Smart systems"}</span>
              </div>
              <h2 style={{ font: "600 clamp(30px,3.2vw,46px)/1.1 var(--font-sora),sans-serif", letterSpacing: "-0.03em", color: "#111111", margin: "0", maxWidth: "22ch" }}>{ar ? "أنظمة التحكم بالإضاءة والأتمتة المنزلية" : "Lighting Controls & Home Automation Systems"}</h2>
              <p style={{ font: "400 16px/1.75 var(--font-plex-sans),sans-serif", color: "rgba(17,17,17,.66)", margin: "26px 0 0", maxWidth: "48ch" }}>
                {ar
                  ? "أنظمة التحكم هي ما يجعل مشروع الإضاءة يستحق ميزانيته أو يهدرها بصمت. نقوم بالتوصيف والتوريد والتشغيل، ونبقى مع النظام بعد التسليم بوقت طويل."
                  : "Controls are where a lighting scheme either earns its budget or quietly wastes it. We specify, supply and commission the platform, then stay with it long after handover."}
              </p>
              <div className={styles.ctrlList}>
                <div className={styles.ctrlItem}>
                  <h3 className={styles.ctrlItemTitle}>KNX / EIB</h3>
                  <p className={styles.ctrlItemBody}>
                    {ar
                      ? "المعيار العالمي للتحكم بالمباني: الإضاءة والستائر والتكييف والأمن وإدارة الطاقة على ناقل واحد."
                      : "The worldwide standard for building control: lighting, shutters, HVAC, security and energy management on a single bus."}
                  </p>
                </div>
                <div className={styles.ctrlItem}>
                  <h3 className={styles.ctrlItemTitle}>{ar ? "نظام إدارة غرف الضيوف" : "Guest Room Management"}</h3>
                  <p className={styles.ctrlItemBody}>
                    {ar
                      ? "الإضاءة والتبريد والستائر وخدمات الغرفة عبر أزرار بسيطة وشاشات لمس ولوحات تحكم."
                      : "Lighting, cooling, curtains and room services on intuitive buttons, touch screens and panel interfaces."}
                  </p>
                </div>
                <div className={styles.ctrlItem}>
                  <h3 className={styles.ctrlItemTitle}>{ar ? "نظام التحكم بالإضاءة" : "Lighting Control System"}</h3>
                  <p className={styles.ctrlItemBody}>
                    {ar
                      ? "مراقبة جميع دوائر الإضاءة الداخلية والخارجية وتشغيلها من منصة واحدة، من الفيلا إلى المشروع الوطني."
                      : "Every indoor and outdoor circuit monitored and driven from one platform, sized from a villa to a national project."}
                  </p>
                </div>
              </div>
              <Link href="/services" className={styles.ctrlCta}>
                {ar ? "تفاصيل أنظمة التحكم" : "Controls in detail"}
                <span aria-hidden="true">{ar ? "←" : "→"}</span>
              </Link>
            </div>
          </div>
        </div>
      </section>
      <section style={{ borderTop: "1px solid rgba(17,17,17,.13)", background: "#F6F5F3" }}>
        <div style={{ maxWidth: "1360px", margin: "0 auto", padding: "120px 48px" }}>
          <div style={{ display: "flex", alignItems: "flex-end", justifyContent: "space-between", gap: "40px", flexWrap: "wrap", marginBottom: "70px" }}>
            <div>
              <div style={{ display: "flex", alignItems: "center", gap: "16px", marginBottom: "30px" }}>
                <span style={{ font: "500 11px/1 var(--font-plex-sans),sans-serif", letterSpacing: ".3em", textTransform: "uppercase", color: "#6E6E6B" }}>{lang === "ar" ? "أعمالنا" : "Selected work"}</span>
              </div>
              <h2 style={{ font: "600 clamp(32px,4vw,58px)/1.06 var(--font-sora),sans-serif", letterSpacing: "-0.03em", color: "#111111", margin: "0" }}>{lang === "ar" ? "مشاريع مختارة" : "Projects"}</h2>
            </div>
            <Link href="/projects" style={{ font: "500 12px/1 var(--font-plex-sans),sans-serif", letterSpacing: ".16em", textTransform: "uppercase", color: "#111111", cursor: "pointer", borderBottom: "1px solid rgba(17,17,17,.3)", paddingBottom: "8px" }} className={styles.h13}>{lang === "ar" ? "جميع المراجع" : "All project references"}
              <span aria-hidden="true" style={{ marginInlineStart: "8px" }}>{ar ? "←" : "→"}</span></Link>
          </div>
          <ProjectCards slugs={["solitaire-mall", "ritz-carlton", "riyadh-air"]} />
        </div>
      </section>
      {/* ── Credentials ────────────────────────────────────────────
          Three sections — brands, clients, accreditation — each with its
          own heading and its own visual language, running to some 1,600px
          of near-identical grey grid. They answer one question between
          them, so they are one block now, ordered by how much weight the
          credential actually carries. Accreditation leads: being a
          registered vendor with Aramco and NEOM is what lets ARAK bid the
          work at all, and it used to sit ninth of eleven sections.
          Every mark is still on the page; the walls open rather than
          being trimmed. */}
      <section className={styles.credBand}>
        <div className={styles.shell}>
          <div className={styles.sectionHead}>
            <div>
              <div style={{ display: "flex", alignItems: "center", gap: "16px", marginBottom: "30px" }}>
                <span style={{ font: "500 11px/1 var(--font-plex-sans),sans-serif", letterSpacing: ".3em", textTransform: "uppercase", color: "#6E6E6B" }}>{ar ? "الاعتماد" : "Credentials"}</span>
              </div>
              <h2 style={{ font: "600 clamp(30px,3.2vw,46px)/1.08 var(--font-sora),sans-serif", letterSpacing: "-0.03em", color: "#111111", margin: "0" }}>{ar ? "من نعمل معهم" : "Who we work for"}</h2>
            </div>
            <p style={{ font: "400 16px/1.7 var(--font-plex-sans),sans-serif", color: "rgba(17,17,17,.66)", margin: "0" }}>
              {ar
                ? "مسجّلون لدى المشاريع الوطنية الكبرى، ونورّد للفنادق والوزارات والمستشفيات، ونحمل ٤١ علامة عالمية."
                : "Registered with the Kingdom's giga-projects, supplying its hotels, ministries and hospitals, and carrying forty-one manufacturer lines."}
            </p>
          </div>

          <div className={styles.credTier}>
            <div className={styles.credHead}>
              <span className={styles.credLabel}>{ar ? "مورد معتمد لدى" : "Registered vendor with"}</span>
              <span className={styles.credCount}>13</span>
            </div>
            <LogoGrid items={VENDORS} basePath="/vendors" />
          </div>

          <div className={styles.credTier}>
            <div className={styles.credHead}>
              <span className={styles.credLabel}>{ar ? "عملاؤنا" : "Clients"}</span>
              <span className={styles.credCount}>33</span>
            </div>
            <ClientGrid />
          </div>

          <div className={styles.credTier}>
            <div className={styles.credHead}>
              <span className={styles.credLabel}>{ar ? "الماركات التي نمثلها" : "Brands we carry"}</span>
              <span className={styles.credCount}>41</span>
            </div>
            <BrandGrid />
          </div>
        </div>
      </section>
      <section style={{ background: "#111111" }}>
        <div style={{ maxWidth: "1360px", margin: "0 auto", padding: "130px 48px", display: "flex", flexDirection: "column", alignItems: "center", textAlign: "center" }}>
          <blockquote style={{ font: "300 clamp(30px,4.4vw,62px)/1.14 var(--font-sora),sans-serif", letterSpacing: "-0.03em", color: "#FFFFFF", margin: "0", maxWidth: "24ch", textWrap: "balance" }}>
            {ar
              ? "الضوء ليس ما يكشف الأشياء بقدر ما هو الكشف ذاته."
              : "Light is not so much something that reveals as it is itself the revelation."}
          </blockquote>
          <div style={{ display: "flex", alignItems: "center", gap: "14px", marginTop: "44px" }}>
            <span style={{ font: "500 11px/1 var(--font-plex-sans),sans-serif", letterSpacing: ".28em", textTransform: "uppercase", color: "rgba(255,255,255,.7)" }}>
              {ar ? "جيمس ترل" : "James Turrell"}
            </span>
          </div>
        </div>
      </section>
      <section style={{ position: "relative", overflow: "hidden" }}>
        <div style={{ position: "absolute", inset: "0", background: "radial-gradient(120% 90% at 50% -10%,rgba(17,17,17,.07) 0%,rgba(255,255,255,0) 62%)", pointerEvents: "none" }}></div>
        <div style={{ position: "relative", maxWidth: "1360px", margin: "0 auto", padding: "140px 48px", textAlign: "center" }}>
          <h2 style={{ font: "600 clamp(34px,4.6vw,68px)/1.06 var(--font-sora),sans-serif", letterSpacing: "-0.035em", color: "#111111", margin: "0 auto", maxWidth: "22ch", textWrap: "balance" }}>{lang === "ar" ? "لنُضئ مشروعك القادم" : "Let’s light your next project"}</h2>
          <p style={{ font: "300 clamp(16px,1.4vw,20px)/1.65 var(--font-plex-sans),sans-serif", color: "rgba(17,17,17,.66)", margin: "28px auto 0", maxWidth: "52ch" }}>
            {ar
              ? "أرسل لنا المخططات أو جدول وحدات الإضاءة أو الفكرة المبدئية فحسب، وسيعود إليك فريقنا في الرياض بدراسة إضاءة وعرض سعر."
              : "Send us drawings, a fixture schedule, or just the brief. Our Riyadh team will come back with a lighting study and a quotation."}
          </p>
          <Link href="/contact" style={{ display: "inline-block", font: "500 12px/1 var(--font-plex-sans),sans-serif", letterSpacing: ".14em", textTransform: "uppercase", color: "#FFFFFF", background: "#111111", padding: "21px 36px", marginTop: "48px", cursor: "pointer" }} className={styles.h76}>{lang === "ar" ? "احجز استشارة إضاءة" : "Book a lighting consultation"}</Link>
        </div>
      </section>

    </main>
  );
}
