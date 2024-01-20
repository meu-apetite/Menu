import { useContext, useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { Box, Tab, Tabs, Typography } from '@mui/material';
import { ApiService } from 'services/api.service';
import { StoreContext } from 'contexts/store';
import { initMercadoPago, Wallet } from '@mercadopago/sdk-react';
import PaymentMethods from 'components/PaymentMethods';
import ButtonFloat from 'components/ButtonFloat';
import pixIcon from 'assets/icons/pix.png';
import * as S from './style';

const Payment = () => {
  const navigate = useNavigate();
  const { storeUrl } = useParams();
  const apiService = new ApiService(false);
  const { store: storeSaved, getBag, setLoading, clearBag, toast } = useContext(StoreContext);

  const [paymentMethod, setPaymentMethod] = useState();
  const [paymentType, setPaymentType] = useState('indelivery'); //indelivery | online | pix
  const [settingsPayment, setSettingsPayment] = useState({});
  const [store, setStore] = useState({});

  const getSettingsPayment = async () => {
    try {
      setLoading(true);
      const bag = await getBag();
      const { data } = await apiService.post('/store/payment', {
        companyId: storeSaved._id,
        productsToken: bag.productsToken,
      });
      setSettingsPayment(data);
      initMercadoPago(data.mercadoPago.publicKey);
    } catch (error) {
      console.log(error);
    } finally {
      setTimeout(() => setLoading(false), 2000);
    }
  };

  const finishOrder = async () => {
    try {
      setLoading(true);
      const data = await getBag();
      delete data.products;
      const form = { ...data, companyId: storeSaved._id, paymentType, paymentMethod };

      if (paymentType === 'pix') {
        form.paymentMethod =  { icon: pixIcon, id: null, title: 'Pix', _id: null }
      }

      const { data: response } = await apiService.post('/store/finishOrder/' + store._id, form);

      clearBag();
      navigate(`/${storeUrl}/meupedido/${response.order.id}`, { state: { ...response } });
    } catch (e) {
      toast.error(e.response.data?.message || 'Não foi possível finalizar o pedido, caso o erro persista fale com o suporte')
      console.log(e);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (!storeSaved?.storeUrl) navigate(`/${storeUrl}/checkout`);

    if (!store.settingsPayment?.mercadoPago) {
      setPaymentType('indelivery');
    } else {
      setPaymentType('online');
    }

    setStore(storeSaved);
    getSettingsPayment();
  }, []);

  return (
    <S.Main>
      <h2>Escolha a forma de pagamdento</h2>

      <section style={{ marginBottom: 2 }}>
        <Tabs value={paymentType} onChange={(e, v) => setPaymentType(v)} aria-label="Opções de pagamento">
          {store.settingsPayment?.mercadoPago && <Tab value="online" label="Pagamento Online" />}
          <Tab value="indelivery" label="Pagamento na Retirada" />
          {store.settingsPayment?.pix?.active && <Tab value="pix" label="Pix" />}
        </Tabs>
      </section>

      {paymentType === 'pix' && settingsPayment.pix.active ? (
        <Box>
          <Typography variant="h5" gutterBottom>
            Pagamento via Pix
          </Typography>
          <Typography paragraph>
            Estamos prontos para fornecer a chave PIX, permitindo que você efetue o pagamento.
            Assim que concluir a transação, por favor, envie o comprovante para o nosso número
            no WhatsApp, para que possamos aprovar o seu pedido.
          </Typography>
          {/* <PixImage src={pixLogo} alt="logo pix" /> */}
          <ButtonFloat text="Finalizar pedido" onClick={finishOrder} />
        </Box>
      ) : null}

      {paymentType === 'indelivery' && settingsPayment?.methods?.length ? (
        <section>
          <PaymentMethods
            paymentOptions={settingsPayment.methods}
            getSelected={(m) => setPaymentMethod(m)}
          />
          <ButtonFloat text="Finalizar pedido" onClick={finishOrder} />
        </section>
      ) : null}

      {paymentType === 'online' && store.settingsPayment?.mercadoPago && (
        <div>
          <p>
            Após clicar em "PROSSEGUIR COM O PAGAMENTO", você terá acesso a
            diversas opções de pagamento, incluindo <strong>Pix,</strong>{' '}
            <strong>cartão de débito,</strong>e{' '}
            <strong>cartão de crédito</strong>.
          </p>
          {settingsPayment?.preferenceId && (
            <Wallet
              initialization={{
                preferenceId: settingsPayment?.preferenceId,
                redirectMode: 'modal',
              }}
            />
          )}
        </div>
      )}
    </S.Main>
  );
};

export default Payment;
