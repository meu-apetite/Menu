import toast from 'react-hot-toast';
import { useContext, useState } from 'react';
import { Box, Button } from '@mui/material';
import { GlobalContext } from 'contexts/global';
import { ApiService } from 'services/api.service';
import { ApplicationUtils } from 'utils/ApplicationUtils';
import FindAddress from 'components/FindAddress';
import * as S from './style';

const DeliveryInfo = ({ settingsDelivery, cart, getDeliveryInfo }) => {
  const apiService = new ApiService(false);
  const { company, setLoading } = useContext(GlobalContext);
  const [openFindAddress, setOpenFindAddress] = useState(false);

  const handleCloseFindAddress = () => setOpenFindAddress(false);

  const HandleOpenFindAddress = () => setOpenFindAddress(true);

  const calculateFreight = async (data) => {
    if (!data.street || !data.district || !data.city || !data.number) {
      toast.error(
        'Endereço incompleto, verique seu endereço. Caso o erro seja recorrente, entre em contato com nosso suporte',
        { position: 'top-center' },
      );
    }

    try {
      setLoading('Calculando taxa...');

      const response = await apiService.post('/calculateFreight', {
        address: data,
        companyId: company._id,
        cartId: cart._id
      });

      getDeliveryInfo(response.data);

      handleCloseFindAddress();
    } catch (e) {
      toast.error(
        e.response.data?.message 
        || 'Não foi possível calcular a taxa de entrega'
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <Box>
      {
        settingsDelivery.delivery 
        && settingsDelivery.deliveryOption === 'fixed' 
        && (
          <S.WrapperContent>
            <strong>TAXA DE ENTREGA:</strong>
            <strong className="price">
              {ApplicationUtils.formatPrice(settingsDelivery.fixedValue)}
            </strong>
          </S.WrapperContent>
        )
      }

      {
        settingsDelivery.delivery 
        && settingsDelivery.deliveryOption === 'customerPickup' 
        && (
          <S.WrapperContent>
            <strong>TAXA DE ENTREGA:</strong>
            <small>A combinar</small>
          </S.WrapperContent>
        )
      }

      {
        (
          settingsDelivery.delivery 
          && settingsDelivery.deliveryOption === 'automatic' 
          && cart?.address?.price
        ) ? (
          <S.WrapperContent>
            <strong>TAXA DE ENTREGA:</strong>
            <strong className="price">
              {ApplicationUtils.formatPrice(cart?.address?.price)}
            </strong>
          </S.WrapperContent>
        ) : null
      }

      <S.WrapperContent>
        <strong>SUBTOTAL:</strong>
        <strong className="price">
          {ApplicationUtils.formatPrice(cart.subtotal)}
        </strong>
      </S.WrapperContent>

      <S.WrapperContent>
        <strong>TOTAL:</strong>
        <strong className="price">
          {ApplicationUtils.formatPrice(cart.total)}
        </strong>
      </S.WrapperContent>

      <br /> <br />

      {(settingsDelivery.deliveryOption === 'automatic' && !cart?.address?.price) && (
        <Box sx={{ display: 'grid' }}>
          <strong>*Pedido para entrega?</strong>
          <Button 
            sx={{ width: 'fit-content', mt: 1 }}
            color="secondary" 
            variant="contained" 
            onClick={HandleOpenFindAddress}
          >
            Calcular taxa de entrega
          </Button>
        </Box>
      )}

      {settingsDelivery.delivery && settingsDelivery.deliveryOption === 'customerPickup'
        && <small>*Entraremos em contato para ajustar a entrega</small>
      }

      {!settingsDelivery?.delivery && settingsDelivery?.allowStorePickup
        && <strong>*Apenas retirada</strong>
      }

      {openFindAddress && (
        <FindAddress
          closeModal={handleCloseFindAddress}
          getData={(data) => calculateFreight(data)}
        />
      )}
    </Box>
  );
};

export default DeliveryInfo;
