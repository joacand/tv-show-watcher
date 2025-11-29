'use client';
import { createTheme } from '@mui/material/styles';

const theme = createTheme({
  colorSchemes: {
    dark: {
      palette: {
        mode: 'dark',
        primary: {
          light: '#009bb2',
          main: '#1D7CA2',
          dark: '#3f79ae',
          contrastText: '#fff',
        },
        divider: '#979797ff',
      },
    },
    light: {
      palette: {
        mode: 'light',
        primary: {
          light: '#5fc4d4',
          main: '#1D7CA2',
          dark: '#145a70',
          contrastText: '#fff',
        },
        divider: '#b0b0b0',
        background: {
          default: '#f5f5f5',
          paper: '#ffffff',
        },
        text: {
          primary: '#3a3a3aff',
          secondary: '#252525ff',
        },
      },
    },
  },
  typography: {
    fontFamily: '"Roboto", "Helvetica", "Arial", sans-serif',
  },
  components: {
    MuiTableCell: {
      styleOverrides: {
        head: {
          fontWeight: 600,
          fontSize: '1.0rem', // smaller/larger header text
        },
        body: {
          fontSize: '1.0rem', // body text size
        },
      },
    },
  },
});

export default theme;