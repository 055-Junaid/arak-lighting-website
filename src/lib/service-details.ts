import { PROJECT_GALLERIES, type GalleryImage } from "./project-galleries";

/**
 * The long-form content behind each service line's own page.
 *
 * `services-data.ts` stays the index — the nine lines, their one-paragraph
 * summaries and the four-item "includes" list that the spotlight on
 * /services renders. This file is what a visitor gets after clicking one of
 * them: two or three more paragraphs, a fact rail, four capability blocks,
 * the photography, and the delivered projects that back it up.
 *
 * Split rather than merged because the spotlight ships every field it touches
 * to the browser for all ten lines at once. Adding 3KB of detail copy per
 * service to that object would put 30KB of text nobody has asked for into the
 * services page payload; here it is only ever loaded by the page it belongs
 * to.
 *
 * Arabic runs alongside every field, on the same rules as the index: product
 * and standards names — KNX, EIB, DALI, LED, IP65, RGBW, UGR — stay Latin in
 * both languages, and numerals are Western throughout.
 */

export interface ServicePhoto extends GalleryImage {
  /** What the photograph shows. Doubles as the alt text. */
  caption: string;
  arCaption: string;
  /**
   * Set on any frame that is not photography of a delivered ARAK project, and
   * printed by the gallery as a tag on the tile. The galleries sit under a
   * line about work delivered in Riyadh, so an illustration or a diagram has
   * to say so on the frame itself rather than rely on the reader inferring it.
   */
  note?: { en: string; ar: string };
}

export interface ServiceFact {
  /** Short, numeric or near-numeric. This is the line that is set large. */
  value: string;
  arValue: string;
  label: string;
  arLabel: string;
}

export interface ServiceBlock {
  title: string;
  arTitle: string;
  body: string;
  arBody: string;
}

export interface ServiceDetail {
  /** Leads the page, beside the title. */
  hero: ServicePhoto;
  /** Paragraphs after the summary the index already carries. */
  intro: string[];
  arIntro: string[];
  facts: ServiceFact[];
  blocks: ServiceBlock[];
  gallery: ServicePhoto[];
  /**
   * Overrides the photography section's heading. A page whose gallery is
   * diagrams cannot sit under "From our work", and one carrying illustrations
   * cannot promise photographs of delivered projects.
   */
  galleryHead?: {
    eyebrow: string;
    arEyebrow: string;
    title: string;
    arTitle: string;
    note: string;
    arNote: string;
  };
  /** Delivered projects that show the line in use. Slugs from projects-data. */
  projects: string[];
}

/* --- Photograph sizes ------------------------------------------------------
   Every photograph on this page needs its intrinsic size: the gallery's
   lightbox sets the stage's aspect ratio from it, and the hero reserves its
   box before the image lands. Project photography already carries those
   numbers in PROJECT_GALLERIES, so they are read from there rather than
   copied — one source of truth, and a re-cropped photograph cannot end up
   with two different sizes recorded for it.

   EXTRA covers the frames that are not part of any project gallery: two
   photographs shot for the services pages, one street view from the smart
   pole material, and three Solitaire frames that are on disk but were left
   out of that project's own gallery. */
const EXTRA: Record<string, [number, number]> = {
  "/services/lighting-controls.jpg": [1024, 683],
  "/services/lighting-installation.jpg": [1024, 683],
  "/smart-poles/ctx-park.jpg": [1800, 1200],
  "/home/riyadh-arterial-hero-v2.jpg": [2048, 1152],
  "/projects/solitaire-mall/02.jpg": [2048, 1536],
  "/projects/solitaire-mall/03.jpg": [2048, 1366],
  "/projects/solitaire-mall/12.jpg": [2048, 1536],
  "/projects/solitaire-mall/13.jpg": [2048, 1366],
};

/* Generated imagery, held outside the repository in public/generated. These are
   illustrations and diagrams, not photographs of delivered work: every one of
   them carries a `note` that the gallery prints on the tile. */
const GENERATED: Record<string, [number, number]> = {
  "/generated/facade-lighting/01-stone-tower.jpg": [1248, 832],
  "/generated/facade-lighting/02-mosque.jpg": [1248, 832],
  "/generated/facade-lighting/03-villa.jpg": [1248, 832],
  "/generated/home-automation/01-villa-systems.jpg": [1536, 1024],
  "/generated/home-automation/03-guest-room.jpg": [1536, 1024],
  "/generated/home-automation/04-network-layer.jpg": [1536, 1024],
  "/generated/home-automation/05-one-bus.jpg": [1536, 1024],
  "/generated/home-automation/06-villa-overview.png": [1565, 1005],
  "/generated/lighting-controls/01-knx-topology.jpg": [1536, 1024],
  "/generated/lighting-controls/03-scene-timeline.jpg": [1536, 1024],
  "/generated/lighting-controls/06-panel-anatomy.jpg": [1536, 1024],
  "/generated/lighting-installation/01-scissor-lift.jpg": [1248, 832],
  "/generated/lighting-installation/03-terminating.jpg": [1248, 832],
  "/generated/lighting-installation/05-fixture-fix.jpg": [1248, 832],
  "/generated/outdoor-lighting/01-street.jpg": [1248, 832],
  "/generated/outdoor-lighting/02-landscape-path.jpg": [1248, 832],
  "/generated/outdoor-lighting/03-car-park.jpg": [1248, 832],
  "/generated/project-management/01-site-meeting.jpg": [1248, 832],
  "/generated/projection-mapping/01-mapped-show.jpg": [1248, 832],
  "/generated/projection-mapping/02-projector-rig.jpg": [1248, 832],
  "/generated/projection-mapping/04-audience.jpg": [1248, 832],
  "/generated/projection-mapping/08-green-show.jpg": [1248, 832],
};

const SIZES: Record<string, [number, number]> = {
  ...Object.fromEntries(
    Object.values(PROJECT_GALLERIES)
      .flat()
      .map((image) => [image.src, [image.w, image.h] as [number, number]])
  ),
  ...EXTRA,
  ...GENERATED,
};

/** A photograph with its size looked up. Throws at build if the file is not
 *  known — a wrong aspect ratio is silent, a missing one should not be. */
function photo(
  src: string,
  caption: string,
  arCaption: string,
  note?: { en: string; ar: string }
): ServicePhoto {
  const size = SIZES[src];
  if (!size) throw new Error(`service-details: no recorded size for ${src}`);
  return { src, w: size[0], h: size[1], caption, arCaption, ...(note ? { note } : {}) };
}

