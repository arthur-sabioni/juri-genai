import { useContext, useState, useCallback } from "react";
import { JurimetryContext } from "./JurimetryContext";
import { jurimetryService } from "../../services/api/jurimetry";

export function useJurimetry() {
  const context = useContext(JurimetryContext);
  if (!context) {
    throw new Error("useJurimetry must be used within a JurimetryProvider");
  }
  return context;
}

type UseJurimetrySearchParams = {
  terms: string;
  enableMaxDocuments: boolean;
  maxDocuments: string;
};

export function useJurimetrySearch({
  terms,
  enableMaxDocuments,
  maxDocuments,
}: UseJurimetrySearchParams) {
  const { setPreProcessId } = useJurimetry();
  const [isLoading, setIsLoading] = useState(false);
  const [documentCount, setDocumentCount] = useState<number | null>(null);

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
      setDocumentCount(null);

      const response = await jurimetryService.startPreProcess(terms, maxDocs);
      if (response.preProcessId && typeof response.preProcessId === "string") {
        setPreProcessId(response.preProcessId);

        const targetStatuses = new Set(["FETCHED", "READY"]);
        let done = false;

        while (!done) {
          const statusResponse = await jurimetryService.getPreProcessStatus(response.preProcessId);
          const status = statusResponse.status ?? "";

          console.log("Pre-process status:", statusResponse);

          if (typeof statusResponse.documentCount === "number") {
            setDocumentCount(statusResponse.documentCount);
            console.log("Document count:", statusResponse.documentCount);
          }

          if (targetStatuses.has(status)) {
            done = true;
            setIsLoading(false);
            break;
          }

          await new Promise((resolve) => setTimeout(resolve, 2000));
        }
      } else {
        setIsLoading(false);
      }
    } catch (error) {
      console.error("Search failed:", error);
      setIsLoading(false);
    }
  }, [enableMaxDocuments, maxDocuments, terms, setPreProcessId]);

  return {
    handleSearch,
    isLoading,
    documentCount,
  };
}
