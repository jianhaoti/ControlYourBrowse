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
      paper: '#e0ceca', // optional, used for surfaces of components such as Paper and Card
    },
    text: {
      primary: '#333333', // Dark enough for primary text
      secondary: '#575757', // Lighter than primary text
      disabled: '#aaaaaa' // Optional: for disabled text
    }
  },
  typography: {
    fontFamily: [
      'Times New Roman',
      'Arial',
      'sans-serif'
    ].join(','),
  }
});

export default theme;
