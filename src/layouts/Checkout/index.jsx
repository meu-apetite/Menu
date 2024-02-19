import { useContext, useEffect, useState } from 'react';
import { Outlet, useParams, useLocation } from 'react-router-dom';
import { Box, Container, Divider } from '@mui/material';
import { GlobalContext } from 'contexts/global';
import { ApiService } from 'services/api.service';
import { ErrorUtils } from 'utils/ErrorUtils';
import Stack from '@mui/material/Stack';
import Stepper from '@mui/material/Stepper';
import Step from '@mui/material/Step';
import StepLabel from '@mui/material/StepLabel';
import PhoneIcon from '@mui/icons-material/Phone';
import RoomIcon from '@mui/icons-material/Room';
import PaymentIcon from '@mui/icons-material/Payment';
import CustomError from 'components/CustomError'; 
import * as S from './style';

function ColorlibStepIcon(props) {
  const { active, completed, className } = props;

  const icons = { 1: <PhoneIcon />, 2: <RoomIcon />, 3: <PaymentIcon /> };

  return (
    <S.ColorlibStepIconRoot
      ownerState={{ completed, active }}
      className={className}
    >
      {icons[String(props.icon)]}
    </S.ColorlibStepIconRoot>
  );
}

const Checkout = (props) => {
  const apiService = new ApiService(false);
  const { storeUrl } = useParams();
  const { setCompany, company, setLoading } = useContext(GlobalContext);
  const [error, setError] = useState(null);
  const location = useLocation();

  const getCompany = async () => {
    try {
      setLoading('Carregando...');

      const { data } = await apiService.get('/' + storeUrl);
      setCompany(data);
    } catch (error) {
      return setError(ErrorUtils.notFoundMenu());
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (Object.keys(company).length === 0 || !company) {
      getCompany();
    }
  }, []);

  const getStepFromPath = () => {
    const pathSegments = location.pathname.split('/');
    const lastSegment = pathSegments[pathSegments.length - 1];

    switch (lastSegment) {
      case 'contact':
        return 0;
      case 'address':
        return 1;
      case 'pay':
        return 2;
      default:
        return 0;
    }
  };

  return (
    <Box>
      {Object.keys(company).length > 0 && (
        <>
          <Container maxWidth="md">
            <Stack sx={{ width: '100%', mt: 2, mb: 2 }} spacing={4}>
              <Stepper
                alternativeLabel
                activeStep={getStepFromPath()}
                connector={<S.ColorlibConnector />}
              >
                <Step key="Contato">
                  <StepLabel StepIconComponent={ColorlibStepIcon}>
                    Contato
                  </StepLabel>
                </Step>
                <Step key="Entrega">
                  <StepLabel StepIconComponent={ColorlibStepIcon}>
                    Entrega
                  </StepLabel>
                </Step>
                <Step key="Pagamento">
                  <StepLabel StepIconComponent={ColorlibStepIcon}>
                    Pagamento
                  </StepLabel>
                </Step>
              </Stepper>
            </Stack>
          </Container>

          <Divider light />

          <Container maxWidth="md">
            <Outlet />
          </Container>
        </>
      )}

      {error && <CustomError error={error} />}
    </Box>
  );
};

export default Checkout;
