import React, { useContext, useEffect, useState } from 'react';
import { Box, Button, Grid, TextField } from '@mui/material';
import Header from 'components/Header';
import { ApiService } from 'services/api.service';
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
  };

  const getData = async (id) => {
    const response = await apiService.get('/admin/company/');
    setData(response.data);
  };


  useEffect(() => {
    getData();
  }, []);

  return (
    <>
      <Header title="Informações do Administrador" back={-1} />

      <Box component="section" noValidate>
        <Grid container spacing={2}>
          <Grid item xs={12} sm={12}>
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
