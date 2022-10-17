import React from 'react'
import { useNavigate } from 'react-router-dom'
import { ThemeProvider, createTheme } from '@mui/material/styles'
import themeDark from 'theme/dark'
import themeLight from 'theme/light'
import Box from '@mui/material/Box'
import Button from '@mui/material/Button'
import { Typography } from '@mui/material'
import Drawer from 'components/Drawer'
import LoadingPage from 'components/LoadingPage'

const getTheme = (theme = 'light') =>
  theme === 'dark' ? createTheme(themeDark) : createTheme(themeLight)

const Create = (props) => {
  const navigate = useNavigate()
  const currentTheme = localStorage.getItem('theme') || 'light'
  const theme = getTheme(currentTheme)

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
            <Box
              component="header"
              sx={{
                my: 3,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
              }}
            >
              <Typography component="h1" variant="h5">
                {props.title}
              </Typography>
              {props.component === 'form' && (
                <Button type="submit" variant="contained">
                  Salvar
                </Button>
              )}

              {props.Custom && <props.Custom />}
              {props.buttonLink && (
                <Button
                  variant="contained"
                  onClick={() => navigate(props.buttonLink.route)}
                >
                  {props.buttonLink.text}
                </Button>
              )}
            </Box>
            <Box>{props.children}</Box>
          </Box>
        </Box>
      </Box>

      {props.loading && (
        <LoadingPage text={props.loading} active={props.loading}></LoadingPage>
      )}
    </ThemeProvider>
  )
}

export default Create
