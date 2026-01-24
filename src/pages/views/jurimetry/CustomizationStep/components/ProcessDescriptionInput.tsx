import { TextField } from "@mui/material";
import { useTranslation } from "../../../../../language";

interface ProcessDescriptionInputProps {
  value: string;
  onChange: (value: string) => void;
}

export function ProcessDescriptionInput({ value, onChange }: ProcessDescriptionInputProps) {
  const { t } = useTranslation();

  return (
    <TextField
      label={t("jurimetry.processDescription")}
      multiline
      minRows={4}
      value={value}
      onChange={(e) => onChange(e.target.value)}
      fullWidth
      variant="outlined"
      sx={{ flexShrink: 0 }}
    />
  );
}
