import { Box, TextField, Stack, Button } from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import { useTranslation } from "../../../language";
import { useJurimetry } from "../../../contexts/jurimetry/JurimetryHooks";
import { CustomizationColumn } from "../../../contexts/jurimetry/JurimetryContext";
import { v4 as uuidv4 } from 'uuid';
import { SheetColumnInput } from "../../../components/SheetColumnInput";

export function CustomizationStep() {
  const { t } = useTranslation();
  const { 
    processDescription, 
    setProcessDescription, 
    columns, 
    setColumns 
  } = useJurimetry();

  const handleAddColumn = () => {
    setColumns([
      ...columns,
      { id: uuidv4(), title: "", description: "", hasTaxonomy: false }
    ]);
  };

  const handleRemoveColumn = (id: string) => {
    if (columns.length > 1) {
      setColumns(columns.filter(col => col.id !== id));
    }
  };

  const updateColumn = (id: string, field: keyof CustomizationColumn, value: any) => {
    setColumns(columns.map(col => {
      if (col.id === id) {
        return { ...col, [field]: value };
      }
      return col;
    }));
  };

  return (
    <Box sx={{ mt: 2, pt: 1, maxWidth: 800, mx: "auto", width: "100%", height: "100%", display: "flex", flexDirection: "column", overflow: "hidden" }}>
      <Stack spacing={4} sx={{ height: "100%", overflow: "hidden" }}>
        <TextField
          label={t("jurimetry.processDescription")}
          multiline
          minRows={4}
          value={processDescription}
          onChange={(e) => setProcessDescription(e.target.value)}
          fullWidth
          variant="outlined"
          sx={{ flexShrink: 0 }}
        />

        <Box sx={{ flex: "0 1 auto", overflowY: "auto", minHeight: 0, pr: 1 }}>
          <Stack spacing={3}>
            {columns.map((column, index) => (
              <SheetColumnInput
                key={column.id}
                column={column}
                index={index}
                canRemove={columns.length > 1}
                onRemove={handleRemoveColumn}
                onUpdate={updateColumn}
              />
            ))}
          </Stack>
        </Box>

        <Box sx={{ display: "flex", justifyContent: "center", mt: 3, mb: 1, flexShrink: 0 }}>
          <Button
            variant="outlined"
            startIcon={<AddIcon />}
            onClick={handleAddColumn}
          >
            {t("jurimetry.addColumn")}
          </Button>
        </Box>
      </Stack>
    </Box>
  );
}
