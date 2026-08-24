"use client";

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useState,
  type ReactNode,
} from "react";

export type Lang = "en" | "ar";

/** Remembers the visitor's choice, so a reload doesn't drop them back to English. */
export const LANG_STORAGE_KEY = "arak-lang";

interface LangContextValue {
  lang: Lang;
  dir: "ltr" | "rtl";
  toggleLang: () => void;
}

const LangContext = createContext<LangContextValue | null>(null);

export function LanguageProvider({ children }: { children: ReactNode }) {
  const [lang, setLang] = useState<Lang>("en");

  // Restored after mount rather than during the first render: the server has
  // no access to localStorage and always renders English, so reading it any
  // earlier would put the two out of step and trip a hydration mismatch.
  useEffect(() => {
    try {
      // eslint-disable-next-line react-hooks/set-state-in-effect
      if (localStorage.getItem(LANG_STORAGE_KEY) === "ar") setLang("ar");
    } catch {
      // Private browsing or blocked storage — English for this session.
    }
  }, []);

  const toggleLang = useCallback(() => {
    setLang((current) => {
      const next: Lang = current === "ar" ? "en" : "ar";
      try {
        localStorage.setItem(LANG_STORAGE_KEY, next);
      } catch {
        // Non-fatal: the switch still works for this session.
      }
      return next;
    });
  }, []);

  const dir = lang === "ar" ? "rtl" : "ltr";

  return (
    <LangContext.Provider value={{ lang, dir, toggleLang }}>
      {/* `lang` alongside `dir` is what tells the browser to pick Arabic
          shaping and line-breaking, and screen readers which voice to use. */}
      <div dir={dir} lang={lang} style={{ background: "#FFFFFF", minHeight: "100vh" }}>
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
