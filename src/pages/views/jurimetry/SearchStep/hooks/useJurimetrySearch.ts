import { useState, useCallback } from "react";
import { useJurimetry } from "../../context/JurimetryHooks";
import { DefaultService } from "../../../../../client";

type UseJurimetrySearchParams = {
  // Optional overrides, otherwise uses context
  terms?: string;
  enableMaxDocuments?: boolean;
  maxDocuments?: string;
};

export function useJurimetrySearch(params?: UseJurimetrySearchParams) {
  const context = useJurimetry();
  
  // Use params if provided, otherwise context
  const terms = params?.terms ?? context.terms;
  const enableMaxDocuments = params?.enableMaxDocuments ?? context.enableMaxDocuments;
  const maxDocuments = params?.maxDocuments ?? context.maxDocuments;

  const [isLoading, setIsLoading] = useState(false);
  
  // We use context state for results
  const { setNumFound, results, setResults, numFound } = context;

  const handleSearch = useCallback(async () => {
    const parsedMaxDocuments =
      enableMaxDocuments && maxDocuments.trim() !== "" ? Number(maxDocuments) : undefined;

    const maxDocs =
      typeof parsedMaxDocuments === "number" && Number.isFinite(parsedMaxDocuments)
        ? parsedMaxDocuments
        : undefined;

    console.log("Searching...", { terms, maxDocuments: maxDocs });

    try {
      setIsLoading(true);
      setNumFound(null);
      setResults([]);

      const response = await DefaultService.search(terms);
      
      if (typeof response.numFound === "number") {
        setNumFound(response.numFound);
      }

      if (Array.isArray(response.results)) {
        setResults(response.results);
      }

      setIsLoading(false);
    } catch (error) {
      console.error("Search failed:", error);
      setIsLoading(false);
    }
  }, [enableMaxDocuments, maxDocuments, terms, setNumFound, setResults]);

  return {
    handleSearch,
    isLoading,
    numFound,
    results,
  };
}
