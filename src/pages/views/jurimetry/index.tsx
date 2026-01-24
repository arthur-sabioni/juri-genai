import { Box, Button, Typography, IconButton, Stepper, Step, StepLabel, Tooltip } from "@mui/material";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import { useState } from "react";
import { useTranslation } from "../../../language";
import { usePage } from "../../handler/context/usePage";
import { useJurimetry } from "./context/JurimetryHooks";
import { Pages } from "../../handler/types";
import { SearchStep } from "./SearchStep";
import { CustomizationStep } from "./CustomizationStep";
import { ModelStep } from "./ModelStep";

function Jurimetry() {
  const { t } = useTranslation();
  const { setCurrentPage } = usePage();
  const { results } = useJurimetry();
  const [activeStep, setActiveStep] = useState(0);

  const steps = [
    t("jurimetry.step.search"),
    t("jurimetry.step.customization"),
    t("jurimetry.step.model"),
  ];

  const handleNext = () => {
    setActiveStep((prevActiveStep) => prevActiveStep + 1);
  };

  const handleBack = () => {
    setActiveStep((prevActiveStep) => prevActiveStep - 1);
  };

  const getStepContent = (step: number) => {
    switch (step) {
      case 0:
        return <SearchStep />;
      case 1:
        return <CustomizationStep />;
      case 2:
        return <ModelStep />;
      default:
        return "Unknown step";
    }
  };

  const isNextDisabled = () => {
    if (activeStep === 0) {
      // Disable if no results
      return results.length === 0;
    }
    return false;
  };

  return (
    <Box sx={{ p: 3, maxWidth: 800, mx: "auto", display: "flex", flexDirection: "column", height: "calc(100vh - 100px)" }}>
      <Box sx={{ display: "flex", alignItems: "center", mb: 4, flexShrink: 0 }}>
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

      <Box sx={{ mb: 4, flexShrink: 0 }}>
        <Stepper activeStep={activeStep}>
          {steps.map((label) => (
            <Step key={label}>
              <StepLabel>{label}</StepLabel>
            </Step>
          ))}
        </Stepper>
      </Box>

      <Box sx={{ flex: 1, overflowY: "hidden", minHeight: 0, px: 3, display: "flex", flexDirection: "column" }}>
        {getStepContent(activeStep)}
      </Box>

      <Box sx={{ display: "flex", flexDirection: "row", pt: 2, mt: 4, borderTop: 1, borderColor: "divider", flexShrink: 0 }}>
        <Button
          color="inherit"
          disabled={activeStep === 0}
          onClick={handleBack}
          sx={{ mr: 1 }}
        >
          {t("jurimetry.back")}
        </Button>
        <Box sx={{ flex: "1 1 auto" }} />
        {activeStep < steps.length - 1 && (
          <Tooltip title={isNextDisabled() ? t("jurimetry.nextDisabledTooltip") : ""}>
            <span>
              <Button onClick={handleNext} disabled={isNextDisabled()}>
                {t("jurimetry.next")}
              </Button>
            </span>
          </Tooltip>
        )}
      </Box>
    </Box>
  );
}

export default Jurimetry;
