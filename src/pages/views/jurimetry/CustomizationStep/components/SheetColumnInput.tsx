import { Box, TextField, Typography, Stack, FormControlLabel, Switch, IconButton, Paper, Collapse } from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import KeyboardArrowUpIcon from '@mui/icons-material/KeyboardArrowUp';
import { useTranslation } from "../../../../../language";
import { CustomizationColumn } from "../../context/JurimetryContext";
import { useState } from "react";

interface SheetColumnInputProps {
  column: CustomizationColumn;
  canRemove: boolean;
  onRemove: (id: string) => void;
  onUpdate: (id: string, field: keyof CustomizationColumn, value: string | boolean) => void;
}

export function SheetColumnInput({ column, canRemove, onRemove, onUpdate }: SheetColumnInputProps) {
  const { t } = useTranslation();
  const [isOpen, setIsOpen] = useState(true);

  const handleToggle = (e: React.MouseEvent) => {
    e.stopPropagation();
    setIsOpen(!isOpen);
  };

  const handleRemove = (e: React.MouseEvent) => {
    e.stopPropagation();
    onRemove(column.id);
  };

  return (
    <Paper variant="outlined" sx={{ overflow: 'hidden' }}>
      <Box 
        sx={{ 
          p: 2, 
          display: 'flex', 
          alignItems: 'center', 
          gap: 2, 
          cursor: 'pointer',
          '&:hover': {
            bgcolor: 'action.hover'
          }
        }}
        onClick={handleToggle}
      >
        <IconButton size="small" onClick={handleToggle}>
          {isOpen ? <KeyboardArrowUpIcon /> : <KeyboardArrowDownIcon />}
        </IconButton>

        <Box sx={{ flexGrow: 1, display: 'flex', alignItems: 'center', gap: 1 }}>
          {!isOpen && (
            <Typography variant="subtitle1" fontWeight="medium">
              {column.title || t("jurimetry.untitledColumn")}
            </Typography>
          )}
        </Box>

        {column.hasTaxonomy && (
          <Typography variant="caption" sx={{ 
            bgcolor: 'primary.main', 
            color: 'primary.contrastText',
            px: 0.75,
            py: 0.25,
            borderRadius: 1,
            fontWeight: 'bold',
            fontSize: '0.7rem'
          }}>
            Tx
          </Typography>
        )}

        {canRemove && (
          <IconButton 
            size="small" 
            color="error" 
            onClick={handleRemove}
          >
            <DeleteIcon />
          </IconButton>
        )}
      </Box>

      <Collapse in={isOpen}>
        <Box sx={{ p: 3, pt: 0 }}>
          <Stack spacing={2}>
            <TextField
              label={t("jurimetry.columnTitle")}
              value={column.title}
              onChange={(e) => onUpdate(column.id, "title", e.target.value)}
              fullWidth
              size="small"
              onClick={(e) => e.stopPropagation()}
            />
            
            <TextField
              label={t("jurimetry.columnDescription")}
              value={column.description}
              onChange={(e) => onUpdate(column.id, "description", e.target.value)}
              fullWidth
              multiline
              minRows={2}
              size="small"
              onClick={(e) => e.stopPropagation()}
            />

            <FormControlLabel
              control={
                <Switch
                  checked={column.hasTaxonomy}
                  onChange={(e) => onUpdate(column.id, "hasTaxonomy", e.target.checked)}
                  onClick={(e) => e.stopPropagation()}
                />
              }
              label={t("jurimetry.hasTaxonomy")}
              onClick={(e) => e.stopPropagation()}
            />
          </Stack>
        </Box>
      </Collapse>
    </Paper>
  );
}
