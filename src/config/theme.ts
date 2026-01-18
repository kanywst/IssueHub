import { createTheme } from '@mui/material/styles';

const FONT_FAMILY = 'var(--font-geist-sans), "Inter", "Segoe UI", sans-serif';

export const theme = createTheme({
  palette: {
    mode: 'dark',
    primary: {
      main: '#f9fafb', // White text for primary actions
      light: '#ffffff',
      dark: '#d1d5db',
      contrastText: '#030712',
    },
    secondary: {
      main: '#3b82f6', // Blue 500 for accents
      light: '#60a5fa',
      dark: '#2563eb',
      contrastText: '#ffffff',
    },
    background: {
      default: '#030712', // Gray 950
      paper: '#111827',   // Gray 900
    },
    text: {
      primary: '#f9fafb', // Gray 50
      secondary: '#9ca3af', // Gray 400
    },
    divider: '#1f2937', // Gray 800
  },
  typography: {
    fontFamily: FONT_FAMILY,
    h1: { fontWeight: 800, letterSpacing: '-0.03em', lineHeight: 1.1, color: '#f9fafb' },
    h2: { fontWeight: 700, letterSpacing: '-0.025em', lineHeight: 1.2, color: '#f9fafb' },
    h3: { fontWeight: 700, letterSpacing: '-0.025em', color: '#f9fafb' },
    h4: { fontWeight: 600, letterSpacing: '-0.02em', color: '#f9fafb' },
    h5: { fontWeight: 600, letterSpacing: '-0.01em', color: '#f9fafb' },
    h6: { fontWeight: 600, color: '#f9fafb' },
    subtitle1: { letterSpacing: '-0.01em', lineHeight: 1.6, color: '#9ca3af' },
    button: { fontWeight: 500, textTransform: 'none', letterSpacing: '0.01em' },
  },
  shape: {
    borderRadius: 8,
  },
  components: {
    MuiCssBaseline: {
      styleOverrides: {
        body: {
          backgroundColor: '#030712',
        },
      },
    },
    MuiButton: {
      styleOverrides: {
        root: {
          borderRadius: 8,
          fontSize: '0.9rem',
          padding: '10px 20px',
          boxShadow: 'none',
          textTransform: 'none',
          fontWeight: 600,
          '&:hover': { boxShadow: 'none' },
        },
        containedPrimary: {
          backgroundColor: '#f9fafb',
          color: '#030712',
          '&:hover': {
            backgroundColor: '#d1d5db',
          },
        },
        outlined: {
          borderColor: '#374151', // Gray 700
          color: '#e5e7eb', // Gray 200
          '&:hover': {
            borderColor: '#e5e7eb',
            backgroundColor: 'rgba(255,255,255,0.03)',
          },
        },
      },
    },
    MuiPaper: {
      styleOverrides: {
        root: {
          backgroundImage: 'none',
          backgroundColor: 'rgba(17, 24, 39, 0.6)', // Gray 900 with opacity
          backdropFilter: 'blur(12px)',
          border: '1px solid rgba(255, 255, 255, 0.08)',
          boxShadow: 'none',
        },
      },
    },
    MuiCard: {
      styleOverrides: {
        root: {
          backgroundColor: 'rgba(17, 24, 39, 0.4)',
          border: '1px solid rgba(255, 255, 255, 0.08)',
          borderRadius: 12,
          transition: 'all 0.2s ease-in-out',
          '&:hover': {
            borderColor: 'rgba(255, 255, 255, 0.2)',
            transform: 'translateY(-2px)',
            backgroundColor: 'rgba(17, 24, 39, 0.8)',
          },
        },
      },
    },
    MuiChip: {
      styleOverrides: {
        root: {
          borderRadius: 6,
          height: 24,
          fontSize: '0.75rem',
          fontWeight: 500,
          border: '1px solid rgba(255, 255, 255, 0.1)',
          backgroundColor: 'rgba(255, 255, 255, 0.03)',
          color: '#d1d5db',
        },
        filled: {
          backgroundColor: 'rgba(255, 255, 255, 0.05)',
        },
      },
    },
    MuiTextField: {
      styleOverrides: {
        root: {
          '& .MuiOutlinedInput-root': {
            borderRadius: 8,
            backgroundColor: 'rgba(17, 24, 39, 0.6)',
            '& fieldset': {
              borderColor: 'rgba(255, 255, 255, 0.1)',
              transition: 'border-color 0.2s',
            },
            '&:hover fieldset': {
              borderColor: 'rgba(255, 255, 255, 0.25)',
            },
            '&.Mui-focused fieldset': {
              borderColor: '#f9fafb',
              borderWidth: 1,
            },
            '& input': {
              color: '#f9fafb',
            },
          },
        },
      },
    },
    MuiAppBar: {
      styleOverrides: {
        root: {
          backgroundColor: 'rgba(3, 7, 18, 0.8)',
          backdropFilter: 'blur(16px)',
          borderBottom: '1px solid rgba(255, 255, 255, 0.08)',
          boxShadow: 'none',
        },
      },
    },
    MuiSelect: {
        styleOverrides: {
            icon: {
                color: '#9ca3af',
            }
        }
    }
  },
});

export default theme;
