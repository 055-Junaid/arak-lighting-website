import { LogoGrid, type LogoItem } from "./LogoGrid";

// Ordered: lighting brands, then emergency lighting, then control & automation.
// The grouping is deliberate but intentionally unlabelled so it reads as one list.
const BRANDS: LogoItem[] = [
  { name: "C°LB", file: "c-lb.webp" },
  { name: "Artemide", file: "artemide.webp" },
  { name: "Reggiani", file: "reggiani.webp" },
  { name: "Disano Illuminazione", file: "disano-illuminazione.webp" },
  { name: "Siteco", file: "siteco.webp" },
  { name: "Ledvance", file: "ledvance.webp" },
  { name: "Sylvania", file: "sylvania.webp" },
  { name: "LEDS C4", file: "leds-c4.webp" },
  { name: "ACB", file: "acb.webp" },
  { name: "Arkoslight", file: "arkoslight.webp" },
  { name: "Nova Luce", file: "nova-luce.webp" },
  { name: "Viokef Lighting", file: "viokef-lighting.webp" },
  { name: "LUG", file: "lug.webp" },
  { name: "RZB Lighting", file: "rzb-lighting.webp" },
  { name: "planlicht", file: "planlicht.webp" },
  { name: "Trevos", file: "trevos.webp" },
  { name: "Zalux", file: "zalux.webp" },
  { name: "GEWISS", file: "gewiss.webp" },
  { name: "Niviss", file: "niviss.webp" },
  { name: "Hormen", file: "hormen.webp" },
  { name: "espica", file: "espica.webp" },
  { name: "Lucio", file: "lucio.webp" },
  { name: "p.u.k.", file: "p-u-k.webp" },
  { name: "Forma Lighting", file: "forma-lighting.webp" },
  { name: "Flexxica", file: "flexxica.webp" },
  { name: "LEDFlex", file: "ledflex.webp" },
  { name: "PHOS", file: "phos.webp" },
  { name: "Nexia", file: "nexia.webp" },
  { name: "AFO", file: "afo.webp" },

  { name: "Eaton", file: "eaton.webp" },
  { name: "Inotec", file: "inotec.webp" },
  { name: "ESP", file: "esp.webp" },
  { name: "EML", file: "eml.webp" },
  { name: "TM Technologie", file: "tm-technologie.webp" },
  { name: "Denko", file: "denko.webp" },

  { name: "ABB", file: "abb.webp" },
  { name: "Lutron", file: "lutron.webp" },
  { name: "Zennio", file: "zennio.webp" },
  { name: "Hager", file: "hager.webp" },
  { name: "Leviton", file: "leviton.webp" },
  { name: "Interra", file: "interra.webp" },
];

export function BrandGrid() {
  return <LogoGrid items={BRANDS} basePath="/brands" />;
}
