import React, { useContext, useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
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
  Grid,
  TextField
} from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import { AuthContext } from 'contexts/auth';
import { StoreContext } from 'contexts/store';
import { ApiService } from 'services/api.service';
import * as S from './style';

const CartPage = () => {
  const apiService = new ApiService(false);
  const navigate = useNavigate();

  const { setLoading, toast } = useContext(AuthContext);
  const { getBag, setCompany } = useContext(StoreContext);
  const { id } = useParams();

  const [bagItems, setBagItems] = useState([]);
  const [order, setOrder] = useState({});
  const [store, setStore] = useState();
  const [clientInfo, setClientInfo] = useState({
    name: '', tel: '', email: ''
  });

  const getStore = async () => {
    const { data } = await apiService.get('/store/' + id);
    setStore(data);
    setCompany(data)
  };

  const estimateValue = async () => {
    try {
      setLoading(true);
      
      const bag = await getBag();
      const bagSaved = [];
      setBagItems([]);

      const data = bag.products.map((item) => ({
        complements: item.complements || [],
        productId: item.productId,
        quantity: item.quantity,
      }));

      const { data: order } = await apiService.post('/store/estimateValue', data);

      setOrder(order);

      order.products.forEach((item) => {
        bagSaved.push({
          productId: item._id,
          complements: item.complements,
          name: item.productName,
          quantity: item.quantity,
          total: item.priceTotal,
          imageUrl: item.imageUrl,
        });
      });

      setBagItems(bagSaved);
      localStorage.setItem('bag', JSON.stringify({ 
        products: bagSaved, productsToken: order.productsToken 
      }));
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

  const toAddress = () =>  {
    if (
      clientInfo.email === '' || clientInfo.name === '' || clientInfo.tel === ''
    ) {
      toast.error('Você deve preencher todos os dados de contato')
      return;
    }
    navigate('endereco');
  }

  useEffect(() => {
    getStore();
    estimateValue();
  }, []);

  return (
    <section>
      <S.Header>
        <S.Logo src={store?.custom?.logo?.url} alt={`Logomarca de ${store?.name}`} />
      </S.Header>

      <Container maxWidth="md">
        <section>
          <S.Title variant="h5">Finalize o seu pedido</S.Title>

          <List>
            {bagItems.map((item, i) => (
              <div key={`id-${i}`}>
                <ListItem alignItems="flex-start">
                  <ListItemAvatar><Avatar alt={item.name} src={item.imageUrl} /></ListItemAvatar>
                  <ListItemText primary={item.name} secondary={`Quant.: ${item.quantity} | Preço: ${formatPrice(item.price)}`} />
                  <ListItemSecondaryAction>
                    <IconButton edge="end" aria-label="delete"><DeleteIcon /></IconButton>
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
          </section>

          <br /> <br />

          <section>
            <h3>Informe seus dados de contato</h3>

            <Grid container spacing={2}>
                <Grid item xs={12}>
                  <TextField fullWidth label="Nome" value={clientInfo.name} disabled />
                </Grid>
                <Grid item xs={12}>
                  <TextField fullWidth label="Telefone (whatsapp)" value={clientInfo.tel} disabled />
                </Grid>
                <Grid item xs={12}>
                  <TextField fullWidth label="Email" value={clientInfo.email} disabled />
                </Grid>
              </Grid>
          </section>

          <S.ButtonDefault variant="contained" onClick={toAddress}>
            Continuar
          </S.ButtonDefault>
        </section>
      </Container>
    </section>
  );
};

export default CartPage;
