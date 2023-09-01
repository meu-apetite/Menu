import React, { useContext, useEffect, useState } from 'react';
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
  FormControlLabel,
  TextField,
  Switch,
  styled,
} from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import * as S from './style';

import '@tomtom-international/web-sdk-maps/dist/maps.css';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Box from '@mui/material/Box';

import { StoreContext } from 'contexts/store';
import { ApiService } from 'services/api.service';
import axios from 'axios';


import { initMercadoPago, Wallet } from '@mercadopago/sdk-react';
initMercadoPago('TEST-1d8377ed-2c56-47ed-a3bb-1b3a27c71835');


const CartPage = () => {
  const apiService = new ApiService(false);
  const { getBag } = useContext(StoreContext);

  const [bagItems, setBagItems] = useState([]);
  const [address, setAddress] = useState({ zipcode: '', city: '' });
  const [city, setCity] = useState('');

  const [deliveryMode, setDeliveryMode] = useState('delivery'); //delivery | withdraw
  const [payment, setPayment] = useState({
    type: 'payOnDelivery', //payOnDelivery | onlinePayment
    method: '',
  });

  const [order, setOrder] = useState({});

  const inputProps = { variant: 'outlined', margin: 'normal' };

  const IOSSwitch = styled((props) => (
    <Switch focusVisibleClassName=".Mui-focusVisible" disableRipple {...props} />
  ))(({ theme }) => ({
    width: 42,
    height: 26,
    padding: 0,
    '& .MuiSwitch-switchBase': {
      padding: 0,
      margin: 2,
      transitionDuration: '300ms',
      '&.Mui-checked': {
        transform: 'translateX(16px)',
        color: '#fff',
        '& + .MuiSwitch-track': {
          backgroundColor: theme.palette.mode === 'dark' ? '#2ECA45' : '#65C466',
          opacity: 1,
          border: 0,
        },
        '&.Mui-disabled + .MuiSwitch-track': {
          opacity: 0.5,
        },
      },
      '&.Mui-focusVisible .MuiSwitch-thumb': {
        color: '#33cf4d',
        border: '6px solid #fff',
      },
      '&.Mui-disabled .MuiSwitch-thumb': {
        color:
          theme.palette.mode === 'light'
            ? theme.palette.grey[100]
            : theme.palette.grey[600],
      },
      '&.Mui-disabled + .MuiSwitch-track': {
        opacity: theme.palette.mode === 'light' ? 0.7 : 0.3,
      },
    },
    '& .MuiSwitch-thumb': {
      boxSizing: 'border-box',
      width: 22,
      height: 22,
    },
    '& .MuiSwitch-track': {
      borderRadius: 26 / 2,
      backgroundColor: theme.palette.mode === 'light' ? '#E9E9EA' : '#39393D',
      opacity: 1,
      transition: theme.transitions.create(['background-color'], {
        duration: 500,
      }),
    },
  }));

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

  const getLocalization = () => {
    navigator.geolocation.getCurrentPosition(
      async (e) => {
        try {
          const response = await axios.get(`https://api.tomtom.com/search/2/reverseGeocode/${e.coords.latitude},${e.coords.longitude}.json`, {
            params: { key: 'GmL5wOEl3iWP0n1l6O5sBV0XKo6gHwht' }
          });

          console.log(response.data.addresses[0]);
          const firstResult = response.data.addresses[0];
          setAddress(response.data.addresses[0].address);

        } catch (error) {
          alert(error);
          console.error("Erro ao buscar localização:", error);
        }
      },
      async (err) => console.log('ok'),
    );
  };

  return (
    <Container maxWidth="md" style={{ marginTop: '40px' }}>
      <h2 variant="h4">Finalize o seu pedido</h2>

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

      <S.WrapperTotal>
        <span>SUBTOTAL:</span>
        <strong>
          {order?.total?.toLocaleString('pt-BR', {
            style: 'currency',
            currency: 'BRL'
          })}
        </strong>
      </S.WrapperTotal>

      <br />

      <section>
        <Tabs
          value={'deliveryMode'}
          onChange={(e, value) => setDeliveryMode(value)}
          aria-label="Opções de entrega"
        >
          <Tab value="delivery" label="Entrega" />
          <Tab value="withdraw" label="Retirada" />
        </Tabs>

        {deliveryMode !== 'delivery' && (
          <Box display="flex" flexDirection="column">

            <p>Preencha o endereço de entrega corretamente!</p>

            <TextField
              {...inputProps}
              sx={{ mt: 0 }}
              label="CEP"
            // value={zipcode}
            // onChange={(e) => setZipcode(e.target.value)}
            />
            <Box display="grid" sx={{ gridTemplateColumns: '80% 20%' }}>
              <TextField
                {...inputProps}
                sx={{ flexGrow: 1, mr: 2 }}
                label="Rua"
                value={address?.streetName}
                onChange={(e) => setCity(e.target.value)}
              />
              <TextField
                {...inputProps}
                label="Nº"
                value={address}
                onChange={(e) => setAddress(e.target.value)}
              />
            </Box>
            <TextField
              {...inputProps}
              label="Bairro"
              value={address}
              onChange={(e) => setAddress(e.target.value)}
            />
            <TextField
              {...inputProps}
              label="Ponto de refência"
              value={address}
              onChange={(e) => setAddress(e.target.value)}
            />
            <TextField
              {...inputProps}
              label="Condomínio"
              value={address}
              onChange={(e) => setAddress(e.target.value)}
            />
            <FormControlLabel
              control={<IOSSwitch sx={{ m: 1 }} />}
              label="Casa em condominio"
            />

          </Box>
        )}

        {deliveryMode === 'withdraw' && <></>}
      </section>


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
            <Wallet initialization={{ preferenceId: '<PREFERENCE_ID>' }} />
        ) : (
          <></>
        )}
      </section>
    </Container>
  );
};

export default CartPage;
