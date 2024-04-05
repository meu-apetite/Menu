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
} from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import { GlobalContext } from 'contexts/global';
import { ApiService } from 'services/api.service';
import { ApplicationUtils } from 'utils/ApplicationUtils';
import { ErrorUtils } from 'utils/ErrorUtils';
import ButtonFloat from 'components/ButtonFloat';
import DeliveryInfo from 'components/DeliveryInfo';
import SkeletonProducts from './SkeletonProducts';
import * as S from './style';
import CustomError from 'components/CustomError';


const CartPage = () => {
  const apiService = new ApiService(false);
  const navigate = useNavigate();
  const { menuUrl } = useParams();
  const { company, setLoading } = useContext(GlobalContext);
  const [order, setOrder] = useState({ products: [] });
  const [globalError, setGlobalError] = useState(null);

  const estimateValue = async () => {
    try {
      const cart = await ApplicationUtils.getCartInLocalStorage(menuUrl);
      cart.companyId = company?._id;

      if (cart?.products?.length === 0 || !cart) {
        ApplicationUtils.clearCart(menuUrl);
        setGlobalError(ErrorUtils.emptyCart(menuUrl));
        return;
      }

      const { data } = await apiService.post('/estimateValue', cart);

      if (data?.products?.length === 0 || !data) {
        setGlobalError(ErrorUtils.emptyCart(menuUrl));
        return;
      }

      setOrder(data);

      await ApplicationUtils.setDataInLocalStorage(menuUrl, data);
    } catch (error) {
      console.log(error)
      setGlobalError(ErrorUtils.retrieveOrder(menuUrl));
    }
  };

  const removeItem = async (index) => {
    try {
      setLoading('Atualizando...');

      const cart = await ApplicationUtils.getCartInLocalStorage(menuUrl);
      const products = cart.products.filter((p, i) => index !== i);
      ApplicationUtils.setDataInLocalStorage(menuUrl, { ...cart, products });

      await estimateValue();

      toast.success('Item removido!');
    } catch (e) {
      toast.error('Não foi possível remover o item da sacola');
    } finally {
      setLoading(false);
    }
  };

  const next = async () => navigate('contact');

  useEffect(() => {
    estimateValue();
  }, []);

  return (
    <section>
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

          {order && (
            <DeliveryInfo
              settingsDelivery={company.settingsDelivery}
              getDeliveryInfo={(data) => {
                ApplicationUtils.setDataInLocalStorage(menuUrl, data);
                setOrder(data);
              }}
              cart={order}
            />
          )}

          <ButtonFloat text="Continuar" onClick={next} />
        </section>
      </Container>

      {globalError && <CustomError error={globalError} />}
    </section>
  );
};

export default CartPage;
