import { useContext, useState } from 'react';
import { Grid, TextField } from '@mui/material';
import toast from 'react-hot-toast';
import ButtonFloat from 'components/ButtonFloat';
import { StoreContext } from 'contexts/store';
import { useNavigate, useParams } from 'react-router-dom';

const ClientContact = () => {
  const navigate = useNavigate();
  const { getBag } = useContext(StoreContext);
  const { storeUrl } = useParams();
  const [clientInfo, setClientInfo] = useState({ name: '', phoneNumber: '', email: '' });

  const next = async () => {
    if (clientInfo.email === '' || clientInfo.name === '' || clientInfo.phoneNumber === '') {
      return toast.error(
        'Você deve preencher todos os dados de contato',
        { position: 'top-center' }
      );
    }

    const regexEmail = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (!regexEmail.test(clientInfo.email)) {
      return toast.error('O email é inválido', { position: 'top-center' });
    }
    const bag = await getBag(storeUrl);
    const newBag = { ...bag, ...clientInfo };
    await localStorage.setItem(storeUrl, JSON.stringify(newBag));
    navigate(`/${storeUrl}/checkout/address`);
  };

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
          value={clientInfo.name}
          onChange={(e) => setClientInfo({ ...clientInfo, name: e.target.value })}
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
          value={clientInfo.phoneNumber}
          onChange={(e) => setClientInfo({ ...clientInfo, phoneNumber: e.target.value })}
        />
      </Grid>
      <Grid item xs={12}>
        <TextField
          fullWidth
          type="email"
          label="Email"
          name="email"
          margin="normal"
          value={clientInfo.email}
          onChange={(e) => setClientInfo({ ...clientInfo, email: e.target.value })}
        />
      </Grid>
      <ButtonFloat text="Continuar" onClick={next} />
    </section>
  );
};

export default ClientContact;
