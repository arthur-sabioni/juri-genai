import type { Language } from "./types";

export const translations: Record<Language, Record<string, string>> = {
  "en-us": {
    "header.signOut": "Sign Out",
    "header.language": "Language",
    "welcome.heading": "Welcome",
    "welcome.subtitle": "You are now signed in.",
    "welcome.startJurimetry": "Start Jurimetry",
    "jurimetry.searchTerms": "Search Terms",
    "jurimetry.runSearch": "Run Search",
    "jurimetry.enableMaxDocuments": "Limit number of documents",
    "jurimetry.maxDocuments": "Max documents",
    "jurimetry.loading": "Searching documents...",
    "jurimetry.documentCountLabel": "Document count",
    "jurimetry.unlimitedWarning": "Running without a document limit can greatly increase processing time and cost. Consider setting a maximum number of documents for your search.",
  },
  "pt-br": {
    "header.signOut": "Sair",
    "header.language": "Idioma",
    "welcome.heading": "Fala comigo",
    "welcome.subtitle": "Pronto para uma nova aventura?",
    "welcome.startJurimetry": "Iniciar Jurimetria",
    "jurimetry.title": "Jurimetria",
    "jurimetry.searchTerms": "Termos da pesquisa",
    "jurimetry.runSearch": "Pesquisar",
    "jurimetry.enableMaxDocuments": "Limitar número de documentos",
    "jurimetry.maxDocuments": "Máximo de documentos",
    "jurimetry.loading": "Buscando documentos...",
    "jurimetry.documentCountLabel": "Quantidade de documentos encontrados",
    "jurimetry.unlimitedWarning": "Executar a busca sem limite de documentos pode aumentar drasticamente o tempo de processamento e o custo. Considere definir um número máximo de documentos para a sua pesquisa.",
  },
};
