import { useContext, useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { Box, Tab, Tabs, Typography } from '@mui/material';
import { ApiService } from 'services/api.service';
import { GlobalContext } from 'contexts/global';
import { initMercadoPago, Wallet } from '@mercadopago/sdk-react';
import PaymentMethods from 'components/PaymentMethods';
import ButtonFloat from 'components/ButtonFloat';
import pixIcon from 'assets/icons/pix.png';
import PayPix from 'components/PayPix';
import * as S from './style';

const Payment = () => {
  const navigate = useNavigate();
  const { storeUrl } = useParams();
  const apiService = new ApiService(false);
  const { store: storeSaved, getBag, setLoading, clearBag, toast } = useContext(GlobalContext);

  const [paymentMethod, setPaymentMethod] = useState();
  const [paymentType, setPaymentType] = useState('indelivery'); //indelivery | online | pix
  const [settingsPayment, setSettingsPayment] = useState({});
  const [data, setData] = useState(null);
  const [store] = useState({});

  const getSettingsPayment = async () => {
    try {
      setLoading(true);
      const bag = await getBag();
      const { data } = await apiService.post('/store/payment', {
        companyId: storeSaved._id,
        productsToken: bag.productsToken,
      });
      console.log(data.inDelivery.methods);
      setData(data);
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  const finishOrder = async () => {
    try {
      setLoading(true);
      const data = await getBag();
      delete data.products;
      const form = { ...data, companyId: storeSaved._id, paymentType, paymentMethod };

      if (paymentType === 'pix') {
        form.paymentMethod = { icon: pixIcon, id: null, title: 'Pix', _id: null };
      }

      const { data: response } = await apiService.post('/store/finishOrder/' + store._id, form);

      clearBag();
      navigate(`/${storeUrl}/meupedido/${response.order.id}`, { state: { ...response } });
    } catch (e) {
      toast.error(
        e.response.data?.message
        || 'Não foi possível finalizar o pedido, caso o erro persista fale com o suporte'
      );
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    getSettingsPayment();
  }, []);

  return (
    <S.Main>
      <h2>Escolha a forma de pagamento</h2>

      {data && (
        <section style={{ marginBottom: 16 }}>
          <Tabs value={paymentType} onChange={(e, v) => setPaymentType(v)}>
            {data.mercadoPago.active && <Tab value="online" label="Pagamento Online" />}
            {data.inDelivery.active && <Tab value="indelivery" label="Pagamento na Retirada" />}
            {data.pix.active && <Tab value="pix" label="Pix" />}
          </Tabs>
        </section>
      )}

      {(data && data.pix.active && paymentType === 'pix') && (
        <Box>
          <Typography paragraph>
            Assim que concluir a transação, por favor, envie o comprovante para o nosso número
            no WhatsApp, para que possamos aprovar o seu pedido. <br />
          </Typography>
          <PayPix active={true} code={data.pix.code} />
          <ButtonFloat text="Finalizar pedido" onClick={finishOrder} />
        </Box>
      )}

      {(data && data.inDelivery.active && paymentType === 'indelivery') && (
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
