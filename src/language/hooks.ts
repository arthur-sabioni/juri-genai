import { useContext } from "react";
import { LanguageContext } from "./LanguageProvider";
import { translations } from "./translations";

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
