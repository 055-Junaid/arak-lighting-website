/**
 * Copy for the About page. Kept out of the component so the page file stays
 * about layout, and so the wording can be edited without touching JSX.
 *
 * Every field carries Arabic alongside the English. Numerals are Western in
 * both languages, matching the stat blocks and the phone numbers the site
 * renders identically either way.
 */

export interface Stat {
  value: string;
  en: string;
  ar: string;
}

/** Headline figures, all of them corroborated elsewhere on the site. */
export const STATS: Stat[] = [
  { value: "1976", en: "Founded in Riyadh", ar: "التأسيس في الرياض" },
  { value: "50+", en: "Years of know-how", ar: "عامًا من الخبرة" },
  { value: "40+", en: "Partner brands", ar: "علامة شريكة" },
  { value: "10", en: "Service lines", ar: "خطوط خدمة" },
];

export interface Chapter {
  no: string;
  en: string;
  ar: string;
  body: string;
  arBody: string;
}

/**
 * The company's arc, told in four chapters rather than dated milestones. Only
 * 1976 is a matter of record, so nothing else here is pinned to a year.
 */
export const CHAPTERS: Chapter[] = [
  {
    no: "01",
    en: "A corporation, and then a light company",
    ar: "مؤسسة، ثم شركة إضاءة",
    body: "ARAK started in 1976 as an extension of the Abdul Rahman Abdul Kader Corporation, supplying light fittings into a Kingdom that was building faster than it could be lit. The trade was simple then. Find the right fitting, get it to site, stand behind it after the invoice is paid.",
    arBody:
      "بدأت أراك عام 1976 امتدادًا لمؤسسة عبدالرحمن عبدالقادر، تورّد وحدات الإضاءة إلى مملكة كانت تبني أسرع مما تستطيع أن تُضيء. كانت التجارة بسيطة حينها: اعثر على الوحدة المناسبة، وأوصلها إلى الموقع، وقِف خلفها بعد سداد الفاتورة.",
  },
  {
    no: "02",
    en: "Certified partner, not a box shifter",
    ar: "شريك معتمد، لا مجرّد وسيط",
    body: "The turning point was partnership. Rather than trading whatever the market happened to import, ARAK built long agreements with the manufacturers whose hardware survives a Saudi summer. That list now runs past forty international houses, from Italian decorative makers to European emergency and control platforms.",
    arBody:
      "كانت الشراكة نقطة التحوّل. فبدل الاتّجار بما يتصادف أن يستورده السوق، أبرمت أراك اتفاقيات طويلة الأمد مع المصانع التي تصمد أجهزتها أمام صيف المملكة. وتتجاوز هذه القائمة اليوم أربعين بيتًا عالميًا، من مصانع الإضاءة الزخرفية الإيطالية إلى منصّات إضاءة الطوارئ والتحكّم الأوروبية.",
  },
  {
    no: "03",
    en: "From fittings to whole systems",
    ar: "من وحدات الإضاءة إلى أنظمة متكاملة",
    body: "Lighting stopped being a box on a wall. KNX and EIB control, guest room management, scene setting and full home automation moved into the scope, and with them came commissioning crews, testing reports and the long tail of support that follows a handover.",
    arBody:
      "لم تعد الإضاءة مجرّد صندوق على جدار. فدخل في نطاق عملنا التحكّم عبر KNX وEIB وإدارة غرف النزلاء وضبط المشاهد والأتمتة المنزلية الكاملة، وجاءت معها فرق التشغيل وتقارير الاختبار وذلك الدعم الطويل الذي يتبع التسليم.",
  },
  {
    no: "04",
    en: "Infrastructure, and what comes after it",
    ar: "البنية التحتية وما بعدها",
    body: "Smart poles carrying lighting, cameras, 5G, sensors, signage and emergency call on a single mast are the newest line of work, delivered with our partner C°LB and aimed at the districts, corniches and cities being built under Vision 2030.",
    arBody:
      "الأعمدة الذكية التي تحمل الإضاءة والكاميرات والجيل الخامس وأجهزة الاستشعار واللوحات ونداء الطوارئ على عمود واحد هي أحدث خطوط عملنا، تُنفَّذ مع شريكنا C°LB وتستهدف الأحياء والكورنيشات والمدن التي تُبنى ضمن رؤية 2030.",
  },
];

