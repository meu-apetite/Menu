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
} from '@mui/material';
import toast from 'react-hot-toast';
import { StoreContext } from 'contexts/store';
import { ApiService } from 'services/api.service';
import ClientContact from './views/ClientContact';
import CustomError from 'components/CustomError';
import DeleteIcon from '@mui/icons-material/Delete';
import * as S from './style';

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
  const { 
    getBag, setStore: setStoreContext, clearBag, setLoading 
  } = useContext(StoreContext);
  const { storeUrl } = useParams();
  const [order, setOrder] = useState({ products: [] });
  const [store, setStore] = useState();
  const [openModalAddress, setOpenModalAddress] = useState(false);
  const [error, setError] = useState(null);

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
          title: 'Vázio!',
          text: 'Nenhum item encontrado na sacola',
          buttonText: 'Voltar ao cardápio',
          buttonAction: () => document.location.href = `/${storeUrl}`
        })
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
    try{
      setLoading('Atualizando...');
      const bag = await getBag(storeUrl);
      const products = bag.products.filter((p, i) => index !== i);
      await localStorage.setItem(
        storeUrl, JSON.stringify({ products })
      );
      await estimateValue();
      toast.success('Item removido!');
    } catch(e) {
      console.log(e)
      toast.error('Não foi possível remover o item da sacola');
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
            <span>subtotal:</span>
            <strong>{formatPrice(order?.total)}</strong>
          </S.WrapperTotal>

          <S.WrapperButton>
            <S.ButtonDefault variant="contained" onClick={toggleModalAddress}>
              Continuar
            </S.ButtonDefault>
          </S.WrapperButton>
        </section>
      </Container>

      <ClientContact 
        open={openModalAddress} 
        getData={(data) => next(data)} 
        onClose={() => setOpenModalAddress(false)}
      />

      {error && <CustomError error={error}/>}
    </section>
  );
};

export default BagPage;
