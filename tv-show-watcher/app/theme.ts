'use client';
import { createTheme } from '@mui/material/styles';

const darkTheme = createTheme({
  palette: {
    mode: 'dark',
    primary: {
      main: '#1D7CA2',
    },
    secondary: {
      main: '#f48fb1',
    },
    background: {
      default: '#1D1D1D',
    },
    text: {
      primary: '#e0e0e0',
      secondary: '#b0b0b0',
    },
    divider: '#373737',
  },
  typography: {
    fontFamily: '"Roboto", "Helvetica", "Arial", sans-serif',
  },
  components: {
    MuiButton: {
      styleOverrides: {
        containedPrimary: {
          color: '#e0e0e0',
        },
      },
    },
    MuiTableCell: {
      styleOverrides: {
        head: {
          color: '#eeeeeeff',
          fontWeight: 600,
          fontSize: '1.0rem', // smaller/larger header text
        },
        body: {
          fontSize: '1.0rem', // body text size
          color: '#eeeeeeff',
        },
      },
    },
    MuiTableRow: {
      styleOverrides: {
        root: {
          '&:hover': {
            backgroundColor: '#2a2b2f',
          },
          '&.Mui-selected': {
            backgroundColor: '#0022ffff !important',
          },
        },
      },
    },
  },
});

export default darkTheme;
