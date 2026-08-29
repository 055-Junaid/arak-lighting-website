import { LogoGrid, type LogoItem } from "./LogoGrid";

// Grouped by sector rather than by standing, so the wall reads as a survey of
// where the work lands: hospitality, then the national institutions, transport,
// healthcare, education, banking, retail, and the contractors we build with.
// Within each group the most significant name leads. The groups are deliberate
// but intentionally unlabelled — the wall is one list, and a reader scanning it
// finds their own sector without being told where to look.
const CLIENTS: LogoItem[] = [
  // Hospitality
  { name: "The Ritz-Carlton", ar: "الريتز كارلتون", file: "ritz-carlton.webp" },
  { name: "Four Seasons", ar: "فورسيزونز", file: "four-seasons.webp" },
  { name: "Mövenpick", ar: "موفنبيك", file: "movenpick.webp" },
  { name: "Four Points by Sheraton", ar: "فور بوينتس باي شيراتون", file: "four-points.webp" },
  { name: "Burj Rafal Hotel", ar: "فندق برج رافال" },
  { name: "Makarem", ar: "مكارم", file: "makarem.webp" },

  // Government and national institutions
  { name: "Ministry of National Guard", ar: "وزارة الحرس الوطني", file: "ministry-national-guard.webp" },
  { name: "Ministry of Environment, Water & Agriculture", ar: "وزارة البيئة والمياه والزراعة", file: "mewa.webp" },
  { name: "Royal Saudi Air Force", ar: "القوات الجوية الملكية السعودية", file: "rsaf.svg" },
  { name: "Green Riyadh", ar: "الرياض الخضراء", file: "green-riyadh.webp" },
  { name: "MODON", ar: "مدن", file: "modon.webp" },

  // Aviation and transport
  { name: "Riyadh Air", ar: "طيران الرياض", file: "riyadh-air.webp" },
  { name: "FLOW, Riyadh Metro", ar: "فلو، قطار الرياض", file: "flow-riyadh-metro.webp" },
  { name: "DACO, Dammam Airports", ar: "داكو، مطارات الدمام", file: "daco.webp" },
  { name: "Alsalam Aerospace Industries", ar: "السلام لصناعات الطيران", file: "alsalam-aerospace.webp" },

  // Healthcare
  { name: "Dr. Sulaiman Al Habib", ar: "د. سليمان الحبيب", file: "dr-sulaiman-al-habib.webp" },
  { name: "King Faisal Specialist Hospital", ar: "مستشفى الملك فيصل التخصصي", file: "kfshrc.webp" },

  // Education
  { name: "King Saud University", ar: "جامعة الملك سعود", file: "king-saud-university.webp" },
  { name: "Prince Sultan University", ar: "جامعة الأمير سلطان", file: "prince-sultan-university.webp" },

  // Banking and finance
  { name: "Bank Aljazira", ar: "بنك الجزيرة", file: "bank-aljazira.webp" },
  { name: "Alawwal Bank", ar: "البنك الأول", file: "alawwal-bank.webp" },
  { name: "Emirates NBD", ar: "بنك الإمارات دبي الوطني", file: "emirates-nbd.webp" },

  // Malls, retail and lifestyle
  { name: "Solitaire Mall", ar: "سوليتير مول", file: "solitaire-mall.webp" },
  { name: "SACO", ar: "ساكو", file: "saco.webp" },
  { name: "Panda", ar: "بنده", file: "panda.webp" },
  { name: "Cartier", ar: "كارتييه", file: "cartier.webp" },
  { name: "Pagani", ar: "باغاني", file: "pagani.webp" },

  // Contracting, real estate and facilities
  { name: "Al Bawani", ar: "البواني", file: "al-bawani.webp" },
  { name: "Tamimi Group", ar: "مجموعة التميمي", file: "tamimi-group.webp" },
  { name: "Almajal G4S", ar: "المجال جي فور إس", file: "almajal-g4s.webp" },
  { name: "Al Blagha Group", ar: "مجموعة البلاغة", file: "al-blagha.webp" },
  { name: "Tamear", ar: "تعمير", file: "tamear.webp" },
  { name: "WTCO Saudi", ar: "WTCO السعودية", file: "wtco-saudi.webp" },
  { name: "Dur", ar: "دور", file: "dur.webp" },
];

export function ClientGrid() {
  return <LogoGrid items={CLIENTS} basePath="/clients" />;
}
