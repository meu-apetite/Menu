import { useEffect, useState } from 'react'
import {
  Typography,
  Paper,
  Grid,
  List,
  ListItem,
  ListItemText,
} from '@mui/material'
import { useLocation } from 'react-router-dom'

const PedidoDetalhes = () => {
  const { state } = useLocation()
  const [order, setOrder] = useState({
    id: Number,
    company: '',
    client: { name: '', email: '', phoneNumber: '' },
    status: '',
    products: [],
    paymentType: '',
    deliveryType: '',
    address: {},
    total: Number,
  });
  const [store, setStore] = useState({});

  useEffect(() => {
    console.log(state)
    setOrder(state.order);
    setStore(state.store);
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
          {order?.address?.freeformAddress ? (
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
                {store?.address?.street} <br />
                {store?.address?.city}, {store?.address?.state}, {'44400432'}
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
        Total: R$ {22}
      </Typography>
    </Paper>
  )
}

export default PedidoDetalhes
