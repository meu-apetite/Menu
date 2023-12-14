import { useState } from 'react';
import axios from 'axios';
import { Box, Button, Grid, InputAdornment, TextField } from '@mui/material';
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
  const [openModalCep, setOpenModalCep] = useState(true);
  const [openModalAddress, setOpenModalAddress] = useState(false);
  const [openModalInfoExtra, setOpenModalInfoExtra] = useState(false);
  const [edit, setEdit] = useState(false);

  const editAddress = () => {
    setAddress({
      zipCode: '',
      city: '',
      state: '',
      street: '',
      district: '',
      number: '',
      reference: '',
    });
    setEdit(true);
  };

  const problemCep = () => {
    setEdit(true);
    setOpenModalCep(false);
    setOpenModalAddress(true);
  };

  const nextInfoExtra = () => {
    if (!address.street || !address.district || !address.city) {
      return toast.error('Preencha todos os campos', { position: 'top-center' });
    }

    setOpenModalAddress(false); 
    setOpenModalInfoExtra(true); 
  }

  const findCep = async () => {
    try {
      setLoading(true);

      const response = await axios.get(`https://viacep.com.br/ws/${cep}/json/`);

      if (response.data?.erro) return toast.error('Cep incorreto', { duration: 5000, position: 'top-center' });

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
                      endAdornment: (
                      <InputAdornment position="start" onClick={findCep}>
                        <span className="fa fa-searc" />
                      </InputAdornment>)
                    }}
                  />
                </Grid>
              </Grid>

              {
                !loading
                  ? <div style={{ display: 'grid', gap: '16px', marginTop: '-24px' }}>
                      <Button variant="contained" onClick={findCep}>Continuar</Button>
                      <Button 
                        sx={{ color: '#000', fontSize: '12px' }} 
                        onClick={problemCep}
                      >
                        Problema com CEP ou sua rua não possui CEP?
                      </Button>
                    </div>
                  : <S.WrapperAnimation><LoadingAnimation /></S.WrapperAnimation>
              }

            </S.WrapperForm>
          </S.ModalContent>
        </S.ModalContainer>
      )}

      {openModalAddress && (
        <S.ModalContainer>
          <S.ModalContent>
            <S.WrapperForm>
              <S.TitleModal>
                {!edit ? 'Confira com atenção o seu endereço' : 'Insira corretamente seu endereço'}
              </S.TitleModal>

              <Grid container spacing={2}>
                <Grid item xs={12}>
                  {edit && <span>
                    Problemas com o CEP? Não vamos conseguir calcular automaticamente a entrega, mas
                    breve entraremos em contato com o valor.
                  </span>
                  }
                </Grid>

                {!edit && (
                  <Grid item xs={12}>
                    <TextField
                      fullWidth
                      label="Cep"
                      value={address.zipCode}
                      onChange={(e) => setAddress({ ...address, zipCode: e.target.value })}
                      disabled={!edit}
                    />
                  </Grid>
                )}
                <Grid item xs={12}>
                  <TextField
                    fullWidth
                    label="Rua"
                    value={address.street}
                    onChange={(e) => setAddress({ ...address, street: e.target.value })}
                    disabled={!edit}
                  />
                </Grid>
                <Grid item xs={12}>
                  <TextField
                    fullWidth
                    label="Bairro"
                    value={address.district}
                    onChange={(e) => setAddress({ ...address, district: e.target.value })}
                    disabled={!edit}
                  />
                </Grid>
                <Grid item xs={12}>
                  <TextField
                    fullWidth
                    label="Cidade"
                    value={address.city}
                    onChange={(e) => setAddress({ ...address, city: e.target.value })}
                    disabled={!edit}
                  />
                </Grid>
              </Grid>

              <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1.8 }}>
                <Button variant="contained" onClick={nextInfoExtra}>Continuar</Button>
                {!edit && 
                  <Button variant="outlined" color="error" onClick={editAddress}>
                    Endereço errado
                  </Button>
                }
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
