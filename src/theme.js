import { createTheme } from '@mui/material/styles';

const theme = createTheme({
  palette: {
    primary: {
      main: '#556cd6',
    },
    secondary: {
      main: '#19857b',
    },
    background: {
      default: '#e0ceca',
      paper: '#e0ceca',
    },
    text: {
      primary: '#333333',
      secondary: '#575757',
      disabled: '#aaaaaa'
    }
  },
  typography: {
    fontFamily: 'Vollkorn, serif',
    h1: {
      fontSize: '2.5rem', // Example size, adjust as needed
      fontWeight: 500, // You can define the weight
      lineHeight: 1.2, // Adjust line height as needed
    },
    h2: {
      fontSize: '2.25rem',
      fontWeight: 500,
      lineHeight: 1.3,
    },
    h4: {
      fontSize: '2rem',
      fontWeight: 500,
      lineHeight: 1.35,
    },
    // Continue with other styles for h4, h5, etc.
  }
});


export default theme;
