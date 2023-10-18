import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Avatar, Button, TextField, Link, Grid, Box } from '@mui/material';
import CssBaseline from '@mui/material/CssBaseline';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import Alert from '@mui/material/Alert';
import AlertTitle from '@mui/material/AlertTitle';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import LoadingPage from 'components/LoadingPage';
import { ApiService } from 'services/api.service';

const themeDark = createTheme({
  palette: {
    mode: 'dark',
    primary: { main: '#1bac4b' },
    secondary: { main: '#1bac4b' },
    contrastThreshold: 3,
    tonalOffset: 0.2,
  },
});

const Register = () => {
  const apiService = new ApiService(false);

  const [loading, setLoading] = useState(false);
  const [messages, setMessages] = useState([]);
  const [flashMessage, setFlashMessage] = useState(null);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    try {
      e.preventDefault();
      setLoading(true);
      setMessages([]);
      setFlashMessage(null);

      const data = new FormData(e.currentTarget);
      const body = {
        email: data.get('email'),
        password: data.get('password'),
        urlName: data.get('urlName'),
        fantasyName: data.get('fantasyName'),
        ownerName: data.get('ownerName'),
        whatsapp: data.get('whatsapp'),
      };

      if (data.get('password') !== data.get('passwordRepeat')) {
        return setFlashMessage({ text: 'Senhas diferentes!', type: 'error' });
      }

      const response = await apiService.post('/register', body);

      console.log(response);

      if (!response.data.success) {
        return response.data.messages?.forEach((item) => {
          setMessages((old) => [...old, { type: 'error', title: 'Erro!', text: item.text }]);
        });
      }

      setMessages([{
        type: 'success',
        title: 'Cadastro feito!',
        text: 'Faça o login para continuar.'
      }]);

      setTimeout(() => navigate('/login'), 4000);
    } catch (error) {
      console.log(error)
      setMessages([{
        type: 'error',
        title: 'Erro ao fazer o cadastro!',
        text: 'Houve um erro de comunicação na rede.'
      }]);
    } finally {
      setTimeout(() => setLoading(false), 4000);
    }
  };

  const AlertMessage = ({ type, title, children }) => (
    <Alert severity={type}>
      <AlertTitle>{title}</AlertTitle>
      {children}
    </Alert>
  );

  return (
    <ThemeProvider theme={themeDark}>
      <Container component="main" maxWidth="sm">
        <CssBaseline />
        <Box
          sx={{
            marginTop: 1,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
          }}
        >
          <Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}>
            <LockOutlinedIcon />
          </Avatar>

          <Typography component="h1" variant="h5">Nova conta</Typography>

          <Box
            component="form"
            noValidate
            onSubmit={(e) => handleSubmit(e)}
            sx={{ mt: 3 }}
          >
            <Grid container spacing={2}>
              <Grid item xs={12}>
                <TextField
                  required
                  fullWidth
                  name="ownerName"
                  label="Nome do proprietário"
                  autoFocus
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  required
                  fullWidth
                  name="fantasyName"
                  label="Nome do seu negócio"
                />
              </Grid>
              <Grid item xs={12}>
                <TextField required fullWidth name="email" label="Email" />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  required
                  fullWidth
                  name="whatsapp"
                  type="tel"
                  label="Whatsapp"
                />
              </Grid>
              <Grid item xs={12} md={6}>
                <TextField
                  required
                  fullWidth
                  label="Senha"
                  type="password"
                  name="password"
                />
              </Grid>
              <Grid item xs={12} md={6}>
                <TextField
                  required
                  fullWidth
                  label="Repita a senha"
                  type="password"
                  name="passwordRepeat"
                />
              </Grid>
              <Grid item xs={12}>
                <FormControlLabel
                  control={
                    <Checkbox value="allowExtraEmails" color="primary" />
                  }
                  label="Eu aceito todos os termos."
                />
              </Grid>
            </Grid>
            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
            >
              Cadastrar
            </Button>
            <Grid container justifyContent="flex-end">
              <Grid item>
                <Link href="/login" variant="body2">
                  Já tem uma conta? Entre agora!
                </Link>
              </Grid>
            </Grid>
          </Box>
        </Box>
        <Typography
          variant="body2"
          color="text.secondary"
          align="center"
          sx={{ mt: 5 }}
        >
          {'Copyright © '}
          <Link color="inherit" href="">
            Loja Expressa
          </Link>{' '}
          {new Date().getFullYear()}
        </Typography>
      </Container>

      {loading && (
        <LoadingPage
          text="Aguarde, sua loja está sendo criada!"
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
  );
};

export default Register;
