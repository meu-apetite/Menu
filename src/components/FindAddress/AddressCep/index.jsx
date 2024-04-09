import { useState } from 'react';
import axios from 'axios';
import { Box, Button, TextField } from '@mui/material';
import toast from 'react-hot-toast';
import LoadingAnimation from 'components/LoadingAnimation';
import * as S from './style';

const AddressCep = (props /* { getAddress() } */) => {
  const [loading, setLoading] = useState(false);
  const [cep, setCep] = useState(null);

  const findCep = async () => {
    try {
      setLoading(true);

      const numberCep = cep?.replace(/\D/g, "");

      if (numberCep.toString().length !== 8) return toast.error('Cep incorreto');

      const response = await axios.get(`https://viacep.com.br/ws/${numberCep}/json/`);

      if (response.data?.erro) return toast.error('Cep incorreto');

      props.getAddress({
        zipCode: response.data.cep,
        city: response.data.localidade,
        state: response.data.uf,
        district: response.data.bairro,
        street: response.data.logradouro,
      });
    } catch (error) {
      toast.error('Não foi possível encontrar o cep');
    } finally {
      setLoading(false);
    }
  };

  const withoutZipCode = () => {
    props.getAddress({
      zipCode: '',
      city: '',
      state: '',
      district: '',
      street: '',
      edit: true,
      searchMethod: 'manual'
    });
  }

  return (
    <Box >
      <S.Title>Insira seu CEP corretamente</S.Title>
      <TextField
        placeholder="Escreva seu CEP"
        variant="outlined"
        margin="normal"
        fullWidth
        onChange={(e) => setCep(e.target.value)}
      />

      {
        loading ? <LoadingAnimation /> : (
          <>
          <Button
            sx={{ mt: 1, pt: 1, pb: 1 }}
            variant="contained"
            fullWidth
            onClick={findCep}
          >
            Buscar
          </Button>

          <Button
            sx={{ mt: 1, pt: 1, pb: 1 }}
            fullWidth
            onClick={withoutZipCode}
            color="info"
          >
            Não sei o CEP
          </Button>
          </>
        )
      }
    </Box>
  );
};

export default AddressCep;
