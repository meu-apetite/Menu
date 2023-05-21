import React, { useState, useEffect, useContext } from 'react';
import { Navigate, Outlet } from 'react-router-dom';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import Box from '@mui/material/Box';
import { AuthContext } from 'contexts/auth';
import fetchApi from 'fetch';
import themeDark from 'theme/dark';
import themeLight from 'theme/light';
import Drawer from 'components/Drawer';
import LoadingPage from 'components/LoadingPage';

const getTheme = (theme = 'light') =>
  theme === 'dark' ? createTheme(themeDark) : createTheme(themeLight)

const Create = (props) => {
  const currentTheme = localStorage.getItem('theme') || 'light'
  const theme = getTheme(currentTheme)
  const auth = useContext(AuthContext)
  const [loggedStatus, setLoggedStatus] = useState('pending')

  const update = async () => {
    try {
      const id = JSON.parse(localStorage.getItem('_id'))
      const response = await fetchApi('get', `app/${id}`, null, true)
      const company = await response.json();

      auth.setCompany(company)

      if (!response.ok) {
        setLoggedStatus('loggedOut')
      } else {
        setLoggedStatus('logged')
      }
    } catch (e) {
      setLoggedStatus('error')
    }
  }

  useEffect(() => {
    update()
  }, [])

  if (loggedStatus === 'pending') return <h1>Aguarde...</h1>;
  if (loggedStatus === 'error') return <h1>Error no servidor...</h1>;
  if (loggedStatus === 'loggedOut') return <Navigate to="/login" />;

  if (loggedStatus === 'logged') {
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

        {props.loading && (
          <LoadingPage text={props.loading} active={props.loading}></LoadingPage>
        )}
      </ThemeProvider>
    )
  }
}

export default Create
