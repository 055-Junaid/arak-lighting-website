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

  /* <html> carries suppressHydrationWarning because the boot script in the
     head below sets data-color on it while the HTML is still parsing, so the
     DOM React hydrates against holds an attribute the server never rendered.
     Without it React reports a mismatch and recovers by client-rendering from
     the nearest boundary, which discards the very attribute the script set —
     the flash the script exists to prevent. It covers this element's own
     attributes only, not the tree beneath it. See the "Themes" section of
     node_modules/next/dist/docs/01-app/02-guides/preventing-flash-before-hydration.md. */
  return (
    <html lang={lang} dir={dir} data-scroll-behavior="smooth" className={fontClassName} suppressHydrationWarning>
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
          {/* Every page opens with a logo, five nav items, a language toggle
              and a CTA. Without this, reaching the content by keyboard means
              tabbing past all of them on every page — WCAG 2.4.1. It is the
              first thing in the tab order and invisible until it has focus.
              `<main>` carries tabIndex={-1} so following it moves the focus
              ring and not merely the scroll position. */}
          <a href="#main" className="skip-link">
            {lang === "ar" ? "تخطَّ إلى المحتوى" : "Skip to content"}
          </a>
          <Header />
          {children}
          <Footer />
          <ColorToggle />
        </LanguageProvider>
      </body>
    </html>
  );
}
