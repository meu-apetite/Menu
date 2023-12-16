import { useContext, useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { Container, Tab, Tabs } from '@mui/material';
import { ApiService } from 'services/api.service';
import { StoreContext } from 'contexts/store';
import { initMercadoPago, Wallet } from '@mercadopago/sdk-react';
import PaymentMethods from 'components/PaymentMethods';
import * as S from './style';

const Payment = () => {
  const navigate = useNavigate();
  const { storeUrl } = useParams();
  const apiService = new ApiService(false);
  const { store: storeSaved, getBag, setLoading, clearBag } = useContext(StoreContext);

  const [paymentMethod, setPaymentMethod] = useState();
  const [paymentType, setPaymentType] = useState('indelivery'); //indelivery | online
  const [settingsPayment, setSettingsPayment] = useState({});
  const [store, setStore] = useState({});

  const getSettingsPayment = async () => {
    console.log('tett');
    try {
      setLoading(true);
      const bag = await getBag();
      const { data } = await apiService.post('/store/payment', {
        companyId: storeSaved._id,
        productsToken: bag.productsToken,
      });
      console.log(data);
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

      const { data: response } = await apiService.post(
        '/store/finishOrder/' + store._id,
        {
          ...data,
          companyId: storeSaved._id,
          paymentType: 'indelivery',
          paymentMethod,
        },
      );

      clearBag();
      
      navigate(`/${storeUrl}/meupedido/${response.order.id}`, {
        state: { ...response },
      });
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (!storeSaved?.storeUrl) navigate(`/${storeUrl}/pedido`);

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
      <S.Header>
        <S.Logo
          src={store?.custom?.logo?.url}
          alt={`Logomarca de ${store?.name}`}
        />
      </S.Header>

      <Container maxWidth="md">
        <section style={{ marginBottom: 2 }}>
          <S.Title>Pagamento</S.Title>
          <Tabs
            value={paymentType}
            onChange={(e, value) => setPaymentType(value)}
            aria-label="Opções de pagamento"
          >
            {store.settingsPayment?.mercadoPago && (
              <Tab value="online" label="Pagamento Online" />
            )}
            <Tab value="indelivery" label="Pagamento na Retirada" />
          </Tabs>
        </section>

        {paymentType === 'indelivery' && settingsPayment?.methods?.length ? (
          <section>
            <PaymentMethods
              paymentOptions={settingsPayment.methods}
              getSelected={(m) => setPaymentMethod(m)}
            />
            <S.ButtonDefault variant="contained" onClick={finishOrder}>
              Finalizar
            </S.ButtonDefault>
          </section>
        ) : null }

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
      </Container>
    </S.Main>
  );
};

export default Payment;
