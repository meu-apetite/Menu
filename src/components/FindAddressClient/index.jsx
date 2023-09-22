import { useState } from 'react';
import axios from 'axios';
import {
  Box,
  Button,
  Grid,
  InputAdornment,
  Switch,
  TextField,
} from '@mui/material';
import { GridSearchIcon } from '@mui/x-data-grid';
import toast from 'react-hot-toast';
import LoadingAnimation from 'components/LoadingAnimation';
import * as S from './style';

const FindAddressClient = (props /* { getAddress() } */) => {
  const [loading, setLoading] = useState(false);
  const [address, setAddress] = useState({
    zipCode: null,
    city: null,
    state: null,
    street: null,
    district: null,
    number: null,
    complement: null,
    condominium: null,
  });
  const [cep, setCep] = useState(null);
  const [iscondominium, setIsCondominium] = useState(false);
  const [openModalCep, setOpenModalCep] = useState(true);
  const [openModalAddress, setOpenModalAddress] = useState(false);
  const [openModalInfoExtra, setOpenModalInfoExtra] = useState(false);

  const findCep = async () => {
    try {
      setLoading(true);

      const response = await axios.get(`https://viacep.com.br/ws/${cep}/json/`);
     
        if(response.data?.erro) return toast.error('Cep incorreto', { duration: 5000, position: 'top-center' });

      setAddress({
        zipCode: response.data.cep,
        city: response.data.localidade,
        state: response.data.uf,
        district: response.data.bairro,
        street: response.data.logradouro,
      });

      setOpenModalAddress(true);
    } catch (error) {
      toast.error('Não foi possível encontrar o cep', { duration: 5000, position: 'top-center' });
    } finally {
      setLoading(false);
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
                      endAdornment: (<InputAdornment position="start" onClick={findCep}><GridSearchIcon /></InputAdornment>)
                    }}
                  />
                </Grid>
              </Grid>

              {
                !loading ? (
                  <Button variant="contained" onClick={findCep}>Continuar</Button>
                ) : (
                  <S.WrapperAnimation>
                    <LoadingAnimation />
                  </S.WrapperAnimation>
                ) 
              }
              
            </S.WrapperForm>
          </S.ModalContent>
        </S.ModalContainer>
      )}

      {openModalAddress && (
        <S.ModalContainer>
          <S.ModalContent>
            <S.WrapperForm>
              <S.TitleModal>Confira com atenção o seu endereço</S.TitleModal>

              <Grid container spacing={2}>
                <Grid item xs={12}>
                  <TextField fullWidth label="Cep" value={address.zipCode} disabled />
                </Grid>
                <Grid item xs={12}>
                  <TextField fullWidth label="Rua" value={address.street} disabled />
                </Grid>
                <Grid item xs={12}>
                  <TextField fullWidth label="Bairro" value={address.district} disabled />
                </Grid>
                <Grid item xs={8}>
                  <TextField fullWidth label="Cidade" value={address.city} disabled />
                </Grid>
                <Grid item xs={4}>
                  <TextField fullWidth label="Estado" value={address.state} disabled />
                </Grid>
              </Grid>

              <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1.8 }}>
                <Button
                  variant="contained"
                  onClick={() => {
                    setOpenModalAddress(false);
                    setOpenModalInfoExtra(true);
                  }}
                >Continuar</Button>
                <Button variant="outlined" color="error">Endereço errado</Button>
              </Box>
            </S.WrapperForm>
          </S.ModalContent>
        </S.ModalContainer>
      )}

      {openModalInfoExtra && (
        <S.ModalContainer>
          <S.ModalContent>
            <S.WrapperForm>
              <S.TitleModal>Outras informações</S.TitleModal>
              <Grid container spacing={2}>
                <Grid item xs={12}>
                  <label>Casa em condomínio</label>
                  <Switch
                    checked={iscondominium}
                    onChange={() => setIsCondominium(!iscondominium)}
                    inputProps={{ 'aria-label': 'controlled' }}
                  />
                </Grid>
                {iscondominium && (
                  <Grid item xs={12}>
                    <TextField
                      fullWidth
                      label="Condomínio e bloco"
                      value={address.condominium}
                      onChange={(e) => setAddress({ ...address, condominium: e.target.value })}
                    />
                  </Grid>
                )}
                <Grid item xs={12}>
                  <TextField
                    fullWidth
                    label="Número da casa"
                    value={address.number}
                    onChange={(e) => setAddress({ ...address, number: e.target.value })}
                  />
                </Grid>
                <Grid item xs={12}>
                  <TextField
                    fullWidth
                    label="Ponto de referência/complemento"
                    value={address.complement}
                    onChange={(e) => setAddress({ ...address, complement: e.target.value })}
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

export default FindAddressClient;
