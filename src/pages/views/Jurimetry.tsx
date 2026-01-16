import { Box, Button, Stack, TextField, Typography, IconButton } from "@mui/material";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import { useState } from "react";
import { useTranslation } from "../../language";
import { usePage } from "../handler/hooks";
import { Pages } from "../handler/types";

function Jurimetry() {
  const { t } = useTranslation();
  const { setCurrentPage } = usePage();
  const [theme, setTheme] = useState("");
  const [terms, setTerms] = useState("");

  const handleSearch = () => {
    console.log("Searching...", { theme, terms });
  };

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
      <Stack spacing={3}>
        <TextField
          label={t("jurimetry.searchTheme")}
          variant="outlined"
          fullWidth
          value={theme}
          onChange={(e) => setTheme(e.target.value)}
        />
        <TextField
          label={t("jurimetry.searchTerms")}
          variant="outlined"
          fullWidth
          value={terms}
          onChange={(e) => setTerms(e.target.value)}
        />
        <Button
          variant="contained"
          color="primary"
          onClick={handleSearch}
          size="large"
        >
          {t("jurimetry.runSearch")}
        </Button>
      </Stack>
    </Box>
  );
}

export default Jurimetry;
