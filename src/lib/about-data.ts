/**
 * Copy for the About page. Kept out of the component so the page file stays
 * about layout, and so the wording can be edited without touching JSX.
 */

export interface Stat {
  value: string;
  en: string;
  ar: string;
}

/** Headline figures, all of them corroborated elsewhere on the site. */
export const STATS: Stat[] = [
  { value: "1976", en: "Founded in Riyadh", ar: "تأسست في الرياض" },
  { value: "50+", en: "Years of know-how", ar: "سنوات من الخبرة" },
  { value: "41", en: "Partner brands", ar: "علامة شريكة" },
  { value: "10", en: "Service lines", ar: "خطوط خدمة" },
];

export interface Chapter {
  no: string;
  en: string;
  ar: string;
  body: string;
}

/**
 * The company's arc, told in four chapters rather than dated milestones. Only
 * 1976 is a matter of record, so nothing else here is pinned to a year.
 */
export const CHAPTERS: Chapter[] = [
  {
    no: "01",
    en: "A corporation, and then a light company",
    ar: "البداية",
    body: "ARAK started in 1976 as an extension of the Abdul Rahman Abdul Kadir Corporation, supplying light fittings into a Kingdom that was building faster than it could be lit. The trade was simple then. Find the right fitting, get it to site, stand behind it after the invoice is paid.",
  },
  {
    no: "02",
    en: "Certified partner, not a box shifter",
    ar: "الشراكات",
    body: "The turning point was partnership. Rather than trading whatever the market happened to import, ARAK built long agreements with the manufacturers whose hardware survives a Saudi summer. That list now runs past forty international houses, from Italian decorative makers to European emergency and control platforms.",
  },
  {
    no: "03",
    en: "From fittings to whole systems",
    ar: "الأنظمة",
    body: "Lighting stopped being a box on a wall. KNX and EIB control, guest room management, scene setting and full home automation moved into the scope, and with them came commissioning crews, testing reports and the long tail of support that follows a handover.",
  },
  {
    no: "04",
    en: "Infrastructure, and what comes after it",
    ar: "المستقبل",
    body: "Smart poles carrying lighting, cameras, 5G, sensors, signage and emergency call on a single mast are the newest line of work, delivered with our partner C°LB and aimed at the districts, corniches and cities being built under Vision 2030.",
  },
];

export interface Value {
  no: string;
  en: string;
  ar: string;
  body: string;
}

export const VALUES: Value[] = [
  {
    no: "01",
    en: "Transparency",
    ar: "الشفافية",
    body: "We work with the best quality providers in the market, and we show our working. Every feature of a product and every step of a service is laid out in front of the client, so nobody discovers the details of their own project on site.",
  },
  {
    no: "02",
    en: "Creativity",
    ar: "الإبداع",
    body: "Even the most reliable recipe for greatness needs a dash of creativity and a load of passion. We treat lighting as craftsmanship, which means attention to detail, beauty and efficiency in the same drawing.",
  },
  {
    no: "03",
    en: "Empowerment",
    ar: "التمكين",
    body: "We believe in the limitless potential of our people. Reinforcing 50+ years of hands-on expertise means sending them to seminars, backing their training and letting them own the technical call on their own projects.",
  },
  {
    no: "04",
    en: "Quality",
    ar: "الجودة",
    body: "Nothing but the best products offered worldwide, and nothing but the best pre-sale and post-sale service. That commitment does not stop at the fitting. It runs through every part of the customer experience around it.",
  },
];

export interface Pledge {
  en: string;
  ar: string;
  body: string;
}

/** How the company looks after the people who do the work. */
export const PLEDGES: Pledge[] = [
  {
    en: "Trained, not just hired",
    ar: "تدريب مستمر",
    body: "Workshops, assessments and high-level courses, so the person specifying your fitting or commissioning your KNX bus actually knows the product.",
  },
  {
    en: "Recognised work",
    ar: "تقدير الجهد",
    body: "Hard work has always been visible here. Effort is acknowledged, and everyone carries a defined role in what the company is trying to achieve.",
  },
  {
    en: "A workplace worth staying in",
    ar: "بيئة عمل مهنية",
    body: "Professional and friendly at the same time, which is why the crew that starts a project is usually the crew that hands it over.",
  },
];
