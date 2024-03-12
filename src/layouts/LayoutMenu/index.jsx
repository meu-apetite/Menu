import { useContext, useEffect } from 'react';
import { Outlet, useParams } from 'react-router-dom';
import { ThemeProvider } from '@mui/material';
import { GlobalContext } from 'contexts/global';
import { ApiService } from 'services/api.service';
import { ErrorUtils } from 'utils/ErrorUtils';
import { ApplicationUtils } from 'utils/ApplicationUtils';

const LayoutMenu = (props) => {
  const apiService = new ApiService(false);
  const { menuUrl } = useParams();
  const { company, setCompany, setLoading, setGlobalError } = useContext(
    GlobalContext,
  );

  const getCompany = async () => {
    try {
      setLoading('Carregando...');
      const { data } = await apiService.get('/' + menuUrl);
      setCompany(data);
    } catch (error) {
      setGlobalError(ErrorUtils.notFoundMenu());
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    getCompany();
  }, []);

  return (
    company && (
      <ThemeProvider
        theme={ApplicationUtils.createCustomTheme(
          company.custom.colorPrimary,
          company.custom.colorSecondary,
        )}
      >
        <Outlet />
      </ThemeProvider>
    )
  );
};

export default LayoutMenu;
