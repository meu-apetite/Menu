import { useContext, useState } from 'react';
import { Button, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, Grid, TextField } from '@mui/material';
import { AuthContext } from 'contexts/auth';

const ModalClientContact = (props) => {
  const { toast } = useContext(AuthContext);
  const [clientInfo, setClientInfo] = useState({ name: '', phoneNumber: '', email: '' });
  const { open = false, onClose } = props;

  const getData = async () => {
    if (clientInfo.email === '' || clientInfo.name === '' || clientInfo.phoneNumber === '') {
      return toast.error(
        'Você deve preencher todos os dados de contato', 
        { position: 'top-center' }
      );
    }

    const regexEmail = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (!regexEmail.test(clientInfo.email)) {
      return toast.error('O email é inválido', { position: 'top-center' })
    }

    return props.getData(clientInfo);
  };

  return (
    <Dialog open={open} onClose={onClose}>
      <DialogTitle>Informações de contato</DialogTitle>
      <DialogContent>
        <DialogContentText>
          Preencha os campos abaixo com suas informações de contato 
          para continuar o pedido.
        </DialogContentText>
        <Grid item xs={12}>
          <TextField
            fullWidth
            label="Nome"
            name="name"
            value={clientInfo.name}
            focused={true}
            onChange={(e) => setClientInfo({ ...clientInfo, name: e.target.value })}
            margin="dense"
          />
        </Grid>
        <Grid item xs={12}>
          <TextField
            fullWidth
            type="tel"
            label="Telefone (whatsapp)"
            name="phone-number"
            margin="dense"
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
            margin="dense"
            value={clientInfo.email}
            onChange={(e) => setClientInfo({ ...clientInfo, email: e.target.value })}
          />
        </Grid>
      </DialogContent>
      <DialogActions>
        <Button onClick={getData}>Continuar</Button>
      </DialogActions>
    </Dialog>
  );
};

export default ModalClientContact;
