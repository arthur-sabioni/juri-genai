import { Box, TextField, Button, Switch, FormControlLabel, Tooltip, Typography } from "@mui/material";
import WarningAmberIcon from "@mui/icons-material/WarningAmber";
import { useTranslation } from "../../../../../language";

interface SearchFormProps {
  terms: string;
  setTerms: (value: string) => void;
  enableMaxDocuments: boolean;
  setEnableMaxDocuments: (value: boolean) => void;
  maxDocuments: string;
  setMaxDocuments: (value: string) => void;
  onSearch: () => void;
  isLoading: boolean;
}

export function SearchForm({
  terms,
  setTerms,
  enableMaxDocuments,
  setEnableMaxDocuments,
  maxDocuments,
  setMaxDocuments,
  onSearch,
  isLoading
}: SearchFormProps) {
  const { t } = useTranslation();

  return (
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
        onClick={onSearch}
        size="large"
        disabled={isLoading || !terms.trim()}
      >
        {t("jurimetry.runSearch")}
      </Button>
    </Box>
  );
}
