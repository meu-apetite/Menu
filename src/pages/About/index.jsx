import { useContext, useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
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
import { GlobalContext } from 'contexts/global';
import LocationOnIcon from '@mui/icons-material/LocationOn';
import DescriptionIcon from '@mui/icons-material/Description';
import BusinessIcon from '@mui/icons-material/Business';
import ScheduleIcon from '@mui/icons-material/Schedule';
import CloseIcon from '@mui/icons-material/Close';
import * as S from './style';

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
  const [paymentMethods, setPaymentMethods] = useState([]);

  useEffect(() => {
    if (!methods || methods?.length < 1) return;

    const methodsParent = [];

    methods.forEach((item) => {
      const parent = item.parent;
      const objCorrespondente = methodsParent.find((obj) => obj.parent === parent);

      if (objCorrespondente) {
        objCorrespondente.options.push(item);
        return;
      }

      methodsParent.push({ parent: parent, options: [item] });
    });

    setPaymentMethods(methodsParent);
  }, []);

  return (
    <S.StyledPaper elevation={3}>
      <Typography variant="h5" gutterBottom>
        <S.Icon><ScheduleIcon /></S.Icon>{' '}Métodos de pagamento
      </Typography>
      <Divider /> <br />
      <S.Section sx={{ display: 'grid', justifyContent: 'space-around', flexWrap: 'wrap' }}>
        {paymentMethods.map((method) => {
          return (
            <Box sx={{ mb: 3 }}>
              <Typography variant="h6" align="left">{method.parent}</Typography>
              {method.options.map((item) => {
                return (
                  <Box key={item.title} sx={{ display: 'flex', mb: 1 }}>
                    <img
                      src={item.image}
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
  const { menuUrl } = useParams();
  const { company } = useContext(GlobalContext);
  const [tab, setTab] = useState('about');

  return (
    <>
      <AppBar sx={{ position: 'relative' }}>
        <Toolbar>
          <Button
            variant="outlined"
            sx={{ color: '#fff' }}
            startIcon={<CloseIcon />}
            onClick={() => navigate(`/${menuUrl}`)}
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
            description={company.description}
            address={company.address?.freeformAddress}
          />
        )}
        {tab === 'hours' && <TimeComponent hours={company.settings.openingHours} />}
        {tab === 'payment' && <PaymentComponent methods={company.settingsPayment?.methods} />}
      </Container>
    </>
  );
};

export default About;
