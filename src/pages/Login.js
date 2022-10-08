import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import Avatar from '@mui/material/Avatar'
import Button from '@mui/material/Button'
import CssBaseline from '@mui/material/CssBaseline'
import TextField from '@mui/material/TextField'
import FormControlLabel from '@mui/material/FormControlLabel'
import Checkbox from '@mui/material/Checkbox'
import Link from '@mui/material/Link'
import Paper from '@mui/material/Paper'
import Box from '@mui/material/Box'
import Grid from '@mui/material/Grid'
import LockOutlinedIcon from '@mui/icons-material/LockOutlined'
import Typography from '@mui/material/Typography'
import { createTheme, ThemeProvider } from '@mui/material/styles'
import ImageIntro from '../public/images/16548-min.jpg'
import Alert from '@mui/material/Alert'
import AlertTitle from '@mui/material/AlertTitle'
import LoadingPage from 'components/LoadingPage'
import fetchApi from 'fetch'

function Copyright(props) {
  return (
    <Typography
      variant="body2"
      color="text.secondary"
      align="center"
      {...props}
    >
      {'Copyright © '}
      <Link color="inherit" href="https://lojaexpressa.com/">
        Loja Expressa
      </Link>{' '}
      {''}
      {new Date().getFullYear()}
    </Typography>
  )
}

const themeDark = createTheme({
  palette: {
    mode: 'dark',
    primary: {
      main: '#1bac4b',
    },
    secondary: {
      main: '#1bac4b',
    },
    contrastThreshold: 3,
    tonalOffset: 0.2,
  },
})

export default function Login() {
  const [loading, setLoading] = useState(false)
  const [messages, setMessages] = useState([])
  const [flashMessage, setFlashMessage] = useState(null)
  const navigate = useNavigate()

  const handleSubmit = async (e) => {
    try {
      e.preventDefault()
      setLoading(true)
      setMessages([])
      setFlashMessage(null)

      const data = new FormData(e.currentTarget)
      const body = { email: data.get('email'), password: data.get('password') }
      let response = await fetchApi('post', 'login', body)

      if (!response.ok) {
        const result = await response.json()
        result.messages?.forEach((item) => {
          setMessages((old) => [
            ...old,
            { type: 'error', title: 'Erro!', text: item.text },
          ])
        })
        return
      }

      response = await response.json()
      localStorage.setItem('_id', JSON.stringify(response.company._id))
      localStorage.setItem('token', JSON.stringify(response.token))

      return navigate('/admin')
    } catch (error) {
      console.log(error)
      setMessages([
        {
          type: 'error',
          title: 'Erro ao fazer o login!',
          text: 'Houve um erro de comunicação na rede.',
        },
      ])
    } finally {
      setTimeout(() => setLoading(false), 4000)
    }
  }

  const AlertMessage = ({ type, title, children }) => (
    <Alert severity={type}>
      <AlertTitle>{title}</AlertTitle>
      {children}
    </Alert>
  )

  return (
    <ThemeProvider theme={themeDark}>
      <Grid container component="main" sx={{ height: '100vh' }}>
        <CssBaseline />
        <Grid
          item
          xs={false}
          sm={4}
          md={7}
          sx={{
            backgroundImage: `url(${ImageIntro})`,
            backgroundRepeat: 'no-repeat',
            backgroundColor: (t) =>
              t.palette.mode === 'light'
                ? t.palette.grey[50]
                : t.palette.grey[900],
            backgroundSize: 'cover',
            backgroundPosition: 'center',
          }}
        />
        <Grid item xs={12} sm={8} md={5} component={Paper} elevation={6} square>
          <Box
            sx={{
              my: 8,
              mx: 4,
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
            }}
          >
            <Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}>
              <LockOutlinedIcon />
            </Avatar>
            <Typography component="h1" variant="h5">
              Login
            </Typography>
            <Box
              component="form"
              noValidate
              onSubmit={handleSubmit}
              sx={{ mt: 1 }}
            >
              <TextField
                margin="normal"
                required
                fullWidth
                name="email"
                label="Email"
                autoComplete="email"
                autoFocus
              />
              <TextField
                margin="normal"
                required
                fullWidth
                label="Senha"
                type="password"
                name="password"
                autoComplete="current-password"
              />
              <FormControlLabel
                control={<Checkbox value="remember" color="primary" />}
                label="Lembrar de mim"
              />
              <Button
                type="submit"
                fullWidth
                variant="contained"
                sx={{ mt: 3, mb: 2 }}
              >
                Entrar
              </Button>
              <Grid container>
                <Grid item xs>
                  <Link href="#" variant="body2">
                    Esqueceu a senha?
                  </Link>
                </Grid>
                <Grid item>
                  <Link href="/register" variant="body2">
                    Não tem uma conta? Cadastre-se
                  </Link>
                </Grid>
              </Grid>
              <Copyright sx={{ mt: 5 }} />
            </Box>
          </Box>
        </Grid>
      </Grid>

      {loading && (
        <LoadingPage
          text="Entrando, aguarde!"
          active={!messages.length && !flashMessage}
        >
          {flashMessage && (
            <Alert severity={flashMessage.type}>{flashMessage.text}</Alert>
          )}

          {messages.map((item, i) => (
            <AlertMessage
              key={`item.title-${i}`}
              title={item.title}
              type={item.type}
              sx={{ m: 1.5 }}
            >
              {item.text}
            </AlertMessage>
          ))}
        </LoadingPage>
      )}
    </ThemeProvider>
  )
}
