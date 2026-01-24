import { Box, Stack } from "@mui/material";
import { useState } from "react";
import { useTranslation } from "../../../../language";
import { useJurimetry } from "../context/JurimetryHooks";
import { useModelWorkflow } from "./hooks/useModelWorkflow";
import { ModelList } from "./components/ModelList";
import { LoadingView } from "./components/LoadingView";
import { LLMModel } from "../context/JurimetryContext";
import { Alert } from "../../../../components/Alert";

export function ModelStep() {
  const { t } = useTranslation();
  const { selectedModel, setSelectedModel, setCalculatedPrice } = useJurimetry();
  const { loadingState, availableModels, errorMessage } = useModelWorkflow();
  const [warningOpen, setWarningOpen] = useState(true);

  const handleModelSelect = (model: LLMModel) => {
    setSelectedModel(model);
    setCalculatedPrice(model.price);
  };

  if (loadingState === 'ERROR') {
     return (
        <Box sx={{ mt: 3, maxWidth: 800, mx: "auto" }}>
            <Alert severity="error">{errorMessage}</Alert>
        </Box>
     );
  }

  if (loadingState !== 'READY') {
    return <LoadingView loadingState={loadingState} />;
  }

  return (
    <Box sx={{ mt: 3, maxWidth: 800, mx: "auto", display: 'flex', flexDirection: 'column', height: '100%', overflow: 'hidden' }}>
      <Stack spacing={4} sx={{ height: '100%', overflow: 'hidden' }}>
        <Alert 
          severity="info" 
          sx={{ flexShrink: 0 }}
          open={warningOpen}
          onClose={() => setWarningOpen(false)}
        >
          {t("jurimetry.modelImpactWarning")}
        </Alert>

        <ModelList 
          availableModels={availableModels} 
          selectedModel={selectedModel}
          onSelect={handleModelSelect}
        />
      </Stack>
    </Box>
  );
}