export const SERVICE_DETAILS: Record<string, ServiceDetail> = {
  /* ---------------------------------------------------------------- 01 --- */
  "indoor-lighting": {
    hero: photo(
      "/projects/ritz-carlton/03.jpg",
      "The Ritz-Carlton, Riyadh: the grand hall, its crystal ring and the cove behind the cornice reading as one layer",
      "الريتز كارلتون، الرياض: القاعة الكبرى وثريّاها الكريستالية والإضاءة المخفيّة خلف الكورنيش، تُقرأ طبقةً واحدة"
    ),
    intro: [
      "An interior is not lit by a fitting; it is lit by the layers a room is given. The ambient wash that sets the level, the accent that puts the eye where the architect wanted it, the task light somebody has to actually work under, and the decorative piece that tells you what kind of room you have walked into. Most schedules that reach us have the fourth and are missing the other three.",
      "We hold agencies for the European houses whose catalogues those layers are specified from (Artemide, Reggiani, LEDS C4, Nova Luce, Disano, Arkoslight, planlicht and thirty more), which means the alternative to a six-week lead time is usually a comparable fitting on the shelf in Riyadh rather than a six-week delay. Colour temperature, beam angle, CRI and glare rating are matched across the whole schedule so a corridor and the room it opens into do not read as two different buildings.",
    ],
    arIntro: [
      "لا تُضاء المساحة الداخلية بوحدة إضاءة، بل بالطبقات التي تُمنح للغرفة: الإضاءة العامة التي تضبط المستوى، والإضاءة المركّزة التي تقود العين إلى حيث أرادها المعماري، وإضاءة المهام التي سيعمل تحتها أحدهم فعلًا، والقطعة الزخرفية التي تخبرك بطبيعة المكان الذي دخلته. ومعظم الجداول التي تصلنا تحمل الأخيرة وتفتقد الثلاث الأولى.",
      "نحمل وكالات البيوت الأوروبية التي تُوصَّف منها هذه الطبقات (أرتيميدي وريجياني وLEDS C4 ونوفا لوتشي وديزانو وأركوسلايت وplanlicht وأكثر من ثلاثين غيرها)، ما يعني أن بديل مهلة توريد من ستة أسابيع هو غالبًا وحدة مكافئة على رفّ مستودعنا في الرياض، لا تأخير لستة أسابيع. وتُطابَق درجة حرارة اللون وزاوية الشعاع ومعامل تجسيد اللون وتصنيف الوهج على امتداد الجدول كاملًا، حتى لا يُقرأ الممرّ والغرفة التي يفتح عليها كأنهما مبنيان مختلفان.",
    ],
    facts: [
      { value: "40+", arValue: "+40", label: "Partner houses carried", arLabel: "بيت تصميم شريك" },
      { value: "1976", arValue: "1976", label: "Specifying interiors since", arLabel: "نوصّف المساحات الداخلية منذ" },
      { value: "Riyadh", arValue: "الرياض", label: "Fast-moving ranges held in", arLabel: "مستودع الأصناف سريعة الحركة" },
    ],
    blocks: [
      {
        title: "Decorative and architectural, specified together",
        arTitle: "الزخرفي والمعماري، يُوصَّفان معًا",
        body: "The chandelier and the downlights around it come from the same schedule, at the same colour temperature, on the same dimming protocol. Split across two suppliers they arrive at 3000K and 4000K and the room never recovers.",
        arBody: "الثريّا والوحدات المدفونة حولها تأتيان من الجدول نفسه، وبدرجة حرارة اللون نفسها، وعلى بروتوكول الخفت نفسه. وإذا قُسِّمتا بين مورّدين وصلتا بـ3000K و4000K، ولا تتعافى الغرفة من ذلك.",
      },
      {
        title: "Track, linear and recessed systems",
        arTitle: "أنظمة المسارات والخطية والمدفونة",
        body: "Retail and workplace schemes built on systems rather than single fittings, so the layout can move with the tenant. Track runs, continuous linear profiles, trimless recessed and plaster-in details coordinated with the ceiling contractor before anything is cut.",
        arBody: "حلول التجزئة وبيئات العمل تُبنى على أنظمة لا على وحدات مفردة، فيتحرّك التوزيع مع المستأجر. مسارات ممتدّة وقطاعات خطّية متّصلة ووحدات مدفونة بلا إطار وتفاصيل مدمجة بالجبس، تُنسَّق مع مقاول الأسقف قبل أن يُقطع شيء.",
      },
      {
        title: "Mock-ups before commitment",
        arTitle: "نماذج تجريبية قبل الالتزام",
        body: "Sample boards and a lit mock-up of the typical room or the typical bay, on site, before the order is placed. It is the cheapest hour in the programme and it settles arguments that otherwise surface at handover.",
        arBody: "لوحات عيّنات ونموذج مُضاء للغرفة النمطية أو للوحدة النمطية، في الموقع، قبل إصدار أمر الشراء. هي أرخص ساعة في البرنامج، وتحسم نقاشات تظهر لولاها عند التسليم.",
      },
      {
        title: "Stock, lead times and replacements",
        arTitle: "المخزون ومهل التوريد والاستبدال",
        body: "Fast-moving ranges are held in Riyadh, and the slow ones are ordered against your construction programme rather than against ours. Years later the same ranges are still supported, which is what keeps a re-lamp from turning into a re-design.",
        arBody: "تُحفظ الأصناف سريعة الحركة في الرياض، وتُطلب البطيئة وفق برنامج البناء لديك لا وفق برنامجنا. وبعد سنوات تبقى الأصناف نفسها مدعومة، وهو ما يمنع استبدال وحدة من أن يتحوّل إلى إعادة تصميم.",
      },
    ],
    galleryHead: {
      eyebrow: "From our work",
      arEyebrow: "من مشاريعنا",
      title: "What it looks like",
      arTitle: "كيف يبدو ذلك",
      note: "Photographs from delivered projects in Riyadh. Click any frame to see it full size.",
      arNote: "صور من مشاريع سُلِّمت في الرياض. اضغط أي صورة لعرضها بالحجم الكامل.",
    },
    gallery: [
      photo(
        "/projects/ritz-carlton/01.jpg",
        "The Ritz-Carlton, Riyadh: the double staircase atrium, chandelier and cove lighting carrying the plasterwork",
        "الريتز كارلتون، الرياض: بهو الدرج المزدوج، حيث تحمل الثريّا والإضاءة المخفيّة تفاصيل الجبس"
      ),
      photo(
        "/projects/ritz-carlton/02.jpg",
        "The Ritz-Carlton, Riyadh: the marble hall, lit so the inlay floor pattern reads across its full width",
        "الريتز كارلتون، الرياض: القاعة الرخامية، مُضاءة بحيث يُقرأ نقش الأرضية بعرضه كاملًا"
      ),
      photo(
        "/projects/ritz-carlton/04.jpg",
        "The Ritz-Carlton, Riyadh: recessed downlights set into the ornamented ceiling and its painted dome",
        "الريتز كارلتون، الرياض: وحدات مدفونة في السقف المزخرف وقبّته المرسومة"
      ),
      photo(
        "/projects/ladun-center/03.jpg",
        "LADUN Center, Riyadh: linear profiles picked into the folded ceiling and down the face of the bulkhead",
        "مركز لادن، الرياض: قطاعات خطّية مدمجة في السقف المطوي وعلى واجهة الجسر الساقط"
      ),
      photo(
        "/projects/athletic-showroom/01.jpg",
        "Athletic Showroom, Riyadh: track spots on the merchandise, linear light on the circulation",
        "معرض رياضي، الرياض: إضاءة مسار مركّزة على البضاعة وإضاءة خطّية على مسارات الحركة"
      ),
      photo(
        "/projects/solitaire-mall/09.jpg",
        "Solitaire Mall, Riyadh: the sculptural ribbon over the mall floor, with the shopfronts lit to their own levels",
        "سوليتير مول، الرياض: الشريط النحتي فوق أرضية المول، وواجهات المتاجر مُضاءة بمستوياتها الخاصة"
      ),
      photo(
        "/projects/delfino/01.jpg",
        "Delfino Mayfair, Riyadh: warm points threaded through the planted ceiling of the dining room",
        "دلفينو مايفير، الرياض: نقاط ضوء دافئة منسوجة في السقف المزروع بصالة الطعام"
      ),
      photo(
        "/projects/ladun-center/05.jpg",
        "LADUN Center, Riyadh: a fitted-out floor, the ceiling grid resolved around the linear runs",
        "مركز لادن، الرياض: طابق مُجهَّز، وقد حُلَّت شبكة السقف حول الامتدادات الخطّية"
      )
    ],
    projects: ["ritz-carlton", "ladun-center", "athletic-showroom"],
  },

  /* ---------------------------------------------------------------- 02 --- */
  "lighting-design": {
    hero: photo(
      "/projects/solitaire-mall/07.jpg",
      "Solitaire Mall, Riyadh: a service corridor where the linear run sets the level and the walls do the rest",
      "سوليتير مول، الرياض: ممرّ خدمي، يضبط فيه الامتداد الخطّي المستوى وتتكفّل الجدران بالباقي"
    ),
    intro: [
      "A lighting design is only worth what it can be defended with. Ours goes out as a set: the concept that says what the space should feel like, the calculation that proves it hits the lux level and the uniformity the brief asked for, and the schedule that names every fitting, its wattage, its beam and its control address. A consultant can mark it up. A contractor can build from it. A client can hold us to it.",
      "We work in the consultant's own format and to the project's specification rather than to ours, which is the difference between a submittal that clears review and one that comes back with comments three times. Where the specified fitting is unavailable, unaffordable or simply wrong for the room, the alternative arrives with the photometrics attached rather than as a name in an email.",
    ],
    arIntro: [
      "لا يساوي تصميم الإضاءة أكثر مما يمكن الدفاع به عنه. ولذلك يخرج تصميمنا كحزمة متكاملة: المفهوم الذي يحدّد الإحساس المطلوب في المساحة، والحساب الذي يُثبت بلوغ مستوى الإضاءة والانتظام المطلوبَين في نطاق العمل، والجدول الذي يسمّي كل وحدة وقدرتها وزاوية شعاعها وعنوانها في نظام التحكّم. يستطيع الاستشاري التعليق عليه، ويستطيع المقاول التنفيذ منه، ويستطيع العميل محاسبتنا عليه.",
      "نعمل بالصيغة التي يعتمدها الاستشاري ووفق مواصفات المشروع لا وفق مواصفاتنا، وهذا هو الفرق بين اعتماد يجتاز المراجعة وآخر يعود بالملاحظات ثلاث مرّات. وحين تكون الوحدة الموصَّفة غير متاحة أو غير مجدية اقتصاديًا أو غير مناسبة للغرفة أصلًا، يصل البديل ومعه بياناته الضوئية، لا اسمًا في رسالة بريد.",
    ],
    facts: [
      { value: "Concept → tender", arValue: "من المفهوم إلى الطرح", label: "Design stages covered", arLabel: "مراحل التصميم المغطّاة" },
      { value: "Lux · UGR · Ra", arValue: "Lux · UGR · Ra", label: "Verified space by space", arLabel: "يُتحقَّق منها مساحةً مساحة" },
      { value: "First pass", arValue: "من أول مرّة", label: "Submittals written to clear", arLabel: "تُكتب الاعتمادات لتجتاز المراجعة" },
    ],
    blocks: [
      {
        title: "Concept and mood studies",
        arTitle: "دراسات المفهوم والأجواء",
        body: "What the space should feel like at nine in the morning and at nine at night, argued in references and sketch renders before a single fitting is named. Cheap to change at this stage and expensive to change at any other.",
        arBody: "كيف ينبغي أن تبدو المساحة في التاسعة صباحًا وفي التاسعة مساءً، يُناقَش بالمراجع والرسوم التمثيلية قبل تسمية أي وحدة إضاءة. تغييره في هذه المرحلة رخيص، وفي أي مرحلة أخرى مكلف.",
      },
      {
        title: "Photometric calculation and verification",
        arTitle: "الحسابات الضوئية والتحقّق منها",
        body: "Room-by-room calculation against the target maintained illuminance, uniformity, glare rating and colour rendering the brief or the code sets. The output is a document, not an opinion, and that is what a design review is there to test.",
        arBody: "حساب لكل غرفة على حدة مقابل شدّة الإضاءة المستهدَفة ومعامل الانتظام وتصنيف الوهج ومعامل تجسيد اللون التي يحدّدها نطاق العمل أو الكود. والمخرج وثيقة لا رأي، وهذا تحديدًا ما وُجدت مراجعة التصميم لاختباره.",
      },
      {
        title: "Fixture schedules and submittal packs",
        arTitle: "جداول الوحدات وملفّات الاعتماد",
        body: "Every fitting with its type mark, photometric file, wattage, optic, finish, IP rating, driver and control protocol, assembled in the format the consultant issues in so it can be checked line against line.",
        arBody: "كل وحدة بعلامة نوعها وملفّها الضوئي وقدرتها وبصرياتها وتشطيبها وتصنيف الحماية والمشغّل وبروتوكول التحكّم، مُجمَّعة بالصيغة التي يصدرها بها الاستشاري لتُراجَع سطرًا مقابل سطر.",
      },
      {
        title: "Value engineering that keeps the scheme",
        arTitle: "هندسة قيمية تحافظ على التصميم",
        body: "When the budget moves, alternatives come with the calculation re-run rather than with a promise. Some savings cost nothing visible; some quietly cost the design. We tell you which is which before you sign.",
        arBody: "حين تتغيّر الميزانية، تصل البدائل وقد أُعيد تشغيل الحساب عليها، لا مقرونةً بوعد. بعض التوفير لا يكلّف شيئًا مرئيًا، وبعضه يكلّف التصميم بصمت. ونخبرك بأيّهما أيّ قبل التوقيع.",
      },
    ],
    galleryHead: {
      eyebrow: "From our work",
      arEyebrow: "من مشاريعنا",
      title: "What it looks like",
      arTitle: "كيف يبدو ذلك",
      note: "Photographs from delivered projects in Riyadh. Click any frame to see it full size.",
      arNote: "صور من مشاريع سُلِّمت في الرياض. اضغط أي صورة لعرضها بالحجم الكامل.",
    },
    gallery: [
      photo(
        "/projects/ladun-center/04.jpg",
        "LADUN Center, Riyadh: a folded linear fitting run out along the corridor soffit",
        "مركز لادن، الرياض: وحدة خطّية مطويّة ممتدّة على باطن سقف الممرّ"
      ),
      photo(
        "/projects/solitaire-mall/11.jpg",
        "Solitaire Mall, Riyadh: linear slots cut into the faceted ceiling on the geometry, not across it",
        "سوليتير مول، الرياض: فتحات خطّية مشقوقة في السقف متعدّد الأوجه وفق هندسته لا عبرها"
      ),
      photo(
        "/projects/ritz-carlton/05.jpg",
        "The Ritz-Carlton, Riyadh: the Galleria, held at a level low enough for the polished floor not to glare",
        "الريتز كارلتون، الرياض: الغاليريا، مضبوطة عند مستوى منخفض بما يكفي لئلا تُبهر الأرضية المصقولة"
      ),
      photo(
        "/projects/solitaire-mall/05.jpg",
        "Solitaire Mall, Riyadh: the sculptural ribbon read against the roof truss it is hung from",
        "سوليتير مول، الرياض: الشريط النحتي مقروءًا مقابل الجمالون المعلَّق منه"
      ),
      photo(
        "/projects/seder-hq/01.jpg",
        "Seder Head Quarter, Riyadh: the atrium at night, the coffer grid resolved into an even field",
        "المقر الرئيسي لسدر، الرياض: البهو ليلًا، وقد تحوّلت شبكة الأسقف الغائرة إلى مستوى متجانس"
      ),
      photo(
        "/projects/ladun-center/02.jpg",
        "LADUN Center, Riyadh: an open floor before fit-out, the ceiling run set out on the structural grid",
        "مركز لادن، الرياض: طابق مفتوح قبل التجهيز، وقد وُزِّع امتداد السقف على الشبكة الإنشائية"
      ),
      photo(
        "/projects/solitaire-mall/15.jpg",
        "Solitaire Mall, Riyadh: mall floor and shopfronts, each tenant lit to its own level under one ambient",
        "سوليتير مول، الرياض: أرضية المول وواجهات المتاجر، كل مستأجر مُضاء بمستواه تحت إضاءة عامة واحدة"
      )
    ],
    projects: ["solitaire-mall", "ladun-center", "seder-hq"],
  },

  /* ---------------------------------------------------------------- 03 --- */
  "facade-lighting": {
    hero: photo(
      "/projects/solitaire-mall/13.jpg",
      "Solitaire Mall, Riyadh: the west elevation at dusk, the faceted panels taking colour across their full height",
      "سوليتير مول، الرياض: الواجهة الغربية عند الغسق، وألواحها متعدّدة الأوجه تحمل اللون بارتفاعها كاملًا"
    ),
    intro: [
      "A facade scheme is judged from four hundred metres away by people who will never read the specification, and it is judged again eighteen months later by whoever has to replace the fittings that did not survive. Both judgements are settled at design stage, and the second one is settled by hardware selection.",
      "Riyadh runs past 45°C in the shade and a south elevation runs hotter. Drivers derate, silicone gaskets go hard, and an IP66 rating means nothing if the gland was tightened by somebody in a hurry at 2am. We specify heat-tolerant, correctly rated hardware from manufacturers who publish their thermal data, detail the access before the first bracket is set, and light the building so the glare limits and spill limits in the municipal and developer reviews are met rather than argued about.",
    ],
    arIntro: [
      "تُحكَم إضاءة الواجهة من مسافة أربعمئة متر على يد أناس لن يقرأوا المواصفات أبدًا، ثم تُحكَم مرّة أخرى بعد ثمانية عشر شهرًا على يد من سيستبدل الوحدات التي لم تصمد. والحكمان يُحسمان في مرحلة التصميم، والثاني يُحسم باختيار الأجهزة.",
      "تتجاوز حرارة الرياض 45 درجة مئوية في الظل، والواجهة الجنوبية أشدّ. تنخفض كفاءة المشغّلات، وتتصلّب حشوات السيليكون، ولا يعني تصنيف IP66 شيئًا إذا شدّ أحدهم الغدّة على عجل في الثانية فجرًا. لذلك نوصّف أجهزة قادرة على تحمّل الحرارة وبتصنيف صحيح من مصانع تنشر بياناتها الحرارية، ونفصّل مسارات الوصول قبل تثبيت أول حامل، ونُضيء المبنى بحيث تُستوفى حدود الوهج وتسرّب الضوء في مراجعات البلدية والمطوّر بدل التفاوض عليها.",
    ],
    facts: [
      { value: "IP65 / IP66", arValue: "IP65 / IP66", label: "Hardware rating outdoors", arLabel: "تصنيف الحماية في الخارج" },
      { value: "45°C+", arValue: "+45°م", label: "Ambient the gear is picked for", arLabel: "الحرارة المحيطة التي تُختار لها الأجهزة" },
      { value: "RGBW", arValue: "RGBW", label: "Full colour, not three channels", arLabel: "لون كامل، لا ثلاث قنوات" },
    ],
    blocks: [
      {
        title: "Grazing, washing and the surface itself",
        arTitle: "الإضاءة المائلة والغسيل والسطح نفسه",
        body: "Grazing at 50mm off the wall to bring out a stone texture, washing from further out to flatten a panel deliberately. Which one a facade wants is decided by the material, and getting it backwards makes an expensive cladding look cheap.",
        arBody: "إضاءة مائلة على بعد 50 مم من الجدار لإبراز ملمس الحجر، وغسيل من مسافة أبعد لتسطيح لوح عمدًا. والمادة هي التي تقرّر ما تريده الواجهة، وعكس القرار يجعل كساءً باهظًا يبدو رخيصًا.",
      },
      {
        title: "Media facades and colour control",
        arTitle: "الواجهات الإعلامية والتحكّم باللون",
        body: "RGBW pixel and node systems on their own controller, with the white channel that keeps a national-day green from turning the building mint. Scenes, calendars and event overrides live in the same control layer as the rest of the site.",
        arBody: "أنظمة بكسل وعُقَد RGBW على وحدة تحكّم خاصة بها، مع قناة البياض التي تمنع أخضر اليوم الوطني من أن يحيل المبنى إلى لون نعناعي. وتقيم المشاهد والتقاويم وتجاوزات الفعاليات في طبقة التحكّم نفسها التي يقيم فيها بقية الموقع.",
      },
      {
        title: "Heat, ingress and access",
        arTitle: "الحرارة والتسرّب والوصول",
        body: "Thermal headroom, gasket material, cable gland detail and a maintenance route that does not need a cherry picker on a live road. This is the part of a facade scheme that decides whether it still looks right in year five.",
        arBody: "هامش حراري، ومادة الحشوات، وتفصيل غدد الكابلات، ومسار صيانة لا يحتاج رافعة على طريق مفتوح للمرور. هذا هو الجزء من مشروع الواجهة الذي يقرّر ما إذا كانت ستبقى على حالها في عامها الخامس.",
      },
      {
        title: "Glare and spill, on the drawing",
        arTitle: "الوهج والتسرّب، على المخطط",
        body: "Upward light ratio, obtrusive light to neighbouring windows and the view from the road it faces, shown as numbers in the submittal. Reviews increasingly ask for this and the ones that do not still notice when it is wrong.",
        arBody: "نسبة الضوء المتصاعد، والضوء المزعج للنوافذ المجاورة، والمشهد من الطريق المقابل، تُعرَض أرقامًا في ملفّ الاعتماد. وتطلبها المراجعات على نحو متزايد، ومن لا يطلبها يلاحظ الخطأ فيها.",
      },
    ],
    galleryHead: {
      eyebrow: "From our work",
      arEyebrow: "من مشاريعنا",
      title: "What it looks like",
      arTitle: "كيف يبدو ذلك",
      note: "Photographs from delivered projects in Riyadh, with illustrations where the frame is marked. Click any frame to see it full size.",
      arNote: "صور من مشاريع سُلِّمت في الرياض، ومعها صور توضيحية حيث أُشير إلى ذلك. اضغط أي صورة لعرضها بالحجم الكامل.",
    },
    gallery: [
      photo(
        "/projects/solitaire-mall/01.jpg",
        "Solitaire Mall, Riyadh: the faceted white elevation at dusk, each plane lit to a different value",
        "سوليتير مول، الرياض: الواجهة البيضاء متعدّدة الأوجه عند الغسق، كل مستوٍ مُضاء بقيمة مختلفة"
      ),
      photo(
        "/projects/solitaire-mall/16.jpg",
        "Solitaire Mall, Riyadh: the perforated screen close up, grazed so the pattern is legible at street level",
        "سوليتير مول، الرياض: الحاجز المخرّم عن قرب، مُضاءً بزاوية مائلة ليكون النقش مقروءًا من مستوى الشارع"
      ),
      photo(
        "/projects/solitaire-mall/18-aerial-dusk.jpg",
        "Solitaire Mall, Riyadh: the lit facade from above at dusk, against the city behind it",
        "سوليتير مول، الرياض: الواجهة المضاءة من الأعلى عند الغسق، مقابل المدينة خلفها"
      ),
      photo(
        "/projects/four-points/02-upright.jpg",
        "Four Points by Sheraton, Riyadh: the elevation uplit between the window bays, the crown left to the signage",
        "فور بوينتس باي شيراتون، الرياض: الواجهة مُضاءة من الأسفل بين فتحات النوافذ، والتاج متروك للوحة الاسم"
      ),
      photo(
        "/projects/four-points/01.jpg",
        "Four Points by Sheraton, Riyadh: the approach at night, the entrance canopy carrying the brightest note",
        "فور بوينتس باي شيراتون، الرياض: المدخل ليلًا، ومظلّة الاستقبال تحمل أعلى درجة سطوع"
      ),
      photo(
        "/projects/solitaire-mall/02.jpg",
        "Solitaire Mall, Riyadh: the whole site at dusk, facade and landscape balanced against each other",
        "سوليتير مول، الرياض: الموقع كاملًا عند الغسق، والواجهة والمسطحات موازِنة إحداهما للأخرى"
      ),
      photo(
        "/generated/facade-lighting/01-stone-tower.jpg",
        "Full-height piers grazed from below, the recessed glazing left dark between them",
        "دعامات بكامل الارتفاع مُضاءة من أسفل بزاوية مائلة، والزجاج الغائر متروك معتمًا بينها",
        { en: "Illustration", ar: "صورة توضيحية" }
      ),
      photo(
        "/generated/facade-lighting/02-mosque.jpg",
        "Plain stone walls and a minaret lit evenly, without colour and without glare",
        "جدران حجرية بسيطة ومئذنة مُضاءة بانتظام، بلا لون وبلا وهج",
        { en: "Illustration", ar: "صورة توضيحية" }
      ),
      photo(
        "/generated/facade-lighting/03-villa.jpg",
        "A residential elevation washed warm, with the landscape lit to the same level",
        "واجهة سكنية مغسولة بضوء دافئ، والمسطحات مُضاءة بالمستوى نفسه",
        { en: "Illustration", ar: "صورة توضيحية" }
      )
    ],
    projects: ["solitaire-mall", "four-points", "seder-hq"],
  },

  /* ---------------------------------------------------------------- 04 --- */
  "outdoor-lighting": {
    hero: photo(
      "/projects/solitaire-mall/12.jpg",
      "Solitaire Mall, Riyadh: the site and its approach roads at night, seen from above",
      "سوليتير مول، الرياض: الموقع وطرق الوصول إليه ليلًا، من الأعلى"
    ),
    intro: [
      "Outdoor lighting is the part of a scheme that gets designed from a catalogue most often and should be designed from a site most of all. Pole spacing is set by the kerb line and the trees that are already there. Mounting height is set by what is allowed and what can be reached with the maintenance vehicle the client actually owns. Uniformity is set by the class the road has to meet. Pick the fitting first and you spend the rest of the project apologising for it.",
      "We size the scheme around those constraints, then supply it: poles and brackets, floodlights, bollards, in-ground uplights, step and handrail fittings, and the foundations, cabling and feeder pillars that go under them. Every outdoor circuit can come back to the same KNX control layer as the building, so the car park, the landscape and the facade run off one astronomical time clock instead of three photocells that disagree.",
    ],
    arIntro: [
      "الإضاءة الخارجية هي الجزء الذي يُصمَّم من الكتالوج أكثر من غيره، وينبغي أن يُصمَّم من الموقع أكثر من غيره. فتباعد الأعمدة يحدّده خطّ الرصيف والأشجار القائمة أصلًا، وارتفاع التركيب يحدّده المسموح به وما يمكن بلوغه بمركبة الصيانة التي يملكها العميل فعلًا، ومعامل الانتظام تحدّده الفئة التي يجب أن يستوفيها الطريق. ومن يختر الوحدة أولًا يقضِ بقية المشروع يعتذر عنها.",
      "نضع مقاسات المشروع وفق هذه القيود، ثم نورّده: الأعمدة والحوامل والكشّافات والأعمدة القصيرة والوحدات المدفونة ووحدات الدرج والدرابزين، ومعها القواعد والكابلات ولوحات التغذية التي تحتها. ويمكن لكل دائرة خارجية أن تعود إلى طبقة التحكّم KNX نفسها التي يعمل عليها المبنى، فتعمل المواقف والمسطحات والواجهة على ساعة فلكية واحدة بدل ثلاث خلايا ضوئية لا تتفق.",
    ],
    facts: [
      { value: "Bollard → high-mast", arValue: "من العمود القصير إلى الصاري", label: "Mounting heights covered", arLabel: "ارتفاعات التركيب المغطّاة" },
      { value: "One clock", arValue: "ساعة واحدة", label: "Site, landscape and facade switched together", arLabel: "الموقع والمسطحات والواجهة تُشغَّل معًا" },
      { value: "Uniformity", arValue: "الانتظام", label: "Designed to target, not to catalogue", arLabel: "يُصمَّم وفق المستهدف لا وفق الكتالوج" },
    ],
    blocks: [
      {
        title: "Roads, car parks and compounds",
        arTitle: "الطرق والمواقف والمجمّعات",
        body: "Pole spacing, mounting height, tilt and optic chosen against the uniformity and glare class the road has to meet, with the calculation attached. Column foundations and feeder pillars sized alongside, not left to the contractor to guess.",
        arBody: "تباعد الأعمدة وارتفاع التركيب وزاوية الميل والبصريات، تُختار مقابل فئة الانتظام والوهج التي يجب أن يستوفيها الطريق، ومعها الحساب. وتُحدَّد قواعد الأعمدة ولوحات التغذية بالتوازي، لا تُترك لتقدير المقاول.",
      },
      {
        title: "Landscape and pathways",
        arTitle: "المسطحات والممرات",
        body: "Bollards, in-ground uplights, tree spikes and step lighting laid out to make a route legible after dark without turning a garden into a runway. Low-level and warm, with the driver kept out of the planting bed.",
        arBody: "أعمدة قصيرة ووحدات مدفونة وكشّافات أشجار وإضاءة درج، تُوزَّع لجعل المسار مقروءًا بعد الغروب دون أن تحيل حديقة إلى مدرج مطار. مستوى منخفض ولون دافئ، والمشغّل بعيد عن حوض الزراعة.",
      },
      {
        title: "Sports and flood lighting",
        arTitle: "الإضاءة الرياضية والكشّافات",
        body: "Pitch and court lighting to the horizontal and vertical levels the sport and the broadcast class require, aimed on site and measured on site rather than signed off from the calculation alone.",
        arBody: "إضاءة الملاعب والصالات وفق المستويين الأفقي والرأسي اللذين تتطلّبهما اللعبة وفئة البثّ، تُوجَّه في الموقع وتُقاس في الموقع بدل اعتمادها من الحساب وحده.",
      },
      {
        title: "Built for the summer, not the brochure",
        arTitle: "مصمَّمة للصيف، لا للكتيّب",
        body: "Corrosion class for the finish, impact rating where vehicles get close, surge protection on long external runs, and gear that is still within its thermal limits at the temperature the site reaches in August.",
        arBody: "فئة مقاومة التآكل للتشطيب، وتصنيف الصدم حيث تقترب المركبات، وحماية من الارتفاعات المفاجئة على الامتدادات الخارجية الطويلة، وأجهزة تبقى ضمن حدودها الحرارية عند درجة الحرارة التي يبلغها الموقع في أغسطس.",
      },
    ],
    galleryHead: {
      eyebrow: "From our work",
      arEyebrow: "من مشاريعنا",
      title: "What it looks like",
      arTitle: "كيف يبدو ذلك",
      note: "Photographs from delivered projects in Riyadh, with illustrations where the frame is marked. Click any frame to see it full size.",
      arNote: "صور من مشاريع سُلِّمت في الرياض، ومعها صور توضيحية حيث أُشير إلى ذلك. اضغط أي صورة لعرضها بالحجم الكامل.",
    },
    gallery: [
      photo(
        "/projects/solitaire-mall/10.jpg",
        "Solitaire Mall, Riyadh: the external stair, each tread washed from the riser above it",
        "سوليتير مول، الرياض: الدرج الخارجي، كل نائمة مغسولة بالضوء من القائمة التي فوقها"
      ),
      photo(
        "/projects/solitaire-mall/08.jpg",
        "Solitaire Mall, Riyadh: the external colonnade, a continuous run carrying the whole walkway",
        "سوليتير مول، الرياض: الرواق الخارجي، وامتداد متّصل يحمل الممرّ كاملًا"
      ),
      photo(
        "/projects/seder-hq/02.jpg",
        "Seder Head Quarter, Riyadh: a lit column at the building line, set clear of the glazing",
        "المقر الرئيسي لسدر، الرياض: عمود مضاء عند خطّ المبنى، مُبعَد عن الواجهة الزجاجية"
      ),
      photo(
        "/projects/seder-hq/05.jpg",
        "Seder Head Quarter, Riyadh: the approach paving, lit from the columns along the kerb",
        "المقر الرئيسي لسدر، الرياض: رصيف المدخل، مُضاءً من الأعمدة على امتداد الحافّة"
      ),
      photo(
        "/projects/seder-hq/04.jpg",
        "Seder Head Quarter, Riyadh: the ramp under construction, columns set before the surfacing",
        "المقر الرئيسي لسدر، الرياض: المنحدر أثناء التنفيذ، وقد رُكِّبت الأعمدة قبل التبليط"
      ),
      photo(
        "/generated/outdoor-lighting/01-street.jpg",
        "A residential street on a regular column line, the pools overlapping without dark gaps",
        "شارع سكني على خطّ أعمدة منتظم، وبقع الضوء متداخلة بلا فجوات معتمة",
        { en: "Illustration", ar: "صورة توضيحية" }
      ),
      photo(
        "/generated/outdoor-lighting/02-landscape-path.jpg",
        "A landscaped path lit from bollards and low columns",
        "ممرّ في مسطح أخضر مُضاء من أعمدة قصيرة ومنخفضة",
        { en: "Illustration", ar: "صورة توضيحية" }
      ),
      photo(
        "/generated/outdoor-lighting/03-car-park.jpg",
        "An open car park on high-mast columns, lit evenly across the bays",
        "موقف مكشوف على صوارٍ عالية، مُضاء بانتظام على امتداد المواقف",
        { en: "Illustration", ar: "صورة توضيحية" }
      )
    ],
    projects: ["solitaire-mall", "seder-hq", "ladun-center"],
  },

  /* ---------------------------------------------------------------- 05 --- */
  "lighting-controls": {
    hero: photo(
      "/generated/lighting-controls/01-knx-topology.jpg",
      "How a KNX installation is put together: one power supply, one bus, and the devices hanging off it",
      "كيف يُبنى نظام KNX: مصدر تغذية واحد وناقل واحد والأجهزة المتفرّعة عنه",
      { en: "Diagram", ar: "رسم توضيحي" }
    ),
    intro: [
      "Controls are where a lighting scheme either earns its budget or quietly wastes it. A building with no control runs every circuit at full output for fourteen hours because nobody is paid to walk round switching things off. A building with the wrong control does the same thing, plus the client now owns a proprietary system that one integrator in the Kingdom can service.",
      "We build on KNX and EIB, a worldwide open standard rather than a brand, so lighting, blinds, HVAC, metering and security sit on one bus, and any KNX-certified integrator can pick the system up in ten years' time. Scenes, occupancy sensing, daylight harvesting, DALI dimming, tunable white and astronomical time clocks all come from the same layer, which is also why the car park, the facade and the boardroom can be told to do something together.",
    ],
    arIntro: [
      "أنظمة التحكّم هي المكان الذي يستحقّ فيه مشروع الإضاءة ميزانيته أو يهدرها بصمت. فالمبنى بلا تحكّم يشغّل كل دائرة بكامل طاقتها أربع عشرة ساعة، لأن لا أحد يتقاضى أجرًا للمرور وإطفاء الأنوار. والمبنى ذو التحكّم الخاطئ يفعل الشيء نفسه، ويصبح العميل فوق ذلك مالكًا لنظام مغلق لا يخدمه في المملكة سوى مُكامِل واحد.",
      "نبني على KNX وEIB، وهو معيار عالمي مفتوح لا علامة تجارية، فتجتمع الإضاءة والستائر والتكييف والقياس والأمن على ناقل واحد، ويستطيع أي مُكامِل معتمَد من KNX تسلّم النظام بعد عشر سنوات. وتأتي المشاهد واستشعار الإشغال والاستفادة من ضوء النهار وخفت DALI والأبيض القابل للضبط والساعات الفلكية كلّها من الطبقة نفسها، ولهذا يمكن أن يُطلب من المواقف والواجهة وقاعة الاجتماعات أن تفعل شيئًا واحدًا معًا.",
    ],
    facts: [
      { value: "KNX / EIB", arValue: "KNX / EIB", label: "Open standard, no vendor lock-in", arLabel: "معيار مفتوح بلا ارتباط بمورّد" },
      { value: "DALI", arValue: "DALI", label: "Addressable dimming per fitting", arLabel: "خفت قابل للعنونة لكل وحدة" },
      { value: "One bus", arValue: "ناقل واحد", label: "Lighting, blinds, HVAC and metering", arLabel: "الإضاءة والستائر والتكييف والقياس" },
    ],
    blocks: [
      {
        title: "KNX and EIB, end to end",
        arTitle: "KNX وEIB، من الطرف إلى الطرف",
        body: "Bus topology, actuator and sensor selection, panel build, addressing and ETS programming, all in house. The database is handed over with the building, so the next change is an edit rather than an excavation.",
        arBody: "طوبولوجيا الناقل، واختيار وحدات التنفيذ والاستشعار، وتجميع اللوحات، والعنونة، والبرمجة عبر ETS، كلّها داخليًا. وتُسلَّم قاعدة البيانات مع المبنى، فيصبح التعديل التالي تحريرًا لا حفرًا.",
      },
      {
        title: "Scenes, occupancy and daylight",
        arTitle: "المشاهد والإشغال وضوء النهار",
        body: "Presence detection on the circuits nobody remembers, daylight harvesting on the ones beside glass, and scenes that a receptionist can actually reach on a button rather than three levels into an app.",
        arBody: "استشعار للتواجد على الدوائر التي لا يتذكّرها أحد، واستفادة من ضوء النهار على الدوائر المجاورة للزجاج، ومشاهد يبلغها موظف الاستقبال بضغطة زرّ لا بعد ثلاثة مستويات داخل تطبيق.",
      },
      {
        title: "DALI dimming and tunable white",
        arTitle: "خفت DALI والأبيض القابل للضبط",
        body: "Per-fitting addressing, so a single failed driver reports itself instead of being found by a guest. Tunable white where the room's use changes through the day and a fixed colour temperature would be wrong for half of it.",
        arBody: "عنونة لكل وحدة، فيبلّغ المشغّل المعطوب عن نفسه بدل أن يكتشفه نزيل. وأبيض قابل للضبط حيث يتغيّر استخدام الغرفة خلال اليوم وتكون درجة حرارة لون ثابتة خاطئة في نصفه.",
      },
      {
        title: "Energy monitoring and reporting",
        arTitle: "مراقبة الطاقة وإعداد التقارير",
        body: "Circuit-level metering logged and reported, which is what an ESCO contract, a green building target or an operating budget review asks for. Savings you can point at rather than savings you assert.",
        arBody: "قياس على مستوى الدائرة يُسجَّل وتُعدّ عنه التقارير، وهو ما يطلبه عقد شركة خدمات الطاقة أو مستهدف المبنى الأخضر أو مراجعة ميزانية التشغيل. توفير يمكن الإشارة إليه، لا توفير يُدّعى.",
      },
    ],
    galleryHead: {
      eyebrow: "How it is built",
      arEyebrow: "كيف يُبنى",
      title: "The system behind it",
      arTitle: "النظام خلفه",
      note: "Diagrams of how these systems are put together, with our own installation photography alongside. Click any frame to see it full size.",
      arNote: "رسوم توضيحية لكيفية بناء هذه الأنظمة، ومعها صور من تنفيذنا. اضغط أي صورة لعرضها بالحجم الكامل.",
    },
    gallery: [
      photo(
        "/projects/milling-mc2/03.jpg",
        "Milling Company MC-2, Riyadh: a KNX distribution board, bus and load sides landed and numbered",
        "شركة المطاحن الثانية، الرياض: لوحة توزيع KNX، وقد رُبط جانبا الناقل والأحمال ورُقِّما"
      ),
      photo(
        "/generated/lighting-controls/03-scene-timeline.jpg",
        "One space across a day, and the scenes a control system moves it through",
        "مساحة واحدة على مدار اليوم، والمشاهد التي ينقلها نظام التحكّم بينها",
        { en: "Diagram", ar: "رسم توضيحي" }
      ),
      photo(
        "/generated/lighting-controls/06-panel-anatomy.jpg",
        "What sits inside a lighting control panel, rail by rail",
        "ما يوجد داخل لوحة التحكّم بالإضاءة، قضيبًا بعد قضيب",
        { en: "Diagram", ar: "رسم توضيحي" }
      )
    ],
    projects: ["four-points", "milling-mc2", "delfino"],
  },

  /* ---------------------------------------------------------------- 06 --- */
  "lighting-installation": {
    hero: photo(
      "/projects/milling-mc2/05.jpg",
      "Milling Company MC-2, Riyadh: a board being wired out, every core landed and labelled as it goes in",
      "شركة المطاحن الثانية، الرياض: لوحة أثناء التوصيل، كل موصل يُربط ويُعلَّم أثناء تركيبه"
    ),
    intro: [
      "The gap between a lighting design and a lit building is about two hundred small decisions taken on a ladder: which way this spot points, how far that trimless fitting sits off the plaster line, whether the driver is reachable once the ceiling closes. They are taken either by people who understand the scheme or by whoever was available that week.",
      "ARAK's own technical crews do this work. We install, aim, address, program and commission, and we do the focusing at night with the client standing there, because a beam angle looks different in a lit room than it does on a drawing. What is handed over at the end is the building, the as-built documentation, the control database and a trained operator, not a box of manuals.",
    ],
    arIntro: [
      "المسافة بين تصميم الإضاءة والمبنى المُضاء نحو مئتَي قرار صغير تُتَّخذ على سلّم: إلى أين توجَّه هذه الوحدة، وكم تبعد تلك الوحدة عديمة الإطار عن خطّ الجبس، وهل يمكن الوصول إلى المشغّل بعد إغلاق السقف. وتُتَّخذ هذه القرارات إمّا على يد من يفهم التصميم، وإمّا على يد من صادف أنه كان متاحًا ذلك الأسبوع.",
      "تتولّى فرق أراك الفنية هذا العمل. نركّب ونوجّه ونعنون ونبرمج ونشغّل، ونضبط زوايا الإضاءة ليلًا والعميل واقف هناك، لأن زاوية الشعاع تبدو في غرفة مُضاءة غير ما تبدو عليه على المخطط. وما يُسلَّم في النهاية هو المبنى ومخططات ما تمّ تنفيذه وقاعدة بيانات التحكّم ومشغّل مُدرَّب، لا صندوق أدلّة استخدام.",
    ],
    facts: [
      { value: "In house", arValue: "فرق داخلية", label: "Our crews, not a subcontractor", arLabel: "فرقنا لا مقاول باطن" },
      { value: "On site", arValue: "في الموقع", label: "Focused and programmed at night", arLabel: "الضبط والبرمجة ليلًا" },
      { value: "As-built", arValue: "مخططات التنفيذ", label: "Drawings and database handed over", arLabel: "تُسلَّم المخططات وقاعدة البيانات" },
    ],
    blocks: [
      {
        title: "Installation and fixture aiming",
        arTitle: "التركيب وتوجيه الوحدات",
        body: "Setting out against the reflected ceiling plan, coordination with the ceiling and MEP trades before anything is cut, then focusing every adjustable fitting after dark rather than at eleven in the morning.",
        arBody: "التخطيط وفق مسقط السقف المعكوس، والتنسيق مع مقاولي الأسقف والأعمال الكهروميكانيكية قبل قطع أي شيء، ثم ضبط كل وحدة قابلة للتوجيه بعد حلول الظلام لا في الحادية عشرة صباحًا.",
      },
      {
        title: "Programming and commissioning",
        arTitle: "البرمجة والتشغيل",
        body: "Addressing, ETS programming, scene building and system testing with the client present, so a scene is signed off in the room it belongs to instead of being described in a meeting.",
        arBody: "العنونة والبرمجة عبر ETS وبناء المشاهد واختبار النظام بحضور العميل، فيُعتمَد المشهد في الغرفة التي يخصّها بدل وصفه في اجتماع.",
      },
      {
        title: "As-built documentation",
        arTitle: "توثيق ما تمّ تنفيذه",
        body: "Marked-up drawings, the final fixture schedule, the control database and the addressing list, issued as the record of what is actually in the building. This is the document the next contractor will work from.",
        arBody: "مخططات معلَّم عليها، والجدول النهائي للوحدات، وقاعدة بيانات التحكّم، وقائمة العناوين، تُصدَر بوصفها سجلّ ما هو قائم فعلًا في المبنى. وهذه هي الوثيقة التي سيعمل منها المقاول التالي.",
      },
      {
        title: "Training and handover",
        arTitle: "التدريب والتسليم",
        body: "The facilities team is walked through the panels, the scenes and the failure modes, on site, doing it themselves. A system nobody has been shown how to run is a system that gets bypassed within a year.",
        arBody: "يُصطحَب فريق المرافق في جولة على اللوحات والمشاهد وحالات الأعطال، في الموقع، وهم من ينفّذ بأنفسهم. فالنظام الذي لم يُدرَّب أحد على تشغيله نظام يُلتفّ عليه خلال عام.",
      },
    ],
    galleryHead: {
      eyebrow: "From our work",
      arEyebrow: "من مشاريعنا",
      title: "What it looks like",
      arTitle: "كيف يبدو ذلك",
      note: "Photographs from delivered projects in Riyadh, with illustrations where the frame is marked. Click any frame to see it full size.",
      arNote: "صور من مشاريع سُلِّمت في الرياض، ومعها صور توضيحية حيث أُشير إلى ذلك. اضغط أي صورة لعرضها بالحجم الكامل.",
    },
    gallery: [
      photo(
        "/projects/athletic-showroom/03.jpg",
        "Athletic Showroom, Riyadh: track spots aimed onto the rails, the exposed services left dark on purpose",
        "معرض رياضي، الرياض: وحدات مسار موجَّهة إلى القضبان، والخدمات المكشوفة تُركت معتمة عمدًا"
      ),
      photo(
        "/projects/athletic-showroom/07.jpg",
        "Athletic Showroom, Riyadh: the finished floor, ambient and accent balanced across the whole span",
        "معرض رياضي، الرياض: الطابق بعد اكتماله، والإضاءة العامة والمركّزة متوازنتان على امتداده كاملًا"
      ),
      photo(
        "/projects/ladun-center/01.jpg",
        "LADUN Center, Riyadh: a completed ceiling, the linear runs set true against the panel joints",
        "مركز لادن، الرياض: سقف مكتمل، والامتدادات الخطّية مستقيمة مقابل فواصل الألواح"
      ),
      photo(
        "/projects/seder-hq/06.jpg",
        "Seder Head Quarter, Riyadh: an office corridor handed over, the ceiling grid complete",
        "المقر الرئيسي لسدر، الرياض: ممرّ مكاتب مُسلَّم، وشبكة السقف مكتملة"
      ),
      photo(
        "/generated/lighting-installation/01-scissor-lift.jpg",
        "A linear run going into a high exposed-services ceiling before the space is finished",
        "امتداد خطّي يُركَّب في سقف عالٍ مكشوف الخدمات قبل اكتمال المساحة",
        { en: "Illustration", ar: "صورة توضيحية" }
      ),
      photo(
        "/generated/lighting-installation/03-terminating.jpg",
        "Cores ferruled, numbered and landed into a control panel",
        "موصلات مُطرَّفة ومرقَّمة ومربوطة داخل لوحة تحكّم",
        { en: "Illustration", ar: "صورة توضيحية" }
      ),
      photo(
        "/generated/lighting-installation/05-fixture-fix.jpg",
        "A recessed downlight going into its cut aperture, driver in the void above",
        "وحدة مدفونة تُركَّب في فتحتها، ومحوّلها في الفراغ فوقها",
        { en: "Illustration", ar: "صورة توضيحية" }
      )
    ],
    projects: ["athletic-showroom", "milling-mc2", "delfino"],
  },

  /* ---------------------------------------------------------------- 07 --- */
  "project-management": {
    hero: photo(
      "/projects/solitaire-mall/04.jpg",
      "Solitaire Mall, Riyadh: the main atrium on handover, trading floors and feature lighting complete together",
      "سوليتير مول، الرياض: البهو الرئيسي عند التسليم، وقد اكتملت صالات العرض والإضاءة المميّزة معًا"
    ),
    intro: [
      "On a large scheme the lighting is rarely late because of the lighting. It is late because a submittal sat with a consultant for five weeks, or because a container cleared customs the day after the ceiling closed, or because nobody noticed that phase two needed a fitting that was discontinued between tender and award.",
      "One ARAK project manager owns that whole chain: submittals and approvals, procurement from our partner factories, shipping and customs clearance, delivery phased to the construction sequence, site coordination, snagging and close-out. You get one number to call and one person who already knows what was agreed in March. On multi-phase and multi-city programmes that is not a convenience; it is the only way the dates hold.",
    ],
    arIntro: [
      "في المشاريع الكبيرة نادرًا ما تتأخّر الإضاءة بسبب الإضاءة. بل تتأخّر لأن اعتمادًا بقي لدى الاستشاري خمسة أسابيع، أو لأن حاوية خُلِّصت جمركيًا في اليوم التالي لإغلاق السقف، أو لأن أحدًا لم ينتبه إلى أن المرحلة الثانية تحتاج وحدة أُوقف إنتاجها بين الطرح والترسية.",
      "يتولّى مدير مشروع واحد من أراك هذه السلسلة كاملة: الاعتمادات والموافقات، والشراء من مصانعنا الشريكة، والشحن والتخليص الجمركي، والتسليم على مراحل تتبع تسلسل البناء، والتنسيق في الموقع، ومعالجة الملاحظات، والإقفال. لديك رقم واحد تتّصل به، وشخص واحد يعرف أصلًا ما اتُّفق عليه في مارس. وفي البرامج متعدّدة المراحل والمدن، هذا ليس رفاهية بل السبيل الوحيد لصمود التواريخ.",
    ],
    facts: [
      { value: "One contact", arValue: "جهة اتصال واحدة", label: "From purchase order to close-out", arLabel: "من أمر الشراء حتى الإقفال" },
      { value: "Phased", arValue: "على مراحل", label: "Delivery cut to the site sequence", arLabel: "تسليم مُفصَّل على تسلسل الموقع" },
      { value: "Multi-city", arValue: "متعدّد المدن", label: "Programmes run across the Kingdom", arLabel: "برامج تُدار في أنحاء المملكة" },
    ],
    blocks: [
      {
        title: "Submittals and approvals",
        arTitle: "الاعتمادات والموافقات",
        body: "Technical submittals prepared in the consultant's format with the photometric and compliance data attached, tracked to a register so an approval that has stalled is visible in week two rather than week seven.",
        arBody: "اعتمادات فنية تُعدّ بصيغة الاستشاري ومعها البيانات الضوئية وبيانات المطابقة، وتُتابَع في سجلّ، فتظهر الموافقة المتعثّرة في الأسبوع الثاني لا في السابع.",
      },
      {
        title: "Procurement, shipping and customs",
        arTitle: "الشراء والشحن والتخليص",
        body: "Orders placed against factory lead times we actually verify, consolidated where it saves freight, and cleared through customs with documentation that matches the order. Delays here are almost always paperwork, not ships.",
        arBody: "أوامر شراء تُصدَر وفق مهل مصانع نتحقّق منها فعلًا، وتُدمَج حيث يوفّر ذلك أجور الشحن، وتُخلَّص جمركيًا بمستندات مطابقة لأمر الشراء. والتأخير هنا سببه الأوراق غالبًا لا السفن.",
      },
      {
        title: "Delivery phased to the programme",
        arTitle: "تسليم على مراحل وفق البرنامج",
        body: "Fittings arrive when the ceiling is ready for them. Six months early means a full store, a damage claim and a warranty clock that started before installation; six weeks late means a delayed handover.",
        arBody: "تصل الوحدات حين يصبح السقف جاهزًا لها. فالوصول قبل ستة أشهر يعني مستودعًا ممتلئًا ومطالبة بأضرار وضمانًا بدأ عدّه قبل التركيب، والتأخّر ستة أسابيع يعني تسليمًا متأخّرًا.",
      },
      {
        title: "Snagging and close-out",
        arTitle: "معالجة الملاحظات والإقفال",
        body: "A joint snag walk, a closed list rather than an open one, and the handover pack (as-builts, warranties, spares schedule and the control database) issued together so the file is complete on the day it is needed.",
        arBody: "جولة ملاحظات مشتركة، وقائمة مغلقة لا مفتوحة، وملفّ تسليم (مخططات ما تمّ تنفيذه والضمانات وجدول قطع الغيار وقاعدة بيانات التحكّم) يصدر مجتمعًا ليكتمل الملفّ في اليوم الذي يُطلب فيه.",
      },
    ],
    galleryHead: {
      eyebrow: "From our work",
      arEyebrow: "من مشاريعنا",
      title: "What it looks like",
      arTitle: "كيف يبدو ذلك",
      note: "Photographs from delivered projects in Riyadh, with illustrations where the frame is marked. Click any frame to see it full size.",
      arNote: "صور من مشاريع سُلِّمت في الرياض، ومعها صور توضيحية حيث أُشير إلى ذلك. اضغط أي صورة لعرضها بالحجم الكامل.",
    },
    gallery: [
      photo(
        "/projects/athletic-showroom/06.jpg",
        "Athletic Showroom, Riyadh: a retail unit handed over ready to trade",
        "معرض رياضي، الرياض: وحدة تجزئة مُسلَّمة جاهزة للتشغيل"
      ),
      photo(
        "/projects/solitaire-mall/06.jpg",
        "Solitaire Mall, Riyadh: the feature stair and its surrounds, one package among many on the same date",
        "سوليتير مول، الرياض: الدرج المميّز ومحيطه، حزمة واحدة بين حزم كثيرة في التاريخ نفسه"
      ),
      photo(
        "/generated/project-management/01-site-meeting.jpg",
        "The progress meeting where a lighting package is coordinated against the construction programme",
        "اجتماع المتابعة الذي تُنسَّق فيه حزمة الإضاءة مع برنامج البناء",
        { en: "Illustration", ar: "صورة توضيحية" }
      )
    ],
    projects: ["solitaire-mall", "riyadh-air", "seder-hq"],
  },

  /* ---------------------------------------------------------------- 08 --- */
  "projection-mapping": {
    hero: photo(
      "/generated/projection-mapping/01-mapped-show.jpg",
      "A mapped show holding a faceted stone elevation, the projected geometry following the building's own edges",
      "عرض مُسقَط يغطّي واجهة حجرية متعدّدة الأوجه، وهندسة الإسقاط تتبع حواف المبنى نفسه",
      { en: "Illustration", ar: "صورة توضيحية" }
    ),
    intro: [
      "Projection mapping is the one thing on this list that has a deadline nobody can move. The opening is on the twelfth; the national day is the twenty-third. Everything (the survey, the mesh, the content, the rig, the blend, the rehearsal) is scheduled backwards from a night that will happen whether the show is ready or not.",
      "We survey the facade and build the 3D mesh from the real geometry rather than from the architect's elevation, because a building as built is never quite the building as drawn and the difference is visible from the street. Content is produced or adapted against that mesh, projectors are rigged and edge-blended for the throw distance and the ambient light the site actually has, and there is an ARAK crew on the desk on the night.",
    ],
    arIntro: [
      "الإسقاط الضوئي هو الأمر الوحيد في هذه القائمة الذي له موعد لا يستطيع أحد تأجيله. الافتتاح في الثاني عشر، واليوم الوطني في الثالث والعشرين. وكل شيء (المسح والنموذج والمحتوى والتركيب والمزج والبروفة) يُجدوَل بالعدّ التنازلي من ليلة ستأتي سواء جهز العرض أم لا.",
      "نمسح الواجهة ونبني النموذج ثلاثي الأبعاد من الهندسة الحقيقية لا من واجهة المعماري، لأن المبنى كما نُفِّذ ليس تمامًا المبنى كما رُسم، والفارق يُرى من الشارع. ويُنتَج المحتوى أو يُكيَّف على ذلك النموذج، وتُركَّب أجهزة العرض وتُمزَج حوافّها وفق مسافة الإسقاط والإضاءة المحيطة التي يعيشها الموقع فعلًا، ويكون على لوحة التحكّم ليلة العرض فريق من أراك.",
    ],
    facts: [
      { value: "3D mesh", arValue: "نموذج ثلاثي الأبعاد", label: "Built from a survey of the real facade", arLabel: "يُبنى من مسح الواجهة الحقيقية" },
      { value: "Edge-blended", arValue: "مزج للحواف", label: "Multi-projector arrays", arLabel: "مصفوفات متعدّدة الأجهزة" },
      { value: "On the desk", arValue: "على لوحة التحكّم", label: "A crew, every show night", arLabel: "فريق في كل ليلة عرض" },
    ],
    blocks: [
      {
        title: "Facade survey and mesh build",
        arTitle: "مسح الواجهة وبناء النموذج",
        body: "The surface is measured as built, not as drawn, and modelled to it. Every reveal, setback and out-of-plumb panel that the mesh misses becomes a soft edge or a smear once there is light on it.",
        arBody: "يُقاس السطح كما نُفِّذ لا كما رُسم، ويُنمذَج عليه. فكل تجويف وارتداد ولوح مائل يفوته النموذج يتحوّل إلى حافّة مهتزّة أو تشوّه بمجرّد وقوع الضوء عليه.",
      },
      {
        title: "Content production and mapping",
        arTitle: "إنتاج المحتوى ومطابقته",
        body: "Produced with you or adapted from material you already own, then mapped so the animation moves with the architecture. A line that follows a real edge reads as the building moving; one that does not reads as a video playing on a wall.",
        arBody: "يُنتَج معك أو يُكيَّف من مواد تملكها أصلًا، ثم يُطابَق ليتحرّك التحريك مع العمارة. فالخطّ الذي يتبع حافّة حقيقية يُقرأ كأن المبنى يتحرّك، والذي لا يتبعها يُقرأ كمقطع يُعرض على جدار.",
      },
      {
        title: "Projector rigging and edge blending",
        arTitle: "تركيب أجهزة العرض ومزج الحواف",
        body: "Lumens sized against the surface reflectance and the ambient light that will actually be there, positions chosen for throw and sightlines, and overlaps blended so an array of machines reads as a single image.",
        arBody: "تُحدَّد شدّة الإضاءة مقابل انعكاسية السطح والإضاءة المحيطة التي ستكون موجودة فعلًا، وتُختار المواقع وفق مسافة الإسقاط وخطوط الرؤية، وتُمزَج التداخلات لتُقرأ مجموعة الأجهزة صورةً واحدة.",
      },
      {
        title: "Rehearsal and live operation",
        arTitle: "البروفة والتشغيل المباشر",
        body: "A full rehearsal on site at show light levels, a cue stack that can be held or dropped if the programme runs late, and an operator on the desk rather than a file left playing on a loop.",
        arBody: "بروفة كاملة في الموقع بمستويات إضاءة العرض، وقائمة إشارات يمكن تعليقها أو تجاوزها إذا تأخّر البرنامج، ومشغّل على لوحة التحكّم بدل ملف مُترَك يعمل في حلقة مكرّرة.",
      },
    ],
    galleryHead: {
      eyebrow: "How a show is built",
      arEyebrow: "كيف يُبنى العرض",
      title: "What it looks like",
      arTitle: "كيف يبدو ذلك",
      note: "Illustrations of how a mapped show is built and how it is seen. These are not photographs of delivered work. Click any frame to see it full size.",
      arNote: "صور توضيحية لكيفية بناء العرض المُسقَط وكيف يُرى. وهي ليست صورًا لأعمال منفَّذة. اضغط أي صورة لعرضها بالحجم الكامل.",
    },
    gallery: [
      photo(
        "/generated/projection-mapping/02-projector-rig.jpg",
        "A projector tower rigged and cabled on site, aimed at the elevation it has to cover",
        "برج أجهزة عرض مركَّب ومُمدّد بالكابلات في الموقع، موجَّه إلى الواجهة التي سيغطّيها",
        { en: "Illustration", ar: "صورة توضيحية" }
      ),
      photo(
        "/generated/projection-mapping/04-audience.jpg",
        "The view most of an audience gets, from the plaza in front of the building",
        "المشهد كما يراه معظم الجمهور، من الساحة أمام المبنى",
        { en: "Illustration", ar: "صورة توضيحية" }
      ),
      photo(
        "/generated/projection-mapping/08-green-show.jpg",
        "A single-colour show built on the vertical rhythm of the facade",
        "عرض بلون واحد مبني على الإيقاع الرأسي للواجهة",
        { en: "Illustration", ar: "صورة توضيحية" }
      )
    ],
    projects: ["solitaire-mall", "four-points", "riyadh-air"],
  },

  /* ---------------------------------------------------------------- 09 --- */
  "home-automation": {
    hero: photo(
      "/generated/home-automation/06-villa-overview.png",
      "One home on one system: lighting, climate, hot water, security and the devices around them, all reached from the same place",
      "منزل واحد على نظام واحد: الإضاءة والتكييف والماء الساخن والأمن والأجهزة المحيطة بها، تُدار جميعها من مكان واحد",
      { en: "Illustration", ar: "صورة توضيحية" }
    ),
    intro: [
      "Most homes described as smart are a shelf of apps. The lights are on one, the curtains on another, the air conditioning came with its own remote, and the intercom is a separate box by the door that talks to nothing. Every one of them works. Together they are worse than switches.",
      "We deliver and commission the whole thing on KNX as one system: lighting, curtains and shutters, HVAC, IP intercom, smart locks, CCTV, and the structured WiFi and networking underneath it. One bus, one supervision layer, one set of scenes, and a wall keypad that still works when the internet is down. For hotels the same platform runs Guest Room Management, so housekeeping status, do-not-disturb, room comfort and the energy setback on an empty room all sit in one place.",
    ],
    arIntro: [
      "معظم المنازل التي توصَف بالذكية ليست إلا رفًّا من التطبيقات: الإضاءة على تطبيق، والستائر على آخر، والتكييف جاء بجهاز تحكّم خاص به، والاتصال الداخلي صندوق منفصل عند الباب لا يتحدّث إلى شيء. كلٌّ منها يعمل، ومجتمعةً هي أسوأ من المفاتيح.",
      "نورّد المنظومة كاملة ونشغّلها على KNX كنظام واحد: الإضاءة والستائر والمصاريع والتكييف والاتصال الداخلي عبر IP والأقفال الذكية وكاميرات المراقبة، ومعها شبكات الواي فاي والبنية الشبكية المنظّمة تحتها. ناقل واحد، وطبقة إشراف واحدة، ومجموعة مشاهد واحدة، ولوحة مفاتيح على الجدار تبقى تعمل حين ينقطع الإنترنت. وفي الفنادق تُدير المنصّة نفسها نظام إدارة غرف النزلاء، فتجتمع حالة التدبير المنزلي وطلب عدم الإزعاج وراحة الغرفة وخفض الطاقة في الغرفة الفارغة في مكان واحد.",
    ],
    facts: [
      { value: "KNX", arValue: "KNX", label: "One platform under all of it", arLabel: "منصّة واحدة تحت المنظومة كلّها" },
      { value: "GRMS", arValue: "GRMS", label: "Guest Room Management for hotels", arLabel: "إدارة غرف النزلاء للفنادق" },
      { value: "Lights → locks", arValue: "من الإضاءة إلى الأقفال", label: "On one supervision layer", arLabel: "على طبقة إشراف واحدة" },
    ],
    blocks: [
      {
        title: "Villa and palace automation",
        arTitle: "أتمتة الفلل والقصور",
        body: "Lighting, curtains, shutters, HVAC zones, irrigation and the pool plant on one bus, with scenes on physical keypads as well as screens. The house keeps working if the router does not.",
        arBody: "الإضاءة والستائر والمصاريع ومناطق التكييف والري ومعدّات المسبح على ناقل واحد، ومشاهد على لوحات مفاتيح فعلية إلى جانب الشاشات. ويستمرّ المنزل في العمل وإن توقّف الموجّه.",
      },
      {
        title: "Guest Room Management",
        arTitle: "إدارة غرف النزلاء",
        body: "Welcome scenes, do-not-disturb and make-up-room at the door, occupancy-linked setback that stops the room cooling itself empty, and a front desk that can see service state per room in real time.",
        arBody: "مشاهد ترحيب، وعدم الإزعاج وطلب ترتيب الغرفة عند الباب، وخفض للطاقة مرتبط بالإشغال يوقف تبريد الغرفة وهي فارغة، ومكتب استقبال يرى حالة الخدمة لكل غرفة لحظةً بلحظة.",
      },
      {
        title: "Intercom, locks and cameras",
        arTitle: "الاتصال الداخلي والأقفال والكاميرات",
        body: "IP video intercom answered from the same panel as the lighting, smart locks with per-user access, and CCTV integrated so answering the door and unlocking it are one action rather than two systems.",
        arBody: "اتصال داخلي بالفيديو عبر IP يُجاب من اللوحة نفسها التي تدير الإضاءة، وأقفال ذكية بصلاحيات لكل مستخدم، وكاميرات مراقبة مُكامَلة، فيصبح الردّ على الباب وفتحه إجراءً واحدًا لا نظامين.",
      },
      {
        title: "Structured WiFi and networking",
        arTitle: "شبكات واي فاي وبنية منظّمة",
        body: "Surveyed coverage, cabling, switching and access points designed for the building rather than a router put wherever the fibre landed, because everything above this line depends on the layer below it.",
        arBody: "تغطية مدروسة بمسح، وكابلات ومبدّلات ونقاط وصول مصمَّمة للمبنى، لا موجّهًا يوضع حيث وصل الألياف، لأن كل ما سبق يعتمد على الطبقة التي تحته.",
      },
    ],
    galleryHead: {
      eyebrow: "How it is built",
      arEyebrow: "كيف يُبنى",
      title: "The system behind it",
      arTitle: "النظام خلفه",
      note: "Diagrams of how these systems are put together, with our own installation photography alongside. Click any frame to see it full size.",
      arNote: "رسوم توضيحية لكيفية بناء هذه الأنظمة، ومعها صور من تنفيذنا. اضغط أي صورة لعرضها بالحجم الكامل.",
    },
    gallery: [
      photo(
        "/projects/delfino/04.jpg",
        "Delfino Mayfair, Riyadh: the KNX touch panel, with the restaurant's scenes, curtains, blinds and air on one screen",
        "دلفينو مايفير، الرياض: لوحة اللمس KNX، وعليها مشاهد المطعم والستائر والمظلات والتكييف في شاشة واحدة"
      ),
      photo(
        "/generated/home-automation/01-villa-systems.jpg",
        "One bus, five systems: lighting, curtains, HVAC, security and metering answering to a single panel",
        "ناقل واحد وخمسة أنظمة: الإضاءة والستائر والتكييف والأمن والقياس تخضع للوحة واحدة",
        { en: "Diagram", ar: "رسم توضيحي" }
      ),
      photo(
        "/generated/home-automation/03-guest-room.jpg",
        "A guest room's devices and the controller they report to",
        "أجهزة غرفة النزيل ووحدة التحكّم التي ترتبط بها",
        { en: "Diagram", ar: "رسم توضيحي" }
      ),
      photo(
        "/generated/home-automation/05-one-bus.jpg",
        "Lighting, blinds, HVAC, locks, metering and scenes on one supervision layer",
        "الإضاءة والمظلات والتكييف والأقفال والقياس والمشاهد على طبقة إشراف واحدة",
        { en: "Diagram", ar: "رسم توضيحي" }
      ),
      photo(
        "/generated/home-automation/04-network-layer.jpg",
        "The cabling and coverage layer everything above it depends on",
        "طبقة الكابلات والتغطية التي يعتمد عليها كل ما فوقها",
        { en: "Diagram", ar: "رسم توضيحي" }
      )
    ],
    projects: ["delfino", "four-points", "riyadh-air"],
  },
};

/** The detail content for a service line, or undefined if it has no page. */
export const getServiceDetail = (slug: string): ServiceDetail | undefined =>
  SERVICE_DETAILS[slug];
