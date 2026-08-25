"use client";

import Image from "next/image";
import Link from "next/link";
import { useLang } from "@/lib/lang";
import { localePath } from "@/lib/site";
import { Reveal } from "@/components/Reveal";
import {
  ARAK_ROLE,
  POLE_FUNCTIONS,
  POLE_LAYERS,
} from "@/lib/smart-poles-data";
import { PoleSeries } from "./PoleSeries";
import styles from "./page.module.css";

const PITCH = [
  {
    title: "It is already there.",
    arTitle: "إنه قائم أصلًا.",
    body: "Street lighting is the only public infrastructure that already stands every few dozen metres, already has a power feed, and already looks down at the street. Everything else a smart city wants to install has to find a home. Lighting has one.",
    arBody: "إنارة الشوارع هي البنية التحتية العامة الوحيدة التي تقف كل بضع عشرات من الأمتار، ولها تغذية كهربائية جاهزة، وتطلّ مباشرةً على الشارع. كل ما تريد المدينة الذكية تركيبه لا بدّ أن يجد له موضعًا؛ أما الإضاءة فلها موضعها بالفعل.",
  },
  {
    title: "One foundation, nine services.",
    arTitle: "قاعدة واحدة، تسع خدمات.",
    body: "Every device you hang on a pole is a device you do not dig a separate trench for, pour a separate base for, or negotiate a separate wayleave for. The civil works are the expensive part of a smart city, and the pole pays them once.",
    arBody: "كل جهاز تعلّقه على العمود هو جهاز لا تحفر له خندقًا منفصلًا، ولا تصبّ له قاعدة مستقلة، ولا تتفاوض على تصريح مرور خاص به. الأعمال المدنية هي الجزء الأغلى في المدينة الذكية، والعمود يدفع كلفتها مرّة واحدة.",
  },
  {
    title: "It earns twice.",
    arTitle: "عائد مزدوج.",
    body: "Once in the energy an LED head and an intelligent control profile save against a legacy installation, and once in the cabinets, ducting and site works that never get built because the mast already carries the network.",
    arBody: "مرّة في الطاقة التي يوفّرها رأس LED وملفّ تحكّم ذكي مقارنةً بتركيب تقليدي، ومرّة في اللوحات والتمديدات وأعمال الموقع التي لا تُنفَّذ أصلًا لأن العمود يحمل الشبكة بالفعل.",
  },
];

const CONTEXT_SHOTS = [
  {
    src: "/smart-poles/ctx-boulevard-riyadh.jpg",
    alt: "A lit arterial road in Riyadh at night, the existing street lighting run a smart mast would replace",
    cap: "Boulevards and arterial roads in Riyadh. On a street like this the mast carries the road luminaire, the small cell and the signage face on one shaft.",
    arAlt: "طريق شرياني مضاء في الرياض ليلًا، وهو خطّ إنارة الشوارع القائم الذي يحلّ العمود الذكي محلّه",
    arCap: "الشوارع الرئيسية والطرق الشريانية في الرياض. في شارع كهذا يحمل العمود وحدة إنارة الطريق والخلية الصغيرة وواجهة اللوحات على جسمٍ واحد.",
  },
  {
    src: "/smart-poles/ctx-park.jpg",
    alt: "White smart poles lining a waterfront park promenade",
    cap: "Waterfront promenades and parks, at the pedestrian scale, with banner panels and public WiFi built in.",
    arAlt: "أعمدة ذكية بيضاء تصطفّ على ممشى حديقة مطلّة على الماء",
    arCap: "الممشيات المطلّة على الماء والحدائق، بمقياس المشاة، مع لوحات إعلانية وواي فاي عام مدمجَين.",
  },
  {
    src: "/smart-poles/ctx-frontage-riyadh.jpg",
    alt: "A lit retail frontage on an arterial road in Riyadh at dusk",
    cap: "Retail streets and civic frontages in Riyadh. Here the pole has to stay slim enough not to compete with the building behind it.",
    arAlt: "واجهة تجارية مضاءة على طريق شرياني في الرياض عند الغروب",
    arCap: "الشوارع التجارية والواجهات العامة في الرياض. هنا يجب أن يبقى العمود نحيلًا بما يكفي كي لا ينافس المبنى خلفه.",
  },
  {
    src: "/smart-poles/ctx-residential.jpg",
    alt: "Ornamental smart poles on a residential street lined with houses",
    cap: "Residential districts and compounds, using the ornamental crowns that carry the same sensors as the modern masts.",
    arAlt: "أعمدة ذكية زخرفية في شارع سكني تصطفّ على جانبيه المنازل",
    arCap: "الأحياء والمجمّعات السكنية، بتيجان زخرفية تحمل أجهزة الاستشعار نفسها التي تحملها الأعمدة الحديثة.",
  },
];

