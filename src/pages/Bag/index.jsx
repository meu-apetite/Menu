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
  Skeleton,
  Button,
  Box,
} from '@mui/material';
import toast from 'react-hot-toast';
import { StoreContext } from 'contexts/store';
import { ApiService } from 'services/api.service';
import CustomError from 'components/CustomError';
import DeleteIcon from '@mui/icons-material/Delete';
import ButtonFloat from 'components/ButtonFloat';
import animationBagEmpty from 'assets/gif/bag-empty.gif';
import * as S from './style';
import FindAddress from 'components/FindAddress';

function MediaProduct(props) {
  const { loading = false, products } = props;
  const itens = Array.from({ length: products });

  return (
    loading && (
      <List>
        {itens.map((item, i) => (
          <div key={`id-${i}`}>
            <ListItem alignItems="flex-start">
              <ListItemAvatar>
                <Skeleton animation="wave" variant="circular" width={40} height={40} />
              </ListItemAvatar>
              <div style={{ display: 'grid', width: '100%' }}>
                <Skeleton
                  animation="wave"
                  height={20} width="32%"
                  sx={{ marginTop: 1, minWidth: '140px' }}
                />
                <Skeleton
                  animation="wave"
                  height={15}
                  width="24%"
                  sx={{ minWidth: '100px' }}
                />
              </div>
              <ListItemSecondaryAction>
                <IconButton edge="end" aria-label="delete"><DeleteIcon /></IconButton>
              </ListItemSecondaryAction>
            </ListItem>
            <Divider />
          </div>
        ))}
      </List>
    )
  );
}

