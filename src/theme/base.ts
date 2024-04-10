import type { Components, Theme, ThemeOptions } from '@mui/material/styles';
import { CSSProperties } from 'react';
import { amber, deepPurple } from '@mui/material/colors';

const commonPalette = {
  primary: deepPurple,
  secondary: amber,
};

type Mode = 'light' | 'dark';
const getStyleOverrides = (mode: Mode = 'light'): Components<Omit<Theme, 'components'>> => {
  let scrollbarColor;
  let scrollbarBackgroundColor;
  let scrollbarOnInteractionBackgroundColor;

  if (mode === 'dark') {
    scrollbarColor = '#6b6b6b';
    scrollbarBackgroundColor = '#2b2b2b';
    scrollbarOnInteractionBackgroundColor = '#959595';
  } else {
    scrollbarColor = '#b2b1af';
    scrollbarBackgroundColor = '#f1efef';
    scrollbarOnInteractionBackgroundColor = '#959595';
  }

  return {
    MuiSkeleton: {
      defaultProps: {
        animation: 'wave' as const,
      },
    },
    MuiCssBaseline: {
      styleOverrides: {
        body: {
          scrollbarColor: `${scrollbarColor} ${scrollbarBackgroundColor}`,
          '&::-webkit-scrollbar, & *::-webkit-scrollbar': {
            backgroundColor: scrollbarBackgroundColor,
          },
          '&::-webkit-scrollbar-thumb, & *::-webkit-scrollbar-thumb': {
            borderRadius: 8,
            backgroundColor: scrollbarColor,
            minHeight: 24,
            border: `2px solid ${scrollbarBackgroundColor}`,
          },
          '&::-webkit-scrollbar-thumb:focus, & *::-webkit-scrollbar-thumb:focus': {
            backgroundColor: scrollbarOnInteractionBackgroundColor,
          },
          '&::-webkit-scrollbar-thumb:active, & *::-webkit-scrollbar-thumb:active': {
            backgroundColor: scrollbarOnInteractionBackgroundColor,
          },
          '&::-webkit-scrollbar-thumb:hover, & *::-webkit-scrollbar-thumb:hover': {
            backgroundColor: scrollbarOnInteractionBackgroundColor,
          },
          '&::-webkit-scrollbar-corner, & *::-webkit-scrollbar-corner': {
            backgroundColor: scrollbarBackgroundColor,
          },
        },
      },
    },
    MuiCard: {
      styleOverrides: {
        root: {
          backgroundColor: mode === 'light' ? '#f7f7f7' : '',
          transition: 'background-color, box-shadow',
          '&:hover': {
            backgroundColor: (theme: Theme): CSSProperties['backgroundColor'] => theme.palette.action.hover,
            boxShadow: (theme: Theme): CSSProperties['boxShadow'] => theme.shadows[4],
          },
        },
      },
    },
    MuiButton: {
      styleOverrides: {
        root: {
          textTransform: 'capitalize',
          borderRadius: '7px',
          paddingRight: '30px;',
          paddingLeft: '30px;',
        },
      },
    },
  };
};

const themeLight: ThemeOptions = {
  palette: {
    mode: 'light',
    ...commonPalette,
    background: {
      default: '#e5e3e3',
      paper: '#FEFEFE',
    },
  },
  components: getStyleOverrides('light'),
};

const themeDark: ThemeOptions = {
  components: getStyleOverrides('dark'),
  palette: {
    mode: 'dark',
    background: {
      default: '#170a1a',
      paper: '#252525',
    },
    ...commonPalette,
  },
};

export const getSecondaryBgColor = (theme: Theme): string => {
  return theme.palette.mode === 'dark' ? '#2c2c2c' : '#e9ecef';
};

export const getBorderColor = (theme: Theme) =>
  theme.palette.mode === 'dark' ? `#262526` : `rgba(0, 0, 0, 0.30)`;

export type ThemeType = 'light' | 'dark';

const themes: Record<ThemeType, ThemeOptions> = {
  light: themeLight,
  dark: themeDark,
};

export default function getThemeOptions(theme: ThemeType): ThemeOptions {
  return themes[theme];
}
