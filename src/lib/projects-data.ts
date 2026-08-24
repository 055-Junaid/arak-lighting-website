import { PROJECT_GALLERIES, type GalleryImage } from "./project-galleries";

export type ProjectCategory = "fittings" | "controls";

export interface ProjectRow {
  name: string;
  loc: string;
  scope: string;
  category: ProjectCategory;
}

export interface FeaturedProject extends ProjectRow {
  /** URL segment for the project's own page. */
  slug: string;
  /** Two or three sentences shown at the top of the project page. */
  blurb: string;
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
    loc: "Riyadh",
    scope: "Supply of indoor & outdoor light fittings",
    category: "fittings",
    blurb:
      "A retail destination in Riyadh, delivered with Bin Dayel Contracting. ARAK supplied the indoor and outdoor light fittings across the scheme, from the trading floors and circulation routes through to the facade and external areas.",
  },
  {
    slug: "ritz-carlton",
    name: "The Ritz-Carlton",
    loc: "Riyadh",
    scope: "Supply of light fittings",
    category: "fittings",
    blurb:
      "One of Riyadh's landmark hospitality addresses. ARAK supplied the light fittings for the hotel's public areas — the grand hall, the double staircase atrium and the ornamented ceilings that carry the marble, gilt and plasterwork detail throughout.",
  },
  {
    slug: "four-points",
    name: "Four Points by Sheraton",
    loc: "Riyadh",
    scope: "Supply & commissioning of KNX lighting control systems",
    category: "controls",
    blurb:
      "A city hotel delivered with Saudi Icon. ARAK supplied and commissioned the KNX lighting control system, bringing the building's lighting circuits onto a single addressable platform for scene setting, scheduling and energy management.",
  },
  {
    slug: "riyadh-air",
    name: "Riyadh Air Head Office",
    loc: "Riyadh",
    scope: "Supply, testing & commissioning of lighting control system",
    category: "controls",
    blurb:
      "The head office of the Kingdom's new national carrier. ARAK supplied, tested and commissioned the lighting control system for the building, a glass and stone campus on the northern edge of Riyadh.",
  },
  {
    slug: "ladun-center",
    name: "LADUN Center",
    loc: "Riyadh",
    scope: "Supply of light fittings",
    category: "fittings",
    blurb:
      "A commercial centre delivered with DAYMAT. The fittings package runs on the architecture: continuous linear runs set into the black baffle ceilings, picked up again as illuminated frames on the feature walls and lobby.",
  },
  {
    slug: "milling-mc2",
    name: "Milling Company MC-2",
    loc: "Riyadh",
    scope: "Supply & commissioning of KNX lighting control systems",
    category: "controls",
    blurb:
      "One of the Kingdom's four grain milling companies, delivered with Energy Wave Contracting. ARAK supplied and commissioned the KNX lighting control system, including the lighting control panels that switch and dim the plant and office circuits.",
  },
  {
    slug: "seder-hq",
    name: "Seder Head Quarter Building",
    loc: "Riyadh",
    scope: "Supply of indoor & outdoor light fittings",
    category: "fittings",
    blurb:
      "The headquarters building for Seder Construction. ARAK supplied both the indoor and outdoor fittings — the facade and landscape lighting that reads at night, and the downlighting through the lobby, lift cores and open-plan floors.",
  },
  {
    slug: "athletic-showroom",
    name: "Athletic Showroom",
    loc: "Riyadh",
    scope: "Supply of indoor & track light fittings",
    category: "fittings",
    blurb:
      "A sportswear retail fit-out in Riyadh. The package combines track-mounted spots on exposed black services with linear runs and shelf-integrated strips, lighting the merchandise walls and display tables at retail levels.",
  },
  {
    slug: "delfino",
    name: "Delfino Mayfair Restaurant",
    loc: "Riyadh",
    scope: "Supply of EIB / KNX lighting control system",
    category: "controls",
    blurb:
      "The Riyadh outpost of the Mayfair restaurant, delivered with Saudi Icon. ARAK supplied the EIB / KNX lighting control system, giving the dining room scene control across the planted ceiling, the table lighting and the facade.",
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
const RAW: [string, string, string, "f" | "c"][] = [
  ["King Fahad International Airport", "Dammam", "Supply & installation of light fittings", "f"],
  ["National Guard Housing Project", "Riyadh", "Supply of light fittings to 5,300 soldier villas", "f"],
  ["Tilal Al Riyadh Mall", "Riyadh", "Supply of light fittings", "f"],
  ["Al Nafl Tower", "Riyadh", "Design & supply of light fittings", "f"],
  ["King Faisal Air Academy", "Majma’a, Riyadh", "Supply of indoor & outdoor light fittings", "f"],
  ["King Faisal Hospital", "Riyadh", "Supply of outdoor light fittings", "f"],
  ["Naba Hospital", "Riyadh", "Supply, testing & commissioning of lighting control system", "c"],
  ["Ansar Hospital", "Madina", "Supply of light fittings", "f"],
  ["Batha Access, Saudi Customs Offices Project", "KSA access with UAE", "Supply of light fittings", "f"],
  ["Yamama University Al Khobar, General Auditing Bureau", "Al Khobar", "Supply of indoor light fittings", "f"],
  ["Yamama Cement Factory", "Riyadh", "Supply of light fittings", "f"],
  ["WTCO", "Riyadh", "Supply, testing & commissioning of lighting control system", "c"],
  ["JAQCD Dirriyah", "Riyadh", "Supply, installation & configuration of solar cameras", "c"],
  ["Dirriyah Farm Golf Club House", "Riyadh", "Supply of indoor & outdoor light fittings", "f"],
  ["Burn Treatment Center", "Al Ahsa", "Supply of indoor light fittings", "f"],
  ["Labor Camp of King Faisal Air Academy Project", "Majma’a, Riyadh", "Supply of light fittings", "f"],
  ["Education Administration Building Project", "Riyadh", "Supply of light fittings", "f"],
  ["Al Waha Private School", "Riyadh", "Supply of light fittings", "f"],
  ["Schools Hall Stages", "Riyadh", "Supply of light fittings", "f"],
  ["Dr. Sulayman Al Habib Private Palace", "Riyadh", "Supply & commissioning of EIB / KNX lighting control & home automation system", "c"],
  ["Dr. Hawaf Private Palace", "Riyadh", "Supply & commissioning of EIB / KNX lighting control & home automation system", "c"],
  ["Rahmania Villas", "Riyadh", "Supply & commissioning of KNX lighting control, IP intercom, smart locks, WiFi & network system", "c"],
  ["Al Jomaih Private Offices", "Riyadh", "Supply of light fittings", "f"],
  ["Pagani Showroom", "Riyadh", "Supply, testing & commissioning of lighting control system", "c"],
  ["Demos Office", "Riyadh", "Supply of decorative pendant lights", "f"],
  ["Samarkandi Villa Project", "Riyadh", "Supply of light fittings", "f"],
  ["Al Subaie Private Villa", "Riyadh", "Supply of light fittings", "f"],
  ["Fahad Al Suhaim Private Villa", "Riyadh", "Supply & commissioning of KNX lighting control, IP intercom, smart locks, WiFi & network system", "c"],
  ["Turki Al Suhaim Private Villa", "Riyadh", "Supply & commissioning of KNX lighting control, IP intercom, smart locks, WiFi & network system", "c"],
  ["Dr. Abdullah Bin Abdel Mohsen Private Villa", "Riyadh", "Supply of indoor & outdoor light fittings", "f"],
  ["TBC Project", "Hafr Al Batin", "Supply of light fittings", "f"],
];

export const PROJECT_ROWS: ProjectRow[] = RAW.map(([name, loc, scope, cat]) => ({
  name,
  loc,
  scope,
  category: cat === "f" ? "fittings" : "controls",
}));
