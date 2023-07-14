import React, { useState, useEffect, useContext } from 'react';
import { Navigate, Outlet } from 'react-router-dom';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import Box from '@mui/material/Box';
import { AuthContext } from 'contexts/auth';
import themeDark from 'theme/dark';
import themeLight from 'theme/light';
import Drawer from 'components/Drawer';
import LoadingPage from 'components/LoadingPage';
import { ApiService } from 'services/api.service';

const getTheme = (theme = 'dark') =>
  theme === 'dark' ? createTheme(themeDark) : createTheme(themeLight);

const Create = (props) => {
  const apiService = new ApiService();

  const currentTheme = localStorage.getItem('theme') || 'light';
  const theme = getTheme(currentTheme);

  const { setCompany } = useContext(AuthContext);

  const [authenticationStatus, setAuthenticationStatus] = useState('pending');
  /* pending, disconnected*/

  const update = async () => {
    try {
      const response = await apiService.get(`/admin/company`);
      const company = await response.data;

      setCompany(company);

      if (response.status === 401) return setAuthenticationStatus('disconnected');

      setAuthenticationStatus('logged');
    } catch (e) {
      console.log(e);
      setAuthenticationStatus('disconnected');
    }
  };

  useEffect(() => {
    update();
  }, []);

  if (authenticationStatus === 'pending') return <h1>Aguarde...</h1>;
  if (authenticationStatus === 'disconnected') return <Navigate to="/login" />;
  if (authenticationStatus === 'error') return <h1>Error no servidor...</h1>;

  if (authenticationStatus === 'logged') {
    return (
      <ThemeProvider theme={theme}>
        <Box sx={{ display: 'flex', maxWidth: '1300px', margin: 'auto' }}>
          <Drawer />

          <Box component="main" sx={{ flexGrow: 1, p: 2, mt: '64px' }}>
            <Box component={props.component} onSubmit={props.handleSubmit} autoComplete="off">
              <Outlet />
            </Box>
          </Box>
        </Box>

        {props.loading && <LoadingPage text={props.loading} active={props.loading} />}
      </ThemeProvider>
    );
  }
};

export default Create;
