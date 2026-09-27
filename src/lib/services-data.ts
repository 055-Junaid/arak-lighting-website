export interface Service {
  no: string;
  slug: string;
  /** Faint backdrop for the spotlight panel. Taken from the delivered project that best shows the service. */
  photo: string;
  en: string;
  ar: string;
  /**
   * What the search result and the page heading say, where that has to differ
   * from the short name. `en`/`ar` label the service everywhere it is listed
   * (menus, cards, breadcrumbs, the pager), and "Lighting Design" is right
   * there. It is wrong as a search title: it names neither the city nor the
   * word people search with, so Google answered "lighting consultant riyadh"
   * with the homepage, whose title does say Riyadh.
   */
  seoTitle?: string;
  arSeoTitle?: string;
  heading?: string;
  arHeading?: string;
  lead: string;
  arLead: string;
  body: string;
  arBody: string;
  includes: string[];
  arIncludes: string[];
  href?: string;
}

/**
 * The nine service lines published in the ARAK company profile, plus Smart Poles,
 * which is presented separately on the page because it links to its own detail page.
 *
 * Arabic runs alongside every field rather than only the headings. Product and
 * standards names — KNX, EIB, DALI, LED, IP65, RGBW, C°LB — stay in Latin in
 * both languages, which is how they are written in Saudi tender documents and
 * how the smart-poles copy already treats them. Numerals are Western
 * throughout, matching the stat blocks and phone numbers the page renders
 * identically in both languages.
 */
