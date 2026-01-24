import { useContext } from "react";
import { JurimetryContext } from "./JurimetryContext";

export function useJurimetry() {
  const context = useContext(JurimetryContext);
  if (!context) {
    throw new Error("useJurimetry must be used within a JurimetryProvider");
  }
  return context;
}
