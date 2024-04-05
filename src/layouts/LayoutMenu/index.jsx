import { useContext, useEffect, useState } from 'react';
import { Outlet, useParams } from 'react-router-dom';
import { ThemeProvider } from '@mui/material';
import { GlobalContext } from 'contexts/global';
import { ApiService } from 'services/api.service';
import { ErrorUtils } from 'utils/ErrorUtils';
import { ApplicationUtils } from 'utils/ApplicationUtils';
import CustomError from 'components/CustomError';

const LayoutMenu = (props) => {
  const apiService = new ApiService(false);
  const { menuUrl } = useParams();
  const { company, setCompany, setLoading } = useContext(GlobalContext);
  const [globalError, setGlobalError] = useState(null);

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

        {globalError && <CustomError error={globalError} />}
      </ThemeProvider>
    )
  );
};

export default LayoutMenu;
