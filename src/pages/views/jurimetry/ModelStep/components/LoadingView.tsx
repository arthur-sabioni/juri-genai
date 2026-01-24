import { Box, Typography, LinearProgress } from "@mui/material";
import { LoadingState } from "../hooks/useModelWorkflow";
import { useTranslation } from "../../../../../language";

interface LoadingViewProps {
  loadingState: LoadingState;
}

export function LoadingView({ loadingState }: LoadingViewProps) {
  const { t } = useTranslation();

  return (
    <Box sx={{ mt: 5, textAlign: 'center', maxWidth: 800, mx: "auto" }}>
      <Typography variant="h6" gutterBottom>
        {loadingState === 'STARTING' && t("jurimetry.loading.starting")}
        {loadingState === 'PROCESSING' && t("jurimetry.loading.processing")}
        {loadingState === 'CALCULATING' && t("jurimetry.loading.calculating")}
      </Typography>
      <LinearProgress sx={{ maxWidth: 400, mx: 'auto', mt: 2 }} />
    </Box>
  );
}
