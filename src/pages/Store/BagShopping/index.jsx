import React, { useContext, useEffect, useRef, useState } from 'react';
import { useParams } from 'react-router-dom';
import { initMercadoPago, Wallet } from '@mercadopago/sdk-react';
import {
  Container,
  List,
  ListItem,
  ListItemAvatar,
  Avatar,
  ListItemText,
  ListItemSecondaryAction,
  IconButton,
  Divider,
  Tabs,
  Tab,
  CardMedia,
  CardContent,
  Typography,
  Card
} from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import { AuthContext } from 'contexts/auth';
import { StoreContext } from 'contexts/store';
import { ApiService } from 'services/api.service';
import FindAddressClient from 'components/FindAddressClient';
import iconMaps from '../../../public/icons/maps.svg';
import * as S from './style';
import FormularioPagamento from './methodPayment';

initMercadoPago('TEST-1d8377ed-2c56-47ed-a3bb-1b3a27c71835');

const CartPage = () => {
  const apiService = new ApiService(false);
  const { setLoading, toast } = useContext(AuthContext);

  const { id } = useParams();
  const { getBag } = useContext(StoreContext);

  const [bagItems, setBagItems] = useState([]);
  const [addressOpen, setAddressOpen] = useState(false);
  const [payment, setPayment] = useState({ method: '', type: 'onlinePayment' }); //type: payOnDelivery | onlinePayment
  const [deliveryType, setDeliveryType] = useState('delivery'); //delivery | pickup
  const [order, setOrder] = useState({});
  const [store, setStore] = useState();
  const [step, setStep] = useState('payment'); //revision | address | payment
  const [addressCurrent, setAddressCurrent] = useState(null);
  const buttonMercadoPago = useRef(null);

  const getStore = async () => {
    const response = await apiService.get('/store/' + id);
    setStore(response.data);
  };

  const estimateValue = async () => {
    try {
      const bag = await getBag();
      setBagItems([]);

      const data = bag.map((item) => ({
        complements: item.complements,
        productId: item.productId,
        quantity: item.quantity,
      }));

      const response = await apiService.post('/store/estimateValue', data);
      const order = response.data;
      setOrder(order);

      order.products.forEach((item) => {
        setBagItems((old) => [
          ...old,
          {
            id: item._id,
            name: item.productName,
            price: item.priceTotal,
            quantity: item.quantity,
            imageUrl: item.imageUrl,
          },
        ]);
      });
    } catch (error) {
      console.log(error);
    }
  };

  const pedidoComFrete = async (data) => {
    try {
      setLoading(true);
      setAddressCurrent(data);

      const bag = await getBag();
      const items = bag.map((item) => ({
        complements: item.complements,
        productId: item.productId,
        quantity: item.quantity,
      }));

      const response = await apiService.post('/store/calculateFreight', { address: data, items });

      setOrder({ ...order, ...response.data });
      setAddressOpen(false);
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  const pagamento = async (data) => {
    try {
      setLoading(true);

      const response = await apiService.get('/store/payment/generateStripeSession');

      // setOrder({...order, payment: { ...order.payment, mercadoPagoId: response.data.id}});
      // order?.payment.mercadoPagoId
      console.log(response.data)
      // document.querySelector('button').click();

      // walletBrick_container
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  const formatPrice = (data) => {
    if (!data) return 'R$ 0,00';
    return data.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' });
  };

  useEffect(() => {
    estimateValue();
    getStore();
  }, []);

  return (
    <>
      <S.Header>
        <S.Logo src={store?.custom?.logo?.url} alt={`Logomarca de ${store?.name}`} />
      </S.Header>

      <Container maxWidth="md">
        {step === 'revision' && (
          <>
            <S.Title variant="h5">Finalize o seu pedido</S.Title>

            <List>
              {bagItems.map((item, i) => (
                <div key={`id-${i}`}>
                  <ListItem alignItems="flex-start">
                    <ListItemAvatar>
                      <Avatar alt={item.name} src={item.imageUrl} />
                    </ListItemAvatar>
                    <ListItemText primary={item.name} secondary={`Quant.: ${item.quantity} | Preço: ${formatPrice(item.price)}`} />
                    <ListItemSecondaryAction>
                      <IconButton edge="end" aria-label="delete">
                        <DeleteIcon />
                      </IconButton>
                    </ListItemSecondaryAction>
                  </ListItem>
                  <Divider />
                </div>
              ))}
            </List>

            <section>
              <S.WrapperTotal>
                <span>subtotal:</span>
                <strong>{formatPrice(order?.total)}</strong>
              </S.WrapperTotal>
              <S.WrapperTotal>
                <span>Taxa de entrega:</span>
                {order?.delivery?.price > 0 ? (
                  <strong>{formatPrice(order?.delivery?.price)}</strong>
                ) : (
                  <span style={{ color: '#ffc107' }}>A calcular</span>
                )}
              </S.WrapperTotal>
              <S.WrapperTotal>
                <span>Total</span>
                <strong>{formatPrice(order?.total)}</strong>
              </S.WrapperTotal>
            </section>

            <S.ButtonDefault variant="contained" onClick={() => setStep('address')}>Continuar</S.ButtonDefault>
          </>
        )}

        {step === 'address' && (
          <section style={{ marginBottom: 2 }}>
            <S.Title>Informações de endereço</S.Title>
            <Tabs
              value={deliveryType}
              onChange={(e, value) => setDeliveryType(value)}
              aria-label="Opções de entrega"
            >
              <Tab value="delivery" label="Entrega" />
              <Tab value="pickup" label="Retirada" />
            </Tabs>

            {deliveryType === 'delivery' && (
              <div>
                {addressCurrent ? (
                  <>
                    <Card sx={{ display: 'grid', gridTemplateColumns: '9fr 3fr', mt: 1.2 }}>
                      <CardContent sx={{ flex: '1 0 auto' }}>
                        <Typography variant="subtitle1" color="text.secondary">
                          Cep: <strong>{`${addressCurrent.zipCode}`}</strong> <br />
                          Bairro: <strong>{`${addressCurrent.district}`}</strong><br />
                          Endereço: <strong>{`${addressCurrent.street.trim()}${(addressCurrent?.number) ? ', Nº ' + addressCurrent.number : ''}`}</strong>
                        </Typography>
                        <Typography variant="subtitle1" color="text.secondary">
                          Taxa de entrega:
                          <strong>{formatPrice(order?.delivery?.price)} - {Number(order?.delivery?.distance).toFixed(2)} KM</strong>
                        </Typography>
                      </CardContent>
                      <CardMedia image={iconMaps} alt="Icone mapa" />
                    </Card>
                    <S.WrapperButtons>
                      <S.ButtonDefault variant="outlined" onClick={() => setAddressOpen(!addressOpen)}>
                        Mudar endereço
                      </S.ButtonDefault>
                    </S.WrapperButtons>
                  </>
                ) : (
                  <>
                    <p>
                      Fazendo sua primeira compra? Clique em "Adicionar endereço"
                      para salvar o seu novo endereço. Se já comprou antes, selecione
                      "sou cliente" e informe seu número.
                    </p>
                    <S.WrapperButtons>
                      <S.ButtonDefault variant="outlined" onClick={() => setAddressOpen(!addressOpen)}>
                        Adicionar endereço
                      </S.ButtonDefault>
                      <S.ButtonDefault variant="contained" onClick={() => setAddressOpen(!addressOpen)}>
                        Sou Cliente
                      </S.ButtonDefault>
                    </S.WrapperButtons>
                  </>
                )}

                {addressOpen && (
                  <FindAddressClient
                    closeModal={() => setAddressOpen(false)}
                    getAddress={(data) => pedidoComFrete(data)}
                  />
                )}
              </div>
            )}

            {deliveryType === 'pickup' && (
              <Card sx={{ display: 'grid', gridTemplateColumns: '9fr 3fr', mt: 1.2 }}>
                <CardContent sx={{ flex: '1 0 auto' }}>
                  <Typography variant="subtitle1" color="text.secondary">
                    Cep: {`${store?.address?.zipCode}`}
                  </Typography>
                  <Typography variant="subtitle1" color="text.secondary">
                    Endereço: {`${store?.address?.street}, ${store?.address?.district}`}
                  </Typography>
                  <Typography variant="subtitle1" color="text.secondary">
                    Nº {`${store?.address?.number}`}
                  </Typography>
                </CardContent>
                <CardMedia image={iconMaps} alt="Icone mapa" />
              </Card>
            )}

            {
              (order?.delivery?.price || deliveryType === 'pickup') && (
                <S.ButtonNext
                  variant="contained"
                  onClick={() => {
                   (order.status === 'in-cart' || deliveryType === 'pickup')
                      ? setStep('payment')
                      : toast.error('Adicione o seu endereço para continuar',
                        { position: 'top-center' });
                  }}
                >
                  Continuar
                </S.ButtonNext>
              )
            }
          </section>
        )}

        {step === 'payment' && (
          <section>
            <Tabs
              value={payment.type}
              onChange={(e, value) => setPayment({ ...payment, type: value })}
              aria-label="Opções de pagamento"
            >
              <Tab value="onlinePayment" label="Pague pelo site" />
              <Tab value="payOnDelivery" label="Pague na entrega" />
            </Tabs>

            {payment.type === 'onlinePayment' ? (
              <>
                <p>
                  Após clicar em "PROSSEGUIR COM O PAGAMENTO", 
                  você terá acesso a diversas opções de pagamento, 
                  incluindo <strong>Pix,</strong> <strong>cartão de débito,</strong> 
                  e <strong>cartão de crédito</strong>.
                </p>
                <S.ButtonDefault 
                  sx={{ marginTop: '8px', textTransform: 'uppercase' }}
                  variant="contained" 
                  onClick={pagamento}
                >
                  PROSSEGUIR COM O PAGAMENTO
                </S.ButtonDefault>
              </>
            ) : (<>
              <FormularioPagamento />
            </>)}
          </section>
        )}
      </Container>
    </>
  );
};

export default CartPage;