/**
 * The anatomy key beside the pole render. Deliberately eight of the twelve
 * POLE_FUNCTIONS rather than all of them — this is the orientation diagram
 * for someone who has never seen a smart pole, not the full schedule, which
 * follows in the section below. Split 4/4 so the two columns balance.
 */
const ANATOMY_START = [
  {
    no: "01", en: "Smart lighting", ar: "الإضاءة الذكية",
    enText: "The LED head, dimmed and scheduled from the control centre.",
    arText: "رأس LED يُخفَت ويُجدوَل من مركز التحكّم."
  },
  {
    no: "02", en: "Cameras", ar: "الكاميرات",
    enText: "Fixed and PTZ, at the height that captures plates and faces.",
    arText: "ثابتة ومتحرّكة PTZ، على الارتفاع الذي يلتقط اللوحات والوجوه."
  },
  {
    no: "03", en: "Environmental sensors", ar: "أجهزة استشعار البيئة",
    enText: "Particulates, temperature, humidity and noise.",
    arText: "الجسيمات ودرجة الحرارة والرطوبة والضجيج."
  },
  {
    no: "04", en: "Emergency call", ar: "نداء الطوارئ",
    enText: "One button, straight through to the operations centre.",
    arText: "زرّ واحد يصلك مباشرةً بمركز العمليات."
  },
];

const ANATOMY_END = [
  {
    no: "05", en: "5G small cell", ar: "خلية الجيل الخامس",
    enText: "Mounting for the small cells dense coverage needs.",
    arText: "حامل للخلايا الصغيرة التي تتطلّبها التغطية الكثيفة."
  },
  {
    no: "06", en: "Public WiFi", ar: "واي فاي عام",
    enText: "Access points fed from the pole's own fibre run.",
    arText: "نقاط وصول تُغذّى من مسار ألياف العمود نفسه."
  },
  {
    no: "07", en: "Digital display", ar: "الشاشة الرقمية",
    enText: "Wayfinding, public information or event programming.",
    arText: "الإرشاد أو المعلومات العامة أو برامج الفعاليات."
  },
  {
    no: "08", en: "Public address", ar: "البثّ العام",
    enText: "Addressable speakers for announcements and alerts.",
    arText: "سمّاعات قابلة للعنونة للإعلانات والتنبيهات."
  },
];

/**
 * The hero rail. Deliberately the same eight labels as the anatomy key, in the
 * same order: the rail is a preview of that diagram, so if one ever gains or
 * loses a line the other has to follow, and deriving it here is what makes
 * that automatic. Labels only, no numbers, since nothing in the hero is
 * pointing at a drawing yet.
 */
const HERO_CARRIES = [...ANATOMY_START, ...ANATOMY_END];

