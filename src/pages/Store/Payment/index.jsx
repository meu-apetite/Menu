import {
  Container,
  Grid,
  List,
  ListItem,
  ListItemText,
  Tab,
  Tabs,
} from '@mui/material';
import { useContext, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ApiService } from 'services/api.service';
import { StoreContext } from 'contexts/store';
import { AuthContext } from 'contexts/auth';
import { initMercadoPago, Wallet } from '@mercadopago/sdk-react';
import iconDinheiro from 'assets/icons/dinheiro.png';
import iconElo from 'assets/icons/elo.webp';
import iconMastercard from 'assets/icons/mastercard.webp';
import iconVisa from 'assets/icons/visa.webp';
import iconHipercard from 'assets/icons/hipercard.png';
import iconNugo from 'assets/icons/nugo.avif';
import * as S from './style';

const PaymentMethodsComponent = ({ paymentOptions, getSelected }) => {
  const [paymentMethods, setPaymentMethods] = useState([]);
  const [methodCurrent, setMethodCurrent] = useState();

  useEffect(() => {
    if (!paymentOptions) return;

    setPaymentMethods(
      paymentOptions.paymentsList.map((item) => {
        return {
          titleCategory: item.titleCategory,
          methods: item.methods.map((m) => {
            paymentOptions.activeItems.findIndex((pay) => pay.id === m.id) >= 0
              ? (m.isActive = true)
              : (m.isActive = false);

            switch (m.isActive) {
              case m.id.indexOf('elo') >= 0:
                m.icon = iconElo;
                break;
              case m.id.indexOf('dinheiro') >= 0:
                m.icon = iconDinheiro;
                break;
              case m.id.indexOf('mastercard') >= 0:
                m.icon = iconMastercard;
                break;
              case m.id.indexOf('hipercard') >= 0:
                m.icon = iconHipercard;
                break;
              case m.id.indexOf('visa') >= 0:
                m.icon = iconVisa;
                break;
              case m.id.indexOf('nugo') >= 0:
                m.icon = iconNugo;
                break;
              default:
                m.icon = iconNugo;
                break;
            }
            return m;
          }),
        };
      }),
    );
  }, []);

  return (
    <div>
      <h4>Escolha a forma de pagamdento:</h4>
      <Grid container spacing={2}>
        {paymentMethods?.map((item, i) => (
          <Grid item xs={12} sm={6} key={i}>
            <strong>{item.titleCategory}</strong>
            <List>
              {item.methods.map((method) => (
                <ListItem key={method.id} sx={{ display: 'flex', alignItems: 'center' }}>
                  <input 
                    style={{ margin: '0 1rem 0 0' }} 
                    type="radio"
                    checked={methodCurrent === method.id}
                    onChange={() => {
                      setMethodCurrent(method.id);
                      getSelected(method.id);
                    }} 
                  />
                  <S.Icon
                    src={method?.icon}
                    alt="logo da bandeira de cartão mastercard"
                  />
                  <ListItemText primary={method.title} />
                </ListItem>
              ))}
            </List>
          </Grid>
        ))}
      </Grid>
    </div>
  );
};

const Payment = ({ paymentOnline }) => {
  const navigate = useNavigate();
  const apiService = new ApiService(false);

  const { store: storeSaved, getBag } = useContext(StoreContext);
  const { setLoading, toast } = useContext(AuthContext);

  const [paymentMethod, setPaymentMethod] = useState();
  const [paymentType, setPaymentType] = useState('online'); //indelivery
  const [settingsPayment, setSettingsPayment] = useState('online'); //indelivery
  const [store, setStore] = useState({});

  const getSettingsPayment = async () => {                       
    try {
      setLoading(true);
      const bag =  await getBag();
      console.log(storeSaved)
      const { data } = await apiService.post('/store/payment/' + storeSaved._id, { productsToken: bag.productsToken});
      setSettingsPayment(data);
      initMercadoPago(data.mercadoPago.publicKey);
      console.log(data)
    } catch (error) { 
      console.log(error);
    } finally { 
      setTimeout(() => setLoading(false), 2000);
    }
  };

  const finishOrder = async () => {
    try {
      setLoading(true)
      const data = await getBag();
      delete data.products;

      const { data: response } = await apiService.post(
        '/store/finishOrder/' + store._id,
        { ...data, paymentType: 'indelivery', paymentMethod },
      );
      
      console.log(response.order)

      navigate(`/${response.store._id}/meupedido/${response.order.id}`, { state: { ...response } });
    } catch(error) {
      console.log(error)
    } finally {
      setLoading(false)
    }
  };

  useEffect(() => {
    if (!storeSaved?._id) {
      navigate(`/${window.location.href.split('/').reverse()[2]}/pedido`);
    }
    setStore(storeSaved);
    getSettingsPayment();
  }, []);

  return (
    <S.Main>
      <S.Header>
        <S.Logo src={store?.custom?.logo?.url} alt={`Logomarca de ${store?.name}`} />
      </S.Header>

      <Container maxWidth="md">
        <section style={{ marginBottom: 2 }}>
          <S.Title>Pagamento</S.Title>
          <Tabs
            value={paymentType}
            onChange={(e, value) => setPaymentType(value)}
            aria-label="Opções de pagamento"
          >
            <Tab value="online" label="Pagamento Online" />
            <Tab value="indelivery" label="Pagamento na Retirada" />
          </Tabs>
        </section>

        {paymentType === 'indelivery' && (
          <>
            {/* <PaymentMethodsComponent
              paymentOptions={paymentOptions.delivery} 
              getSelected={(id) => setPaymentMethod(id)}
            /> */}
            <S.ButtonDefault
              sx={{ marginTop: '8px', textTransform: 'uppercase' }}
              variant="contained"
              onClick={finishOrder}
            >
              Concluir
            </S.ButtonDefault>
          </>
        )}

        {paymentType === 'online' && (
          <div>
            <p>
              Após clicar em "PROSSEGUIR COM O PAGAMENTO", você terá acesso a
              diversas opções de pagamento, incluindo <strong>Pix,</strong>{' '}
              <strong>cartão de débito,</strong>e{' '}
              <strong>cartão de crédito</strong>.
            </p>
            {
              settingsPayment?.preferenceId && (
                <Wallet
                  initialization={{ preferenceId: settingsPayment?.preferenceId, redirectMode: 'modal' }}
                />
              )
            }
          </div>
        )}
      </Container>
    </S.Main>
  );
};

export default Payment;
