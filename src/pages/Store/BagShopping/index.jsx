import { useContext, useEffect, useState } from 'react';
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
} from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import { AuthContext } from 'contexts/auth';
import { StoreContext } from 'contexts/store';
import { ApiService } from 'services/api.service';
import * as S from './style';
import ModalClientContact from './ModalClientContact';

const CartPage = () => {
  const apiService = new ApiService(false);
  const navigate = useNavigate();

  const { setLoading } = useContext(AuthContext);
  const { getBag, setStore: setStoreContext } = useContext(StoreContext);
  const { storeUrl } = useParams();

  const [order, setOrder] = useState({ products: [] });
  const [store, setStore] = useState();
  const [openModalAddress, setOpenModalAddress] = useState(false);

  const getStore = async () => {
    const { data } = await apiService.get('/store/' + storeUrl);
    setStore(data);
    setStoreContext(data);
  };

  const estimateValue = async () => {
    try {
      setLoading(true);

      const bag = await getBag(storeUrl);
      const { data: orderData } = await apiService.post(
        '/store/estimateValue',
        bag.products.map((item) => ({
          complements: item.complements || [],
          productId: item.productId,
          quantity: item.quantity,
        }))
      );

      setOrder(orderData);
      localStorage.setItem(storeUrl, JSON.stringify({
        products: orderData.products, productsToken: orderData.productsToken
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

  const toggleModalAddress = async () => setOpenModalAddress(!openModalAddress);
  
  const next = async (clientInfo) => {
    const bag = await getBag(storeUrl);
    const newBag = { ...bag, ...clientInfo };
    await localStorage.setItem(storeUrl, JSON.stringify(newBag));
    navigate('endereco');
  };

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
            {order.products.map((item, i) => (
              <div key={`id-${i}`}>
                <ListItem alignItems="flex-start">
                  <ListItemAvatar><Avatar alt={item.name} src={item.imageUrl} /></ListItemAvatar>
                  <ListItemText primary={item.productName} secondary={`Quant.: ${item.quantity} | Preço: ${formatPrice(item.priceTotal)}`} />
                  <ListItemSecondaryAction>
                    <IconButton edge="end" aria-label="delete"><DeleteIcon /></IconButton>
                  </ListItemSecondaryAction>
                </ListItem>
                <Divider />
              </div>
            ))}
          </List>

          <S.WrapperTotal>
            <span>subtotal:</span>
            <strong>{formatPrice(order?.total)}</strong>
          </S.WrapperTotal>

          <S.ButtonDefault variant="contained" onClick={toggleModalAddress}>Continuar</S.ButtonDefault>
        </section>
      </Container>

      {openModalAddress && <ModalClientContact getData={(data) => next(data)} />}
    </section>
  );
};

export default CartPage;
