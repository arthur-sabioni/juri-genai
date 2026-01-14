import { PaletteOptions } from '@mui/material/styles';
import { colors } from './colors';

export const palette: PaletteOptions = {
  primary: {
    main: colors.primaryMain,
    light: colors.primaryLight,
    dark: colors.primaryDark,
    contrastText: colors.primaryContrast,
  },
  secondary: {
    main: colors.secondaryMain,
    light: colors.secondaryLight,
    dark: colors.secondaryDark,
    contrastText: colors.secondaryContrast,
  },
  background: {
    default: colors.backgroundDefault,
    paper: colors.backgroundPaper,
  },
  text: {
    primary: colors.textPrimary,
    secondary: colors.textSecondary,
  },
  divider: colors.divider,
};
