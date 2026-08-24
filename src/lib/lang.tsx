"use client";

import { createContext, useCallback, useContext, useState, type ReactNode } from "react";

export type Lang = "en" | "ar";

interface LangContextValue {
  lang: Lang;
  dir: "ltr" | "rtl";
  toggleLang: () => void;
}

const LangContext = createContext<LangContextValue | null>(null);

export function LanguageProvider({ children }: { children: ReactNode }) {
  const [lang, setLang] = useState<Lang>("en");
  const toggleLang = useCallback(() => {
    setLang((current) => (current === "ar" ? "en" : "ar"));
  }, []);
  const dir = lang === "ar" ? "rtl" : "ltr";

  return (
    <LangContext.Provider value={{ lang, dir, toggleLang }}>
      <div dir={dir} style={{ background: "#FFFFFF", minHeight: "100vh" }}>
        {children}
      </div>
    </LangContext.Provider>
  );
}

export function useLang() {
  const ctx = useContext(LangContext);
  if (!ctx) throw new Error("useLang must be used within LanguageProvider");
  return ctx;
}
