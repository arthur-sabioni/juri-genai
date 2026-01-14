import { ThemeOptions } from '@mui/material/styles';

export const typography: ThemeOptions['typography'] = {
  fontFamily: 'Inter, system-ui, Avenir, Helvetica, Arial, sans-serif',
  h4: {
    fontWeight: 700,
    letterSpacing: '-0.02em',
  },
  h5: {
    fontWeight: 600,
    letterSpacing: '-0.01em',
  },
  button: {
    textTransform: 'none',
    fontWeight: 500,
  },
};
