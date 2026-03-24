import { createTheme } from '@mui/material/styles';

const FONT_FAMILY = 'var(--font-geist-sans), "Inter", "Segoe UI", sans-serif';

export const theme = createTheme({
  palette: {
    mode: 'dark',
    primary: {
      main: '#fafafa', // White text for primary actions
      light: '#ffffff',
      dark: '#d4d4d8',
      contrastText: '#0a0a0b',
    },
    secondary: {
      main: '#a1a1aa', // Zinc 400 for accents (subtle)
      light: '#d4d4d8',
      dark: '#52525b',
      contrastText: '#ffffff',
    },
    background: {
      default: '#0a0a0b', // Deep zinc/black
      paper: '#121214',   // Slightly lighter for cards
    },
    text: {
      primary: '#fafafa', // Zinc 50
      secondary: '#a1a1aa', // Zinc 400
    },
    success: {
      main: '#10b981', // Emerald 500
    },
    grey: {
      900: '#18181b', // Zinc 900
    },
    divider: '#27272a',    // Zinc 800
  },
  typography: {
    fontFamily: FONT_FAMILY,
    h1: { fontWeight: 700, letterSpacing: '-0.04em', lineHeight: 1.1, color: '#fafafa' },
    h2: { fontWeight: 600, letterSpacing: '-0.03em', lineHeight: 1.2, color: '#fafafa' },
    h3: { fontWeight: 600, letterSpacing: '-0.025em', color: '#fafafa' },
    h4: { fontWeight: 500, letterSpacing: '-0.02em', color: '#fafafa' },
    h5: { fontWeight: 500, letterSpacing: '-0.01em', color: '#fafafa' },
    h6: { fontWeight: 500, color: '#fafafa' },
    subtitle1: { letterSpacing: '-0.01em', lineHeight: 1.6, color: '#a1a1aa' },
    button: { fontWeight: 500, textTransform: 'none', letterSpacing: '0.01em' },
  },
  shape: {
    borderRadius: 8,
  },
  components: {
    MuiCssBaseline: {
      styleOverrides: {
        body: {
          backgroundColor: '#0a0a0b',
        },
      },
    },
    MuiButton: {
      styleOverrides: {
        root: {
          borderRadius: 8,
          fontSize: '0.875rem',
          padding: '8px 16px',
          boxShadow: 'none',
          textTransform: 'none',
          fontWeight: 500,
          transition: 'all 0.15s ease-in-out',
          '&:hover': { boxShadow: 'none' },
        },
        containedPrimary: {
          backgroundColor: '#fafafa',
          color: '#0a0a0b',
          '&:hover': {
            backgroundColor: '#e4e4e7',
          },
        },
        outlined: {
          borderColor: 'rgba(255,255,255,0.1)',
          color: '#fafafa',
          '&:hover': {
            borderColor: 'rgba(255,255,255,0.2)',
            backgroundColor: 'rgba(255,255,255,0.02)',
          },
        },
      },
    },
    MuiPaper: {
      styleOverrides: {
        root: {
          backgroundImage: 'none',
          backgroundColor: '#121214',
          border: '1px solid rgba(255, 255, 255, 0.08)',
          boxShadow: '0 4px 24px rgba(0, 0, 0, 0.4)',
        },
      },
    },
    MuiCard: {
      styleOverrides: {
        root: ({ theme }) => ({
          backgroundColor: theme.palette.background.paper,
          border: '1px solid rgba(255, 255, 255, 0.08)',
          borderRadius: 12,
          transition: 'all 0.2s ease-in-out',
          '&:hover': {
            borderColor: 'rgba(255, 255, 255, 0.15)',
            backgroundColor: theme.palette.grey[900], // Zinc 900
          },
        }),
      },
    },
    MuiChip: {
      styleOverrides: {
        root: {
          borderRadius: 6,
          height: 24,
          fontSize: '0.75rem',
          fontWeight: 400,
          border: '1px solid rgba(255, 255, 255, 0.1)',
          backgroundColor: 'transparent',
          color: '#a1a1aa',
        },
        filled: {
          backgroundColor: 'rgba(255, 255, 255, 0.04)',
          border: 'none',
        },
      },
    },
    MuiTextField: {
      styleOverrides: {
        root: {
          '& .MuiOutlinedInput-root': {
            borderRadius: 8,
            backgroundColor: 'rgba(255, 255, 255, 0.02)',
            transition: 'background-color 0.2s',
            '& fieldset': {
              borderColor: 'rgba(255, 255, 255, 0.1)',
              transition: 'border-color 0.2s',
            },
            '&:hover': {
              backgroundColor: 'rgba(255, 255, 255, 0.04)',
            },
            '&:hover fieldset': {
              borderColor: 'rgba(255, 255, 255, 0.2)',
            },
            '&.Mui-focused fieldset': {
              borderColor: '#fafafa',
              borderWidth: 1,
            },
            '& input': {
              color: '#fafafa',
            },
          },
        },
      },
    },
    MuiAppBar: {
      styleOverrides: {
        root: {
          backgroundColor: 'rgba(10, 10, 11, 0.7)',
          backdropFilter: 'blur(12px)',
          borderBottom: '1px solid rgba(255, 255, 255, 0.08)',
          boxShadow: 'none',
        },
      },
    },
    MuiSelect: {
        styleOverrides: {
            icon: {
                color: '#a1a1aa',
            }
        }
    }
  },
});

export default theme;