const BagPage = () => {
  const apiService = new ApiService(false);
  const navigate = useNavigate();
  const { getBag, setStore: setStoreContext, clearBag, setLoading } = useContext(StoreContext);
  const { storeUrl } = useParams();
  const [order, setOrder] = useState({ products: [] });
  const [store, setStore] = useState();
  const [error, setError] = useState(null);
  const [address, setAddress] = useState(null);
  const [addressToken, setAddressToken] = useState(null);
  const [openFindAddress, setOpenFindAddress] = useState(false);

  const toggleFindAddress = () => setOpenFindAddress(!openFindAddress);
  const getStore = async () => {
    const { data } = await apiService.get('/store/' + storeUrl);
    setStore(data);
    setStoreContext(data);
  };

  const estimateValue = async () => {
    try {
      const bag = await getBag(storeUrl);

      if (bag?.products?.length <= 0 || bag?.products === null || bag?.products === undefined) {
        return setError({
          code: 404,
          animation: animationBagEmpty,
          title: 'Vázio!',
          text: 'Nenhum item encontrado na sacola',
          buttonText: 'Voltar ao cardápio',
          buttonAction: () => document.location.href = `/${storeUrl}`
        });
      }

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
      setError({
        code: error.response?.status,
        title: 'Não foi possível recuperar o seu pedido',
        buttonText: 'Limpar pedido',
        buttonAction: () => {
          clearBag();
          toast.success('Pedido limpo, vamos redirecionar você ao nosso cardapio para refazer o pedido');
          setTimeout(() => document.location.href = `/${storeUrl}`, 4000);
        },
        text: error.response.data?.message
          || 'Não conseguimos recuperar os dados do seu pedido. Atualize a página e, se o problema persistir, clique em "Limpar Pedido"'
      });
    }
  };

  const removeItem = async (index) => {
    try {
      setLoading('Atualizando...');
      const bag = await getBag(storeUrl);
      const products = bag.products.filter((p, i) => index !== i);
      await localStorage.setItem(
        storeUrl, JSON.stringify({ products })
      );
      await estimateValue();
      toast.success('Item removido!');
    } catch (e) {
      console.log(e);
      toast.error('Não foi possível remover o item da sacola');
    } finally {
      setLoading(false);
    }
  };

  const formatPrice = (data) => {
    if (!data) return 'R$ 0,00';
    return data.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' });
  };

  const next = async () => {
    const bag = await getBag(store.storeUrl);
    localStorage.setItem(store.storeUrl, JSON.stringify({ ...bag, address, addressToken }));
    navigate('contact');
  }

  const calculateFreight = async (data) => {
    if (!data?.street || !data?.district || !data?.city || !data.number) {
      toast.error(
        'Endereço incompleto, verique seu endereço. Caso o erro seja recorrente, entre em contato com nosso suporte',
        { position: 'top-center' }
      );
    }

    try {
      setLoading('Calculando taxa...');
      const { data: response } = await apiService.post(
        '/store/calculateFreight', 
        { address: data, companyId: store._id }
      );
      console.log(response)
      setAddress(response.address);
      setAddressToken(response.addressToken);
      toggleFindAddress();
    } catch (e) {
      toast.error(e.response.data?.message || 'Não foi possível calcular o frete');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    getStore();
    estimateValue();
  }, []);

  return (
    <section>
      <S.Header>
        {(!store)
          ? <Skeleton animation="wave" variant="circular" width={60} height={60} />
          : <S.Logo src={store?.custom?.logo?.url} alt={`Logomarca de ${store?.name}`} />
        }
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
                    <IconButton onClick={() => removeItem(i)} edge="end" aria-label="delete">
                      <DeleteIcon />
                    </IconButton>
                  </ListItemSecondaryAction>
                </ListItem>
                <Divider />
              </div>
            ))}
          </List>

          <MediaProduct loading={(order.products.length <= 0)} products={3} />

          <S.WrapperTotal>
            <strong>SUBTOTAL:</strong>
            <strong className="price">{formatPrice(order?.total)}</strong>
          </S.WrapperTotal>

          {store?.settingsDelivery?.deliveryOption === 'fixed' && (
            <S.WrapperTotal>
              <strong>TAXA DE ENTREGA:</strong>
              <strong className="price">
                {store?.settingsDelivery.fixedValue.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })}
              </strong>
            </S.WrapperTotal>
          )}

          {store?.settingsDelivery?.deliveryOption === 'fixed' && (
            <S.WrapperTotal>
              <strong>TAXA DE ENTREGA:</strong>
              <strong className="price">
                {store?.settingsDelivery.fixedValue.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })}
              </strong>
            </S.WrapperTotal>
          )}

          {store?.settingsDelivery?.deliveryOption === 'customerPickup' && (
            <S.WrapperTotal>
              <strong>TAXA DE ENTREGA:</strong>
              <small>A combinar (Entraremos em contato para ajustar a entrega)</small>
            </S.WrapperTotal>
          )}

          {store?.settingsDelivery?.deliveryOption === 'automatic' && address?.price && (
            <S.WrapperTotal>
              <strong>TAXA DE ENTREGA:</strong>
              <strong className="price">
                {address.price.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })}
              </strong>
            </S.WrapperTotal>
          )}

          {store?.settingsDelivery?.deliveryOption === 'automatic' && !address?.price && (
            <Box sx={{ textAlign: 'end', mt: 1 }}>
              <Button color="success" variant="contained" onClick={toggleFindAddress}>
                Calcular taxa de entrega
              </Button>
            </Box>
          )}

          <S.WrapperTotal>
            <strong>TOTAL:</strong>
            <strong className="price">{formatPrice(order?.total + (address?.price || 0))}</strong>
          </S.WrapperTotal>

          <br />

          {store?.settingsDelivery?.deliveryOption === 'automatic' && (
            <small>*Não é necessário calcular a taxa de entrega se o pedido for para retirada</small>
          )}

          {!error && <ButtonFloat text="Continuar" onClick={next} />}
        </section>
      </Container>

      {openFindAddress && (
        <FindAddress
          closeModal={toggleFindAddress}
          getData={(data) => calculateFreight(data)}
        />
      )}

      {error && <CustomError error={error} />}
    </section>
  );
};

export default BagPage;
