import React, { useContext, useEffect, useState } from 'react';
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
  Box,
} from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import { StoreContext } from 'contexts/store';
import { ApiService } from 'services/api.service';
import * as S from './style';
import FindAddressClient from 'components/FindAddressClient';
import iconMaps from '../../../public/icons/maps.svg';
import TomTomMap from './tomtom';

initMercadoPago('TEST-1d8377ed-2c56-47ed-a3bb-1b3a27c71835');

const CartPage = () => {
  const apiService = new ApiService(false);

  const { id } = useParams();
  const { getBag } = useContext(StoreContext);

  const [bagItems, setBagItems] = useState([]);
  const [addressOpen, setAddressOpen] = useState(false);
  const [payment, setPayment] = useState({ method: '', type: 'onlinePayment' }); //type: payOnDelivery | onlinePayment
  const [deliveryType, setDeliveryType] = useState('delivery'); //delivery | pickup
  const [order, setOrder] = useState({});
  const [store, setStore] = useState();

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
            imageUrl: item.imageUrl,
          },
        ]);
      });
    } catch (error) {
      console.log(error);
    }
  };

  const pedidoComFrete = async (data) => {
    const bag = await getBag();
    const items = bag.map((item) => ({
      complements: item.complements,
      productId: item.productId,
      quantity: item.quantity,
    }));

    const response = await apiService.post('/store/calculateFreight', {
      address: data,
      items,
    });

    setOrder({ ...order, ...response.data });
    setAddressOpen(false);
    console.log({ ...order, ...response.data });
  };

  const formatPrice = (data) => {
    if (!data) return 'R$ 0,00';

    return data.toLocaleString('pt-BR', {
      style: 'currency',
      currency: 'BRL',
    });
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
        <S.Title variant="h5">Finalize o seu pedido</S.Title>

        <List>
          {bagItems.map((item, i) => (
            <div key={`id-${i}`}>
              <ListItem alignItems="flex-start">
                <ListItemAvatar>
                  <Avatar alt={item.name} src={item.imageUrl} />
                </ListItemAvatar>
                <ListItemText primary={item.name} secondary={`Preço: ${formatPrice(item.price)}`} />
                <ListItemSecondaryAction>
                  <IconButton
                    edge="end"
                    aria-label="delete" // onClick={() => handleRemoveItem(item.id)}
                  >
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

        <br />

        <section style={{ marginBottom: 2 }}>
          <Tabs
            value={deliveryType}
            onChange={(e, value) => setDeliveryType(value)}
            aria-label="Opções de entrega"
          >
            <Tab value="delivery" label="Entrega" />
            <Tab value="pickup" label="Retirada" />
          </Tabs>

          {deliveryType === 'delivery' && (
            <Box display="flex" flexDirection="column">
              <S.ButtonAddress variant="contained" onClick={() => setAddressOpen(!addressOpen)}>
                Adicionar endereço
              </S.ButtonAddress>
              {addressOpen && <FindAddressClient getAddress={(data) => pedidoComFrete(data)} />}
            </Box>
          )}
         
          {deliveryType === 'pickup' && (
            <>
              <S.WrapperAddress>
                <span>Cep:</span> <strong>{`${store.address.zipCode}`}</strong> <br />
                <span>Endereço:</span> <strong>{`${store.address.street}, ${store.address.district}`}</strong>  <br />
                <strong>{`Ṇº ${store.address.number}`}</strong>
              </S.WrapperAddress>
              <TomTomMap />
            </>
          )}
        </section>

        <br />

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
              <Wallet initialization={{ preferenceId: order?.payment?.mercadoPagoId }} />
            </>
          ) : (
            <></>
          )}
        </section>
      </Container>
    </>
  );
};

export default CartPage;
