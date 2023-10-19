import React, { useContext, useEffect, useState } from 'react';
import { Box, Button, Grid, TextField } from '@mui/material';
import Header from 'components/Header';
import { ApiService } from 'services/api.service';
import { AuthContext } from 'contexts/auth';
import FindAddress from 'components/FindAddress';
import { propsTextField } from 'utils/form';

const Setting = () => {
  const apiService = new ApiService();
  const { toast, setLoading } = useContext(AuthContext);
  const [data, setData] = useState();
  const [openEditorAddress, setOpenEditorAddress] = useState(false);

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
  };

  const getData = async (id) => {
    const response = await apiService.get('/admin/company/');
    setData(response.data);
  };

  const updateAddress = async (address) => {
    // address: { street: string, number: number, zipCode: string, district: string, city: string }
    try {
      setLoading('Atualizando endereço');
      const response = await apiService.post('/admin/company/updateAddress', address);
      setData(response.data);
      toast.success('Endereço atualizado');
    } catch (error) {
      console.log(error);
      toast.success(
        'Não foi possível atualizar o endereço. caso não esteja consiguindo, entre em contato conosco.'
      );
    } finally {
      setOpenEditorAddress(false);
      setLoading(null);
    }
  };

  useEffect(() => {
    getData();
  }, []);

  return (
    <>
      <Header title="Configuração" back={-1} buttonText="Salvar" buttonClick={formSubmit} />

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
              disabled
              label="Cep"
              value={data?.address?.zipCode}
              {...propsTextField}
            />
          </Grid>

          <Grid item xs={12} sm={12}>
            <TextField
              disabled
              label="Cidade"
              value={data?.address?.city}
              {...propsTextField}
            />
          </Grid>

          <Grid item xs={12} sm={12}>
            <TextField
              disabled
              label="Bairro"
              value={data?.address?.district}
              {...propsTextField}
            />
          </Grid>

          <Grid item xs={9} sm={9}>
            <TextField
              disabled
              label="Rua"
              value={data?.address?.street}
              {...propsTextField}
            />
          </Grid>

          <Grid item xs={3} sm={3}>
            <TextField
              disabled
              label="Número"
              value={data?.address?.number}
              {...propsTextField}
            />
          </Grid>

          <Grid item xs={12} sm={12}>
            <Button
              variant="outlined"
              onClick={() => setOpenEditorAddress(!openEditorAddress)}
            >
              Atualizar endereço
            </Button>
          </Grid>

          {openEditorAddress && <FindAddress getAddress={(address) => updateAddress(address)} />}
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
            <h3>Proprietário</h3>
            <TextField
              label="Nome"
              value={data?.owner.name}
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
              value={data?.owner.lastName}
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
