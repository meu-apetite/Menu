import { useContext, useEffect } from 'react';
import { Outlet, useParams, useLocation } from 'react-router-dom';
import { Box, Container, Divider } from '@mui/material';
import { StoreContext } from 'contexts/store';
import { ApiService } from 'services/api.service';
import Stack from '@mui/material/Stack';
import Stepper from '@mui/material/Stepper';
import Step from '@mui/material/Step';
import StepLabel from '@mui/material/StepLabel';
import PhoneIcon from '@mui/icons-material/Phone';
import LocalShippingIcon from '@mui/icons-material/LocalShipping';
import PaymentIcon from '@mui/icons-material/Payment';
import * as S from './style';

function ColorlibStepIcon(props) {
  const { active, completed, className } = props;

  const icons = { 1: <PhoneIcon />, 2: <LocalShippingIcon />, 3: <PaymentIcon /> };

  return (
    <S.ColorlibStepIconRoot ownerState={{ completed, active }} className={className}>
      {icons[String(props.icon)]}
    </S.ColorlibStepIconRoot>
  );
}

const Layout = (props) => {
  const apiService = new ApiService(false);
  const { storeUrl } = useParams();
  const { setStore } = useContext(StoreContext);
  const location = useLocation();

  const getStore = async () => {
    const { data } = await apiService.get('/store/' + storeUrl);
    setStore(data);
  };

  useEffect(() => {
    getStore();
  }, []);

  const getStepFromPath = () => {
    const pathSegments = location.pathname.split('/');
    const lastSegment = pathSegments[pathSegments.length - 1];

    switch (lastSegment) {
      case 'contact':
        return 0; // Ativar etapa de Contato
      case 'address':
        return 1; // Ativar etapa de Entrega
      case 'pay':
        return 2; // Ativar etapa de Pagamento
      default:
        return 0; // Padrão: Contato
    }
  };

  return (
    <Box>
      <Container maxWidth="md">
        <Stack sx={{ width: '100%', mt: 2, mb: 2 }} spacing={4}>
          <Stepper alternativeLabel activeStep={getStepFromPath()} connector={<S.ColorlibConnector />}>
            <Step key="Contato">
              <StepLabel StepIconComponent={ColorlibStepIcon}>Contato</StepLabel>
            </Step>
            <Step key="Entrega">
              <StepLabel StepIconComponent={ColorlibStepIcon}>Entrega</StepLabel>
            </Step>
            <Step key="Pagamento">
              <StepLabel StepIconComponent={ColorlibStepIcon}>Pagamento</StepLabel>
            </Step>
          </Stepper>
        </Stack>
      </Container>

      <Divider light />

      <Container maxWidth="md">
        <Outlet />
      </Container>
    </Box>
  );
};

export default Layout;
