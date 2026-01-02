import { createTheme, alpha } from '@mui/material/styles';

const FONT_FAMILY = 'var(--font-geist-sans), "Inter", "Segoe UI", sans-serif';

export const theme = createTheme({
  palette: {
    mode: 'dark',
    primary: {
      main: '#818CF8', // Indigo 400
      light: '#A5B4FC',
      dark: '#6366F1',
      contrastText: '#000',
    },
    secondary: {
      main: '#34D399', // Emerald 400
      light: '#6EE7B7',
      dark: '#10B981',
      contrastText: '#000',
    },
    background: {
      default: 'transparent',
      paper: '#0B1121', // Slightly lighter than body bg
    },
    text: {
      primary: '#F1F5F9', // Slate 50
      secondary: '#94A3B8', // Slate 400
    },
    divider: 'rgba(255,255,255,0.08)',
  },
  typography: {
    fontFamily: FONT_FAMILY,
    h1: { fontWeight: 800, letterSpacing: '-0.03em', lineHeight: 1.1 },
    h2: { fontWeight: 700, letterSpacing: '-0.025em', lineHeight: 1.2 },
    h3: { fontWeight: 700, letterSpacing: '-0.025em' },
    h4: { fontWeight: 600, letterSpacing: '-0.02em' },
    h5: { fontWeight: 600, letterSpacing: '-0.01em' },
    h6: { fontWeight: 600 },
    subtitle1: { letterSpacing: '-0.01em', lineHeight: 1.6 },
    button: { fontWeight: 600, textTransform: 'none', letterSpacing: '0.01em' },
  },
  shape: {
    borderRadius: 12,
  },
  components: {
    MuiCssBaseline: {
      styleOverrides: {
        body: {
          backgroundColor: '#020617',
        },
      },
    },
    MuiButton: {
      styleOverrides: {
        root: {
          borderRadius: 8,
          fontSize: '0.925rem',
          padding: '8px 16px',
          boxShadow: 'none',
          '&:hover': { boxShadow: 'none' },
        },
        containedPrimary: {
          backgroundColor: '#F8FAFC',
          color: '#0F172A',
          '&:hover': {
            backgroundColor: '#E2E8F0',
          },
        },
        outlined: {
          borderColor: 'rgba(255,255,255,0.15)',
          color: '#E2E8F0',
          '&:hover': {
            borderColor: '#F8FAFC',
            backgroundColor: 'rgba(255,255,255,0.05)',
          },
        },
      },
    },
    MuiPaper: {
      styleOverrides: {
        root: {
          backgroundImage: 'none',
          backgroundColor: alpha('#0F172A', 0.6),
          backdropFilter: 'blur(12px)',
          border: '1px solid rgba(255, 255, 255, 0.08)',
          boxShadow: 'none',
        },
        elevation1: {
          boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.5)',
        },
      },
    },
    MuiCard: {
      styleOverrides: {
        root: {
          backgroundColor: alpha('#1e293b', 0.2),
          border: '1px solid rgba(255, 255, 255, 0.06)',
          transition: 'all 0.2s ease-in-out',
          '&:hover': {
            borderColor: 'rgba(255, 255, 255, 0.15)',
            backgroundColor: alpha('#1e293b', 0.4),
          },
        },
      },
    },
    MuiChip: {
      styleOverrides: {
        root: {
          borderRadius: 6,
          height: 28,
          fontSize: '0.75rem',
          fontWeight: 600,
          border: '1px solid rgba(255,255,255,0.1)',
          backgroundColor: 'transparent',
        },
        filled: {
          backgroundColor: 'rgba(255,255,255,0.05)',
        },
      },
    },
    MuiTextField: {
      styleOverrides: {
        root: {
          '& .MuiOutlinedInput-root': {
            borderRadius: 10,
            backgroundColor: alpha('#000', 0.2),
            '& fieldset': {
              borderColor: 'rgba(255, 255, 255, 0.1)',
              transition: 'border-color 0.2s',
            },
            '&:hover fieldset': {
              borderColor: 'rgba(255, 255, 255, 0.2)',
            },
            '&.Mui-focused fieldset': {
              borderColor: '#818CF8', // Indigo
              borderWidth: 1,
              boxShadow: '0 0 0 3px rgba(129, 140, 248, 0.15)',
            },
          },
        },
      },
    },
  },
});

export default theme;
