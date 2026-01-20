import { Box, Button, Stack, TextField, Typography, Switch, FormControlLabel, CircularProgress, Tooltip, List, ListItem, ListItemText, Link } from "@mui/material";
import WarningAmberIcon from "@mui/icons-material/WarningAmber";
import { useTranslation } from "../../../language";
import { useJurimetry, useJurimetrySearch } from "../../../contexts/jurimetry/JurimetryHooks";

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
      <Box sx={{ flexShrink: 0, display: "flex", flexDirection: "column", gap: 3 }}>
        <TextField
          label={t("jurimetry.searchTerms")}
          variant="outlined"
          fullWidth
          value={terms}
          onChange={(e) => setTerms(e.target.value)}
        />
        <FormControlLabel
          control={
            <Switch
              checked={enableMaxDocuments}
              onChange={(e) => setEnableMaxDocuments(e.target.checked)}
              color="primary"
            />
          }
          label={
            <Box sx={{ display: "flex", alignItems: "center", gap: 0.5 }}>
              <Typography variant="body2">
                {t("jurimetry.enableMaxDocuments")}
              </Typography>
              {!enableMaxDocuments && (
                <Tooltip title={t("jurimetry.unlimitedWarning")} arrow>
                  <WarningAmberIcon fontSize="small" color="warning" />
                </Tooltip>
              )}
            </Box>
          }
        />
        {enableMaxDocuments && (
          <TextField
            label={t("jurimetry.maxDocuments")}
            type="number"
            variant="outlined"
            fullWidth
            value={maxDocuments}
            onChange={(e) => setMaxDocuments(e.target.value)}
            slotProps={{
              htmlInput: { min: 1 },
            }}
          />
        )}
        <Button
          variant="contained"
          color="primary"
          onClick={handleSearch}
          size="large"
          disabled={isLoading}
        >
          {t("jurimetry.runSearch")}
        </Button>
      </Box>
      
      {isLoading && (
        <Box sx={{ display: "flex", alignItems: "center", gap: 1, flexShrink: 0 }}>
          <CircularProgress size={20} />
          <Typography variant="body2">{t("jurimetry.loading")}</Typography>
        </Box>
      )}

      {!isLoading && numFound !== null && (
        <Box sx={{ flex: 1, minHeight: 0, display: "flex", flexDirection: "column" }}>
          <Box sx={{ flexShrink: 0 }}>
            <Typography variant="subtitle1" sx={{ fontWeight: "bold", mb: 0.5 }}>
              {t("jurimetry.resultsFound").replace("{count}", numFound.toString())}
            </Typography>
            <Typography variant="body2" color="text.secondary" sx={{ mb: 1 }}>
              {t("jurimetry.topResults")}
            </Typography>
          </Box>
          <Box sx={{ flex: 1, overflowY: "auto", minHeight: 0 }}>
            <List>
              {results.map((item, index) => (
                <ListItem key={index} divider disablePadding sx={{ py: 1 }}>
                  <ListItemText
                    primary={
                      <Link href={item.url} target="_blank" rel="noopener noreferrer" underline="hover">
                        {item.title}
                      </Link>
                    }
                    secondary={`Score: ${item.score}`}
                  />
                </ListItem>
              ))}
            </List>
          </Box>
        </Box>
      )}
    </Stack>
  );
}
