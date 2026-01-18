import { createContext, useState, ReactNode } from "react";

type JurimetryContextValue = {
  preProcessId: string | null;
  setPreProcessId: (id: string | null) => void;
};

export const JurimetryContext = createContext<JurimetryContextValue | undefined>(undefined);

type JurimetryProviderProps = {
  children: ReactNode;
};

export function JurimetryProvider({ children }: JurimetryProviderProps) {
  const [preProcessId, setPreProcessId] = useState<string | null>(null);

  return (
    <JurimetryContext.Provider value={{ preProcessId, setPreProcessId }}>
      {children}
    </JurimetryContext.Provider>
  );
}

