import { useContext } from "react";
import { PageContext } from "./PagesProvider";

export function usePage() {
  const context = useContext(PageContext);
  if (!context) {
    throw new Error("usePage must be used within a PagesProvider");
  }
  return context;
}
