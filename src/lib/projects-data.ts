import { PROJECT_GALLERIES, type GalleryImage } from "./project-galleries";

export type ProjectCategory = "fittings" | "controls";

export interface ProjectRow {
  name: string;
  /** Arabic project name. Latin acronyms that have no Arabic form stay Latin. */
  arName: string;
  loc: string;
  arLoc: string;
  scope: string;
  arScope: string;
  category: ProjectCategory;
}

export interface FeaturedProject extends ProjectRow {
  /** URL segment for the project's own page. */
  slug: string;
  /** Two or three sentences shown at the top of the project page. */
  blurb: string;
  arBlurb: string;
  /** Cover shot — the first image of the gallery, absent until photography arrives. */
  image?: string;
  /** Every photograph supplied for the project, cover first. */
  gallery: GalleryImage[];
}

/**
 * Top projects, shown as cards. Order is deliberate — largest / most
 * significant first — and is the order the client signed off on.
 */
const FEATURED: Omit<FeaturedProject, "image" | "gallery">[] = [
  {
    slug: "solitaire-mall",
    name: "Solitaire Mall",
    arName: "سوليتير مول",
    loc: "Riyadh",
    arLoc: "الرياض",
    scope: "Supply of indoor & outdoor light fittings",
    arScope: "توريد وحدات الإضاءة الداخلية والخارجية",
    category: "fittings",
    blurb:
      "A retail destination in Riyadh, delivered with Bin Dayel Contracting. ARAK supplied the indoor and outdoor light fittings across the scheme, from the trading floors and circulation routes through to the facade and external areas.",
    arBlurb:
      "وجهة تجارية في الرياض، نُفِّذت مع شركة بن دايل للمقاولات. وردّت أراك وحدات الإضاءة الداخلية والخارجية في المشروع كاملًا، من صالات العرض ومسارات الحركة وصولًا إلى الواجهة والمناطق الخارجية.",
  },
  {
    slug: "ritz-carlton",
    name: "The Ritz-Carlton",
    arName: "الريتز كارلتون",
    loc: "Riyadh",
    arLoc: "الرياض",
    scope: "Supply of light fittings",
    arScope: "توريد وحدات الإضاءة",
    category: "fittings",
    blurb:
      "One of Riyadh's landmark hospitality addresses. ARAK supplied the light fittings for the hotel's public areas: the grand hall, the double staircase atrium and the ornamented ceilings that carry the marble, gilt and plasterwork detail throughout.",
    arBlurb:
      "أحد أبرز عناوين الضيافة في الرياض. وردّت أراك وحدات الإضاءة للمناطق العامة في الفندق: القاعة الكبرى، وبهو الدرج المزدوج، والأسقف المزخرفة التي تحمل تفاصيل الرخام والتذهيب وأعمال الجبس في أرجاء المبنى.",
  },
  {
    slug: "four-points",
    name: "Four Points by Sheraton",
    arName: "فور بوينتس باي شيراتون",
    loc: "Riyadh",
    arLoc: "الرياض",
    scope: "Supply & commissioning of KNX lighting control systems",
    arScope: "توريد وتشغيل أنظمة التحكّم بالإضاءة KNX",
    category: "controls",
    blurb:
      "A city hotel delivered with Saudi Icon. ARAK supplied and commissioned the KNX lighting control system, bringing the building's lighting circuits onto a single addressable platform for scene setting, scheduling and energy management.",
    arBlurb:
      "فندق مدينيّ نُفِّذ مع السعودية أيقون. وردّت أراك نظام التحكّم بالإضاءة KNX وشغّلته، فجمعت دوائر إضاءة المبنى على منصّة واحدة قابلة للعنونة لضبط المشاهد والجدولة وإدارة الطاقة.",
  },
  {
    slug: "riyadh-air",
    name: "Riyadh Air Head Office",
    arName: "المقر الرئيسي لطيران الرياض",
    loc: "Riyadh",
    arLoc: "الرياض",
    scope: "Supply, testing & commissioning of lighting control system",
    arScope: "توريد واختبار وتشغيل نظام التحكّم بالإضاءة",
    category: "controls",
    blurb:
      "The head office of the Kingdom's new national carrier. ARAK supplied, tested and commissioned the lighting control system for the building, a glass and stone campus on the northern edge of Riyadh.",
    arBlurb:
      "المقر الرئيسي لناقل المملكة الوطني الجديد. وردّت أراك نظام التحكّم بالإضاءة للمبنى واختبرته وشغّلته، وهو مجمّع من الزجاج والحجر على الطرف الشمالي من الرياض.",
  },
  {
    slug: "ladun-center",
    name: "LADUN Center",
    arName: "مركز لادن",
    loc: "Riyadh",
    arLoc: "الرياض",
    scope: "Supply of light fittings",
    arScope: "توريد وحدات الإضاءة",
    category: "fittings",
    blurb:
      "A commercial centre delivered with DAYMAT. The fittings package runs on the architecture: continuous linear runs set into the black baffle ceilings, picked up again as illuminated frames on the feature walls and lobby.",
    arBlurb:
      "مركز تجاري نُفِّذ مع دايمات. وتسير حزمة وحدات الإضاءة على خطى العمارة: خطوط ضوئية متّصلة مدمجة في الأسقف السوداء المضلّعة، تعود لتظهر إطاراتٍ مضيئة على الجدران المميّزة وفي البهو.",
  },
  {
    slug: "milling-mc2",
    name: "Milling Company MC-2",
    arName: "شركة المطاحن الثانية MC-2",
    loc: "Riyadh",
    arLoc: "الرياض",
    scope: "Supply & commissioning of KNX lighting control systems",
    arScope: "توريد وتشغيل أنظمة التحكّم بالإضاءة KNX",
    category: "controls",
    blurb:
      "One of the Kingdom's four grain milling companies, delivered with Energy Wave Contracting. ARAK supplied and commissioned the KNX lighting control system, including the lighting control panels that switch and dim the plant and office circuits.",
    arBlurb:
      "إحدى شركات المطاحن الأربع في المملكة، نُفِّذت مع مؤسسة موجة الطاقة للمقاولات. وردّت أراك نظام التحكّم بالإضاءة KNX وشغّلته، بما في ذلك لوحات التحكّم التي تُشغّل وتُخفت دوائر المصنع والمكاتب.",
  },
  {
    slug: "seder-hq",
    name: "Seder Head Quarter Building",
    arName: "مبنى المقر الرئيسي لسدر",
    loc: "Riyadh",
    arLoc: "الرياض",
    scope: "Supply of indoor & outdoor light fittings",
    arScope: "توريد وحدات الإضاءة الداخلية والخارجية",
    category: "fittings",
    blurb:
      "The headquarters building for Seder Construction. ARAK supplied both the indoor and outdoor fittings: the facade and landscape lighting that reads at night, and the downlighting through the lobby, lift cores and open-plan floors.",
    arBlurb:
      "مبنى المقر الرئيسي لشركة سدر للإنشاءات. وردّت أراك وحدات الإضاءة الداخلية والخارجية معًا: إضاءة الواجهة والمسطحات التي تظهر ليلًا، والإضاءة السفلية في البهو وأنوية المصاعد والأدوار المفتوحة.",
  },
  {
    slug: "athletic-showroom",
    name: "Athletic Showroom",
    arName: "معرض أثلتيك",
    loc: "Riyadh",
    arLoc: "الرياض",
    scope: "Supply of indoor & track light fittings",
    arScope: "توريد وحدات الإضاءة الداخلية ووحدات المسارات",
    category: "fittings",
    blurb:
      "A sportswear retail fit-out in Riyadh. The package combines track-mounted spots on exposed black services with linear runs and shelf-integrated strips, lighting the merchandise walls and display tables at retail levels.",
    arBlurb:
      "تجهيز معرض للملابس الرياضية في الرياض. تجمع الحزمة بين كشّافات مثبّتة على مسارات فوق خدمات سوداء مكشوفة، وخطوط ضوئية وشرائط مدمجة في الرفوف، تُضيء جدران العرض وطاولات المنتجات بمستويات مناسبة للبيع بالتجزئة.",
  },
  {
    slug: "delfino",
    name: "Delfino Mayfair Restaurant",
    arName: "مطعم دلفينو مايفير",
    loc: "Riyadh",
    arLoc: "الرياض",
    scope: "Supply of EIB / KNX lighting control system",
    arScope: "توريد نظام التحكّم بالإضاءة EIB / KNX",
    category: "controls",
    blurb:
      "The Riyadh outpost of the Mayfair restaurant, delivered with Saudi Icon. ARAK supplied the EIB / KNX lighting control system, giving the dining room scene control across the planted ceiling, the table lighting and the facade.",
    arBlurb:
      "فرع مطعم مايفير في الرياض، نُفِّذ مع السعودية أيقون. وردّت أراك نظام التحكّم بالإضاءة EIB / KNX، فمنح صالة الطعام تحكّمًا بالمشاهد يشمل السقف المزروع وإضاءة الطاولات والواجهة.",
  },
];

