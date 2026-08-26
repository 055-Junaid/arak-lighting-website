"use client";

import Image from "next/image";
import Link from "next/link";
import { useLang } from "@/lib/lang";
import { localePath } from "@/lib/site";
import { PhotoSlot } from "@/components/PhotoSlot";
import { ProjectCards } from "@/components/ProjectCards";
import { VENDORS } from "@/components/VendorBelt";
import { LogoGrid } from "@/components/LogoGrid";
import { BrandGrid } from "@/components/BrandGrid";
import { ClientGrid } from "@/components/ClientGrid";
import { Reveal } from "@/components/Reveal";
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
    arAlt: "ثريا وسقف مزخرف في القاعة الكبرى بفندق الريتز كارلتون، الرياض",
  },
  {
    no: "02",
    en: "Lighting Design",
    ar: "تصميم الإضاءة",
    enText: "Photometric studies, layouts and fixture schedules developed with consultants and architects.",
    arText: "دراسات ضوئية ومخططات وجداول وحدات إضاءة، نُعدّها مع الاستشاريين والمعماريين.",
    photo: "/projects/solitaire-mall/04.jpg",
    alt: "The crystal cascade over the atrium at Solitaire Mall, Riyadh",
    arAlt: "شلال الكريستال فوق البهو في سوليتير مول، الرياض",
  },
  {
    no: "03",
    en: "Facade Lighting",
    ar: "إضاءة الواجهات",
    enText: "Exterior schemes that give buildings a night identity, engineered for the Saudi climate.",
    arText: "أنظمة إضاءة خارجية تمنح المباني هويةً ليلية، مصمّمة لتناسب المناخ السعودي.",
    photo: "/home/facade-solitaire-aerial.jpg",
    alt: "Solitaire Mall in Riyadh from the air at dusk, its faceted facade lit by ARAK",
    arAlt: "سوليتير مول في الرياض من الجو عند الغروب، وواجهته المضلّعة مضاءة بتنفيذ أراك",
  },
  {
    no: "04",
    en: "Outdoor Lighting",
    ar: "الإضاءة الخارجية",
    enText: "Streets, landscapes, car parks and compounds, from bollards to high-mast poles.",
    arText: "الشوارع والمسطحات والمواقف والمجمّعات، من الأعمدة القصيرة إلى الصواري العالية.",
    photo: "/projects/seder-hq/01.jpg",
    alt: "The lit plaza and external approach at the SEDER headquarters in Riyadh, an outdoor lighting scheme by ARAK",
    arAlt: "ساحة المدخل الخارجي لمبنى سدر الرئيسي في الرياض مضاءة ليلًا، ضمن مشروع إضاءة خارجية نفّذته أراك",
  },
  {
    no: "05",
    en: "Lighting Controls",
    ar: "أنظمة التحكم بالإضاءة",
    enText: "KNX/EIB systems, scene control, daylight and presence sensing, energy management.",
    arText: "أنظمة KNX/EIB، والتحكم بالمشاهد، واستشعار الضوء والحركة، وإدارة الطاقة.",
    photo: "/services/lighting-controls.jpg",
    alt: "A technician seating a KNX module onto the DIN rail of a lighting control panel, its conductors labelled circuit by circuit",
    arAlt: "فنّي يثبّت وحدة KNX على قضيب DIN في لوحة التحكّم بالإضاءة، وموصّلاتها مرقّمة دائرةً دائرة",
  },
  {
    no: "06",
    en: "Lighting Installation",
    ar: "تركيب الإضاءة",
    enText: "Site installation, commissioning and handover by our own technical crews.",
    arText: "التركيب في الموقع والتشغيل والتسليم عبر فرقنا الفنية.",
    photo: "/services/lighting-installation.jpg",
    alt: "Two technicians on a mobile tower aiming track-mounted spotlights in an interior still being finished",
    arAlt: "فنّيان على برج سقالة متحرّك يوجّهان كشّافات مركّبة على مسار في مساحة داخلية ما تزال قيد التشطيب",
  },
];

