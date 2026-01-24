import { Box, Typography, List, ListItem, ListItemText, Link } from "@mui/material";
import { useTranslation } from "../../../../../language";
import { SearchResultItem } from "../../context/JurimetryContext";

interface SearchResultsProps {
  numFound: number;
  results: SearchResultItem[];
}

export function SearchResults({ numFound, results }: SearchResultsProps) {
  const { t } = useTranslation();

  return (
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
                    {item.title || item.url}
                  </Link>
                }
                secondary={`Score: ${item.score}`}
              />
            </ListItem>
          ))}
        </List>
      </Box>
    </Box>
  );
}
