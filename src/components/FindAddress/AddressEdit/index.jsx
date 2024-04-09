import { useContext, useEffect, useState } from 'react';
import { Button, TextField } from '@mui/material';
import * as S from './style';
import { GlobalContext } from 'contexts/global';

const AddressEdit = (props /* { getAddress(), address } */) => {
  const { toast } = useContext(GlobalContext);
  const initialAddress = {
    zipCode: null,
    city: null,
    state: null,
    street: null,
    district: null,
    number: null,
    complement: null,
  };
  const [address, setAddress] = useState(initialAddress);
  const [edit, setEdit] = useState(false);

  const confirmAddress = () => {
    const errors = [];

    // if (!address.zipCode) errors.push('Cep deve ser preenchido');
    if (!address.city) errors.push('Cidade deve ser preenchido');
    if (!address.street) errors.push('Rua deve ser preenchido');
    if (!address.district) errors.push('Bairro deve ser preenchido');
    if (!address.number) errors.push('Número deve ser preenchido');

    if (errors <= 0) return props.getAddress(address);

    toast.error(errors.map(e => `• ${e}.`).join('\n'));
  };

  useEffect(() => {
    setAddress({ ...address, ...props.address });
    setEdit(props.edit);
  }, []);

  return (
    <>
      <S.Title>Verifique seu enderço com atenção!</S.Title>

      {
        (props.deliveryOption === 'automatic' 
          && address.searchMethod === 'manual') ? (
          <p>
            <span style={{ color: 'red' }}>*</span>
            Ao inserir o endereço manualmente,
            não conseguiremos calcular a taxa de entrega
            neste momento. Não se preocupe, entraremos
            em contato em breve para informar a taxa de
            entrega.
          </p>
        ) : null
      }

      <TextField
        fullWidth
        label="Cep"
        value={address?.zipCode}
        disabled={!edit}
        onChange={(e) => setAddress({ ...address, zipCode: e.target.value })}
        margin="normal"
      />

      <TextField
        fullWidth
        label="Rua"
        value={address?.street}
        disabled={!edit}
        onChange={(e) => setAddress({ ...address, street: e.target.value })}
        margin="normal"
      />

      <TextField
        fullWidth
        label="Bairro"
        value={address?.district}
        disabled={!edit}
        onChange={(e) => setAddress({ ...address, district: e.target.value })}
        margin="normal"
      />

      <TextField
        fullWidth
        label="Cidade"
        value={address?.city}
        disabled={!edit}
        onChange={(e) => setAddress({ ...address, city: e.target.value })}
        margin="normal"
        sx={{ mb: 2 }}
      />

      <strong>Outras Informações</strong>

      <TextField
        fullWidth
        label="Número da casa"
        value={address?.number}
        onChange={(e) => setAddress({ ...address, number: e.target.value })}
        margin="normal"
      />

      <TextField
        fullWidth
        label="Ponto de referência/complemento"
        value={address?.reference}
        onChange={(e) => setAddress({ ...address, reference: e.target.value })}
        margin="normal"
      />

      <Button
        sx={{ height: '48px', mt: 2 }}
        variant="contained"
        fullWidth
        onClick={confirmAddress}
      >
        Confirmar
      </Button>

      <Button
        fullWidth
        color="inherit"
        sx={{ mt: '16px' }}
        onClick={() => {
          toast.error('Se você está enfrentando dificuldades ao buscar o endereço pelo CEP, experimente inserir o endereço completo.');
          setAddress({ 
            zipCode: '', 
            city: '', 
            street: '', 
            district: '', 
            number: '',
            searchMethod: 'manual'
          });
          setEdit(true);
        }}
      >
        Endereço errado? Clique aqui!
      </Button>
    </>
  );
};

export default AddressEdit;
