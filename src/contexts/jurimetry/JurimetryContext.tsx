import { createContext, useState, ReactNode, useEffect } from "react";
import { SearchResultItem } from "../../services/api/jurimetry";

export type CustomizationColumn = {
  id: string;
  title: string;
  description: string;
  hasTaxonomy: boolean;
};

export type LLMModel = {
  id: string;
  name: string;
  multiplier: number;
  description: string;
};

type JurimetryContextValue = {
  preProcessId: string | null;
  setPreProcessId: (id: string | null) => void;
  // Search State
  terms: string;
  setTerms: (terms: string) => void;
  enableMaxDocuments: boolean;
  setEnableMaxDocuments: (enable: boolean) => void;
  maxDocuments: string;
  setMaxDocuments: (max: string) => void;
  numFound: number | null;
  setNumFound: (num: number | null) => void;
  results: SearchResultItem[];
  setResults: (results: SearchResultItem[]) => void;
  // Customization State
  processDescription: string;
  setProcessDescription: (desc: string) => void;
  columns: CustomizationColumn[];
  setColumns: (columns: CustomizationColumn[]) => void;
  // Model State
  selectedModel: LLMModel | null;
  setSelectedModel: (model: LLMModel | null) => void;
  calculatedPrice: number | null;
  setCalculatedPrice: (price: number | null) => void;
};

export const JurimetryContext = createContext<JurimetryContextValue | undefined>(undefined);

type JurimetryProviderProps = {
  children: ReactNode;
};

export function JurimetryProvider({ children }: JurimetryProviderProps) {
  const [preProcessId, setPreProcessId] = useState<string | null>(null);
  
  // Search State
  const [terms, setTerms] = useState("");
  const [enableMaxDocuments, setEnableMaxDocuments] = useState(true);
  const [maxDocuments, setMaxDocuments] = useState("10");
  const [numFound, setNumFound] = useState<number | null>(null);
  const [results, setResults] = useState<SearchResultItem[]>([]);

  // Customization State
  const [processDescription, setProcessDescription] = useState("");
  const [columns, setColumns] = useState<CustomizationColumn[]>([
    { id: "1", title: "", description: "", hasTaxonomy: false }
  ]);

  // Model State
  const [selectedModel, setSelectedModel] = useState<LLMModel | null>(null);
  const [calculatedPrice, setCalculatedPrice] = useState<number | null>(null);

  // Clear results when terms change
  useEffect(() => {
    setResults([]);
    setNumFound(null);
  }, [terms]);

  return (
    <JurimetryContext.Provider 
      value={{ 
        preProcessId, setPreProcessId,
        terms, setTerms,
        enableMaxDocuments, setEnableMaxDocuments,
        maxDocuments, setMaxDocuments,
        numFound, setNumFound,
        results, setResults,
        processDescription, setProcessDescription,
        columns, setColumns,
        selectedModel, setSelectedModel,
        calculatedPrice, setCalculatedPrice
      }}
    >
      {children}
    </JurimetryContext.Provider>
  );
}

