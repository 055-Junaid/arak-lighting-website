import { LogoGrid, type LogoItem } from "./LogoGrid";

// Ordered: lighting brands, then emergency lighting, then control & automation.
// The grouping is deliberate but intentionally unlabelled so it reads as one list.
const BRANDS: LogoItem[] = [
  { name: "C°LB", file: "c-lb.png" },
  { name: "Artemide", file: "artemide.png" },
  { name: "Reggiani", file: "reggiani.png" },
  { name: "Disano Illuminazione", file: "disano-illuminazione.png" },
  { name: "Siteco", file: "siteco.png" },
  { name: "Ledvance", file: "ledvance.png" },
  { name: "Sylvania", file: "sylvania.png" },
  { name: "LEDS C4", file: "leds-c4.png" },
  { name: "ACB", file: "acb.png" },
  { name: "Arkoslight", file: "arkoslight.png" },
  { name: "Nova Luce", file: "nova-luce.png" },
  { name: "Viokef Lighting", file: "viokef-lighting.png" },
  { name: "LUG", file: "lug.png" },
  { name: "RZB Lighting", file: "rzb-lighting.png" },
  { name: "planlicht", file: "planlicht.png" },
  { name: "Trevos", file: "trevos.png" },
  { name: "Zalux", file: "zalux.png" },
  { name: "Niviss", file: "niviss.png" },
  { name: "Hormen", file: "hormen.png" },
  { name: "espica", file: "espica.png" },
  { name: "Lucio", file: "lucio.png" },
  { name: "p.u.k.", file: "p-u-k.png" },
  { name: "Forma Lighting", file: "forma-lighting.png" },
  { name: "Flexxica", file: "flexxica.png" },
  { name: "LEDFlex", file: "ledflex.png" },
  { name: "PHOS", file: "phos.png" },
  { name: "Nexia", file: "nexia.png" },
  { name: "AFO", file: "afo.png" },

  { name: "Eaton", file: "eaton.png" },
  { name: "Inotec", file: "inotec.png" },
  { name: "ESP", file: "esp.png" },
  { name: "EML", file: "eml.png" },
  { name: "TM Technologie", file: "tm-technologie.png" },
  { name: "Denko", file: "denko.png" },

  { name: "ABB", file: "abb.png" },
  { name: "Lutron", file: "lutron.png" },
  { name: "Zennio", file: "zennio.png" },
  { name: "Hager", file: "hager.png" },
  { name: "Leviton", file: "leviton.png" },
  { name: "GEWISS", file: "gewiss.png" },
  { name: "Interra", file: "interra.png" },
];

export function BrandGrid() {
  return <LogoGrid items={BRANDS} basePath="/brands" />;
}
