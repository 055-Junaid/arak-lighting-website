export interface Service {
  no: string;
  slug: string;
  /** Faint backdrop for the spotlight panel. Taken from the delivered project that best shows the service. */
  photo: string;
  en: string;
  ar: string;
  lead: string;
  body: string;
  includes: string[];
  href?: string;
}

/**
 * The nine service lines published in the ARAK company profile, plus Smart Poles,
 * which is presented separately on the page because it links to its own detail page.
 */
export const SERVICES: Service[] = [
  {
    no: "01",
    slug: "indoor-lighting",
    photo: "/projects/ritz-carlton/01.jpg",
    en: "Indoor Lighting",
    ar: "الإضاءة الداخلية",
    lead: "Decorative and architectural fittings for the rooms people actually live and work in.",
    body: "Villas, palaces, hotels, offices, retail and public interiors, specified from the European partner houses we have carried for decades. Fast-moving ranges are held in Riyadh so a delayed shipment never becomes a delayed handover, and every fitting is matched to the room it has to serve rather than pulled off a generic schedule.",
    includes: [
      "Decorative and architectural fittings",
      "Track, linear and recessed systems",
      "Hospitality, retail and workplace schemes",
      "Sample boards and on-site mock-ups",
    ],
  },
  {
    no: "02",
    slug: "lighting-design",
    photo: "/projects/solitaire-mall/07.jpg",
    en: "Lighting Design",
    ar: "تصميم الإضاءة",
    lead: "Drawings you can build from and numbers you can defend in a design review.",
    body: "Concept studies, photometric calculations, lux-level verification and complete fixture schedules, produced alongside architects, lighting consultants and electrical engineers. We work in the consultant's format and to the project's own specification, so submittals clear review instead of bouncing back.",
    includes: [
      "Concept and mood studies",
      "Photometric calculations and lux verification",
      "Fixture schedules and submittal packs",
      "Value engineering alternatives",
    ],
  },
  {
    no: "03",
    slug: "facade-lighting",
    photo: "/projects/solitaire-mall/03.jpg",
    en: "Facade Lighting",
    ar: "إضاءة الواجهات",
    lead: "A building's night identity, engineered to survive a Saudi summer.",
    body: "Exterior and architectural schemes using IP-rated, heat-tolerant hardware selected for Gulf conditions. Linear grazing, wall washing, media facades and full RGBW colour control, detailed with the glare and light-spill limits that municipal and developer reviews now ask for.",
    includes: [
      "Linear grazing and wall washing",
      "Media facades and RGBW colour control",
      "IP65 and IP66 rated hardware",
      "Glare and light-spill control",
    ],
  },
  {
    no: "04",
    slug: "outdoor-lighting",
    photo: "/projects/solitaire-mall/12.jpg",
    en: "Outdoor Lighting",
    ar: "الإضاءة الخارجية",
    lead: "Everything from a garden bollard to a high-mast on a national road.",
    body: "Roads, landscapes, compounds, car parks, walkways and sports areas. Poles, floodlights, bollards, in-ground and step fittings, sized around the pole spacing, mounting heights and uniformity targets the site allows rather than around a catalogue page.",
    includes: [
      "Roads, car parks and compounds",
      "Landscape and pathway lighting",
      "Sports and flood lighting",
      "Bollards, in-ground and high-mast",
    ],
  },
  {
    no: "05",
    slug: "lighting-controls",
    photo: "/projects/milling-mc2/03.jpg",
    en: "Lighting Controls",
    ar: "أنظمة التحكم بالإضاءة",
    lead: "Every circuit, indoors and out, on one open standard.",
    body: "KNX and EIB control of lighting across the whole building envelope. Scenes, occupancy and daylight sensing, DALI dimming, astronomical time clocks and energy monitoring, built on a worldwide open standard so the client is never locked into a single vendor for the life of the building.",
    includes: [
      "KNX and EIB scene and circuit control",
      "Occupancy and daylight sensing",
      "DALI dimming and tunable white",
      "Energy monitoring and reporting",
    ],
  },
  {
    no: "06",
    slug: "lighting-installation",
    photo: "/projects/athletic-showroom/03.jpg",
    en: "Lighting Installation",
    ar: "تركيب الإضاءة",
    lead: "Our own technical crews on site, not a subcontractor we have never met.",
    body: "Installation, aiming, configuration, commissioning and handover carried out by ARAK teams. We focus and program on site with the client present, then hand over as-built documentation and train the people who will run the system every day after we leave.",
    includes: [
      "Site installation and fixture aiming",
      "System programming and commissioning",
      "As-built documentation",
      "Operator training and handover",
    ],
  },
  {
    no: "07",
    slug: "project-management",
    photo: "/projects/solitaire-mall/02.jpg",
    en: "Project Management",
    ar: "إدارة المشاريع",
    lead: "One point of contact who owns the schedule from purchase order to snag list.",
    body: "Submittals, procurement, logistics and site coordination across multi-phase and multi-city programmes. We phase deliveries to the construction sequence so fittings arrive when the ceiling is ready, not six months early into a store that is already full.",
    includes: [
      "Submittals and approvals",
      "Procurement, shipping and customs",
      "Delivery phased to the site programme",
      "Snagging and project close-out",
    ],
  },
  {
    no: "08",
    slug: "projection-mapping",
    photo: "/projects/solitaire-mall/13.jpg",
    en: "3D Projection Mapping",
    ar: "الإسقاط الضوئي ثلاثي الأبعاد",
    lead: "Content mapped to real geometry, for the nights that have to be remembered.",
    body: "Projected shows for openings, national days, seasonal programmes and cultural events. We survey the facade, build the 3D mesh, produce or adapt the content, rig and blend the projectors, and run the show on the night with a crew on the desk.",
    includes: [
      "Facade survey and 3D mesh build",
      "Content production and mapping",
      "Projector rigging and edge blending",
      "Live show operation",
    ],
  },
  {
    no: "09",
    slug: "home-automation",
    photo: "/projects/four-points/01.jpg",
    en: "Home Automation Systems",
    ar: "أنظمة الأتمتة المنزلية",
    lead: "One commissioned system, not a shelf of apps that do not talk to each other.",
    body: "Lighting, curtains, HVAC, IP intercom, smart locks, WiFi and network systems delivered and commissioned together on KNX. For hotels the same platform runs Guest Room Management, so housekeeping status, room comfort and energy savings all sit on one supervision layer.",
    includes: [
      "KNX villa and palace automation",
      "Guest Room Management for hotels",
      "IP intercom, smart locks and CCTV",
      "Structured WiFi and networking",
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
  body: "Street lighting is the only infrastructure that already stands every fifty metres, already has power, and already looks up at the street. The smart pole turns that into a platform: LED lighting, 5G micro base stations, HD surveillance, environmental sensors, public broadcast, digital signage and emergency call, on a single foundation. ARAK supplies, installs, integrates and maintains the full C°LB Smart Light Pole Series across the Kingdom.",
  includes: [
    "Twenty pole designs, ornamental to smart-city",
    "5G, WiFi and multi-service gateway",
    "CCTV, sensors and emergency call",
    "Centralised control and LED signage",
  ],
};

export const PROCESS = [
  {
    no: "01",
    en: "Brief and site review",
    ar: "الدراسة الأولية",
    body: "Send drawings, a fixture schedule, or just the intent. We walk the site or the model and agree what the lighting actually has to achieve.",
  },
  {
    no: "02",
    en: "Design and calculation",
    ar: "التصميم والحسابات",
    body: "Concept studies, photometric calculations and a fixture schedule prepared to clear consultant and client review the first time.",
  },
  {
    no: "03",
    en: "Supply",
    ar: "التوريد",
    body: "Procurement from our partner manufacturers, shipping, customs clearance and delivery phased to the construction programme.",
  },
  {
    no: "04",
    en: "Install and commission",
    ar: "التركيب والتشغيل",
    body: "ARAK crews install, aim, program and commission on site, then hand over as-built documentation and train the operators.",
  },
  {
    no: "05",
    en: "After-sale support",
    ar: "الدعم بعد البيع",
    body: "Spares, re-lamping, system changes and warranty support once the project has closed and the building is in daily use.",
  },
];

export const CONTROL_SYSTEMS = [
  {
    title: "KNX and EIB technology",
    body: "Our control products are built on KNX and EIB, the worldwide open standard for building control across commercial, residential and industrial buildings. The product range covers a complete spectrum of applications found in today's buildings, from lighting and shutter control to heating, ventilation, security and energy management, all addressable from one bus.",
  },
  {
    title: "Guest Room Management System",
    body: "GRMS makes sure every guest room need is met and every expectation is set correctly. Lighting, cooling and heating, curtains and hotel room services are controlled through intuitive buttons, touch screens or panel interfaces, while the front desk and housekeeping see occupancy, service requests and setback status in real time.",
  },
  {
    title: "Lighting Control System",
    body: "Seamless control and monitoring of every lighting circuit in the building and across the outdoor areas. KNX has been chosen for major projects of all sizes because it is flexible, robust, interfaces widely with other systems, and carries significant potential for energy saving on schemes of any scale.",
  },
  {
    title: "Energy management and reporting",
    body: "Circuit-level metering, scheduling and daylight harvesting cut running hours without anyone on site having to think about it. Consumption is logged and reported, which matters increasingly for ESCO contracts, green building targets and the operating budgets that outlive the construction budget.",
  },
];

export const SECTORS = [
  "Government Entities",
  "Semi Government Entities",
  "Airports and Hotels",
  "Facilities Management Companies",
  "Residential Contractors",
  "Commercial Contractors",
  "Industrial Contractors",
  "Architectural and Lighting Consultants",
  "Electrical Consultants",
  "Real Estate Developers",
  "Oil and Gas Industry",
  "Energy Service Companies",
];
