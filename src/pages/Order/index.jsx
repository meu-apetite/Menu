import React, { useContext, useEffect, useState } from 'react';
import { Typography, Paper, Box, AppBar, Toolbar, Button, Chip, List, ListItem, ListItemText, Modal } from '@mui/material';
import { useLocation, useNavigate, useParams } from 'react-router-dom';
import { ApiService } from 'services/api.service';
import { GlobalContext } from 'contexts/global';
import WhatsAppIcon from '@mui/icons-material/WhatsApp';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import { ApplicationUtils } from 'utils/ApplicationUtils';

const PedidoDetalhes = () => {
  const navigate = useNavigate();
  const { toast } = useContext(GlobalContext);
  const { state } = useLocation();
  const { menuUrl, orderId } = useParams();
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
    subtotal: 0
  });
  const [company, setCompany] = useState({});
  const [openModal, setOpenModal] = useState(false);

  const getData = async () => {
    const { data } = await apiService.get(`/${menuUrl}/order/${orderId}`);
    console.log(data);
    setOrder(data.order);
    setCompany(data.company);
  };

  const confirmOrder = () => {
    toast((t) => (
      <span>
        Confirme seu pedido através do nosso WhatsApp.
        <Box sx={{ display: 'flex', justifyContent: 'end', mt: 1 }}>
          <Button color="primary" variant="contained" onClick={handleConfirmation}>
            Confirmar pedido
          </Button>
        </Box>
      </span>
    ), { duration: Infinity });
  };

  const handleConfirmation = () => {
    const phoneNumber = company.whatsapp;
    const confirmationText = `Olá! Gostaria de confirmar o pedido número #${order.id}, feito em ${ApplicationUtils.formatDate(order.date)}.`;
    const message = encodeURIComponent(confirmationText);
    window.open(`https://api.whatsapp.com/send?phone=${phoneNumber}&text=${message}`);
    setOpenModal(false);
  };


  useEffect(() => {
    getData();
  }, []);

  useEffect(() => {
    if (company?.whatsapp) setOpenModal(true);
  }, [company]);

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
            label={order.status.label}
            color={ApplicationUtils.getStatusColor(order.status.name)}
            variant="outlined"
          />
        </Box>

        <Typography variant="h5" style={{ marginBottom: '16px' }}>
          Número do pedido: #{order.id}
        </Typography>

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

        <Box sx={{ display: 'flex', alignItems: 'end', flexDirection: 'column', gap: 0.3 }}>
          <strong>Subtotal: R$ {order.subtotal.toFixed(2)}</strong>
          {order.deliveryType === 'delivery' && (
            order.address.deliveryOtpion === 'customerPickup'
              ? <span>A combinar</span>
              : <strong>
                Taxa de entrega: R$ {order.address.price.toFixed(2)}
              </strong>
          )
          }
          <strong>Total: R$ {order.total.toFixed(2)}</strong>
        </Box>
      </Paper>

      <Modal open={openModal} aria-labelledby="modal-title" aia-describedby="modal-description">
        <Box
          sx={{
            position: 'absolute',
            top: '50%',
            left: '50%',
            transform: 'translate(-50%, -50%)',
            maxWidth: 400,
            width: '95%',
            bgcolor: 'background.paper',
            border: '2px solid #000',
            boxShadow: 24,
            p: 3,
          }}
        >
          <Typography id="modal-title" variant="h6" component="h2">
            Confirme seu pedido
          </Typography>
          <Typography id="modal-description" sx={{ mt: 2 }}>
            Confirme seu pedido através do nosso WhatsApp.
          </Typography>
          <Box sx={{ display: 'flex', justifyContent: 'end', mt: 2 }}>
            <Button color="primary" variant="contained" onClick={handleConfirmation}>
              Confirmar pedido
            </Button>
          </Box>
        </Box>
      </Modal>

      <Box style={{ display: 'flex', justifyContent: 'center', marginTop: 16 }}>
        <Button
          variant="contained"
          color="secondary"
          style={{ marginRight: 16 }}
          onClick={() => navigate(`/${menuUrl}`)}
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
