import { useContext, useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { Box, Tab, Tabs } from '@mui/material';
import { ApiService } from 'services/api.service';
import { GlobalContext } from 'contexts/global';
import { ApplicationUtils } from 'utils/ApplicationUtils';
import { ErrorUtils } from 'utils/ErrorUtils';
import PaymentMethods from 'components/PaymentMethods';
import ButtonFloat from 'components/ButtonFloat';
import PayPix from 'components/PayPix';
import * as S from './style';

const Payment = () => {
  const apiService = new ApiService(false);
  const navigate = useNavigate();
  const { menuUrl } = useParams();
  const { company, setLoading, toast, clearCart, setErrorCustom } = useContext(GlobalContext);

  const [paymentMethod, setPaymentMethod] = useState(null);
  const [paymentType, setPaymentType] = useState('inDelivery');
  const [tabActive, setTabActive] = useState('inDelivery');
  const [data, setData] = useState(null);
  const [cart, setCart] = useState({});

  const getSettingsPayment = async () => {
    try {
      setLoading(true);

      const cart = await ApplicationUtils.getCartInLocalStorage(menuUrl);
      setCart(cart);

      const { data } = await apiService.post('/payment', {
        companyId: company._id,
        cartId: cart._id,
      });

      setData(data);
    } catch (e) {
      if (e.response.status === 404) {
        setErrorCustom(ErrorUtils.notFoundMenu());
        return;
      }

      toast.error(
        e.response.data?.message 
        ?? 'Não foi buscar as formas de pagamento'
      );
    } finally {
      setLoading(false);
    }
  };

  const finishOrder = async () => {
    try {
      setLoading(true);

      if (!paymentMethod) {
        toast.error('Selecione o método de pagamento');
        return;
      }

      const body = { 
        companyId: company._id, 
        cartId: cart._id,
        deliveryType: cart.deliveryType,
        paymentType,
        paymentMethod
      };

      const { data } = await apiService.post('/finish', body);
return
      clearCart();

      navigate(`/${menuUrl}/order/${data.id}`, { state: { ...data } });
    } catch (e) {
      console.log(e)
      toast.error(
        e.response.data?.message
        || 'Não foi possível finalizar o pedido, caso o erro persista fale com o suporte'
      );
    } finally {
      setLoading(false);
    }
  };

  const setPayment = (value) => {
    if (value === 'pix') {
      setPaymentMethod('pix');
      setPaymentType('online');
      return;
    }

    if (value === 'inDelivery') {
      setPaymentType('inDelivery');
      setPaymentMethod(null);
      return;
    }
  }

  const changeTab = (event, value) => {
    setTabActive(value);
    setPayment(value);
  }

  useEffect(() => {
    getSettingsPayment();
  }, []);

  return (
    <S.Main>
      <h2>Escolha a forma de pagamento</h2>

      {data && (
        <section style={{ marginBottom: 16 }}>
          <Tabs value={tabActive} onChange={changeTab}>
            {data.mercadoPago.active && <Tab value="mp" label="Pagamento Online" />}
            {data.inDelivery.active && <Tab value="inDelivery" label="Pagamento na Retirada" />}
            {data.pix.active && <Tab value="pix" label="Pix" />}
          </Tabs>
        </section>
      )}

      {(data && data.pix.active && tabActive === 'pix') && (
        <Box>
          <PayPix active={true} code={data.pix.code} />
          <ButtonFloat text="Finalizar pedido" onClick={finishOrder} />
        </Box>
      )}

      {(data && data.inDelivery.active && tabActive === 'inDelivery') && (
        <section>
          <PaymentMethods
            paymentOptions={data.inDelivery.methods}
            getSelected={(m) => setPaymentMethod(m)}
          />
          <ButtonFloat text="Finalizar pedido" onClick={finishOrder} />
        </section>
      )}
    </S.Main>
  );
};

export default Payment;
