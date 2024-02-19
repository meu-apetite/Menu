import { useContext, useEffect, useState } from 'react';
import toast from 'react-hot-toast';
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
  Skeleton,
} from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import { GlobalContext } from 'contexts/global';
import { ApiService } from 'services/api.service';
import { ApplicationUtils } from 'utils/ApplicationUtils';
import { ErrorUtils } from 'utils/ErrorUtils';
import CustomError from 'components/CustomError';
import ButtonFloat from 'components/ButtonFloat';
import DeliveryInfo from 'components/DeliveryInfo';
import SkeletonProducts from './SkeletonProducts';
import * as S from './style';


const CartPage = () => {
  const navigate = useNavigate();
  const apiService = new ApiService(false);
  const { setCompany: setStoreContext, setLoading } = useContext(GlobalContext);
  const { storeUrl } = useParams();
  const [order, setOrder] = useState({ products: [] });
  const [store, setStore] = useState();
  const [error, setError] = useState(null);
  const [deliveryInfo, setDeliveryInfo] = useState(null);
 
  const getCompany = async () => {
    const { data } = await apiService.get('/' + storeUrl);
    setStore(data);
    setStoreContext(data);
  };

  const estimateValue = async () => {
    try {
      const cart = await ApplicationUtils.getCartInLocalStorage(storeUrl);

      if (cart?.products?.length === 0 || !cart) {
        setError(ErrorUtils.emptyCart(storeUrl));
        return;
      }

      const { data } = await apiService.post('/estimateValue', cart);

      setOrder(data);

      await ApplicationUtils.setDataInLocalStorage(storeUrl, data);
    } catch (error) {
      setError(setError(ErrorUtils.retrieveOrder(storeUrl)));
    }
  };

  const removeItem = async (index) => {
    try {
      setLoading('Atualizando...');

      const cart = await ApplicationUtils.getCartInLocalStorage(storeUrl);
      const products = cart.products.filter((p, i) => index !== i);
      ApplicationUtils.setDataInLocalStorage(storeUrl, { products });

      await estimateValue();

      toast.success('Item removido!');
    } catch (e) {
      toast.error('Não foi possível remover o item da sacola');
    } finally {
      setLoading(false);
    }
  };

  const next = async () => {
    const cart = await ApplicationUtils.getCartInLocalStorage(storeUrl);
    const address = deliveryInfo?.address || {};

    ApplicationUtils.setDataInLocalStorage(storeUrl, {...cart, ...address});
    navigate('contact');
  };

  useEffect(() => {
    getCompany();
    estimateValue();
  }, []);

  return (
    <section>
      <S.Header>
        {!store 
          ? <Skeleton animation="wave" variant="circular" width={60} height={60} />
          : <S.Logo src={store.custom.logo?.url} alt={`Logomarca ${store?.name}`} />
        }
      </S.Header>

      <Container maxWidth="md" sx={{ mb: '64px' }}>
        <section>
          <S.Title variant="h5">Finalize o seu pedido</S.Title>
          <List>
            {order.products.map((item, i) => (
              <div key={`id-${i}`}>
                <ListItem alignItems="flex-start">
                  <ListItemAvatar>
                    <Avatar alt={item.name} src={item.imageUrl} />
                  </ListItemAvatar>
                  <ListItemText
                    primary={item.productName}
                    secondary={
                      `Quant.: ${item.quantity} | Preço: ${ApplicationUtils
                        .formatPrice(item.priceTotal)}`
                    }
                  />
                  <ListItemSecondaryAction>
                    <div onClick={() => removeItem(i)}>
                      <IconButton edge="end" aria-label="delete">
                        <DeleteIcon />
                      </IconButton>
                    </div>
                  </ListItemSecondaryAction>
                </ListItem>
                <Divider />
              </div>
            ))}
          </List>

          {order.products.length <= 0 && <SkeletonProducts products={3} />}

          {store?.settingsDelivery && (
            <DeliveryInfo 
              settingsDelivery={store.settingsDelivery}
              getDeliveryInfo={(data) => ApplicationUtils.setDataInLocalStorage(storeUrl, data)}
              order={order}
            />
          )}
          
          {!error && <ButtonFloat text="Continuar" onClick={next} />}
        </section>
      </Container>

      {error && <CustomError error={error} />}
    </section>
  );
};

export default CartPage;
