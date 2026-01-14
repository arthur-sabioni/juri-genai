import type { Language } from "./types";

export const translations: Record<Language, Record<string, string>> = {
  "en-us": {
    "header.signOut": "Sign Out",
    "header.language": "Language",
    "welcome.heading": "Welcome",
    "welcome.subtitle": "You are now signed in.",
  },
  "pt-br": {
    "header.signOut": "Sair",
    "header.language": "Idioma",
    "welcome.heading": "Fala comigo",
    "welcome.subtitle": "Pronto para uma nova aventura?",
  },
};

