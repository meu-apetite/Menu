import { createTheme } from '@mui/material/styles';

const theme = createTheme({
  palette: {
    primary: {
      main: '#800080', // Sua cor primária
    },
    secondary: {
      main: '#CD5C5C	', // Sua cor secundária
    },
  },
  typography: {
    fontFamily: 'Roboto, sans-serif',
  },
  spacing: factor => `${0.5 * factor}rem`
});

export default theme;
