import { useRoutes } from 'react-router-dom';
import { StoreProvider } from 'contexts/store';
import theme from './theme/default';
import { ThemeProvider } from '@mui/material';
import { finishOrderRoutes, storeRoutes } from 'routes';

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

export const RoutesStore = () => {
  const appRoutes = useRoutes([...storeRoutes]);
  return <>{appRoutes}</>;
};

export const RoutesFinishOrder = () => {
  const appRoutes = useRoutes([...finishOrderRoutes]);
  return <>{appRoutes}</>;
};

const App = () => {
  return (
    <ThemeProvider theme={theme}>
      <GlobalStyles />
        <StoreProvider>
          <RoutesStore />
          <RoutesFinishOrder />
        </StoreProvider>
    </ThemeProvider>
  );
};

export default App;
