import { useRoutes } from 'react-router-dom';
import { AuthProvider } from 'contexts/auth';
import authRoutes from './routes/authRoutes';
import storeRoutes from './routes/storeRoutes';
import controlPanelRoutes from './routes/controlPanelRoutes';
import { StoreProvider } from 'contexts/store';
import theme from './theme/default';
import { ThemeProvider } from '@mui/material';

export const StoreRoutes = () => {
  const routes = useRoutes([...storeRoutes]);
  return <>{routes}</>;
};

export const AuthRoutes = () => {
  const routes = useRoutes([...authRoutes]);
  return <>{routes}</>;
};

export const ControlPanelRoutes = () => {
  const routes = useRoutes([...controlPanelRoutes]);
  return <>{routes}</>;
};

const App = () => {
  return (
    <ThemeProvider theme={theme}>
      <AuthProvider>
        <StoreProvider>
          <StoreRoutes />
        </StoreProvider>
        <AuthRoutes />
        <ControlPanelRoutes />
      </AuthProvider>
    </ThemeProvider>
  );
};

export default App;
