import { createContext, useState, ReactNode } from "react";
import { Pages } from "./types";

type PageContextValue = {
  currentPage: Pages;
  setCurrentPage: (page: Pages) => void;
};

export const PageContext = createContext<PageContextValue | undefined>(undefined);

type PagesProviderProps = {
  children: ReactNode;
};

export function PagesProvider({ children }: PagesProviderProps) {
  const [currentPage, setCurrentPage] = useState<Pages>(Pages.Welcome);

  return (
    <PageContext.Provider value={{ currentPage, setCurrentPage }}>
      {children}
    </PageContext.Provider>
  );
}
