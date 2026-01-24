import { Box, Stack, Avatar, alpha, useTheme, keyframes } from "@mui/material";
import { useState, useRef, useEffect } from "react";
import { LLMModel } from "../../context/JurimetryContext";
import { ModelCard } from "./ModelCard";
import KeyboardArrowUpIcon from '@mui/icons-material/KeyboardArrowUp';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';

// Bouncing animation
const bounce = keyframes`
  0%, 100% { transform: translateY(0); }
  50% { transform: translateY(3px); }
`;

interface ModelListProps {
  availableModels: LLMModel[];
  selectedModel: LLMModel | null;
  onSelect: (model: LLMModel) => void;
}

export function ModelList({ availableModels, selectedModel, onSelect }: ModelListProps) {
  const theme = useTheme();
  const scrollContainerRef = useRef<HTMLDivElement>(null);
  const [canScrollTop, setCanScrollTop] = useState(false);
  const [canScrollBottom, setCanScrollBottom] = useState(false);
  const fadeColor = theme.palette.background.default;

  const handleScroll = () => {
    if (scrollContainerRef.current) {
      const { scrollTop, scrollHeight, clientHeight } = scrollContainerRef.current;
      setCanScrollTop(scrollTop > 0);
      setCanScrollBottom(scrollTop + clientHeight < scrollHeight - 1);
    }
  };

  useEffect(() => {
    const checkScroll = () => {
      if (scrollContainerRef.current) {
        const { scrollTop, scrollHeight, clientHeight } = scrollContainerRef.current;
        setCanScrollTop(scrollTop > 0);
        setCanScrollBottom(scrollTop + clientHeight < scrollHeight - 1);
      }
    };

    // Small timeout to allow render
    setTimeout(checkScroll, 100);
    window.addEventListener('resize', checkScroll);
    return () => window.removeEventListener('resize', checkScroll);
  }, [availableModels]);

  return (
    <Box sx={{ position: 'relative', flex: 1, overflow: 'hidden', display: 'flex', flexDirection: 'column' }}>
      {/* Top Fade */}
      <Box 
        sx={{ 
          position: 'absolute', 
          top: 0, 
          left: 0, 
          right: 0, 
          height: 40, 
          background: `linear-gradient(to bottom, ${fadeColor}, ${alpha(fadeColor, 0)})`, 
          zIndex: 2,
          pointerEvents: 'none',
          opacity: canScrollTop ? 1 : 0,
          transition: 'opacity 0.3s ease',
          display: 'flex',
          alignItems: 'flex-start',
          justifyContent: 'center',
          pt: 1
        }} 
      >
        <Avatar 
          sx={{ 
            width: 24, 
            height: 24, 
            bgcolor: 'background.paper',
            boxShadow: 1,
            animation: `${bounce} 2s infinite`
          }}
        >
          <KeyboardArrowUpIcon sx={{ color: 'text.secondary', fontSize: 20 }} />
        </Avatar>
      </Box>

      {/* Scrollable List */}
      <Box 
        ref={scrollContainerRef}
        onScroll={handleScroll}
        sx={{ 
          overflowY: 'auto', 
          height: '100%', 
          px: 1, 
          py: 1,
          // Hide scrollbar
          '&::-webkit-scrollbar': { display: 'none' },
          msOverflowStyle: 'none',  /* IE and Edge */
          scrollbarWidth: 'none',  /* Firefox */
        }}
      >
        <Stack spacing={2} sx={{ pb: 2, pt: 1 }}>
          {availableModels.map((model) => (
            <ModelCard
              key={model.id}
              model={model}
              isSelected={selectedModel?.id === model.id}
              onSelect={onSelect}
            />
          ))}
        </Stack>
      </Box>

      {/* Bottom Fade */}
      <Box 
        sx={{ 
          position: 'absolute', 
          bottom: 0, 
          left: 0, 
          right: 0, 
          height: 40, 
          background: `linear-gradient(to top, ${fadeColor}, ${alpha(fadeColor, 0)})`, 
          zIndex: 2,
          pointerEvents: 'none',
          opacity: canScrollBottom ? 1 : 0,
          transition: 'opacity 0.3s ease',
          display: 'flex',
          alignItems: 'flex-end',
          justifyContent: 'center',
          pb: 1
        }} 
      >
        <Avatar 
          sx={{ 
            width: 24, 
            height: 24, 
            bgcolor: 'background.paper',
            boxShadow: 1,
            animation: `${bounce} 2s infinite`
          }}
        >
          <KeyboardArrowDownIcon sx={{ color: 'text.secondary', fontSize: 20 }} />
        </Avatar>
      </Box>
    </Box>
  );
}
