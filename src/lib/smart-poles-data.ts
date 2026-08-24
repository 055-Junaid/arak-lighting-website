export type PoleFamily = "city" | "pedestrian" | "heritage";

export interface Pole {
  slug: string;
  name: string;
  tagline: string;
  family: PoleFamily;
  body: string;
}

export const POLE_FAMILIES: { id: PoleFamily | "all"; en: string; ar: string }[] = [
  { id: "all", en: "All designs", ar: "كل التصاميم" },
  { id: "city", en: "Smart city masts", ar: "أعمدة المدن الذكية" },
  { id: "pedestrian", en: "Pedestrian and park", ar: "الممرات والحدائق" },
  { id: "heritage", en: "Heritage and ornamental", ar: "التراثية والزخرفية" },
];

/**
 * The C°LB Smart Light Pole Series as published in the manufacturer catalogue.
 * Families are our own grouping, based on the scale each pole is drawn at.
 */
export const POLES: Pole[] = [
  {
    slug: "quantum",
    name: "Quantum",
    tagline: "Futuristic light, now",
    family: "city",
    body: "A groundbreaking modern pole light that propels outdoor illumination into the future. Quantum transcends conventional aesthetics and redefines the essence of outdoor lighting, integrating into urban environments while still making a bold statement of cutting-edge design. The ribbon that wraps the mast carries the light line down its full height.",
  },
  {
    slug: "ignis",
    name: "Ignis",
    tagline: "Sophistication in radiance",
    family: "city",
    body: "A state-of-the-art pole light that blends futuristic design with cutting-edge security. Sporting dual lighting heads, a camera cluster and a full-height display, Ignis turns its surroundings into vibrant, well-lit and observed ground without looking like a piece of enforcement equipment.",
  },
  {
    slug: "eclipse",
    name: "Eclipse",
    tagline: "Visionary outdoor radiance",
    family: "city",
    body: "A revolutionary marvel in modern pole lighting that pushes the limits of both style and function. Cast your surroundings into the dual brilliance of Eclipse, where each lighting head takes centre stage and orchestrates a play of light and shadow that adds depth and character to the outdoor ambience.",
  },
  {
    slug: "fusion",
    name: "Fusion",
    tagline: "Progressive urban lighting",
    family: "city",
    body: "A modern aesthetic with a dedicated focus on enhanced security. Dual lighting heads and meticulous precision let Fusion integrate into urban landscapes, offering not just a symphony of light but a heightened sense of safety on the streets it stands over.",
  },
  {
    slug: "orbit",
    name: "Orbit",
    tagline: "Revolutionary glow",
    family: "city",
    body: "Modern, minimalistic and futuristic in equal measure. Boasting dual lighting heads, Orbit turns outdoor spaces into vibrant spheres of radiance and converges form and function into a single silhouette that reads as an icon rather than as street furniture.",
  },
  {
    slug: "helio",
    name: "Helio",
    tagline: "Urban luminary mastery",
    family: "city",
    body: "More than a luminaire. Dual lighting heads and advanced functionality give Helio a sleek contemporary silhouette and a strong emphasis on heightened security, reshaping the landscape of outdoor lighting on wide roads and boulevards.",
  },
  {
    slug: "vista",
    name: "Vista",
    tagline: "Sophistication in simplicity",
    family: "city",
    body: "A paragon of contemporary elegance. Its minimalistic design and innovative dual-headed configuration integrate seamlessly into urban environments, offering a blend of form and utility crafted with precision and an eye for restraint.",
  },
  {
    slug: "echo",
    name: "Echo",
    tagline: "Lighting the future",
    family: "pedestrian",
    body: "Meticulously crafted with an unwavering focus on precision and functionality. Echo's design is a deliberate ode to simplicity, a luminaire that melds effortlessly with a diverse tapestry of architectural landscapes where a loud pole would be the wrong answer.",
  },
  {
    slug: "luminara",
    name: "Luminara",
    tagline: "Elevate with modernity",
    family: "city",
    body: "Sleek contours and contemporary design transform a mere light source into an ambience. Luminara unites form and function, delivering a minimalist aesthetic backed by cutting-edge technology, sensors and a colour display panel at eye level.",
  },
  {
    slug: "nova",
    name: "Nova",
    tagline: "Illuminating modern elegance",
    family: "city",
    body: "A seamless blend of sleek aesthetics and cutting-edge functionality. Nova's minimalist design syncs with contemporary architecture and bathes outdoor spaces in a radiant glow, positioning it as the choice for schemes looking to redefine outdoor lighting.",
  },
  {
    slug: "axis",
    name: "Axis",
    tagline: "Elevate urban aesthetics",
    family: "city",
    body: "Cutting-edge technology and contemporary sophistication merged with the urban landscape to make a bold statement. Axis blends form and function in perfect harmony, setting a benchmark for excellence where modern design meets the dynamic demands of urban living.",
  },
  {
    slug: "prism",
    name: "Prism",
    tagline: "Modern pole grandeur",
    family: "city",
    body: "An avant-garde design with a uniquely modern aesthetic and a streamlined silhouette. Prism integrates effortlessly into urban landscapes and enhances the atmosphere around it, carrying signage, sensors and a service enclosure on a single clean shaft.",
  },
  {
    slug: "brillar",
    name: "Brillar",
    tagline: "Radiant outdoor ambiance",
    family: "pedestrian",
    body: "A fusion of sophistication and innovation with a radiant aura. Brillar's minimalist design integrates with modern architecture, and every detail reflects a commitment to both form and function on walkways, plazas and landscaped grounds.",
  },
  {
    slug: "nexus",
    name: "Nexus",
    tagline: "Urban radiance redefined",
    family: "city",
    body: "Designed for dynamic city landscapes. Sleek contours and advanced technology position Nexus as a beacon in urban settings, elevating safety and aesthetic appeal at once with twin display faces built into the mast.",
  },
  {
    slug: "zenith",
    name: "Zenith",
    tagline: "Dual path illumination",
    family: "city",
    body: "Cutting-edge design with unparalleled functionality. Zenith's distinctive dual heads orchestrate a symphony of light that prioritises safety and elevates the aesthetic essence of urban environments, setting a standard for contemporary public space.",
  },
  {
    slug: "cascade",
    name: "Cascade",
    tagline: "Sculpting light in style",
    family: "pedestrian",
    body: "A sleek, contemporary aesthetic that transcends traditional boundaries. Cascade is crafted with attention to detail and a vision for modernity, illuminating outdoor spaces from a low column with a harmonious fusion of form and function.",
  },
  {
    slug: "solace",
    name: "Solace",
    tagline: "Inventive path brilliance",
    family: "heritage",
    body: "Crafted with precision and a commitment to pushing the boundaries of modern design. Solace's ornamental crown contributes not only to the illumination of the urban landscape but to the character of the street, casting a warm and inviting glow as day turns to night.",
  },
  {
    slug: "astra",
    name: "Astra",
    tagline: "A symphony of light",
    family: "heritage",
    body: "A sculpted crown on a classical shaft, finished in bronze. Astra elevates the aesthetics of outdoor spaces with avant-garde brilliance, and carries the same sensors, cameras and display panel as the modern masts on a body that suits a heritage district.",
  },
  {
    slug: "verve",
    name: "Verve",
    tagline: "Timeless elegance",
    family: "heritage",
    body: "Timeless elegance woven into the fabric of modern innovation. A traditional lantern hangs from a contemporary bracket, and the banner panel below it carries city or event branding, making Verve a natural fit for boulevards and civic programmes.",
  },
  {
    slug: "zen",
    name: "Zen",
    tagline: "Sleek luminance essence",
    family: "heritage",
    body: "Contemporary pole innovation with an avant-garde design. Zen's streamlined, modern silhouette integrates effortlessly into urban landscapes, delivering not only light but a declaration of elegance, with a lantern, a signage disc and a sensor arm on one shaft.",
  },
];

