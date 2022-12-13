import React, { useState, useEffect, useContext } from 'react'
import { Navigate, Outlet } from 'react-router-dom'
import { ThemeProvider, createTheme } from '@mui/material/styles'
import themeDark from 'theme/dark'
import themeLight from 'theme/light'
import Box from '@mui/material/Box'
import Drawer from 'components/Drawer'
import LoadingPage from 'components/LoadingPage'
import fetchApi from 'fetch'
import { AuthContext } from 'contexts/auth'
import { useNavigate } from 'react-router-dom'

const getTheme = (theme = 'light') =>
  theme === 'dark' ? createTheme(themeDark) : createTheme(themeLight)

const Create = (props) => {
  const currentTheme = localStorage.getItem('theme') || 'light'
  const theme = getTheme(currentTheme)
  const auth = useContext(AuthContext)
  const [loggedStatus, setLoggedStatus] = useState('pending')

  const update = async () => {
    const id = JSON.parse(localStorage.getItem('_id'))
    const response = await fetchApi('get', `company/${id}`, null, true)
    const company = await response.json()
    auth.setCompany(company)

    if (!response.ok) {
      setLoggedStatus('loggedOut')
    } else {
      setLoggedStatus('logged')
    }
  }

  useEffect(() => {
    update()
  }, [])

  if (loggedStatus === 'pending') {
    return <h1>okjffjff</h1>
  }

  if (loggedStatus === 'logged') {
    return (
      <ThemeProvider theme={theme}>
        <Box sx={{ display: 'flex', maxWidth: '1300px', margin: 'auto' }}>
          <Drawer />
          <Box
            component="main"
            sx={{ flexGrow: 1, p: { xs: 2, sm: 3, md: 4 }, mt: 4 }}
          >
            <Box
              component={props.component}
              onSubmit={props.handleSubmit}
              autoComplete="off"
            >
              <Outlet />
            </Box>
          </Box>
        </Box>
        {props.loading && (
          <LoadingPage
            text={props.loading}
            active={props.loading}
          ></LoadingPage>
        )}
      </ThemeProvider>
    )
  }

  if (loggedStatus === 'loggedOut') {
    return <Navigate to="/login" />
  }
}

export default Create