export const SERVICES: Service[] = [
  {
    no: "01",
    slug: "indoor-lighting",
    photo: "/projects/ritz-carlton/01.jpg",
    en: "Indoor Lighting",
    ar: "الإضاءة الداخلية",
    lead: "Decorative and architectural fittings for the rooms people actually live and work in.",
    arLead: "وحدات إضاءة زخرفية ومعمارية للمساحات التي يعيش فيها الناس ويعملون.",
    body: "Villas, palaces, hotels, offices, retail and public interiors, specified from the European partner houses we have carried for decades. Fast-moving ranges are held in Riyadh so a delayed shipment never becomes a delayed handover, and every fitting is matched to the room it has to serve rather than pulled off a generic schedule.",
    arBody:
      "فلل وقصور وفنادق ومكاتب ومساحات تجارية وعامة، تُوصَّف من بيوت التصميم الأوروبية التي نمثّلها منذ عقود. نحتفظ بالأصناف سريعة الحركة في مستودعنا بالرياض حتى لا تتحوّل شحنة متأخّرة إلى تسليم متأخّر، ونختار كل وحدة إضاءة بما يناسب الغرفة التي ستخدمها، لا نقلًا عن جدول جاهز.",
    includes: [
      "Decorative and architectural fittings",
      "Track, linear and recessed systems",
      "Hospitality, retail and workplace schemes",
      "Sample boards and on-site mock-ups",
    ],
    arIncludes: [
      "وحدات إضاءة زخرفية ومعمارية",
      "أنظمة المسارات والخطية والمدفونة",
      "حلول للضيافة والتجزئة وبيئات العمل",
      "لوحات عيّنات ونماذج تجريبية في الموقع",
    ],
  },
  {
    no: "02",
    slug: "lighting-design",
    photo: "/projects/solitaire-mall/07.jpg",
    en: "Lighting Design",
    ar: "تصميم الإضاءة",
    seoTitle: "Lighting Design Consultant in Riyadh",
    arSeoTitle: "استشارات تصميم الإضاءة في الرياض",
    heading: "Lighting design consultancy, Riyadh",
    arHeading: "استشارات تصميم الإضاءة في الرياض",
    lead: "Drawings you can build from and numbers you can defend in a design review.",
    arLead: "مخططات تصلح للتنفيذ وأرقام تصمد في اجتماع مراجعة التصميم.",
    body: "Concept studies, photometric calculations, lux-level verification and complete fixture schedules, produced alongside architects, lighting consultants and electrical engineers. We work in the consultant's format and to the project's own specification, so submittals clear review instead of bouncing back.",
    arBody:
      "دراسات مفاهيمية وحسابات ضوئية والتحقّق من مستويات الإضاءة وجداول وحدات إضاءة كاملة، تُعدّ بالتعاون مع المعماريين واستشاريي الإضاءة ومهندسي الكهرباء. نعمل بالصيغة التي يعتمدها الاستشاري ووفق مواصفات المشروع نفسه، فتجتاز الاعتمادات المراجعة بدل أن تُعاد.",
    includes: [
      "Concept and mood studies",
      "Photometric calculations and lux verification",
      "Fixture schedules and submittal packs",
      "Value engineering alternatives",
    ],
    arIncludes: [
      "دراسات المفهوم والأجواء",
      "حسابات ضوئية والتحقّق من شدّة الإضاءة",
      "جداول وحدات الإضاءة وملفّات الاعتماد",
      "بدائل الهندسة القيمية",
    ],
  },
  {
    no: "03",
    slug: "facade-lighting",
    photo: "/projects/solitaire-mall/03.jpg",
    en: "Facade Lighting",
    ar: "إضاءة الواجهات",
    lead: "A building's night identity, engineered to survive a Saudi summer.",
    arLead: "هويّة المبنى الليلية، مصمَّمة لتتحمّل صيف المملكة.",
    body: "Exterior and architectural schemes using IP-rated, heat-tolerant hardware selected for Gulf conditions. Linear grazing, wall washing, media facades and full RGBW colour control, detailed with the glare and light-spill limits that municipal and developer reviews now ask for.",
    arBody:
      "حلول خارجية ومعمارية بأجهزة مصنّفة IP وقادرة على تحمّل الحرارة، مختارة لظروف الخليج. إضاءة خطّية مائلة وغسيل للجدران وواجهات إعلامية وتحكّم كامل بالألوان RGBW، مع تفصيل حدود الوهج وتسرّب الضوء التي باتت البلديات والمطوّرون يطلبونها في المراجعة.",
    includes: [
      "Linear grazing and wall washing",
      "Media facades and RGBW colour control",
      "IP65 and IP66 rated hardware",
      "Glare and light-spill control",
    ],
    arIncludes: [
      "الإضاءة الخطّية المائلة وغسيل الجدران",
      "الواجهات الإعلامية والتحكّم بالألوان RGBW",
      "أجهزة بتصنيف IP65 وIP66",
      "التحكّم بالوهج وتسرّب الضوء",
    ],
  },
  {
    no: "04",
    slug: "outdoor-lighting",
    photo: "/projects/solitaire-mall/12.jpg",
    en: "Outdoor Lighting",
    ar: "الإضاءة الخارجية",
    lead: "Everything from a garden bollard to a high-mast on a national road.",
    arLead: "من عمود حديقة قصير إلى صارٍ عالٍ على طريق وطني.",
    body: "Roads, landscapes, compounds, car parks, walkways and sports areas. Poles, floodlights, bollards, in-ground and step fittings, sized around the pole spacing, mounting heights and uniformity targets the site allows rather than around a catalogue page.",
    arBody:
      "طرق ومسطحات خضراء ومجمّعات ومواقف وممرات ومناطق رياضية. أعمدة وكشّافات وأعمدة قصيرة ووحدات مدفونة ووحدات درج، تُحدَّد مقاساتها وفق تباعد الأعمدة وارتفاعات التركيب ومستهدفات الانتظام التي يسمح بها الموقع، لا وفق صفحة في كتالوج.",
    includes: [
      "Roads, car parks and compounds",
      "Landscape and pathway lighting",
      "Sports and flood lighting",
      "Bollards, in-ground and high-mast",
    ],
    arIncludes: [
      "الطرق والمواقف والمجمّعات",
      "إضاءة المسطحات والممرات",
      "الإضاءة الرياضية والكشّافات",
      "الأعمدة القصيرة والوحدات المدفونة والصواري العالية",
    ],
  },
  {
    no: "05",
    slug: "lighting-controls",
    photo: "/projects/milling-mc2/03.jpg",
    en: "Lighting Controls",
    ar: "أنظمة التحكم بالإضاءة",
    lead: "Every circuit, indoors and out, on one open standard.",
    arLead: "كل دائرة كهربائية، داخل المبنى وخارجه، على معيار مفتوح واحد.",
    body: "KNX and EIB control of lighting across the whole building envelope. Scenes, occupancy and daylight sensing, DALI dimming, astronomical time clocks and energy monitoring, built on a worldwide open standard so the client is never locked into a single vendor for the life of the building.",
    arBody:
      "تحكّم بالإضاءة عبر غلاف المبنى بالكامل باستخدام KNX وEIB. مشاهد إضاءة واستشعار للإشغال وضوء النهار وخفت DALI وساعات فلكية ومراقبة للطاقة، مبنيّة على معيار عالمي مفتوح، فلا يبقى العميل مرتبطًا بمورّد واحد طوال عمر المبنى.",
    includes: [
      "KNX and EIB scene and circuit control",
      "Occupancy and daylight sensing",
      "DALI dimming and tunable white",
      "Energy monitoring and reporting",
    ],
    arIncludes: [
      "التحكّم بالمشاهد والدوائر عبر KNX وEIB",
      "استشعار الإشغال وضوء النهار",
      "خفت DALI والأبيض القابل للضبط",
      "مراقبة الطاقة وإعداد التقارير",
    ],
  },
  {
    no: "06",
    slug: "lighting-installation",
    photo: "/projects/athletic-showroom/03.jpg",
    en: "Lighting Installation",
    ar: "تركيب الإضاءة",
    lead: "Our own technical crews on site, not a subcontractor we have never met.",
    arLead: "فرقنا الفنية على الموقع، لا مقاول باطن لم نلتقِ به يومًا.",
    body: "Installation, aiming, configuration, commissioning and handover carried out by ARAK teams. We focus and program on site with the client present, then hand over as-built documentation and train the people who will run the system every day after we leave.",
    arBody:
      "التركيب والتوجيه والضبط والتشغيل والتسليم، تنفّذها فرق أراك. نضبط زوايا الإضاءة ونبرمج النظام في الموقع بحضور العميل، ثم نسلّم مخططات ما تمّ تنفيذه ونُدرّب من سيشغّل النظام يوميًا بعد مغادرتنا.",
    includes: [
      "Site installation and fixture aiming",
      "System programming and commissioning",
      "As-built documentation",
      "Operator training and handover",
    ],
    arIncludes: [
      "التركيب في الموقع وتوجيه الوحدات",
      "برمجة النظام وتشغيله",
      "توثيق مخططات ما تمّ تنفيذه",
      "تدريب المشغّلين والتسليم",
    ],
  },
  {
    no: "07",
    slug: "project-management",
    photo: "/projects/solitaire-mall/02.jpg",
    en: "Project Management",
    ar: "إدارة المشاريع",
    lead: "One point of contact who owns the schedule from purchase order to snag list.",
    arLead: "جهة اتصال واحدة تتولّى الجدول الزمني من أمر الشراء حتى قائمة الملاحظات.",
    body: "Submittals, procurement, logistics and site coordination across multi-phase and multi-city programmes. We phase deliveries to the construction sequence so fittings arrive when the ceiling is ready, not six months early into a store that is already full.",
    arBody:
      "الاعتمادات والمشتريات والخدمات اللوجستية والتنسيق في الموقع، عبر برامج متعدّدة المراحل والمدن. نوزّع التسليمات على مراحل تتبع تسلسل أعمال البناء، فتصل وحدات الإضاءة حين يصبح السقف جاهزًا، لا قبل ستة أشهر إلى مستودع ممتلئ أصلًا.",
    includes: [
      "Submittals and approvals",
      "Procurement, shipping and customs",
      "Delivery phased to the site programme",
      "Snagging and project close-out",
    ],
    arIncludes: [
      "الاعتمادات والموافقات",
      "الشراء والشحن والتخليص الجمركي",
      "تسليم على مراحل وفق برنامج الموقع",
      "معالجة الملاحظات وإقفال المشروع",
    ],
  },
  {
    no: "08",
    slug: "projection-mapping",
    photo: "/projects/solitaire-mall/13.jpg",
    en: "3D Projection Mapping",
    ar: "الإسقاط الضوئي ثلاثي الأبعاد",
    lead: "Content mapped to real geometry, for the nights that have to be remembered.",
    arLead: "محتوى مُسقَط على هندسة حقيقية، لليالي التي يجب أن تبقى في الذاكرة.",
    body: "Projected shows for openings, national days, seasonal programmes and cultural events. We survey the facade, build the 3D mesh, produce or adapt the content, rig and blend the projectors, and run the show on the night with a crew on the desk.",
    arBody:
      "عروض ضوئية للافتتاحات والأعياد الوطنية والبرامج الموسمية والفعاليات الثقافية. نمسح الواجهة ونبني النموذج ثلاثي الأبعاد ونُنتج المحتوى أو نكيّفه، ثم نركّب أجهزة العرض ونمزج صورها، ونُدير العرض ليلة التنفيذ بفريق على لوحة التحكّم.",
    includes: [
      "Facade survey and 3D mesh build",
      "Content production and mapping",
      "Projector rigging and edge blending",
      "Live show operation",
    ],
    arIncludes: [
      "مسح الواجهة وبناء النموذج ثلاثي الأبعاد",
      "إنتاج المحتوى ومطابقته على الواجهة",
      "تركيب أجهزة العرض ومزج الحواف",
      "تشغيل العرض مباشرةً",
    ],
  },
  {
    no: "09",
    slug: "home-automation",
    photo: "/projects/four-points/01.jpg",
    en: "Home Automation Systems",
    ar: "أنظمة الأتمتة المنزلية",
    lead: "One commissioned system, not a shelf of apps that do not talk to each other.",
    arLead: "نظام واحد مُشغَّل بالكامل، لا مجموعة تطبيقات لا يتحدّث بعضها إلى بعض.",
    body: "Lighting, curtains, HVAC, IP intercom, smart locks, WiFi and network systems delivered and commissioned together on KNX. For hotels the same platform runs Guest Room Management, so housekeeping status, room comfort and energy savings all sit on one supervision layer.",
    arBody:
      "الإضاءة والستائر والتكييف والاتصال الداخلي عبر IP والأقفال الذكية وأنظمة الواي فاي والشبكات، تُورَّد وتُشغَّل معًا على منصّة KNX. وفي الفنادق تُدير المنصّة نفسها نظام إدارة غرف النزلاء، فتجتمع حالة التدبير المنزلي وراحة الغرفة وتوفير الطاقة في طبقة إشراف واحدة.",
    includes: [
      "KNX villa and palace automation",
      "Guest Room Management for hotels",
      "IP intercom, smart locks and CCTV",
      "Structured WiFi and networking",
    ],
    arIncludes: [
      "أتمتة الفلل والقصور عبر KNX",
      "إدارة غرف النزلاء للفنادق",
      "الاتصال الداخلي عبر IP والأقفال الذكية والمراقبة",
      "شبكات واي فاي وبنية شبكية منظّمة",
    ],
  },
];

