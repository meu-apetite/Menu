import { Fragment, useContext, useEffect, useState } from 'react';
import {
  Tab,
  Tabs,
  Typography,
  Toolbar,
  AppBar,
  Container,
  Divider,
  Box,
  Button,
} from '@mui/material';
import LocationOnIcon from '@mui/icons-material/LocationOn';
import DescriptionIcon from '@mui/icons-material/Description';
import BusinessIcon from '@mui/icons-material/Business';
import ScheduleIcon from '@mui/icons-material/Schedule';
import iconDinheiro from 'assets/icons/dinheiro.png';
import iconElo from 'assets/icons/elo.webp';
import iconMastercard from 'assets/icons/mastercard.webp';
import iconVisa from 'assets/icons/visa.webp';
import iconHipercard from 'assets/icons/hipercard.png';
import iconNugo from 'assets/icons/nugo.avif';
import iconAmex from 'assets/icons/amex.png';
import iconSodexo from 'assets/icons/sodexo.png';
import iconVr from 'assets/icons/vr.avif';
import iconTicket from 'assets/icons/ticket.png';
import CloseIcon from '@mui/icons-material/Close';
import * as S from './style';
import { GlobalContext } from 'contexts/global';
import { useNavigate, useParams } from 'react-router-dom';
import { ApiService } from 'services/api.service';

const AboutWeComponent = ({ description, address }) => (
  <S.StyledPaper elevation={3}>
    <Typography variant="h5" gutterBottom>
      <S.Icon><BusinessIcon /></S.Icon>{' '}Sobre nós
    </Typography>
    <Divider />
    <S.Section>
      <Typography variant="h6">
        <S.Icon><DescriptionIcon /></S.Icon>{' '}Descrição
      </Typography>
      <Typography variant="body1" paragraph>{description}</Typography>
    </S.Section>
    <Divider />
    <S.Section>
      <Typography variant="h6">
        <S.Icon><LocationOnIcon /></S.Icon>{' '}Endereço
      </Typography>
      <Typography variant="body1" paragraph>{address}</Typography>
    </S.Section>
    <Divider />
    <S.Section>
      <Typography variant="h6">
        <S.Icon><BusinessIcon /></S.Icon>{' '}CNPJ
      </Typography>
      <Typography variant="body1" paragraph>Não informado</Typography>
    </S.Section>
  </S.StyledPaper>
);

const TimeComponent = ({ hours }) => {
  const listDayName = [
    { name: 'monday', label: 'Segunda' },
    { name: 'tuesday', label: 'Terça' },
    { name: 'wednesday', label: 'Quarta' },
    { name: 'thursday', label: 'Quinta' },
    { name: 'friday', label: 'Sexta' },
    { name: 'saturday', label: 'Sábado' },
    { name: 'saturday', label: 'Domingo' },
  ];

  return (
    <S.StyledPaper elevation={3}>
      <Typography variant="h5" gutterBottom>
        <S.Icon><ScheduleIcon /></S.Icon>{' '}
        Hórario de funcionamento
      </Typography>
      <Divider /><br />

      <S.Section sx={{ display: 'grid', justifyContent: 'center' }}>
        {listDayName.map((item) => {
          return (
            <Typography
              key={item.label}
              variant="body1"
              paragraph
              sx={{ display: 'flex' }}
            >
              <strong style={{ width: '80px', textAlign: 'start' }}>
                {item.label}:{' '}
              </strong>
              {hours[item.name].open} - {hours[item.name].close}
            </Typography>
          );
        })}
      </S.Section>
    </S.StyledPaper>
  );
};

const PaymentComponent = ({ methods }) => {
  const [paymentCategory, setPaymentCategory] = useState({});

  useEffect(() => {
    const list = {};
    methods.map((item) => {
      if (item.id.indexOf('elo') >= 0) item.icon = iconElo;
      if (item.id.indexOf('dinheiro') >= 0) item.icon = iconDinheiro;
      if (item.id.indexOf('mastercard') >= 0) item.icon = iconMastercard;
      if (item.id.indexOf('hipercard') >= 0) item.icon = iconHipercard;
      if (item.id.indexOf('visa') >= 0) item.icon = iconVisa;
      if (item.id.indexOf('amex') >= 0) item.icon = iconAmex;
      if (item.id.indexOf('nugo') >= 0) item.icon = iconNugo;
      if (item.id.indexOf('vr') >= 0) item.icon = iconVr;
      if (item.id.indexOf('ticket') >= 0) item.icon = iconTicket;
      if (item.id.indexOf('sodexo') >= 0) item.icon = iconSodexo;

      if (list[item.parent]?.length >= 1) {
        list[item.parent].push(item);
      } else {
        list[item.parent] = [item];
      }
    });

    setPaymentCategory(list);
  }, []);

  return (
    <S.StyledPaper elevation={3}>
      <Typography variant="h5" gutterBottom>
        <S.Icon><ScheduleIcon /></S.Icon>{' '}Métodos de pagamento
      </Typography>
      <Divider /> <br />
      <S.Section sx={{ display: 'grid', justifyContent: 'space-around', flexWrap: 'wrap' }}>
        {Object.keys(paymentCategory).map((key) => {
          return (
            <Box key={key} sx={{ mb: 3 }}>
              <Typography variant="h6" align="left">{key}</Typography>
              {paymentCategory[key].map((item) => {
                return (
                  <Box key={item.title} sx={{ display: 'flex', mb: 1 }}>
                    <img
                      src={item.icon}
                      style={{ width: '24px', objectFit: 'contain' }}
                      alt=""
                    />
                    <Typography variant="body1" sx={{ ml: 1 }}>{item.title}</Typography>
                  </Box>
                );
              })}
            </Box>
          );
        })}
      </S.Section>
    </S.StyledPaper>
  );
};

const About = () => {
  const navigate = useNavigate();
  const { storeUrl } = useParams();
  const apiService = new ApiService(false);
  const { store: storeSaved } = useContext(GlobalContext);
  const [tab, setTab] = useState('about');
  const [store, setStore] = useState({});

  const getStore = async () => {
    const { data } = await apiService.get('/' + storeUrl);
    setStore(data);
  };

  useEffect(() => {
    (!storeSaved.storeUrl) 
      ? getStore() : setStore(storeSaved);
  }, []);

  return (
    <>
      <AppBar sx={{ position: 'relative' }}>
        <Toolbar>
          <Button 
            variant="outlined" 
            sx={{ color: '#fff' }}
            startIcon={<CloseIcon />}
            onClick={() => navigate(`/${storeUrl}`)}
          >Voltar</Button>
        </Toolbar>
      </AppBar>

      <Container maxWidth="sm">
        <Tabs value={tab} variant="fullWidth" onChange={(e, v) => setTab(v)}>
          <Tab label="Sobre" value="about" />
          <Tab label="Horário" value="hours" />
          <Tab label="Pagamento" value="payment" />
        </Tabs>

        {tab === 'about' && (
          <AboutWeComponent
            description={store?.description}
            address={store?.address?.freeformAddress}
          />
        )}
        {tab === 'hours' && (
          <TimeComponent hours={store?.settings?.openingHours} />
        )}
        {tab === 'payment' && (
          <PaymentComponent methods={store?.settingsPayment?.methods} />
        )}
      </Container>
    </>
  );
};

export default About;
