import { Box, Stack, Button } from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import { SheetColumnInput } from "./SheetColumnInput";
import { CustomizationColumn } from "../../context/JurimetryContext";
import { useTranslation } from "../../../../../language";

interface ColumnListProps {
  columns: CustomizationColumn[];
  onAddColumn: () => void;
  onRemoveColumn: (id: string) => void;
  onUpdateColumn: (id: string, field: keyof CustomizationColumn, value: string | boolean) => void;
}

export function ColumnList({ columns, onAddColumn, onRemoveColumn, onUpdateColumn }: ColumnListProps) {
  const { t } = useTranslation();

  const handleUpdateColumn = (id: string, field: string | number | symbol, value: string | boolean) => {
    onUpdateColumn(id, field as keyof CustomizationColumn, value);
  };

  return (
    <>
      <Box sx={{ flex: "0 1 auto", overflowY: "auto", minHeight: 0, pr: 1 }}>
        <Stack spacing={3}>
          {columns.map((column) => (
            <SheetColumnInput
              key={column.id}
              column={column}
              canRemove={columns.length > 1}
              onUpdate={handleUpdateColumn}
              onRemove={onRemoveColumn}
            />
          ))}
        </Stack>
      </Box>

      <Box sx={{ display: "flex", justifyContent: "center", mt: 3, mb: 1, flexShrink: 0 }}>
        <Button
          variant="outlined"
          startIcon={<AddIcon />}
          onClick={onAddColumn}
        >
          {t("jurimetry.addColumn")}
        </Button>
      </Box>
    </>
  );
}
