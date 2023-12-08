import { useEffect, useState } from 'react'
import { Typography, Paper, Grid, List, ListItem, ListItemText } from '@mui/material'
import { useLocation, useParams } from 'react-router-dom'
import { ApiService } from 'services/api.service';

const PedidoDetalhes = () => {
  const { state } = useLocation()
  const { storeUrl, orderId } = useParams()
  const apiService = new ApiService();
  const [order, setOrder] = useState({
    id: 0,
    company: '',
    client: { name: '', email: '', phoneNumber: '' },
    status: '',
    products: [],
    paymentType: '',
    deliveryType: '',
    address: {},
    total: 0,
  });
  const [store, setStore] = useState({});

  const getData = async () => {
    const { data } = await apiService.get(`/store/${storeUrl}/order/${orderId}`);
    setOrder(data.order);
    setStore(data.company);  
  } 

  useEffect(() => {
    if (state?.order?.id && state?.store?._id) {
      setOrder(state.order);
      setStore(state.store);
    } else {
      getData();
    }
  }, [])

  return (
    <Paper style={{ padding: '20px', margin: '20px auto', maxWidth: '600px' }}>
      <Typography variant="h4" align="center" style={{ marginBottom: '16px' }}>
        Detalhes do Pedido #{order.id}
      </Typography>
      <Grid container spacing={2}>
        <Grid item xs={12} sm={6}>
          <Typography variant="h6">Informações do Cliente:</Typography>
          <Typography variant="body1">
            Nome: {order.client.name} <br />
            Email: {order.client.email} <br />
            Telefone: {order.client.phoneNumber}
          </Typography>
        </Grid>
        <Grid item xs={12} sm={6}>
          {order.deliveryType === 'delivery' ? (
            <>
              <Typography variant="h6">Endereço de Entrega:</Typography>
              <Typography variant="body1">
                {order?.address?.street} <br />
                {order?.address?.city}, {'BA'}, {'44400432'}
              </Typography>
            </>
          ) : (
            <>
              <Typography variant="h6">Endereço de Retirada:</Typography>
              <Typography variant="body1">
                {store?.address?.freeformAddress} <br />
              </Typography>
            </>
          )}
        </Grid>
      </Grid>
      <Typography variant="h6" style={{ marginTop: 20 }}>Produtos no Pedido:</Typography>
      <List>
        {order.products?.map((item, i) => (
          <ListItem key={i} style={{ borderBottom: '1px solid #ccc' }}>
            <ListItemText
              primary={item.productName}
              secondary={`Quantidade: ${
                item.quantity
              } - R$ ${item.priceTotal.toFixed(2)}`}
            />
          </ListItem>
        ))}
      </List>
      <Typography variant="h6" style={{ marginTop: 20 }}>
        Total: {order?.total?.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })}
      </Typography>
    </Paper>
  )
}

export default PedidoDetalhes
