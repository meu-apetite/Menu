import React, { useEffect, useState } from 'react';
import { Typography, Paper, Grid, List, ListItem, ListItemText, AppBar, Box, Toolbar, Button, Chip } from '@mui/material';
import { useLocation, useNavigate, useParams } from 'react-router-dom';
import { ApiService } from 'services/api.service';
import WhatsAppIcon from '@mui/icons-material/WhatsApp';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import PayPix from 'components/PayPix';

const PedidoDetalhes = () => {
  const navigate = useNavigate();
  const { state } = useLocation();
  const { storeUrl, orderId } = useParams();
  const apiService = new ApiService();
  const [order, setOrder] = useState({
    id: 0,
    store: '',
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
  };

  useEffect(() => {
    if (state?.order?.id && state?.store?._id) {
      setOrder(state.order);
      setStore(state.store);
    } else {
      getData();
    }
  }, []);

  const openWhatsapp = () => {
    const message = `Olá! Gostaria de falar sobre o pedido #${order.id}. Poderia me fornecer mais informações ou esclarecer algumas dúvidas?`;
    const linkWhatsapp = `https://api.whatsapp.com/send?phone=${store.whatsapp}&text=${encodeURIComponent(message)}`;
    window.open(linkWhatsapp, '_blank');
  };

  const getStatusColor = (status) => {
    switch (status) {
      case 'OrderReceived':
        return 'primary'; 
      case 'Processing':
        return 'info'; 
      case 'WaitingForPaymentConfirmation':
        return 'warning'; 
      case 'Shipped':
        return 'success';
      case 'Concluded':
        return 'success'; 
      case 'Cancelled':
        return 'error'; 
      case 'WaitingForPickup':
        return 'info';
      default:
        return 'default';
    }
  };

  return (
    <Box>
      <AppBar position="static">
        <Toolbar variant="dense">
          <Typography variant="h6">Detalhes do Pedido</Typography>
        </Toolbar>
      </AppBar>

      <Paper elevation={2} style={{ padding: '20px', margin: '20px auto', maxWidth: '600px' }}>
        <Box style={{ marginBottom: '16px', textAlign: 'center' }}>
          <Chip
            label={order?.status?.label}
            color={getStatusColor(order?.status?.name)}  
            variant="outlined"
          />
        </Box>

        <Typography variant="h5" style={{ marginBottom: '16px' }}>
          Número do pedido: #{order.id}
        </Typography>

        <Grid container={true} spacing={2}>
          {/* Restante do código... */}

        </Grid>

        <Typography variant="h6" style={{ marginTop: 20 }}>Itens:</Typography>
        <List>
          {order.products?.map((item, i) => (
            <ListItem key={i} style={{ borderBottom: '1px solid #ccc' }}>
              <ListItemText
                primary={item.productName}
                secondary={`Quantidade: ${item.quantity} | R$ ${item.priceTotal.toFixed(2)}`}
              />
            </ListItem>
          ))}
        </List>

        <Typography variant="h6" style={{ marginTop: 20 }}>
          Total: {order?.total?.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })}
        </Typography>
      </Paper>

      <Box style={{ display: 'flex', justifyContent: 'center', marginTop: 16 }}>
        <Button
          variant="contained"
          color="secondary"
          style={{ marginRight: 16 }}
          onClick={() => navigate(`/${storeUrl}`)}
          startIcon={<ArrowBackIcon />}
        >
          Voltar para o Cardápio
        </Button>

        <Button
          variant="contained"
          color="success"
          onClick={openWhatsapp}
          startIcon={<WhatsAppIcon />}
        >
          Entrar em Contato
        </Button>
      </Box>

      {store.pixCode && <PayPix active={!!store?.pixCode || false} code={store?.pixCode} />}
    </Box>
  );
};

export default PedidoDetalhes;