export const POLE_FUNCTIONS = [
  {
    title: "Long-life LED lighting",
    body: "The primary job. High-efficacy LED heads with the lumen output and distribution the road class calls for.",
  },
  {
    title: "Flexible and intelligent light control",
    body: "Dimming profiles, astronomical scheduling and motion response, set per pole or per zone from the control centre.",
  },
  {
    title: "Simple and efficient centralised control",
    body: "One dashboard for every pole on the network, with fault reporting that tells you which unit failed before a resident does.",
  },
  {
    title: "5G micro base station",
    body: "The mast doubles as small-cell mounting, which is what makes dense 5G coverage viable in a built-up district.",
  },
  {
    title: "High-speed broadband",
    body: "Public WiFi access points fed from the same fibre run that serves the pole's other services.",
  },
  {
    title: "HD video surveillance",
    body: "Fixed and PTZ cameras at the correct height for plate and face capture, cabled inside the shaft.",
  },
  {
    title: "Air quality monitoring",
    body: "Particulate, temperature, humidity and noise sensing, reported continuously to the city platform.",
  },
  {
    title: "Real-time traffic statistics",
    body: "Vehicle and pedestrian counting that feeds signal timing, planning studies and event management.",
  },
  {
    title: "Outdoor LED display",
    body: "Weather-rated signage faces for wayfinding, public information, event programming or commercial content.",
  },
  {
    title: "Multi-functional public broadcasting",
    body: "Addressable speakers for announcements, emergency instruction and scheduled programming.",
  },
  {
    title: "One-button emergency call",
    body: "A direct line to the operations centre, with the camera at that pole automatically brought up on the operator's screen.",
  },
  {
    title: "Unified multi-service access gateway",
    body: "A single gateway per pole so power, network and every connected device are provisioned and monitored as one asset.",
  },
];

