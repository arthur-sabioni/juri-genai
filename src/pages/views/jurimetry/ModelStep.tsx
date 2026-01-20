import { Box, Typography, Stack, MenuItem, Select, FormControl, InputLabel, Button, Paper, Alert } from "@mui/material";
import CalculateIcon from '@mui/icons-material/Calculate';
import { useTranslation } from "../../../language";
import { useJurimetry } from "../../../contexts/jurimetry/JurimetryHooks";
import { LLMModel } from "../../../contexts/jurimetry/JurimetryContext";

const DUMMY_MODELS: LLMModel[] = [
  { id: "gpt-4", name: "GPT-4", multiplier: 1.5, description: "Most capable model, best for complex tasks." },
  { id: "gpt-3.5-turbo", name: "GPT-3.5 Turbo", multiplier: 0.8, description: "Fast and cost-effective for standard tasks." },
  { id: "claude-3-opus", name: "Claude 3 Opus", multiplier: 1.6, description: "High intelligence and reasoning." },
  { id: "llama-3", name: "Llama 3", multiplier: 0.5, description: "Open source, efficient." },
];

export function ModelStep() {
  const { t } = useTranslation();
  const { 
    selectedModel, 
    setSelectedModel, 
    calculatedPrice, 
    setCalculatedPrice,
    maxDocuments
  } = useJurimetry();

  const handleModelChange = (event: any) => {
    const modelId = event.target.value;
    const model = DUMMY_MODELS.find(m => m.id === modelId) || null;
    setSelectedModel(model);
    setCalculatedPrice(null); // Reset price when model changes
  };

  const handleCalculatePrice = () => {
    if (!selectedModel) return;
    
    // Dummy calculation: Base price (10) * multiplier * number of docs (or 10 if unlimited/not set)
    const docs = parseInt(maxDocuments) || 10;
    const basePrice = 10;
    const price = basePrice * selectedModel.multiplier * (docs / 10);
    setCalculatedPrice(parseFloat(price.toFixed(2)));
  };

  return (
    <Box sx={{ mt: 3, maxWidth: 800, mx: "auto" }}>
      <Stack spacing={4}>
        <Alert severity="info">
          {t("jurimetry.modelImpactWarning")}
        </Alert>

        <FormControl fullWidth>
          <InputLabel>{t("jurimetry.selectModel")}</InputLabel>
          <Select
            value={selectedModel?.id || ""}
            label={t("jurimetry.selectModel")}
            onChange={handleModelChange}
          >
            {DUMMY_MODELS.map((model) => (
              <MenuItem key={model.id} value={model.id}>
                {model.name}
              </MenuItem>
            ))}
          </Select>
        </FormControl>

        {selectedModel && (
          <Paper variant="outlined" sx={{ p: 3 }}>
            <Stack spacing={2}>
              <Typography variant="h6">{t("jurimetry.modelInfo")}</Typography>
              
              <Box>
                <Typography variant="subtitle2">Name</Typography>
                <Typography variant="body1">{selectedModel.name}</Typography>
              </Box>
              
              <Box>
                <Typography variant="subtitle2">Description</Typography>
                <Typography variant="body1">{selectedModel.description}</Typography>
              </Box>

              <Box sx={{ display: "flex", gap: 4, mt: 2 }}>
                {calculatedPrice !== null && (
                  <Box>
                    <Typography variant="subtitle2" color="primary">{t("jurimetry.price")}</Typography>
                    <Typography variant="h5" color="primary">R${calculatedPrice}</Typography>
                  </Box>
                )}
                
                {calculatedPrice !== null && (
                  <Box>
                    <Typography variant="subtitle2" color="text.secondary">{t("jurimetry.duration")}</Typography>
                    <Typography variant="h5" color="text.secondary">~{(calculatedPrice * 2).toFixed(0)}s</Typography>
                  </Box>
                )}
              </Box>
            </Stack>
          </Paper>
        )}

        <Box sx={{ display: "flex", justifyContent: "center" }}>
          <Button
            variant="contained"
            size="large"
            startIcon={<CalculateIcon />}
            onClick={handleCalculatePrice}
            disabled={!selectedModel}
          >
            {t("jurimetry.calculatePrice")}
          </Button>
        </Box>
      </Stack>
    </Box>
  );
}
