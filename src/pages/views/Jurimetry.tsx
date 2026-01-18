import { Box, Button, Stack, TextField, Typography, IconButton, Switch, FormControlLabel, CircularProgress, Tooltip } from "@mui/material";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import WarningAmberIcon from "@mui/icons-material/WarningAmber";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import { useState } from "react";
import { useTranslation } from "../../language";
import { usePage } from "../../contexts/pages/hooks";
import { Pages } from "../handler/types";
import { useJurimetrySearch } from "../../contexts/jurimetry/JurimetryHooks";

function Jurimetry() {
  const { t } = useTranslation();
  const { setCurrentPage } = usePage();
  const [terms, setTerms] = useState("");
  const [enableMaxDocuments, setEnableMaxDocuments] = useState(true);
  const [maxDocuments, setMaxDocuments] = useState("10");
  const { handleSearch, isLoading, documentCount } = useJurimetrySearch({
    terms,
    enableMaxDocuments,
    maxDocuments,
  });

  return (
    <Box sx={{ p: 3, maxWidth: 600, mx: "auto" }}>
      <Box sx={{ display: "flex", alignItems: "center", mb: 2 }}>
        <IconButton 
          onClick={() => setCurrentPage(Pages.Welcome)}
          sx={{ mr: 2 }}
          aria-label="back"
        >
          <ArrowBackIcon />
        </IconButton>
        <Typography variant="h4">
          {t("jurimetry.title")}
        </Typography>
      </Box>
      <Stack spacing={3} sx={{ mt: 3 }}>
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
        {(isLoading || documentCount !== null) && (
          <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
            {isLoading ? (
              <CircularProgress size={20} />
            ) : (
              <CheckCircleIcon fontSize="small" color="success" />
            )}
            <Typography variant="body2">
              {t("jurimetry.documentCountLabel")}: {documentCount ?? 0}
            </Typography>
          </Box>
        )}
      </Stack>
    </Box>
  );
}

export default Jurimetry;
