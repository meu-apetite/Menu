import toast from 'react-hot-toast';
import { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { Grid, TextField } from '@mui/material';
import { ApplicationUtils } from 'utils/ApplicationUtils';
import ButtonFloat from 'components/ButtonFloat';
import { ApiService } from 'services/api.service';

const ClientContact = () => {
  const apiService = new ApiService(false);
  const navigate = useNavigate();
  const { storeUrl } = useParams();
  const [client, setClient] = useState({ name: '', phoneNumber: '', email: '' });
  const [cart, setCart] = useState({});

  const getCart = async () => {
    const cart = await ApplicationUtils.getCartInLocalStorage(storeUrl);
    setCart(cart);
    if (cart?.client) setClient(cart.client);
  } 

  const verifyData = () => {
    if (client.email === '' || client.name === '' || client.phoneNumber === '') {
      toast.error(
        'Você deve preencher todos os dados de contato',
        { position: 'top-center' }
      );

      return false;
    }

    const regexEmail = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (!regexEmail.test(client.email)) {
      toast.error('O email é inválido', { position: 'top-center' });
      return false;
    }

    return true;
  }

  const saveClientData = async () => {
    try {
      if (!verifyData()) return;

      const response = await apiService.post('/add-client-data', {
        cartId: cart._id, 
        client: client
      });

      next(response.data);
    } catch (error) {
      alert("error")
    }
  };

  const next = async (data) => {
    await ApplicationUtils.setDataInLocalStorage(storeUrl, data);
    navigate(`/${storeUrl}/checkout/address`);
  };

  useEffect(() => {
    getCart();
  }, [])

  return (
    <section>
      <h2>Informações de contato</h2>
      <small>
        Preencha os campos abaixo com suas informações de contato
        para continuar o pedido.
      </small>
      <Grid item xs={12}>
        <TextField
          fullWidth
          label="Nome"
          name="name"
          value={client.name}
          onChange={(e) => setClient({ ...client, name: e.target.value })}
          margin="normal"
        />
      </Grid>
      <Grid item xs={12}>
        <TextField
          fullWidth
          type="tel"
          label="Telefone (whatsapp)"
          name="phone-number"
          margin="normal"
          value={client.phoneNumber}
          onChange={(e) => setClient({ ...client, phoneNumber: e.target.value })}
        />
      </Grid>
      <Grid item xs={12}>
        <TextField
          fullWidth
          type="email"
          label="Email"
          name="email"
          margin="normal"
          value={client.email}
          onChange={(e) => setClient({ ...client, email: e.target.value })}
        />
      </Grid>
      <ButtonFloat text="Continuar" onClick={saveClientData} />
    </section>
  );
};

export default ClientContact;
