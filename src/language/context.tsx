import { createContext, useContext, useEffect, useState, ReactNode } from "react";
import type { Language } from "./types";
import { translations } from "./translations";

type LanguageContextValue = {
  language: Language;
  setLanguage: (language: Language) => void;
};

const LanguageContext = createContext<LanguageContextValue | undefined>(undefined);

export function LanguageProvider({ children }: { children: ReactNode }) {
  const [language, setLanguage] = useState<Language>(() => {
    if (typeof window !== "undefined") {
      const stored = window.localStorage.getItem("language");
      if (stored === "en-us" || stored === "pt-br") {
        return stored as Language;
      }
    }
    return "pt-br";
  });

  useEffect(() => {
    if (typeof window !== "undefined") {
      window.localStorage.setItem("language", language);
    }
  }, [language]);

  return (
    <LanguageContext.Provider value={{ language, setLanguage }}>
      {children}
    </LanguageContext.Provider>
  );
}

export function useLanguage() {
  const context = useContext(LanguageContext);
  if (!context) {
    throw new Error("useLanguage must be used within a LanguageProvider");
  }
  return context;
}

export function useTranslation() {
  const { language } = useLanguage();

  function t(key: string) {
    const table = translations[language];
    if (table && table[key]) {
      return table[key];
    }
    const fallback = translations["pt-br"][key];
    if (fallback) {
      return fallback;
    }
    return key;
  }

  return { t, language };
}