export const SMART_POLES = {
  no: "10",
  slug: "smart-poles",
  en: "Smart Poles",
  ar: "الأعمدة الذكية",
  href: "/services/smart-poles",
  lead: "One pole carrying the light, the network and the city's eyes and ears.",
  arLead: "عمود واحد يحمل الضوء والشبكة وعيون المدينة وآذانها.",
  body: "Street lighting is the only infrastructure that already stands every fifty metres, already has power, and already looks up at the street. The smart pole turns that into a platform: LED lighting, 5G micro base stations, HD surveillance, environmental sensors, public broadcast, digital signage and emergency call, on a single foundation. ARAK supplies, installs, integrates and maintains the full C°LB Smart Light Pole Series across the Kingdom.",
  arBody:
    "إنارة الشوارع هي البنية التحتية الوحيدة القائمة أصلًا كل خمسين مترًا، ولها تغذية كهربائية جاهزة، وتطلّ مباشرةً على الشارع. والعمود الذكي يحوّل ذلك إلى منصّة: إضاءة LED ومحطات الجيل الخامس المصغّرة ومراقبة عالية الدقّة وأجهزة استشعار بيئية وبثّ عام ولوحات رقمية ونداء طوارئ، على قاعدة واحدة. وتتولّى أراك توريد سلسلة أعمدة الإضاءة الذكية C°LB بالكامل وتركيبها وتكاملها وصيانتها في مختلف أنحاء المملكة.",
  includes: [
    "Twenty pole designs, ornamental to smart-city",
    "5G, WiFi and multi-service gateway",
    "CCTV, sensors and emergency call",
    "Centralised control and LED signage",
  ],
  arIncludes: [
    "عشرون تصميمًا، من الزخرفي إلى أعمدة المدن الذكية",
    "الجيل الخامس والواي فاي وبوابة متعدّدة الخدمات",
    "كاميرات المراقبة وأجهزة الاستشعار ونداء الطوارئ",
    "تحكّم مركزي ولوحات LED",
  ],
};

