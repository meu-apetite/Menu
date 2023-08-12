import { useRoutes } from 'react-router-dom';
import authRoutes from './authRoutes';
import storeRoutes from './storeRoutes';
import controlPanelRoutes from './controlPanelRoutes';

export const AppRoutes = () => {
  const routes = useRoutes([...authRoutes, ...storeRoutes, ...controlPanelRoutes]);
  return <>{routes}</>;
};

export default AppRoutes;
