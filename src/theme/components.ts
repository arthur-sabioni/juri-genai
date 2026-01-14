import { Components, Theme } from '@mui/material';
import { colors } from './colors';

export const components: Components<Theme> = {
  MuiButton: {
    styleOverrides: {
      root: {
        borderRadius: 8,
        padding: '0.6em 1.2em',
      },
      containedPrimary: {
        '&:hover': {
          backgroundColor: colors.primaryDark,
        },
      },
    },
  },
  MuiListItem: {
    styleOverrides: {
      root: {
        '&:hover': {
          backgroundColor: colors.divider,
        },
      },
    },
  },
  MuiAppBar: {
    defaultProps: {
      elevation: 0,
      color: 'transparent',
    },
  },
};
