import React, { useEffect, useState } from 'react';
import { Typography, Paper, Box, AppBar, Toolbar, Button, Chip, List, ListItem, ListItemText } from '@mui/material';
import { useLocation, useNavigate, useParams } from 'react-router-dom';
import { ApiService } from 'services/api.service';
import WhatsAppIcon from '@mui/icons-material/WhatsApp';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';

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
  const [company, setCompany] = useState({});

  const getData = async () => {
    const { data } = await apiService.get(`/${storeUrl}/order/${orderId}`);
    setOrder(data.order);
    setCompany(data.company);
  };

  useEffect(() => {
    if (state?.order?.id && state?.store?._id) {
      setOrder(state.order);
      setCompany(state.store);
    } else {
      getData();
    }
  }, []);

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
          Subtotal: R$
        </Typography>

        {
          order?.address?.price &&
          <Typography variant="h6">
            Taxa de entrega: R$ {order.address.price.toFixed(2)}
          </Typography>
        }

        <Typography variant="h6">Total: R$ {order.total.toFixed(2)}</Typography>

        <Typography variant="h6" style={{ marginTop: 20 }}>
          Cliente: {order.client.name}
        </Typography>

        <Typography variant="body1">
          Email: {order.client.email}
        </Typography>

        <Typography variant="body1">
          Telefone: {order.client.phoneNumber}
        </Typography>

        {order.address ?
          <>
            <Typography variant="h6" style={{ marginTop: 20 }}>
              Endereço de Entrega:
            </Typography>

            <Typography variant="body1">
              Rua: {order.address.street}, {order.address.number}
            </Typography>

            <Typography variant="body1">
              Bairro: {order.address.district}
            </Typography>

            <Typography variant="body1">
              Cidade: {order.address.city}
            </Typography>

            <Typography variant="body1">
              CEP: {order.address.zipCode}
            </Typography>

            <Typography variant="body1">
              Preço da entrega: R$ {order.address?.price?.toFixed(2)}
            </Typography>

            <Typography variant="body1">
              Distância: {order.address.distance}
            </Typography>
          </>
          : <Typography variant="h6" style={{ marginTop: 20 }}>Pedido para retirada</Typography>
        }
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
          onClick={() => {
            const message = `Olá! Gostaria de falar sobre o pedido #${order.id}. Poderia me fornecer mais informações ou esclarecer algumas dúvidas?`;
            const linkWhatsapp = `https://api.whatsapp.com/send?phone=${company.whatsapp}&text=${encodeURIComponent(message)}`;
            window.open(linkWhatsapp, '_blank');
          }}
          startIcon={<WhatsAppIcon />}
        >
          Entrar em Contato
        </Button>
      </Box>
    </Box>
  );
};

export default PedidoDetalhes;