export const POLE_LAYERS = [
  {
    layer: "Application layer",
    detail: "System integration application and control panel",
    body: "Where the city actually operates the network: dashboards, schedules, alarms, reports and the integrations into whatever command platform the client already runs.",
  },
  {
    layer: "Control layer",
    detail: "Smart lighting control alongside traditional lighting control",
    body: "The bridge between the software and the hardware. Smart control handles addressable dimming and sensor logic, while conventional contactor control stays available as a fallback path.",
  },
  {
    layer: "Terminal layer",
    detail: "Sensors and LED luminaires",
    body: "The devices on the pole itself. Sensors report conditions up the stack, luminaires take instructions down it, and both can be driven directly from the control layer if the network is unavailable.",
  },
];

export const ARAK_ROLE = [
  {
    no: "01",
    title: "Survey and design",
    body: "Pole spacing, mounting heights, uniformity and glare calculations, plus a services schedule that says exactly which devices go on which pole. We produce the drawings the consultant and the municipality both need to sign.",
  },
  {
    no: "02",
    title: "Supply",
    body: "Direct supply of the C°LB Smart Light Pole Series with the luminaires, gateways, cameras, sensors and display panels each design carries. Procurement, shipping, customs and phased delivery are handled by our project team.",
  },
  {
    no: "03",
    title: "Civil works and installation",
    body: "Foundations, ducting, cabling and erection, coordinated with the road or landscape contractor so the poles go in once, at the right level, on the programme everyone else is working to.",
  },
  {
    no: "04",
    title: "Integration and commissioning",
    body: "Gateway provisioning, device addressing, network configuration and control-centre integration. We commission the whole pole as one asset, not as nine separate devices that happen to share a shaft.",
  },
  {
    no: "05",
    title: "Operation and maintenance",
    body: "Spares, firmware, fault response and reporting after handover. Forty-five years of after-sale support on lighting is the reason clients let us put this much of the street on one pole.",
  },
];
