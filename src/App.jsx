import { useRoutes } from 'react-router-dom';
import routes from 'routes';
import { StoreProvider } from 'contexts/store';
import theme from './theme/default';
import { ThemeProvider } from '@mui/material';

const GlobalStyles = () => (
  <style>
    {`
      input:-webkit-autofill, input:-webkit-autofill:hover, 
      input:-webkit-autofill:focus, input:-webkit-autofill:active {
        -webkit-box-shadow: 0 0 0 30px #02020200 inset !important;
        background-color: inherit !important;
        color: inherit !important;
      }
    `}
  </style>
);

export const Routes = () => {
  const appRoutes = useRoutes([...routes]);
  return <>{appRoutes}</>;
};


const App = () => {
  return (
    <ThemeProvider theme={theme}>
      <GlobalStyles />
        <StoreProvider>
          <Routes />
        </StoreProvider>
    </ThemeProvider>
  );
};

export default App;
