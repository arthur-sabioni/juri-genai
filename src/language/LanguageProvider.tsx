import { createContext, useEffect, useState, ReactNode } from "react";
import type { Language } from "./types";

type LanguageContextValue = {
  language: Language;
  setLanguage: (language: Language) => void;
};

export const LanguageContext = createContext<LanguageContextValue | undefined>(undefined);

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
