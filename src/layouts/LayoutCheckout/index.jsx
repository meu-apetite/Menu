import { useContext, useEffect, useState } from 'react';
import { Outlet, useParams, useLocation } from 'react-router-dom';
import { Box, Container, Divider, ThemeProvider } from '@mui/material';
import { GlobalContext } from 'contexts/global';
import { ApiService } from 'services/api.service';
import { ErrorUtils } from 'utils/ErrorUtils';
import { ApplicationUtils } from 'utils/ApplicationUtils';
import Stack from '@mui/material/Stack';
import Stepper from '@mui/material/Stepper';
import Step from '@mui/material/Step';
import StepLabel from '@mui/material/StepLabel';
import PhoneIcon from '@mui/icons-material/Phone';
import RoomIcon from '@mui/icons-material/Room';
import PaymentIcon from '@mui/icons-material/Payment';
import BagIcon from '@mui/icons-material/ShoppingBag';
import CustomError from 'components/CustomError';
import * as S from './style';


const ColorlibStepIcon = (props) => {
  const { active, completed, icon } = props;
  console.log(props);
  const icons = {
    1: <PhoneIcon />,
    2: <RoomIcon />,
    3: <PaymentIcon />
  };

  return (
    <S.ColorlibStepIconRoot ownerState={{ completed, active }}>
      {icons[String(icon)]}
    </S.ColorlibStepIconRoot>
  );
};

const ColorlibStepBagIcon = (props) => (
  <S.ColorlibStepIconRoot ownerState={{ completed: false, active: true }}>
    <BagIcon />
  </S.ColorlibStepIconRoot>
);



const LayoutCheckout = () => {
  const location = useLocation();
  const { menuUrl } = useParams();
  const apiService = new ApiService(false);
  const { setCompany, company, setLoading } = useContext(GlobalContext);
  const [globalError, setGlobalError] = useState(null);

  const getCompany = async () => {
    try {
      setLoading('Carregando...');

      const cart = await ApplicationUtils.getCartInLocalStorage(menuUrl);

      if (!cart?._id) {
        setGlobalError(ErrorUtils.emptyCart(menuUrl));
        return;
      }
      const { data } = await apiService.get('/' + menuUrl);
      setCompany(data);
    } catch (error) {
      setGlobalError(ErrorUtils.notFoundMenu());
    } finally {
      setLoading(false);
    }
  };

  const getStepFromPath = () => {
    const pathSegments = location.pathname.split('/');
    const lastSegment = pathSegments[pathSegments.length - 1];

    switch (lastSegment) {
      case 'Cart':
        return 0;
      case 'contact':
        return 1;
      case 'address':
        return 2;
      case 'pay':
        return 3;
      default:
        return 0;
    }
  };

  useEffect(() => {
    getCompany();
  }, []);

  return (
    <Box>
      {company && (
        <ThemeProvider
          theme={ApplicationUtils.createCustomTheme(
            company.custom.colorPrimary,
            company.custom.colorSecondary,
          )}
        >
          <Container maxWidth="md">
            <Stack sx={{ width: '100%', mt: 2, mb: 2 }} spacing={4}>
              {
                getStepFromPath() === 0 ? (
                  <Stepper alternativeLabel activeStep={0} connector={<S.ColorlibConnector />}>
                    <Step key="Sacola">
                      <StepLabel StepIconComponent={ColorlibStepBagIcon}>
                        Sacola
                      </StepLabel>
                    </Step>
                  </Stepper>
                ) : (
                  <Stepper
                    alternativeLabel
                    activeStep={getStepFromPath() - 1}
                    connector={<S.ColorlibConnector />}
                  >
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
                )
              }
            </Stack>
          </Container>

          <Divider light />

          <Container maxWidth="md">{company && <Outlet />}</Container>
        </ThemeProvider>
      )}

      {globalError && <CustomError error={globalError} />}
    </Box>
  );
};

export default LayoutCheckout;
