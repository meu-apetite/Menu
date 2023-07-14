import React, { useContext, useEffect, useState } from 'react';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import TextField from '@mui/material/TextField';
import ButtonUpload from 'components/ButtonUpload';
import Gallery from 'components/Gallery';
import Header from 'components/Header';
import { ApiService } from 'services/api.service';
import { Button } from '@mui/material';
import { AuthContext } from 'contexts/auth';

const Setting = () => {
  const apiService = new ApiService();

  const { toast, setLoading } = useContext(AuthContext);

  const [data, setData] = useState();

  const formSubmit = async (e) => {
    e.preventDefault();
    setLoading('Agurade...');

    try {
      const response = await apiService.put('/admin/company', data);
      setData(response.data);
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(null);
    }
  }

  const getData = async (id) => {
    const response = await apiService.get('/admin/company/');
    setData(response.data);
  };

  useEffect(() => {
    getData();
  }, []);

  return (
    <>
      <Header
        title="Configuração"
        back={-1}
        buttonText="Salvar"
        buttonClick={formSubmit}
      />

{/* urlName: { type: String }, ~
  whatsapp: String, ~
  active: { type: Boolean, default: true },
 
  login: {
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
  },
  address: {
 
  }, */}

      <Box component="section" noValidate>
        <Grid container spacing={2}>
          <Grid item xs={12} sm={12}>
            <TextField
              label="URL Personalizada"
              value={data?.urlName}
              onChange={(e) => setData({ ...data, urlName: e.target.value })}
              InputLabelProps={{ shrink: true }}
              margin="dense"
              fullWidth
              required
            />
          </Grid>
    
          <Grid item xs={12} sm={12}>
            <TextField
              label="WhatsApp (para direcionar os clientes)"
              value={data?.whatsapp}
              onChange={(e) => setData({ ...data, whatsapp: e.target.value })}
              InputLabelProps={{ shrink: true }}
              margin="dense"
              fullWidth
              required
            />
          </Grid>
        </Grid>

        <Grid container spacing={2}>     
          <Grid item xs={12} sm={12}>
            <h3>Endereço</h3>
            <TextField
              label="Cep"
              value={data?.address?.zipCode}
              onChange={(e) => setData({ ...data, zipCode: e.target.value })}
              InputLabelProps={{ shrink: true }}
              margin="dense"
              type="number"
              fullWidth
              required
            />
          </Grid>

          <Grid item xs={12} sm={12}>
            <TextField
              label="Cidade"
              value={data?.address?.city}
              onChange={(e) => setData({ ...data, city: e.target.value })}
              InputLabelProps={{ shrink: true }}
              margin="dense"
              fullWidth
              required
            />
          </Grid>

          <Grid item xs={12} sm={12}>
            <TextField
              label="Bairro"
              value={data?.address?.district}
              onChange={(e) => setData({ ...data, district: e.target.value })}
              InputLabelProps={{ shrink: true }}
              margin="dense"
              fullWidth
              required
            />
          </Grid>

          <Grid item xs={12} sm={12}>
            <TextField
              label="Rua (Ex: Rua Lima, 251)"
              value={data?.lastName}
              onChange={(e) => setData({ ...data, lastName: e.target.value })}
              InputLabelProps={{ shrink: true }}
              margin="dense"
              fullWidth
              required
            />
          </Grid>
        </Grid>

        <Grid container spacing={2}>     
          <Grid item xs={12} sm={12}>
          <h3>Informações comerciais</h3>
          <TextField
              label="Email (Email da sua loja)"
              value={data?.login?.email}
              onChange={(e) => setData({ ...data, login: { ...data.login, email: e.target.value } })}
              InputLabelProps={{ shrink: true }}
              margin="dense"
              type="email"
              fullWidth
              required
            />
          </Grid>
        </Grid>
  
        <Grid container spacing={2}>     
          <Grid item xs={12} sm={12}>
            <h3>Informações pessoais</h3>
            <TextField
              label="Nome"
              value={data?.name}
              onChange={(e) => setData({ ...data, name: e.target.value })}
              InputLabelProps={{ shrink: true }}
              margin="dense"
              fullWidth
              required
            />
          </Grid>

          <Grid item xs={12} sm={12}>
            <TextField
              label="Sobrenome"
              value={data?.lastName}
              onChange={(e) => setData({ ...data, lastName: e.target.value })}
              InputLabelProps={{ shrink: true }}
              margin="dense"
              fullWidth
              required
            />
          </Grid>
        </Grid>
      </Box>
    </>
  );
};

export default Setting;
