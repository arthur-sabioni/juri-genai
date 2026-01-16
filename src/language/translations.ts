import type { Language } from "./types";

export const translations: Record<Language, Record<string, string>> = {
  "en-us": {
    "header.signOut": "Sign Out",
    "header.language": "Language",
    "welcome.heading": "Welcome",
    "welcome.subtitle": "You are now signed in.",
    "welcome.startJurimetry": "Start Jurimetry",
    "jurimetry.searchTheme": "Search Theme",
    "jurimetry.searchTerms": "Search Terms",
    "jurimetry.runSearch": "Run Search",
  },
  "pt-br": {
    "header.signOut": "Sair",
    "header.language": "Idioma",
    "welcome.heading": "Fala comigo",
    "welcome.subtitle": "Pronto para uma nova aventura?",
    "welcome.startJurimetry": "Iniciar Jurimetria",
    "jurimetry.title": "Jurimetria",
    "jurimetry.searchTheme": "Tema da pesquisa",
    "jurimetry.searchTerms": "Termos da pesquisa",
    "jurimetry.runSearch": "Executar",
  },
};