export interface Value {
  no: string;
  en: string;
  ar: string;
  body: string;
  arBody: string;
}

export const VALUES: Value[] = [
  {
    no: "01",
    en: "Transparency",
    ar: "الشفافية",
    body: "We work with the best quality providers in the market, and we show our working. Every feature of a product and every step of a service is laid out in front of the client, so nobody discovers the details of their own project on site.",
    arBody:
      "نعمل مع أفضل المورّدين في السوق، ونعرض تفاصيل عملنا. فكل خاصية في المنتج وكل خطوة في الخدمة موضوعة أمام العميل، حتى لا يكتشف أحد تفاصيل مشروعه في الموقع.",
  },
  {
    no: "02",
    en: "Creativity",
    ar: "الإبداع",
    body: "Even the most reliable recipe for greatness needs a dash of creativity and a load of passion. We treat lighting as craftsmanship, which means attention to detail, beauty and efficiency in the same drawing.",
    arBody:
      "حتى أكثر الوصفات ثقةً بالتميّز تحتاج قدرًا من الإبداع وكثيرًا من الشغف. نتعامل مع الإضاءة بوصفها حرفة، أي عنايةً بالتفاصيل وجمالًا وكفاءةً في المخطط ذاته.",
  },
  {
    no: "03",
    en: "Empowerment",
    ar: "التمكين",
    body: "We believe in the limitless potential of our people. Reinforcing 50+ years of hands-on expertise means sending them to seminars, backing their training and letting them own the technical call on their own projects.",
    arBody:
      "نؤمن بأن إمكانات فريقنا بلا حدود. وترسيخ خبرة عملية تتجاوز خمسين عامًا يعني إيفادهم إلى الندوات ودعم تدريبهم وتمكينهم من اتخاذ القرار الفني في مشاريعهم.",
  },
  {
    no: "04",
    en: "Quality",
    ar: "الجودة",
    body: "Nothing but the best products offered worldwide, and nothing but the best pre-sale and post-sale service. That commitment does not stop at the fitting. It runs through every part of the customer experience around it.",
    arBody:
      "لا شيء سوى أفضل المنتجات المتاحة عالميًا، ولا شيء سوى أفضل خدمة قبل البيع وبعده. وهذا الالتزام لا يتوقّف عند وحدة الإضاءة، بل يسري في كل جزء من تجربة العميل المحيطة بها.",
  },
];

export interface Pledge {
  en: string;
  ar: string;
  body: string;
  arBody: string;
}

/** How the company looks after the people who do the work. */
export const PLEDGES: Pledge[] = [
  {
    en: "Trained, not just hired",
    ar: "تدريب لا توظيف فحسب",
    body: "Workshops, assessments and high-level courses, so the person specifying your fitting or commissioning your KNX bus actually knows the product.",
    arBody:
      "ورش عمل وتقييمات ودورات متقدّمة، حتى يكون من يوصّف وحدة إضاءتك أو يشغّل ناقل KNX لديك عارفًا بالمنتج فعلًا.",
  },
  {
    en: "Recognised work",
    ar: "تقدير الجهد",
    body: "Hard work has always been visible here. Effort is acknowledged, and everyone carries a defined role in what the company is trying to achieve.",
    arBody:
      "الاجتهاد هنا ظاهر دائمًا. الجهد يُقدَّر، ولكل فرد دور محدّد فيما تسعى الشركة إلى تحقيقه.",
  },
  {
    en: "A workplace worth staying in",
    ar: "بيئة عمل تستحقّ البقاء فيها",
    body: "Professional and friendly at the same time, which is why the crew that starts a project is usually the crew that hands it over.",
    arBody:
      "مهنية وودّية في آنٍ واحد، ولهذا فإن الفريق الذي يبدأ المشروع هو غالبًا الفريق الذي يسلّمه.",
  },
];
