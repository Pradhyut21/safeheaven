import { createTheme } from '@mui/material/styles';

const theme = createTheme({
  palette: {
    primary: {
      main: '#D4AF37', // Primary Gold
      light: '#FFD700', // Bright Gold
      dark: '#B8860B', // Dark Gold
      contrastText: '#2C1810', // Dark Coffee
    },
    secondary: {
      main: '#5D4037', // Warm Chocolate
      light: '#8D6E63', // Light Brown
      dark: '#3E2723', // Deep Espresso
      contrastText: '#FFF8E1', // Cream/Ivory
    },
    background: {
      default: '#FFF8E1', // Cream/Ivory
      paper: '#FFFFFF',
    },
    text: {
      primary: '#2C1810', // Dark Coffee
      secondary: '#6D4C41', // Warm Brown
    },
    success: {
      main: '#7CB342', // Earthy Green
    },
    warning: {
      main: '#FFA000', // Amber Gold
    },
    error: {
      main: '#D32F2F', // Deep Red
    },
  },
  typography: {
    fontFamily: [
      'Inter',
      'sans-serif',
    ].join(','),
    h1: {
      fontFamily: '"Playfair Display", serif',
      fontWeight: 700,
    },
    h2: {
      fontFamily: '"Playfair Display", serif',
      fontWeight: 600,
    },
    h3: {
      fontFamily: '"Playfair Display", serif',
      fontWeight: 500,
    },
    button: {
      textTransform: 'none',
      fontWeight: 600,
    },
  },
  components: {
    MuiButton: {
      styleOverrides: {
        root: {
          borderRadius: 8,
          padding: '12px 32px',
        },
        containedPrimary: {
          background: 'linear-gradient(135deg, #D4AF37 0%, #FFD700 100%)',
          '&:hover': {
            transform: 'translateY(-2px)',
            boxShadow: '0 6px 12px rgba(212, 175, 55, 0.3)',
          },
        },
      },
    },
    MuiCard: {
      styleOverrides: {
        root: {
          borderRadius: 12,
          boxShadow: '0 4px 12px rgba(62, 39, 35, 0.1)',
          border: '1px solid rgba(212, 175, 55, 0.3)',
          transition: 'transform 0.3s ease, box-shadow 0.3s ease',
          '&:hover': {
            transform: 'translateY(-4px)',
            boxShadow: '0 8px 24px rgba(62, 39, 35, 0.15)',
          },
        },
      },
    },
  },
});

export default theme;
