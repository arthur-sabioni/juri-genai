import { Box, Stack, CircularProgress, Typography } from "@mui/material";
import { useTranslation } from "../../../../language";
import { useJurimetry } from "../context/JurimetryHooks";
import { useJurimetrySearch } from "./hooks/useJurimetrySearch";
import { SearchForm } from "./components/SearchForm";
import { SearchResults } from "./components/SearchResults";

export function SearchStep() {
  const { t } = useTranslation();
  const { 
    terms, setTerms, 
    enableMaxDocuments, setEnableMaxDocuments, 
    maxDocuments, setMaxDocuments 
  } = useJurimetry();
  
  const { handleSearch, isLoading, numFound, results } = useJurimetrySearch();

  return (
    <Stack spacing={3} sx={{ mt: 2, pt: 1, height: "100%", overflow: "hidden" }}>
      <SearchForm
        terms={terms}
        setTerms={setTerms}
        enableMaxDocuments={enableMaxDocuments}
        setEnableMaxDocuments={setEnableMaxDocuments}
        maxDocuments={maxDocuments}
        setMaxDocuments={setMaxDocuments}
        onSearch={handleSearch}
        isLoading={isLoading}
      />
      
      {isLoading && (
        <Box sx={{ display: "flex", alignItems: "center", gap: 1, flexShrink: 0 }}>
          <CircularProgress size={20} />
          <Typography variant="body2">{t("jurimetry.loading")}</Typography>
        </Box>
      )}

      {!isLoading && numFound !== null && (
        <SearchResults numFound={numFound} results={results} />
      )}
    </Stack>
  );
}