/**
 * Top projects, shown as cards. Order is deliberate — largest / most
 * significant first — and is the order the client signed off on. Each entry
 * picks up its photography from PROJECT_GALLERIES by slug.
 */
export const FEATURED_PROJECTS: FeaturedProject[] = FEATURED.map((project) => {
  const gallery = PROJECT_GALLERIES[project.slug] ?? [];
  return { ...project, gallery, image: gallery[0]?.src };
});

export const getFeaturedProject = (slug: string) =>
  FEATURED_PROJECTS.find((project) => project.slug === slug);

/** Remaining references, ordered largest to smallest. */
const RAW: [string, string, string, string, string, string, "f" | "c"][] = [
  ["King Fahad International Airport", "مطار الملك فهد الدولي", "Dammam", "الدمام", "Supply & installation of light fittings", "توريد وتركيب وحدات الإضاءة", "f"],
  ["National Guard Housing Project", "مشروع إسكان الحرس الوطني", "Riyadh", "الرياض", "Supply of light fittings to 5,300 soldier villas", "توريد وحدات الإضاءة لـ5,300 فيلا للجنود", "f"],
  ["Tilal Al Riyadh Mall", "مول تلال الرياض", "Riyadh", "الرياض", "Supply of light fittings", "توريد وحدات الإضاءة", "f"],
  ["Al Nafl Tower", "برج النفل", "Riyadh", "الرياض", "Design & supply of light fittings", "تصميم وتوريد وحدات الإضاءة", "f"],
  ["King Faisal Air Academy", "كلية الملك فيصل الجوية", "Majma’a, Riyadh", "المجمعة، الرياض", "Supply of indoor & outdoor light fittings", "توريد وحدات الإضاءة الداخلية والخارجية", "f"],
  ["King Faisal Hospital", "مستشفى الملك فيصل", "Riyadh", "الرياض", "Supply of outdoor light fittings", "توريد وحدات الإضاءة الخارجية", "f"],
  ["Naba Hospital", "مستشفى نبع", "Riyadh", "الرياض", "Supply, testing & commissioning of lighting control system", "توريد واختبار وتشغيل نظام التحكّم بالإضاءة", "c"],
  ["Ansar Hospital", "مستشفى الأنصار", "Madina", "المدينة المنورة", "Supply of light fittings", "توريد وحدات الإضاءة", "f"],
  ["Batha Access, Saudi Customs Offices Project", "منفذ البطحاء، مشروع مكاتب الجمارك السعودية", "KSA access with UAE", "منفذ البطحاء مع الإمارات", "Supply of light fittings", "توريد وحدات الإضاءة", "f"],
  ["Yamama University Al Khobar, General Auditing Bureau", "جامعة اليمامة بالخبر، الديوان العام للمحاسبة", "Al Khobar", "الخبر", "Supply of indoor light fittings", "توريد وحدات الإضاءة الداخلية", "f"],
  ["Yamama Cement Factory", "مصنع أسمنت اليمامة", "Riyadh", "الرياض", "Supply of light fittings", "توريد وحدات الإضاءة", "f"],
  ["WTCO", "WTCO", "Riyadh", "الرياض", "Supply, testing & commissioning of lighting control system", "توريد واختبار وتشغيل نظام التحكّم بالإضاءة", "c"],
  ["JAQCD Dirriyah", "JAQCD الدرعية", "Riyadh", "الرياض", "Supply, installation & configuration of solar cameras", "توريد وتركيب وضبط كاميرات تعمل بالطاقة الشمسية", "c"],
  ["Dirriyah Farm Golf Club House", "نادي الغولف بمزرعة الدرعية", "Riyadh", "الرياض", "Supply of indoor & outdoor light fittings", "توريد وحدات الإضاءة الداخلية والخارجية", "f"],
  ["Burn Treatment Center", "مركز علاج الحروق", "Al Ahsa", "الأحساء", "Supply of indoor light fittings", "توريد وحدات الإضاءة الداخلية", "f"],
  ["Labor Camp of King Faisal Air Academy Project", "مخيّم العمال بمشروع كلية الملك فيصل الجوية", "Majma’a, Riyadh", "المجمعة، الرياض", "Supply of light fittings", "توريد وحدات الإضاءة", "f"],
  ["Education Administration Building Project", "مشروع مبنى إدارة التعليم", "Riyadh", "الرياض", "Supply of light fittings", "توريد وحدات الإضاءة", "f"],
  ["Al Waha Private School", "مدرسة الواحة الأهلية", "Riyadh", "الرياض", "Supply of light fittings", "توريد وحدات الإضاءة", "f"],
  ["Schools Hall Stages", "مسارح قاعات المدارس", "Riyadh", "الرياض", "Supply of light fittings", "توريد وحدات الإضاءة", "f"],
  ["Dr. Sulayman Al Habib Private Palace", "قصر د. سليمان الحبيب الخاص", "Riyadh", "الرياض", "Supply & commissioning of EIB / KNX lighting control & home automation system", "توريد وتشغيل نظام التحكّم بالإضاءة والأتمتة المنزلية EIB / KNX", "c"],
  ["Dr. Hawaf Private Palace", "قصر د. هواف الخاص", "Riyadh", "الرياض", "Supply & commissioning of EIB / KNX lighting control & home automation system", "توريد وتشغيل نظام التحكّم بالإضاءة والأتمتة المنزلية EIB / KNX", "c"],
  ["Rahmania Villas", "فلل الرحمانية", "Riyadh", "الرياض", "Supply & commissioning of KNX lighting control, IP intercom, smart locks, WiFi & network system", "توريد وتشغيل نظام التحكّم بالإضاءة KNX والاتصال الداخلي عبر IP والأقفال الذكية والواي فاي والشبكة", "c"],
  ["Al Jomaih Private Offices", "مكاتب الجميح الخاصة", "Riyadh", "الرياض", "Supply of light fittings", "توريد وحدات الإضاءة", "f"],
  ["Pagani Showroom", "معرض باغاني", "Riyadh", "الرياض", "Supply, testing & commissioning of lighting control system", "توريد واختبار وتشغيل نظام التحكّم بالإضاءة", "c"],
  ["Demos Office", "مكتب ديموس", "Riyadh", "الرياض", "Supply of decorative pendant lights", "توريد وحدات إضاءة معلّقة زخرفية", "f"],
  ["Samarkandi Villa Project", "مشروع فيلا السمرقندي", "Riyadh", "الرياض", "Supply of light fittings", "توريد وحدات الإضاءة", "f"],
  ["Al Subaie Private Villa", "فيلا السبيعي الخاصة", "Riyadh", "الرياض", "Supply of light fittings", "توريد وحدات الإضاءة", "f"],
  ["Fahad Al Suhaim Private Villa", "فيلا فهد السحيم الخاصة", "Riyadh", "الرياض", "Supply & commissioning of KNX lighting control, IP intercom, smart locks, WiFi & network system", "توريد وتشغيل نظام التحكّم بالإضاءة KNX والاتصال الداخلي عبر IP والأقفال الذكية والواي فاي والشبكة", "c"],
  ["Turki Al Suhaim Private Villa", "فيلا تركي السحيم الخاصة", "Riyadh", "الرياض", "Supply & commissioning of KNX lighting control, IP intercom, smart locks, WiFi & network system", "توريد وتشغيل نظام التحكّم بالإضاءة KNX والاتصال الداخلي عبر IP والأقفال الذكية والواي فاي والشبكة", "c"],
  ["Dr. Abdullah Bin Abdel Mohsen Private Villa", "فيلا د. عبدالله بن عبدالمحسن الخاصة", "Riyadh", "الرياض", "Supply of indoor & outdoor light fittings", "توريد وحدات الإضاءة الداخلية والخارجية", "f"],
  ["TBC Project", "مشروع TBC", "Hafr Al Batin", "حفر الباطن", "Supply of light fittings", "توريد وحدات الإضاءة", "f"],
];

export const PROJECT_ROWS: ProjectRow[] = RAW.map(
  ([name, arName, loc, arLoc, scope, arScope, cat]) => ({
    name,
    arName,
    loc,
    arLoc,
    scope,
    arScope,
    category: cat === "f" ? "fittings" : "controls",
  })
);
