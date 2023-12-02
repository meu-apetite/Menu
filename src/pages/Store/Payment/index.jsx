import { useContext, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Container, Grid, List, ListItem, ListItemText, Tab, Tabs } from '@mui/material';
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
import iconAmex from 'assets/icons/amex.png';
import iconSodexo from 'assets/icons/sodexo.png';
import iconVr from 'assets/icons/vr.avif';
import iconTicket from 'assets/icons/ticket.png';
import * as S from './style';

const PaymentMethodsComponent = ({ paymentOptions, getSelected }) => {
  const [paymentMethods, setPaymentMethods] = useState([]);
  const [methodCurrent, setMethodCurrent] = useState();

  useEffect(() => {
    if (!paymentOptions || paymentOptions?.length < 1) return;

    console.log(paymentOptions)

    const methods = [];
    const methodsParent = [];

    paymentOptions.forEach((item) => {
      if (item.id.indexOf('elo') >= 0) {
        return methods.push({ ...item, icon: iconElo });
      } else if (item.id.indexOf('dinheiro') >= 0) {
        return methods.push({ ...item, icon: iconDinheiro });
      } else if (item.id.indexOf('mastercard') >= 0) {
        return methods.push({ ...item, icon: iconMastercard });
      } else if (item.id.indexOf('hipercard') >= 0) {
        return methods.push({ ...item, icon: iconHipercard });
      } else if (item.id.indexOf('visa') >= 0) {
        return methods.push({ ...item, icon: iconVisa });
      }  else if (item.id.indexOf('amex') >= 0) {
        return methods.push({ ...item, icon: iconAmex });
      } else if (item.id.indexOf('nugo') >= 0) {
        return methods.push({ ...item, icon: iconNugo });
      } else if (item.id.indexOf('sodexo') >= 0) {
        return methods.push({ ...item, icon: iconSodexo });
      } else if (item.id.indexOf('vr') >= 0) {
        return methods.push({ ...item, icon: iconVr });
      }else if (item.id.indexOf('ticket') >= 0) {
        return methods.push({ ...item, icon: iconTicket });
      } else {
        return methods.push({ ...item, icon: iconNugo });
      }

      
    });

    methods.forEach(item => {
      console.log(item)
      const parent = item.parent;
      const objCorrespondente = methodsParent.find(obj => obj.parent === parent);
      if (objCorrespondente) {
        objCorrespondente.options.push(item);
      } else {
        methodsParent.push({ parent: parent, options: [item] });
      }
    });

    setPaymentMethods(methodsParent);
  }, []);

  return (
    <div>
      <h4>Escolha a forma de pagamdento:</h4>
      <Grid container spacing={2}>
        {paymentMethods?.map((item, i) => (
          <Grid item xs={12} sm={6} key={i}>
            <strong>{item.parent}</strong>
            <List>
              {item.options.map((method) => (
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
      const bag = await getBag();
      const { data } = await apiService.post('/store/payment/' + storeSaved._id, { productsToken: bag.productsToken });
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
        { ...data, paymentType: 'indelivery', paymentMethod },
      );

      console.log(response);
      return

      navigate(`/${response.company._id}/meupedido/${response.order.id}`, { state: { ...response } });
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
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
            <PaymentMethodsComponent
              paymentOptions={settingsPayment?.methods}
              getSelected={(id) => setPaymentMethod(id)}
            />
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
