import { Box, Stack } from "@mui/material";
import { useCustomizationWorkflow } from "./hooks/useCustomizationWorkflow";
import { ColumnList } from "./components/ColumnList";
import { ProcessDescriptionInput } from "./components/ProcessDescriptionInput";

export function CustomizationStep() {
  const { 
    processDescription, 
    setProcessDescription, 
    columns, 
    handleAddColumn, 
    handleRemoveColumn, 
    updateColumn 
  } = useCustomizationWorkflow();

  return (
    <Box sx={{ mt: 2, pt: 1, maxWidth: 800, mx: "auto", width: "100%", height: "100%", display: "flex", flexDirection: "column", overflow: "hidden" }}>
      <Stack spacing={4} sx={{ height: "100%", overflow: "hidden" }}>
        <ProcessDescriptionInput 
          value={processDescription} 
          onChange={setProcessDescription} 
        />

        <ColumnList
          columns={columns}
          onAddColumn={handleAddColumn}
          onRemoveColumn={handleRemoveColumn}
          onUpdateColumn={updateColumn}
        />
      </Stack>
    </Box>
  );
}
