import React, { useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import Link from '@mui/material/Link';
import Paper from '@mui/material/Paper';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import Typography from '@mui/material/Typography';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import fetchApi from 'fetch';
import { AuthContext } from 'contexts/auth';
import ImageIntro from '../../../public/images/16548-min.jpg';


const themeDark = createTheme({
  palette: {
    mode: 'dark',
    primary: { main: '#1bac4b' },
    secondary: { main: '#1bac4b' },
    contrastThreshold: 3,
    tonalOffset: 0.2,
  },
});

export default function Login() {
  const {setLoading, toast } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    try {
      e.preventDefault();
      setLoading(true);
      
      const data = new FormData(e.currentTarget);
      const body = { email: data.get('email'), password: data.get('password') };

      if (!data.get('email')) return toast.error('O Email não pode ficar em branco');
      if (!data.get('password')) return toast.error('A Senha não pode ficar em branco');
      
      let response = await fetchApi('post', 'login', body, false);
      response = await response.json();

      if (!response.success) return toast.error(response.message);      
    
      localStorage.setItem('_id', JSON.stringify(response._id));
      localStorage.setItem('token', JSON.stringify(response.token));

      navigate('/admin');

      return document.location.reload();
    } catch (error) {
      return toast.error(error.message);
    } finally {
      setLoading(false);
      setTimeout(() => setLoading(false), 4000);
    }
  };

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
            backgroundColor: (t) => t.palette.mode === 'light' ? t.palette.grey[50] : t.palette.grey[900],
            backgroundSize: 'cover',
            backgroundPosition: 'center',
          }}
        />

        <Grid item xs={12} sm={8} md={5} component={Paper} elevation={6} square>
          <Box sx={{ my: 8, mx: 4, display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
            <Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}><LockOutlinedIcon /></Avatar>

            <Typography component="h1" variant="h5">Login</Typography>

            <Box component="form" noValidate onSubmit={handleSubmit} sx={{ mt: 1 }}>
              <TextField margin="normal" required fullWidth
                name="email" label="Email" autoComplete="email"
                autoFocus
              />

              <TextField margin="normal" required fullWidth
                label="Senha" type="password" name="password"
                autoComplete="current-password"
              />

              <FormControlLabel
                control={<Checkbox value="remember" color="primary" />}
                label="Lembrar de mim"
              />

              <Button type="submit" fullWidth variant="contained" sx={{ mt: 3, mb: 2 }}>
                Entrar
              </Button>

              <Grid container>
                <Grid item xs>
                  <Link href="#" variant="body2">Esqueceu a senha?</Link>
                </Grid>

                <Grid item>
                  <Link href="/register" variant="body2">Não tem uma conta? Cadastre-se</Link>
                </Grid>
              </Grid>

              <br /> <br />

              <Typography variant="body2" color="text.secondary" align="center">
                {'Copyright © '}
                <Link color="inherit" href="https://lojaexpressa.com/">Loja Expressa</Link> 
                {' '} {new Date().getFullYear()}
              </Typography>
            </Box>
          </Box>
        </Grid>
      </Grid>
    </ThemeProvider>
  );
}
