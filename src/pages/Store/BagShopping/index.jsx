import React, { useContext, useEffect, useState } from 'react';
import { initMercadoPago, Wallet } from '@mercadopago/sdk-react';
import {
  Container,
  Typography,
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
  Box
} from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import { StoreContext } from 'contexts/store';
import { ApiService } from 'services/api.service';
import * as S from './style';
import FindAddressClient from 'components/FindAddressClient';
import iconMaps from '../../../public/icons/maps.svg';


initMercadoPago('TEST-1d8377ed-2c56-47ed-a3bb-1b3a27c71835');

const CartPage = () => {
  const apiService = new ApiService(false);
  const { getBag } = useContext(StoreContext);

  const [bagItems, setBagItems] = useState([]);
  const [deliveryPrice, setDeliveryPrice] = useState(null);
  const [deliveryMode, setDeliveryMode] = useState('delivery'); //delivery | withdraw
  const [payment, setPayment] = useState({ method: '', type: 'onlinePayment' }); //type: payOnDelivery | onlinePayment
  const [order, setOrder] = useState({});

  const estimateValue = async () => {
    try {
      const bag = await getBag();
      setBagItems([]);

      const data = bag.map(item => ({
        complements: item.complements,
        productId: item.productId,
        quantity: item.quantity
      }));

      const response = await apiService.post('/store/estimateValue', data);
      const order = response.data;
      setOrder(order);

      order.products.forEach((item) => {
        setBagItems((old) => [...old, {
          id: item._id,
          name: item.productName,
          price: item.priceTotal,
          imageUrl: item.imageUrl
        },]);
      });
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    estimateValue();
  }, []);

  return (
    <>
      <S.Header>
      </S.Header>

      <Container maxWidth="md" style={{ marginTop: '40px' }}>
        <Typography variant="h5" gutterBottom>Finalize o seu pedido</Typography>

        <List>
          {bagItems.map((item) => (
            <div key={item.id}>
              <ListItem alignItems="flex-start">
                <ListItemAvatar><Avatar alt={item.name} src={item.imageUrl} /></ListItemAvatar>
                <ListItemText
                  primary={item.name}
                  secondary={
                    `Preço: ${item.price.toLocaleString('pt-BR', {
                      style: 'currency', currency: 'BRL'
                    })}`}
                />
                <ListItemSecondaryAction>
                  <IconButton
                    edge="end"
                    aria-label="delete"
                  // onClick={() => handleRemoveItem(item.id)}
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
            <strong>
              {order?.total?.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })}
            </strong>
          </S.WrapperTotal>
          <S.WrapperTotal>
            <span>Taxa de entrega:</span>
            {
              deliveryPrice >= 1 ? (
                <strong>
                  {deliveryPrice?.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })}
                </strong>
              ) : (
                <>
                  {deliveryPrice === 0 && <span style={{ color: '#28a745' }}>Grátis</span>}
                  {(deliveryPrice === null || deliveryPrice === undefined) && <span style={{ color: '#ffc107' }}>A calcular</span>}
                </>
              )
            }
          </S.WrapperTotal>
          <S.WrapperTotal>
            <span>Total</span>
            <strong>
              {order?.total?.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })}
            </strong>
          </S.WrapperTotal>
        </section>

        <br />

        <section style={{ marginBottom: 2 }}>
          <Tabs
            value={deliveryMode}
            onChange={(e, value) => setDeliveryMode(value)}
            aria-label="Opções de entrega"
          >
            <Tab value="delivery" label="Entrega" />
            <Tab value="withdraw" label="Retirada" />
          </Tabs>

          {deliveryMode === 'delivery' && (
            <Box display="flex" flexDirection="column">
              <S.ButtonAddress variant='contained'>Adicionar endereço</S.ButtonAddress>
              {/* <FindAddressClient /> */}
            </Box>
          )}

          {deliveryMode === 'withdraw' && <></>}
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
              <Wallet initialization={{ preferenceId: '<PREFERENCE_ID>' }} />
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
