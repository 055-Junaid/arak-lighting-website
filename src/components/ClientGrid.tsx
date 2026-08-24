import { LogoGrid, type LogoItem } from "./LogoGrid";

// Ordered by standing, most significant first: flagship Saudi names and national
// institutions, then major international brands, then the wider client base.
// The tiers are deliberate but intentionally unlabelled so it reads as one list.
const CLIENTS: LogoItem[] = [
  { name: "The Ritz-Carlton", file: "ritz-carlton.png" },
  { name: "Riyadh Air", file: "riyadh-air.png" },
  { name: "Dr. Sulaiman Al Habib", file: "dr-sulaiman-al-habib.png" },
  { name: "King Faisal Specialist Hospital", file: "kfshrc.png" },
  { name: "Ministry of National Guard", file: "ministry-national-guard.png" },
  { name: "Ministry of Environment, Water & Agriculture", file: "mewa.png" },
  { name: "Royal Saudi Air Force", file: "rsaf.png" },
  { name: "Green Riyadh", file: "green-riyadh.png" },
  { name: "MODON", file: "modon.png" },
  { name: "FLOW, Riyadh Metro", file: "flow-riyadh-metro.png" },
  { name: "DACO, Dammam Airports", file: "daco.png" },
  { name: "King Saud University", file: "king-saud-university.png" },
  { name: "Prince Sultan University", file: "prince-sultan-university.png" },
  { name: "Alsalam Aerospace Industries", file: "alsalam-aerospace.png" },
  { name: "Bank Aljazira", file: "bank-aljazira.png" },
  { name: "Alawwal Bank", file: "alawwal-bank.png" },
  { name: "Burj Rafal Hotel", file: "burj-rafal.png" },
  { name: "Makarem", file: "makarem.png" },
  { name: "SACO", file: "saco.png" },
  { name: "Panda", file: "panda.png" },

  { name: "Four Seasons", file: "four-seasons.png" },
  { name: "Mövenpick", file: "movenpick.png" },
  { name: "Four Points by Sheraton", file: "four-points.png" },
  { name: "Emirates NBD", file: "emirates-nbd.png" },
  { name: "Cartier", file: "cartier.png" },
  { name: "Pagani", file: "pagani.png" },

  { name: "Al Bawani", file: "al-bawani.png" },
  { name: "Tamimi Group", file: "tamimi-group.png" },
  { name: "Almajal G4S", file: "almajal-g4s.png" },
  { name: "Al Blagha Group", file: "al-blagha.png" },
  { name: "Tamear", file: "tamear.png" },
  { name: "WTCO Saudi", file: "wtco-saudi.png" },
  { name: "Dur", file: "dur.png" },
];

export function ClientGrid() {
  return <LogoGrid items={CLIENTS} basePath="/clients" />;
}
