import { Box, Paper, Avatar, Typography } from "@mui/material";
import { LLMModel } from "../../context/JurimetryContext";
import BoltIcon from '@mui/icons-material/Bolt';

// Import assets
import claudeIcon from "../../../../../assets/claude.png";
import deepseekIcon from "../../../../../assets/deepseek.png";
import geminiIcon from "../../../../../assets/gemini.png";
import metaIcon from "../../../../../assets/meta.png";
import openaiIcon from "../../../../../assets/openai.png";
import qwenIcon from "../../../../../assets/qwen.png";
import juriIcon from "../../../../../assets/juri.png";

interface ModelCardProps {
  model: LLMModel;
  isSelected: boolean;
  onSelect: (model: LLMModel) => void;
}

const getModelIconSrc = (modelName: string): string | null => {
  const name = modelName.toLowerCase();
  if (name.includes('gpt')) return openaiIcon;
  if (name.includes('claude')) return claudeIcon;
  if (name.includes('llama')) return metaIcon;
  if (name.includes('gemini')) return geminiIcon;
  if (name.includes('deepseek')) return deepseekIcon;
  if (name.includes('qwen')) return qwenIcon;
  if (name.includes('juri')) return juriIcon;
  return null;
};

export function ModelCard({ model, isSelected, onSelect }: ModelCardProps) {
  const iconSrc = getModelIconSrc(model.name);

  return (
    <Paper
      variant="outlined"
      onClick={() => onSelect(model)}
      sx={{
        p: 2,
        cursor: 'pointer',
        display: 'flex',
        alignItems: 'center',
        transition: 'all 0.2s ease-in-out',
        bgcolor: isSelected ? 'background.paper' : 'action.hover',
        borderColor: isSelected ? 'primary.main' : 'divider',
        transform: isSelected ? 'scale(1.02)' : 'scale(1)',
        boxShadow: isSelected ? 3 : 0,
        position: 'relative',
        zIndex: isSelected ? 1 : 0,
        '&:hover': {
          borderColor: 'primary.main',
          bgcolor: isSelected ? 'background.paper' : 'action.selected',
        }
      }}
    >
      {/* Left: Provider Image / Icon */}
      <Box sx={{ mr: 2, display: 'flex', alignItems: 'center' }}>
        <Avatar 
          sx={{ 
            bgcolor: isSelected ? 'primary.main' : 'grey.100',
            width: 56, 
            height: 56,
            boxShadow: 2, // Dropshadow
          }}
          src={iconSrc || undefined}
        >
          {!iconSrc && <BoltIcon />}
        </Avatar>
      </Box>

      {/* Center: Name and Description */}
      <Box sx={{ flex: 1 }}>
        <Typography 
          variant="h6" 
          color={isSelected ? 'primary.main' : 'text.primary'}
          sx={{ fontWeight: isSelected ? 'bold' : 'medium' }}
        >
          {model.name}
        </Typography>
        <Typography 
          variant="body2" 
          color="text.secondary"
          sx={{
            display: '-webkit-box',
            WebkitLineClamp: isSelected ? 'unset' : 1,
            WebkitBoxOrient: 'vertical',
            overflow: 'hidden',
            textOverflow: 'ellipsis'
          }}
        >
          {model.description}
        </Typography>
      </Box>

      {/* Right: Price */}
      <Box sx={{ ml: 2, textAlign: 'right', minWidth: 100 }}>
        <Typography 
          variant="h6" 
          color={isSelected ? 'primary.main' : 'text.primary'}
          sx={{ fontWeight: 'bold' }}
        >
          ${model.price.toFixed(4)}
        </Typography>
        <Typography variant="caption" color="text.secondary">
          estimated
        </Typography>
      </Box>
    </Paper>
  );
}
