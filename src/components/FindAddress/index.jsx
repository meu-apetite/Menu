import React, { useState } from 'react';
import { Box, Button, Grid, InputAdornment, TextField } from '@mui/material';
import { GridSearchIcon } from '@mui/x-data-grid';
import axios from 'axios';
import * as S from './style';

const FindAddress = (props /* { getAddress() } */) => {
  const [address, setAddress] = useState({
    zipCode: null,
    city: null,
    state: null,
    street: null,
    district: null,
    number: null,
    reference: null,
  });
  const [cep, setCep] = useState(null);
  const [openModalCep, setOpenModalCep] = useState(true);
  const [openModalAddress, setOpenModalAddress] = useState(false);
  const [openModalInfoExtra, setOpenModalInfoExtra] = useState(false);
  const [edit, setEdit] = useState(false);

  const clearAddress = () => {
    setAddress({
      zipCode: null,
      city: null,
      state: null,
      street: null,
      district: null,
      number: null,
      reference: null,
    });
    setEdit(true);
  }

  const findCep = async () => {
    try {
      const response = await axios.get(`https://viacep.com.br/ws/${cep}/json/`);
      const data = response.data;

      setAddress({
        zipCode: data.cep,
        city: data.localidade,
        state: data.uf,
        district: data.bairro,
        street: data.logradouro
      });

      setOpenModalCep(false);
      setOpenModalAddress(true);
    } catch (error) {
      console.error('Error fetching address:', error);
    }
  };

  return (
    <>
      {openModalCep && (
        <S.ModalContainer>
          <S.ModalContent>
            <S.ButtonModalClose onClick={props.closeModal} className='fa fa-times' />
            <S.WrapperForm>
              <S.TitleModal>Insira seu CEP corretamente</S.TitleModal>
              <Grid container spacing={2}>
                <Grid item xs={12}>
                  <TextField
                    placeholder="Escreva seu CEP"
                    variant="outlined"
                    fullWidth
                    size="small"
                    onChange={(e) => setCep(e.target.value)}
                    InputProps={{
                      endAdornment: (
                        <InputAdornment position="start" onClick={findCep}>
                          <GridSearchIcon />
                        </InputAdornment>
                      ),
                    }}
                  />
                </Grid>
              </Grid>
              <Button variant="contained" onClick={findCep}>Continuar</Button>
            </S.WrapperForm>
          </S.ModalContent>
        </S.ModalContainer>
      )}

      {openModalAddress && (
        <S.ModalContainer>
          <S.ModalContent>
            <S.ButtonModalClose onClick={props.closeModal} className='fa fa-times' />
            <S.WrapperForm>
              <S.TitleModal>Confira com atenção o seu endereço</S.TitleModal>
              <Grid container spacing={2}>
                <Grid item xs={12}>
                  <TextField 
                    fullWidth 
                    label="Cep" 
                    value={address.zipCode}
                    onChange={(e) => setAddress({ ...address, zipCode: e.target.value})}
                    disabled={edit} 
                  />
                </Grid>
                <Grid item xs={12}>
                  <TextField 
                    fullWidth 
                    label="Rua" 
                    value={address.street}
                    onChange={(e) => setAddress({ ...address, street: e.target.value})}
                    disabled={edit} 
                  />
                </Grid>
                <Grid item xs={12}>
                  <TextField 
                    fullWidth 
                    label="Bairro" 
                    value={address.district}
                    onChange={(e) => setAddress({ ...address, district: e.target.value})}
                    disabled={edit} 
                  />
                </Grid>
                <Grid item xs={8}>
                  <TextField 
                    fullWidth 
                    label="Cidade" 
                    value={address.city}
                    onChange={(e) => setAddress({ ...address, city: e.target.value})}
                    disabled={edit} 
                  />
                </Grid>
                <Grid item xs={4}>
                  <TextField 
                    fullWidth 
                    label="Estado" 
                    value={address.state} 
                    onChange={(e) => setAddress({ ...address, state: e.target.value})}
                    disabled={edit} 
                  />
                </Grid>
              </Grid>

              <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1.8 }}>
                <Button
                  variant="contained"
                  onClick={() => {
                    setOpenModalAddress(false);
                    setOpenModalInfoExtra(true);
                  }}
                >
                  Continuar
                </Button>
                <Button 
                  variant="outlined" 
                  color="error"
                  onClick={clearAddress}
                >
                  Endereço errawdo
                </Button>
              </Box>
            </S.WrapperForm>
          </S.ModalContent>
        </S.ModalContainer>
      )}

      {openModalInfoExtra && (
        <S.ModalContainer>
          <S.ModalContent>
            <S.ButtonModalClose onClick={props.closeModal} className='fa fa-times' />
            <S.WrapperForm>
              <S.TitleModal>Outras informações</S.TitleModal>
              <Grid container spacing={2}>
                <Grid item xs={12}>
                  <TextField
                    fullWidth
                    label="Número do local"
                    value={address.number}
                    onChange={(e) => setAddress({ ...address, number: e.target.value })}
                  />
                </Grid>
                <Grid item xs={12}>
                  <TextField
                    fullWidth
                    label="Ponto de referência/complemento"
                    value={address.reference}
                    onChange={(e) => setAddress({ ...address, reference: e.target.value })}
                  />
                </Grid>
              </Grid>
              <Button variant="contained" onClick={() => props.getAddress(address)}>Salvar</Button>
            </S.WrapperForm>
          </S.ModalContent>
        </S.ModalContainer>
      )}
    </>
  );
};

export default FindAddress;