/**
 * The capability rail in the hero. Six of the ten service lines, chosen as the
 * ones a stranger can picture without explanation, in company-profile order.
 * Deliberately shorter than HOME_SERVICES below: this is a glance, not a menu.
 */
const HERO_CAPS = [
  { en: "Indoor Lighting", ar: "الإضاءة الداخلية" },
  { en: "Facade Lighting", ar: "إضاءة الواجهات" },
  { en: "Outdoor Lighting", ar: "الإضاءة الخارجية" },
  { en: "Lighting Design", ar: "تصميم الإضاءة" },
  { en: "KNX Controls", ar: "أنظمة التحكم KNX" },
  { en: "Smart Poles", ar: "الأعمدة الذكية" },
];

export default function HomePage() {
  const { lang } = useLang();
  const ar = lang === "ar";

  return (
    <main>
      <section className={styles.hero} style={{ position: "relative", overflow: "hidden", background: "#FFFFFF", display: "flex", flexDirection: "column" }}>
        <div className={styles.heroArt}>
          {/* -v2 rather than a replacement of the original file: /home/* is
              served immutable (see public/_headers), so overwriting a path
              leaves anyone who already has it on the old picture forever. */}
          <Image src="/home/riyadh-arterial-hero-v2.jpg" alt={ar ? "شارع في الرياض عند الشروق، أعمدته الذكية تحمل الإضاءة والكاميرات واللوحات" : "A Riyadh street at sunrise, its smart poles carrying light, cameras and signage"} fill priority sizes="100vw" style={{ objectFit: "cover", objectPosition: "72% 15%" }} />
        </div>
        <div className={styles.heroVeil}></div>
        <div style={{ position: "absolute", top: "0", insetInlineStart: "22%", width: "1px", height: "100%", background: "linear-gradient(180deg,rgba(17,17,17,0) 0%,rgba(17,17,17,.32) 45%,rgba(17,17,17,0) 100%)", animation: "beam 6s ease-in-out infinite", pointerEvents: "none" }}></div>
        <div className={styles.heroRow}>
          <div className={styles.heroCol}>
            {/* The name itself is the hook. "ARAK" appears nowhere in the old
                hero copy but the logo, and the fact that أراك means "I see you"
                — the most memorable thing about the brand — sat 900px down the
                page. Arabic readers get no reveal from a translation of their
                own word, so that column carries the positioning instead. */}
            <div className={styles.heroEyebrow}>
              {ar ? (
                <>
                  <span className={styles.heroName}>أراك</span>
                  <span aria-hidden="true" className={styles.heroDot}>·</span>
                  <span>حلول الإضاءة الذكية</span>
                  <span aria-hidden="true" className={styles.heroDot}>·</span>
                  <span>الرياض</span>
                </>
              ) : (
                <>
                  <span className={styles.heroName}>ARAK</span>
                  <span aria-hidden="true" className={styles.heroDot}>·</span>
                  <span lang="ar" dir="rtl" className={styles.heroNameAr}>أراك</span>
                  <span aria-hidden="true" className={styles.heroDot}>·</span>
                  <span className={styles.heroGloss}>&ldquo;I see you&rdquo; in Arabic</span>
                </>
              )}
            </div>
            <h1 style={{ font: "600 clamp(42px,6vw,88px)/1.0 var(--font-sora),sans-serif", letterSpacing: "-0.035em", color: "#111111", margin: "0", maxWidth: "15ch", textWrap: "balance" }}>{lang === "ar" ? "نُضيء المملكة منذ عام 1976" : "Lighting the Kingdom since 1976"}</h1>
            {/* The old lead opened "Five decades…" directly beneath a headline
                that already says 1976, and a seal that said 50+. It now spends
                its one sentence on the scope of work instead. */}
            <p style={{ font: "300 clamp(17px,1.5vw,21px)/1.6 var(--font-plex-sans),sans-serif", color: "rgba(17,17,17,.72)", margin: "34px 0 0", maxWidth: "52ch" }}>
              {ar
                ? "نُصمّمها ونورّدها ونركّبها ونبقى معها بعد التسليم — أنظمة إضاءة وتحكّم لفنادق المملكة ومطاراتها وقصورها ومشاريعها الوطنية."
                : "We design it, supply it, install it and stay with it after handover. Lighting and control systems for the Kingdom's hotels, airports, palaces and national projects."}
            </p>
            {/* Ten service lines read as prose take eight seconds. As a rail
                they take one, and they answer the question the headline raises:
                lighting the Kingdom with what, exactly. */}
            <ul className={styles.heroCaps}>
              {HERO_CAPS.map((cap) => (
                <li key={cap.en} className={styles.heroCap}>{ar ? cap.ar : cap.en}</li>
              ))}
            </ul>
            <div style={{ display: "flex", gap: "14px", marginTop: "46px", pointerEvents: "auto" }}>
              <Link href={localePath("/contact", lang)} style={{ font: "500 12px/1 var(--font-plex-sans),sans-serif", letterSpacing: ".14em", textTransform: "uppercase", color: "#FFFFFF", background: "#111111", padding: "19px 30px", cursor: "pointer" }} className={styles.h1}>{lang === "ar" ? "احجز استشارة إضاءة" : "Book a lighting consultation"}</Link>
              <Link href={localePath("/projects", lang)} style={{ font: "500 12px/1 var(--font-plex-sans),sans-serif", letterSpacing: ".14em", textTransform: "uppercase", color: "#111111", border: "1px solid rgba(17,17,17,.28)", padding: "19px 30px", cursor: "pointer" }} className={styles.h2}>{lang === "ar" ? "عرض المشاريع" : "View projects"}</Link>
            </div>
          </div>
          {/* The corner used to hold a 50+ mark, which was the third time the
              first screen said the same thing. It names the backdrop instead.
              Down to the series alone: it stays a label, never a claim that
              the street in the picture is one we delivered. */}
          <div className={styles.heroSeal}>
            <span className={styles.creditName}>{ar ? "أعمدة ذكية · سلسلة C°LB" : "Smart poles · C°LB series"}</span>
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
            <Link href={localePath("/services/smart-poles", lang)} className={styles.poleBandCta}>
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
      <section className={styles.whoSection}>
        <div className={styles.whoGrid}>
          <div>
            <div style={{ display: "flex", alignItems: "center", gap: "16px", marginBottom: "34px" }}>
              <span style={{ font: "500 11px/1 var(--font-plex-sans),sans-serif", letterSpacing: ".3em", textTransform: "uppercase", color: "#6E6E6B" }}>{lang === "ar" ? "من نحن" : "Who we are"}</span>
            </div>
            <h2 style={{ font: "600 clamp(32px,4vw,58px)/1.06 var(--font-sora),sans-serif", letterSpacing: "-0.03em", color: "#111111", margin: "0", maxWidth: "20ch" }}>{lang === "ar" ? "نتألق منذ خمسين عامًا" : "Shining brightly for 50 years"}</h2>
            <p style={{ font: "400 17px/1.75 var(--font-plex-sans),sans-serif", color: "rgba(17,17,17,.68)", margin: "36px 0 0", maxWidth: "62ch" }}>
              {ar ? (
                "«أراك» شركة إضاءة ومزوّد لحلول الإضاءة الذكية، بدأت امتدادًا لمؤسسة عبدالرحمن عبدالقادر عام 1976م، وهي اليوم مؤسسة سعودية رائدة تجسّد القيم السعودية."
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
            <Link href={localePath("/about", lang)} style={{ display: "inline-flex", alignItems: "center", gap: "12px", font: "500 12px/1 var(--font-plex-sans),sans-serif", letterSpacing: ".16em", textTransform: "uppercase", color: "#111111", marginTop: "44px", cursor: "pointer", borderBottom: "1px solid rgba(17,17,17,.3)", paddingBottom: "8px" }} className={styles.h3}>{lang === "ar" ? "قصتنا الكاملة" : "Our full story"}
            <span aria-hidden="true">{ar ? "←" : "→"}</span></Link>
          </div>
          <div className={styles.whoPhoto}>
            <PhotoSlot
              // This column stacks at 1080, not at the default 768.
              sizes="(max-width: 1080px) 100vw, 50vw"
              src="/projects/solitaire-mall/06.jpg" alt={ar ? "مشروع إضاءة شلال الكريستال في سوليتير مول، الرياض" : "The crystal cascade lighting scheme at Solitaire Mall, Riyadh"} />
          </div>
        </div>
      </section>
      <section style={{ borderTop: "1px solid rgba(17,17,17,.13)", background: "#F6F5F3" }}>
        <div className={styles.band}>
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
              <Link key={service.no} href={localePath("/services", lang)} className={styles.svcCard}>
                <div className={styles.svcFrame}>
                  <Image
                    src={service.photo}
                    alt={ar ? service.arAlt : service.alt}
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
          <Link href={localePath("/services/smart-poles", lang)} className={styles.poleStrip}>
            <div className={styles.poleStripArt}>
              <Image
                src="/smart-poles/ctx-street.jpg"
                alt={ar ? "أعمدة ذكية على امتداد شارع مدينيّ منسّق" : "Smart poles along a landscaped city boulevard"}
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
            <Link href={localePath("/services", lang)} className={styles.svcAllLink}>
              {ar ? "جميع الخدمات العشر" : "View all ten services"}
              <span aria-hidden="true">{ar ? "←" : "→"}</span>
            </Link>
          </div>
        </div>
      </section>
      <section className={styles.ctrlBand}>
        <div className={styles.ctrlShell}>
          <div className={styles.ctrlGrid}>
            <div className={styles.ctrlIntro}>
              <div style={{ display: "flex", alignItems: "center", gap: "16px", marginBottom: "30px" }}>
                <span style={{ font: "500 11px/1 var(--font-plex-sans),sans-serif", letterSpacing: ".3em", textTransform: "uppercase", color: "#6E6E6B" }}>{ar ? "الأنظمة الذكية" : "Smart systems"}</span>
              </div>
              <h2 style={{ font: "600 clamp(30px,3.2vw,46px)/1.1 var(--font-sora),sans-serif", letterSpacing: "-0.03em", color: "#111111", margin: "0", maxWidth: "20ch" }}>{ar ? "أنظمة التحكم بالإضاءة والأتمتة المنزلية" : "Lighting Controls & Home Automation Systems"}</h2>
              <p style={{ font: "400 16px/1.75 var(--font-plex-sans),sans-serif", color: "rgba(17,17,17,.66)", margin: "26px 0 0", maxWidth: "42ch" }}>
                {ar
                  ? "أنظمة التحكم هي ما يجعل مشروع الإضاءة يستحق ميزانيته أو يهدرها بصمت. نقوم بالتوصيف والتوريد والتشغيل، ونبقى مع النظام بعد التسليم بوقت طويل."
                  : "Controls are where a lighting scheme either earns its budget or quietly wastes it. We specify, supply and commission the platform, then stay with it long after handover."}
              </p>
              <Link href={localePath("/services#controls", lang)} className={styles.ctrlCta}>
                {ar ? "تفاصيل أنظمة التحكم" : "Controls in detail"}
                <span aria-hidden="true">{ar ? "←" : "→"}</span>
              </Link>
            </div>
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
              <div className={styles.ctrlItem}>
                <h3 className={styles.ctrlItemTitle}>{ar ? "إدارة الطاقة والتقارير" : "Energy management"}</h3>
                <p className={styles.ctrlItemBody}>
                  {ar
                    ? "قياس الاستهلاك على مستوى الدائرة، والجدولة، والاستفادة من ضوء النهار، مع تسجيل الاستهلاك وإصدار التقارير."
                    : "Circuit-level metering, scheduling and daylight harvesting, with consumption logged and reported for the operating budget."}
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>
      <section style={{ borderTop: "1px solid rgba(17,17,17,.13)", background: "#F6F5F3" }}>
        <div className={styles.band}>
          <div style={{ display: "flex", alignItems: "flex-end", justifyContent: "space-between", gap: "40px", flexWrap: "wrap", marginBottom: "70px" }}>
            <div>
              <div style={{ display: "flex", alignItems: "center", gap: "16px", marginBottom: "30px" }}>
                <span style={{ font: "500 11px/1 var(--font-plex-sans),sans-serif", letterSpacing: ".3em", textTransform: "uppercase", color: "#6E6E6B" }}>{lang === "ar" ? "أعمالنا" : "Selected work"}</span>
              </div>
              <h2 style={{ font: "600 clamp(32px,4vw,58px)/1.06 var(--font-sora),sans-serif", letterSpacing: "-0.03em", color: "#111111", margin: "0" }}>{lang === "ar" ? "مشاريع مختارة" : "Projects"}</h2>
            </div>
            <Link href={localePath("/projects", lang)} style={{ font: "500 12px/1 var(--font-plex-sans),sans-serif", letterSpacing: ".16em", textTransform: "uppercase", color: "#111111", cursor: "pointer", borderBottom: "1px solid rgba(17,17,17,.3)", paddingBottom: "8px" }} className={styles.h13}>{lang === "ar" ? "جميع المراجع" : "All project references"}
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
                ? "مسجّلون لدى المشاريع الوطنية الكبرى، ونورّد للفنادق والوزارات والمستشفيات، ونحمل أكثر من 40 علامة عالمية."
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
      {/* Closing movement. The quote and the call to act share one dark ground,
          so the page resolves on a single beat before the light footer the way
          /about and /services close, rather than a lone dark stripe fading back
          out to white. A hairline, not a change of colour, keeps them readable
          as two separate thoughts. */}
      <section className={styles.finale}>
        <div className={styles.finaleGlow} aria-hidden="true" />
        <div className={`${styles.finaleShell} ${styles.quote}`}>
          <Reveal>
            <blockquote className={styles.quoteText}>
              {ar
                ? "الضوء ليس ما يكشف الأشياء بقدر ما هو الكشف ذاته."
                : "Light is not so much something that reveals as it is itself the revelation."}
            </blockquote>
            <div className={styles.quoteAttrib}>
              <span className={styles.quoteRule} aria-hidden="true" />
              <cite className={styles.quoteName}>{ar ? "جيمس ترل" : "James Turrell"}</cite>
            </div>
          </Reveal>
        </div>
        <div className={`${styles.finaleShell} ${styles.close}`}>
          <Reveal>
            <span className={styles.closeEyebrow}>{ar ? "لنبدأ" : "Start here"}</span>
            <h2 className={styles.closeTitle}>
              {ar ? "لنُضئ مشروعك القادم" : "Let’s light your next project"}
            </h2>
            <p className={styles.closeLead}>
              {ar
                ? "أرسل لنا المخططات أو جدول وحدات الإضاءة أو الفكرة المبدئية فحسب، وسيعود إليك فريقنا في الرياض بدراسة إضاءة وعرض سعر."
                : "Send us drawings, a fixture schedule, or just the brief. Our Riyadh team will come back with a lighting study and a quotation."}
            </p>
            <div className={styles.closeActions}>
              <Link href={localePath("/contact", lang)} className={styles.closeCta}>
                {ar ? "احجز استشارة إضاءة" : "Book a consultation"}
                <span className={styles.closeArrow} aria-hidden="true">&rarr;</span>
              </Link>
              <Link href={localePath("/projects", lang)} className={styles.closeGhost}>
                {ar ? "شاهد أعمالنا" : "See the work"}
                <span className={styles.closeArrow} aria-hidden="true">&rarr;</span>
              </Link>
            </div>
          </Reveal>
        </div>
      </section>

    </main>
  );
}
