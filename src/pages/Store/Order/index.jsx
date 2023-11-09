import React from 'react';
import {
  Typography,
  Paper,
  Grid,
  List,
  ListItem,
  ListItemText,
} from '@mui/material';


// const useStyles = makeStyles((theme) => ({
//   paper: {
//     padding: theme.spacing(3),
//     margin: 'auto',
//     maxWidth: 600,
//   },
//   header: {
//     marginBottom: theme.spacing(2),
//   },
//   listItem: {
//     borderBottom: '1px solid #ccc',
//   },
// }));

const PedidoDetalhes = () => {
  const pedido = {
    numero: '12345',
    cliente: {
      nome: 'Maria Silva',
      email: 'maria.silva@example.com',
      telefone: '(11) 98765-4321',
    },
    enderecoEntrega: {
      logradouro: 'Avenida Fictícia, 456',
      cidade: 'Cidade Fictícia',
      estado: 'UF',
      cep: '54321-678',
    },
    produtos: [
      {
        nome: 'Produto A',
        quantidade: 2,
        preco: 25.99,
      },
      {
        nome: 'Produto B',
        quantidade: 1,
        preco: 39.99,
      },
      {
        nome: 'Produto C',
        quantidade: 3,
        preco: 12.99,
      },
    ],
    total: 167.94,
  };

  return (
    <Paper style={{
      padding: '20px',
      margin: '20px auto',
      maxWidth: '600px'
    }}>
      <Typography variant="h4" align="center" style={{ marginBottom: '16px'}}>
        Detalhes do Pedido #{pedido.numero}
      </Typography>
      <Grid container spacing={2}>
        <Grid item xs={12} sm={6}>
          <Typography variant="h6">Informações do Cliente:</Typography>
          <Typography variant="body1">
            Nome: {pedido.cliente.nome}
            <br />
            Email: {pedido.cliente.email}
            <br />
            Telefone: {pedido.cliente.telefone}
          </Typography>
        </Grid>
        <Grid item xs={12} sm={6}>
          <Typography variant="h6">Endereço de Entrega:</Typography>
          <Typography variant="body1">
            {pedido.enderecoEntrega.logradouro}
            <br />
            {pedido.enderecoEntrega.cidade}, {pedido.enderecoEntrega.estado},{' '}
            {pedido.enderecoEntrega.cep}
          </Typography>
        </Grid>
      </Grid>
      <Typography variant="h6" style={{ marginTop: 20 }}>
        Produtos no Pedido:
      </Typography>
      <List>
        {pedido.produtos.map((produto, index) => (
          <ListItem key={index} style={{ borderBottom: '1px solid #ccc' }}>
            <ListItemText
              primary={produto.nome}
              secondary={`Quantidade: ${produto.quantidade} - R$ ${produto.preco.toFixed(
                2
              )}`}
            />
          </ListItem>
        ))}
      </List>
      <Typography variant="h6" style={{ marginTop: 20 }}>
        Total: R$ {pedido.total.toFixed(2)}
      </Typography>
    </Paper>
  );
};

export default PedidoDetalhes;