export const PROCESS = [
  {
    no: "01",
    en: "Brief and site review",
    ar: "الدراسة الأولية",
    body: "Send drawings, a fixture schedule, or just the intent. We walk the site or the model and agree what the lighting actually has to achieve.",
    arBody:
      "أرسل المخططات أو جدول وحدات الإضاءة أو حتى الفكرة وحدها. نزور الموقع أو نراجع النموذج، ثم نتّفق على ما يجب أن تحقّقه الإضاءة فعلًا.",
  },
  {
    no: "02",
    en: "Design and calculation",
    ar: "التصميم والحسابات",
    body: "Concept studies, photometric calculations and a fixture schedule prepared to clear consultant and client review the first time.",
    arBody:
      "دراسات مفاهيمية وحسابات ضوئية وجدول وحدات إضاءة، تُعدّ لتجتاز مراجعة الاستشاري والعميل من المرّة الأولى.",
  },
  {
    no: "03",
    en: "Supply",
    ar: "التوريد",
    body: "Procurement from our partner manufacturers, shipping, customs clearance and delivery phased to the construction programme.",
    arBody:
      "الشراء من مصانعنا الشريكة، والشحن والتخليص الجمركي والتسليم على مراحل وفق برنامج البناء.",
  },
  {
    no: "04",
    en: "Install and commission",
    ar: "التركيب والتشغيل",
    body: "ARAK crews install, aim, program and commission on site, then hand over as-built documentation and train the operators.",
    arBody:
      "تتولّى فرق أراك التركيب والتوجيه والبرمجة والتشغيل في الموقع، ثم تسليم مخططات ما تمّ تنفيذه وتدريب المشغّلين.",
  },
  {
    no: "05",
    en: "After-sale support",
    ar: "الدعم بعد البيع",
    body: "Spares, re-lamping, system changes and warranty support once the project has closed and the building is in daily use.",
    arBody:
      "قطع الغيار واستبدال الوحدات وتعديلات النظام ودعم الضمان، بعد إقفال المشروع ودخول المبنى الاستخدام اليومي.",
  },
];

/** Client types ARAK is set up to work with, as listed in the company profile. */
export const SECTORS = [
  { en: "Government Entities", ar: "الجهات الحكومية" },
  { en: "Semi Government Entities", ar: "الجهات شبه الحكومية" },
  { en: "Airports and Hotels", ar: "المطارات والفنادق" },
  { en: "Facilities Management Companies", ar: "شركات إدارة المرافق" },
  { en: "Residential Contractors", ar: "مقاولو المشاريع السكنية" },
  { en: "Commercial Contractors", ar: "مقاولو المشاريع التجارية" },
  { en: "Industrial Contractors", ar: "مقاولو المشاريع الصناعية" },
  { en: "Architectural and Lighting Consultants", ar: "الاستشاريون المعماريون واستشاريو الإضاءة" },
  { en: "Electrical Consultants", ar: "الاستشاريون الكهربائيون" },
  { en: "Real Estate Developers", ar: "المطوّرون العقاريون" },
  { en: "Oil and Gas Industry", ar: "قطاع النفط والغاز" },
  { en: "Energy Service Companies", ar: "شركات خدمات الطاقة" },
];
