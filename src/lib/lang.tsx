"use client";

import { createContext, useContext, type ReactNode } from "react";
import type { Locale } from "./site";

export type Lang = Locale;

interface LangContextValue {
  lang: Lang;
  dir: "ltr" | "rtl";
}

const LangContext = createContext<LangContextValue | null>(null);

/**
 * Publishes the page's language to the components below it.
 *
 * The language is a property of the URL now, not of the visitor: /about is
 * English and /ar/about is Arabic, each served from its own root layout. That
 * replaces the previous arrangement, where the language lived in React state
 * and localStorage — which meant Arabic existed only after JavaScript ran, so
 * every Arabic page was invisible to search engines and impossible to link to.
 *
 * There is no toggle function here any more. Switching language is a
 * navigation, and the header does it with a link.
 */
export function LanguageProvider({ lang, children }: { lang: Lang; children: ReactNode }) {
  const dir = lang === "ar" ? "rtl" : "ltr";
  return <LangContext.Provider value={{ lang, dir }}>{children}</LangContext.Provider>;
}

export function useLang() {
  const ctx = useContext(LangContext);
  if (!ctx) throw new Error("useLang must be used within LanguageProvider");
  return ctx;
}