export default function SmartPolesPage() {
  const { lang } = useLang();
  const ar = lang === "ar";
  return (
    <main className={styles.page}>
      {/* Hero */}
      <section className={styles.hero}>
        <Image
          src="/smart-poles/hero.jpg"
          alt={ar ? "عمود إنارة ذكي مضاء منفردًا بين أبراج المدينة عند الغسق" : "A single lit smart light pole standing between city towers at dusk"}
          fill
          priority
          sizes="100vw"
          className={styles.heroImg}
        />
        <div className={styles.heroVeil} />
        <div className={`${styles.shell} ${styles.heroInner}`}>
          <div className={styles.heroCopy}>
            <div className={styles.crumb}>
              <Link href={localePath("/services", lang)}>{ar ? "خدماتنا" : "Services"}</Link>
              <span aria-hidden="true">/</span>
              <span className={styles.crumbNow}>{ar ? "الأعمدة الذكية" : "Smart Poles"}</span>
            </div>
            <h1 className={styles.heroTitle}>
              {ar ? "نصمّمه لك أنت." : "We design it for you."}
            </h1>
            <p className={styles.heroLead}>
              {ar
                ? "ليس عمودًا جاهزًا من الرفّ. كل عمود من أراك يُصمَّم لشارعك، وقابل للتخصيص بالكامل: الارتفاع والتشطيب وكل ما يحمله."
                : "Not off the shelf. Every ARAK pole is designed for your street and fully customizable: the height, the finish, and everything it carries."}
            </p>
            <div className={styles.heroTag}>
              {ar ? (
                <>أراك &nbsp;&middot;&nbsp; سلسلة أعمدة الإضاءة الذكية C&deg;LB &nbsp;&middot;&nbsp; عشرون تصميمًا</>
              ) : (
                <>ARAK &nbsp;&middot;&nbsp; C&deg;LB Smart Light Pole Series &nbsp;&middot;&nbsp; Twenty designs</>
              )}
            </div>
          </div>
          <div className={styles.heroAside}>
            <p className={styles.heroAsideHead}>
              {ar ? "على عمودٍ واحد" : "On one mast"}
            </p>
            <ul className={styles.heroCarries}>
              {HERO_CARRIES.map((item) => (
                <li key={item.no}>{ar ? item.ar : item.en}</li>
              ))}
            </ul>
            {/* Plain anchor driven by hand: the App Router updates the hash on a
                same-page Link but does not scroll to it, so the shortcut would
                silently do nothing. The href stays for middle-click and a11y. */}
            <a
              href="#designs"
              className={styles.heroJump}
              onClick={(e) => {
                e.preventDefault();
                const el = document.getElementById("designs");
                if (!el) return;
                const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
                el.scrollIntoView({ behavior: reduce ? "auto" : "smooth", block: "start" });
                history.replaceState(null, "", "#designs");
              }}
            >
              <span className={styles.heroJumpNum}>20</span>
              <span className={styles.heroJumpLabel}>
                {ar ? "تصميم عمود" : "pole designs"}
              </span>
              <span className={styles.heroJumpCta}>
                {ar ? "استعرض السلسلة" : "see the series"}
                <span className={styles.heroJumpArrow} aria-hidden="true">
                  &darr;
                </span>
              </span>
            </a>
          </div>
        </div>
      </section>

      {/* Basics — the plain answer, before any argument is made */}
      <section className={`${styles.band} ${styles.bandRender}`} style={{ borderTop: 0 }}>
        <div className={styles.shell}>
          <Reveal>
            <span className={`${styles.eyebrow} ${styles.eyebrowLight}`}>
              {ar ? "الأساسيات" : "The basics"}
            </span>
            <h2 className={`${styles.sectionTitle} ${styles.sectionTitleLight}`}>
              {ar ? "ما هو العمود الذكي؟" : "What is a smart pole?"}
            </h2>
            <div className={styles.basics}>
              <p className={styles.basicsLead}>
                {ar
                  ? "العمود الذكي هو عمود إنارة يحمل أكثر من مجرّد مصباح."
                  : "A smart pole is a street light that carries more than a light."}
              </p>
              <p className={styles.basicsBody}>
                {ar
                  ? "لا يزال العمود ينير الطريق، غير أنّ الجسم نفسه يحمل كذلك شبكة الاتصالات والكاميرات وأجهزة استشعار البيئة واللوحات الرقمية وزرّ نداء الطوارئ — معتمدًا على التغذية الكهربائية والقاعدة التي يحتاجها عمود الإنارة أصلًا. عمود واحد بدل ستة، وخندق واحد بدل ستة."
                  : "The mast still lights the road. But the same shaft also holds the mobile network, the cameras, the environmental sensors, the digital signage and an emergency call button — running on the power feed and the foundation the street light already needed. One column instead of six. One trench instead of six."}
              </p>
            </div>
          </Reveal>
          <Reveal delay={120}>
            <div className={styles.anatomy}>
              <ul className={`${styles.anatomyCol} ${styles.anatomyColStart}`}>
                {ANATOMY_START.map((a) => (
                  <li key={a.no} className={styles.anatomyItem}>
                    <span className={styles.anatomyNo}>{a.no}</span>
                    <h3 className={styles.anatomyName}>{ar ? a.ar : a.en}</h3>
                    <p className={styles.anatomyText}>{ar ? a.arText : a.enText}</p>
                  </li>
                ))}
              </ul>
              <div className={styles.anatomyPole}>
                <Image
                  src="/smart-poles/anatomy-pole.jpg"
                  alt={
                    ar
                      ? "عمود Quantum الذكي تظهر عليه وحدة الإضاءة والكاميرا وأجهزة الاستشعار والشاشة الرقمية"
                      : "The Quantum smart pole, showing its luminaire, camera, sensors and digital display"
                  }
                  fill
                  sizes="(max-width: 900px) 38vw, 182px"
                />
              </div>
              <ul className={`${styles.anatomyCol} ${styles.anatomyColEnd}`}>
                {ANATOMY_END.map((a) => (
                  <li key={a.no} className={styles.anatomyItem}>
                    <span className={styles.anatomyNo}>{a.no}</span>
                    <h3 className={styles.anatomyName}>{ar ? a.ar : a.en}</h3>
                    <p className={styles.anatomyText}>{ar ? a.arText : a.enText}</p>
                  </li>
                ))}
              </ul>
            </div>
          </Reveal>
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
                {ar
                  ? "أنظمة الأعمدة الذكية هي طبقة الحمل والطرفيات للمدينة الذكية، قائمة على إنترنت الأشياء والحوسبة السحابية والبيانات الضخمة والمعلومات المكانية. تجمع هذه الأنظمة وتنقل ما تحتاجه المدينة لتقديم الخدمات وحفظ الأمن العام وحماية البيئة."
                  : "Smart pole systems are a carrier and terminal layer for the intelligent city, built on IoT, cloud computing, big data and spatial information. They collect and transmit what a city needs for service delivery, public safety and environmental protection."}
              </p>
            </div>
          </Reveal>
          <div className={styles.functions}>
            {POLE_FUNCTIONS.map((f, i) => (
              <Reveal key={f.title} delay={(i % 3) * 80}>
                <div className={styles.fn}>
                  <h3 className={styles.fnTitle}>{ar ? f.arTitle : f.title}</h3>
                  <p className={styles.fnBody}>{ar ? f.arBody : f.body}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* Pitch */}
      <section className={styles.band}>
        <div className={styles.shell}>
          <div className={styles.pitch}>
            {PITCH.map((p, i) => (
              <Reveal key={p.title} delay={i * 100}>
                <div className={styles.pitchItem}>
                  <h2 className={styles.pitchTitle}>{ar ? p.arTitle : p.title}</h2>
                  <p className={styles.pitchBody}>{ar ? p.arBody : p.body}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* The series — target of the hero shortcut */}
      <section id="designs" className={`${styles.band} ${styles.bandRender} ${styles.jumpTarget}`}>
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
                {ar
                  ? "من أعمدة المدن الذكية الكاملة إلى التيجان الزخرفية للأحياء التراثية. كل تصميم يحمل الحزمة نفسها من الخدمات. افتح أي تصميم لقراءة تفاصيله."
                  : "From full smart-city masts down to ornamental crowns for heritage districts. Every design takes the same service payload. Open any design for its full detail."}
              </p>
            </div>
          </Reveal>

          <PoleSeries ar={ar} />
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
                {ar
                  ? "الإنارة الذكية للشوارع منظومة طبقات لا منتج واحد. والفصل بين الطبقات هو ما يتيح للمدينة تغيير برمجياتها دون إعادة تمديد كابلات الشارع."
                  : "Smart street lighting is a stack, not a product. Keeping the layers separate is what lets a city change its software without re-cabling the street."}
              </p>
            </div>
          </Reveal>
          <div className={styles.layers}>
            {POLE_LAYERS.map((l, i) => (
              <Reveal key={l.layer} delay={i * 90}>
                <div className={styles.layer}>
                  <h3 className={styles.layerName}>{ar ? l.arLayer : l.layer}</h3>
                  <p className={styles.layerDetail}>{ar ? l.arDetail : l.detail}</p>
                  <p className={styles.layerBody}>{ar ? l.arBody : l.body}</p>
                </div>
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
                {ar
                  ? "العمود الذكي يلامس الإضاءة والأعمال المدنية والتيار الخفيف والشبكات وعمليات المدينة. ونحن نتولّى الخمسة جميعًا، حتى لا يجد العميل نفسه حكمًا بين أربعة مقاولين حين تنقطع كاميرا عن الشبكة."
                  : "A smart pole touches lighting, civil works, low current, networking and city operations. We hold all five so the client is not left arbitrating between four contractors when a camera drops off the network."}
              </p>
            </div>
          </Reveal>
          <div className={styles.roles}>
            {ARAK_ROLE.map((r, i) => (
              <Reveal key={r.no} delay={i * 70}>
                <div className={styles.role}>
                  <div className={styles.roleNo}>{r.no}</div>
                  <h3 className={styles.roleTitle}>{ar ? r.arTitle : r.title}</h3>
                  <p className={styles.roleBody}>{ar ? r.arBody : r.body}</p>
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
                {ar
                  ? "العمود الصحيح هو الذي يناسب الشارع الذي يقف فيه. يتغيّر المقياس والتشطيب والتاج، أما الخدمات داخل جسم العمود فلا تتغيّر."
                  : "The right pole is the one that suits the street it stands on. Scale, finish and crown change. The services inside the shaft do not."}
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
                      alt={ar ? s.arAlt : s.alt}
                      fill
                      sizes="(max-width: 680px) 100vw, 50vw"
                    />
                  </div>
                  <figcaption className={styles.shotCap}>{ar ? s.arCap : s.cap}</figcaption>
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
              {ar
                ? "زوّدنا بمسار الطريق وتباعد الأعمدة والخدمات التي تريدها المدينة على العمود، وسيعود إليك فريقنا في الرياض بتصميم وجدول أجهزة وعرض سعر."
                : "Give us the alignment, the pole spacing and the services the city wants on the mast. Our Riyadh team will come back with a design, a device schedule and a quotation."}
            </p>
            <div className={styles.ctaRow}>
              <Link href={localePath("/contact", lang)} className={styles.ctaPrimary}>
                {ar ? "تحدث إلى فريقنا" : "Talk to our team"}
                <span aria-hidden="true">&rarr;</span>
              </Link>
              <Link href={localePath("/services", lang)} className={styles.ctaGhost}>
                {ar ? "كل الخدمات" : "All services"}
              </Link>
            </div>
          </Reveal>
        </div>
      </section>

    </main>
  );
}
