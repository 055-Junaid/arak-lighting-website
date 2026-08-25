/** SCRATCH — deleted before merge. Subsets used to compare proof-block layouts. */

export type Mark = { name: string; file?: string; base: string };

const v = (file: string, name: string): Mark => ({ name, file, base: "/vendors" });
const c = (file: string, name: string): Mark => ({ name, file, base: "/clients" });
const b = (file: string, name: string): Mark => ({ name, file, base: "/brands" });

/** Accreditation — the strongest credential on the page. All thirteen. */
export const ACCREDITATION: Mark[] = [
  v("neom.png", "NEOM"),
  v("saudi-aramco.png", "Saudi Aramco"),
  v("qiddiya.png", "Qiddiya"),
  v("roshn.png", "Roshn"),
  v("red-sea.png", "The Red Sea Development Company"),
  v("dgda.png", "Diriyah Gate Development Authority"),
  v("stc.png", "STC"),
  v("saudi-electricity.png", "Saudi Electricity Company"),
  v("riyadh-airports.png", "Riyadh Airports"),
  v("rcjy.svg", "Royal Commission for Jubail & Yanbu"),
  v("national-water.png", "National Water Company"),
  v("nhc.png", "National Housing Company"),
  v("mngha.png", "Ministry of National Guard Health Affairs"),
];

/** Clients — the sixteen strongest of thirty-three. */
export const CLIENTS: Mark[] = [
  c("ritz-carlton.png", "The Ritz-Carlton"),
  c("riyadh-air.png", "Riyadh Air"),
  c("four-seasons.png", "Four Seasons"),
  c("cartier.png", "Cartier"),
  c("kfshrc.png", "King Faisal Specialist Hospital"),
  c("dr-sulaiman-al-habib.png", "Dr. Sulaiman Al Habib"),
  c("ministry-national-guard.png", "Ministry of National Guard"),
  c("mewa.png", "Ministry of Environment, Water & Agriculture"),
  c("rsaf.svg", "Royal Saudi Air Force"),
  c("green-riyadh.png", "Green Riyadh"),
  c("modon.png", "MODON"),
  c("flow-riyadh-metro.png", "FLOW, Riyadh Metro"),
  c("daco.png", "DACO, Dammam Airports"),
  c("king-saud-university.png", "King Saud University"),
  c("emirates-nbd.png", "Emirates NBD"),
  c("pagani.png", "Pagani"),
];

/**
 * All thirty-three clients as names, grouped. Most of these marks are
 * institutional seals — ministries, universities, the air force — which turn
 * to grey mush at logo-wall scale. For those the NAME is the credential, not
 * the crest, so this tier is set as type rather than as logos.
 */
export const CLIENT_GROUPS: { label: string; names: string[] }[] = [
  {
    label: "Hospitality & retail",
    names: [
      "The Ritz-Carlton",
      "Four Seasons",
      "Mövenpick",
      "Four Points by Sheraton",
      "Burj Rafal Hotel",
      "Makarem",
      "Cartier",
      "Pagani",
      "SACO",
      "Panda",
    ],
  },
  {
    label: "Government & health",
    names: [
      "Ministry of National Guard",
      "Ministry of Environment, Water & Agriculture",
      "Royal Saudi Air Force",
      "King Faisal Specialist Hospital",
      "Dr. Sulaiman Al Habib",
      "Green Riyadh",
      "MODON",
      "King Saud University",
      "Prince Sultan University",
    ],
  },
  {
    label: "Transport, banking & industry",
    names: [
      "Riyadh Air",
      "FLOW, Riyadh Metro",
      "DACO, Dammam Airports",
      "Alsalam Aerospace Industries",
      "Bank Aljazira",
      "Alawwal Bank",
      "Emirates NBD",
      "Al Bawani",
      "Tamimi Group",
      "Almajal G4S",
      "Al Blagha Group",
      "Tamear",
      "WTCO Saudi",
      "Dur",
    ],
  },
];

/** Brands — the eighteen best-known of forty-one. */
export const BRANDS: Mark[] = [
  b("c-lb.png", "C°LB"),
  b("artemide.png", "Artemide"),
  b("reggiani.png", "Reggiani"),
  b("disano-illuminazione.png", "Disano Illuminazione"),
  b("siteco.png", "Siteco"),
  b("ledvance.png", "Ledvance"),
  b("sylvania.png", "Sylvania"),
  b("leds-c4.png", "LEDS C4"),
  b("lug.png", "LUG"),
  b("rzb-lighting.png", "RZB Lighting"),
  b("abb.png", "ABB"),
  b("lutron.png", "Lutron"),
  b("zennio.png", "Zennio"),
  b("hager.png", "Hager"),
  b("leviton.png", "Leviton"),
  b("gewiss.png", "GEWISS"),
  b("eaton.png", "Eaton"),
  b("interra.png", "Interra"),
];
