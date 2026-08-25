import type { ReactNode } from "react";
import { LanguageProvider } from "@/lib/lang";
import { COLOR_MODE_BOOT_SCRIPT } from "@/lib/color-mode";
import { Header } from "@/components/Header";
import { StructuredData } from "@/components/StructuredData";
import { Footer } from "@/components/Footer";
import { ColorToggle } from "@/components/ColorToggle";
import type { Locale } from "@/lib/site";

/**
 * The document both locales render.
 *
 * There are two root layouts on this site — one per language route group —
 * because only a root layout can set <html lang> and dir, and those have to
 * differ between /about and /ar/about. Everything inside the two is identical,
 * so it lives here rather than being copied and left to drift.
 */
export function RootShell({
  lang,
  fontClassName,
  children,
}: {
  lang: Locale;
  /** next/font variables, applied to <html> so CSS can read them anywhere. */
  fontClassName: string;
  children: ReactNode;
}) {
  const dir = lang === "ar" ? "rtl" : "ltr";

  return (
    <html lang={lang} dir={dir} data-scroll-behavior="smooth" className={fontClassName}>
      {/* next/head is the Pages Router API; a root layout renders <head>
          directly, which is what this component is standing in for. The rule
          cannot tell the difference from outside the app directory. */}
      {/* eslint-disable-next-line @next/next/no-head-element */}
      <head>
        {/* Applies a saved "lights on" choice before first paint, so a
            returning visitor never sees a flash of black and white. */}
        <script dangerouslySetInnerHTML={{ __html: COLOR_MODE_BOOT_SCRIPT }} />
        <StructuredData lang={lang} />
      </head>
      <body>
        <LanguageProvider lang={lang}>
          <Header />
          {children}
          <Footer />
          <ColorToggle />
        </LanguageProvider>
      </body>
    </html>
  );
}
