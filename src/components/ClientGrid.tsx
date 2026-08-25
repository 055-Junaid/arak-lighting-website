import { LogoGrid, type LogoItem } from "./LogoGrid";

// Ordered by standing, most significant first: flagship Saudi names and national
// institutions, then major international brands, then the wider client base.
// The tiers are deliberate but intentionally unlabelled so it reads as one list.
const CLIENTS: LogoItem[] = [
  { name: "The Ritz-Carlton", ar: "الريتز كارلتون", file: "ritz-carlton.png" },
  { name: "Riyadh Air", ar: "طيران الرياض", file: "riyadh-air.png" },
  { name: "Dr. Sulaiman Al Habib", ar: "د. سليمان الحبيب", file: "dr-sulaiman-al-habib.png" },
  { name: "King Faisal Specialist Hospital", ar: "مستشفى الملك فيصل التخصصي", file: "kfshrc.png" },
  { name: "Ministry of National Guard", ar: "وزارة الحرس الوطني", file: "ministry-national-guard.png" },
  { name: "Ministry of Environment, Water & Agriculture", ar: "وزارة البيئة والمياه والزراعة", file: "mewa.png" },
  { name: "Royal Saudi Air Force", ar: "القوات الجوية الملكية السعودية", file: "rsaf.svg" },
  { name: "Green Riyadh", ar: "الرياض الخضراء", file: "green-riyadh.png" },
  { name: "MODON", ar: "مدن", file: "modon.png" },
  { name: "FLOW, Riyadh Metro", ar: "فلو، قطار الرياض", file: "flow-riyadh-metro.png" },
  { name: "DACO, Dammam Airports", ar: "داكو، مطارات الدمام", file: "daco.png" },
  { name: "King Saud University", ar: "جامعة الملك سعود", file: "king-saud-university.png" },
  { name: "Prince Sultan University", ar: "جامعة الأمير سلطان", file: "prince-sultan-university.png" },
  { name: "Alsalam Aerospace Industries", ar: "السلام لصناعات الطيران", file: "alsalam-aerospace.png" },
  { name: "Bank Aljazira", ar: "بنك الجزيرة", file: "bank-aljazira.png" },
  { name: "Alawwal Bank", ar: "البنك الأول", file: "alawwal-bank.png" },
  { name: "Burj Rafal Hotel", ar: "فندق برج رافال" },
  { name: "Makarem", ar: "مكارم", file: "makarem.png" },
  { name: "SACO", ar: "ساكو", file: "saco.png" },
  { name: "Panda", ar: "بنده", file: "panda.png" },

  { name: "Four Seasons", ar: "فورسيزونز", file: "four-seasons.png" },
  { name: "Mövenpick", ar: "موفنبيك", file: "movenpick.png" },
  { name: "Four Points by Sheraton", ar: "فور بوينتس باي شيراتون", file: "four-points.png" },
  { name: "Emirates NBD", ar: "بنك الإمارات دبي الوطني", file: "emirates-nbd.png" },
  { name: "Cartier", ar: "كارتييه", file: "cartier.png" },
  { name: "Pagani", ar: "باغاني", file: "pagani.png" },

  { name: "Al Bawani", ar: "البواني", file: "al-bawani.png" },
  { name: "Tamimi Group", ar: "مجموعة التميمي", file: "tamimi-group.png" },
  { name: "Almajal G4S", ar: "المجال جي فور إس", file: "almajal-g4s.png" },
  { name: "Al Blagha Group", ar: "مجموعة البلاغة", file: "al-blagha.png" },
  { name: "Tamear", ar: "تعمير", file: "tamear.png" },
  { name: "WTCO Saudi", ar: "WTCO السعودية", file: "wtco-saudi.png" },
  { name: "Dur", ar: "دور", file: "dur.png" },
];

export function ClientGrid() {
  return <LogoGrid items={CLIENTS} basePath="/clients" />;
}
