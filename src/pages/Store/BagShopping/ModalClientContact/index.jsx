import { useContext, useState } from 'react';
import { Grid, TextField } from '@mui/material';
import { AuthContext } from 'contexts/auth';
import * as S from './style';

const ModalClientContact = (props) => {
  const { toast } = useContext(AuthContext);
  const [clientInfo, setClientInfo] = useState({ name: '', phoneNumber: '', email: '' });

  const getData = async () => {
    if (clientInfo.email === '' || clientInfo.name === '' || clientInfo.phoneNumber === '') {
      return toast.error('Você deve preencher todos os dados de contato');
    }
    return props.getData(clientInfo);
  };

  return (
    <S.ModalContainer>
      <S.ModalContent>
        <S.WrapperForm>
          <S.TitleModal>Informe seus dados de contato</S.TitleModal>
          <Grid container spacing={2}>
            <Grid item xs={12}>
              <TextField
                fullWidth
                label="Nome"
                value={clientInfo.name}
                onChange={(e) => setClientInfo({ ...clientInfo, name: e.target.value })}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                fullWidth
                label="Telefone (whatsapp)"
                value={clientInfo.phoneNumber}
                onChange={(e) => setClientInfo({ ...clientInfo, phoneNumber: e.target.value })}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                fullWidth
                label="Email"
                value={clientInfo.email}
                onChange={(e) => setClientInfo({ ...clientInfo, email: e.target.value })}
              />
            </Grid>
          </Grid>
        </S.WrapperForm>
        <S.ButtonDefault variant="contained" onClick={getData}>
          Tudo certo
        </S.ButtonDefault>
      </S.ModalContent>
    </S.ModalContainer>
  );
};

export default ModalClientContact;
