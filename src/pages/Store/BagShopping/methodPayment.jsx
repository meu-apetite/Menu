import React, { useState } from 'react';
import {
  Grid,
  List,
  ListItem,
  ListItemText,
  Divider,
  Typography,
} from '@mui/material';
import { AccountBalance, CreditCard, Payment } from '@mui/icons-material';
import iconAmex from 'assets/icons/amex.png';
import iconDinheiro from 'assets/icons/dinheiro.png';
import iconElo from 'assets/icons/elo.webp';
import iconHipercard from 'assets/icons/hipercard.png';
import iconMastercard from 'assets/icons/mastercard.webp';
import iconNugo from 'assets/icons/nugo.avif';
import iconSodexo from 'assets/icons/sodexo.png';
import iconTicket from 'assets/icons/ticket.png';
import iconVisa from 'assets/icons/visa.webp';
import iconVr from 'assets/icons/vr.avif';
import * as S from './style'

const arr = [
  {
    category: 'Dinheiro',
    methods: [{ icon: iconDinheiro, value: 'dinheiro', label: 'Dinehiro' }],
  },
  {
    category: 'Débito',
    methods: [
      {
        icon: iconMastercard,
        value: 'mastercard-debito',
        label: 'Mastercard - Débito',
      },
      { icon: iconVisa, value: 'visa-debito', label: 'Visa - Débito' },
      { icon: iconElo, value: 'elo-debito', label: 'Elo - Débito' },
    ],
  },
  {
    category: 'Crédito',
    methods: [
      {
        icon: iconDinheiro,
        value: 'hipercard-credito',
        label: 'Hipercard - Crédito',
      },
      { icon: iconDinheiro, value: 'visa-credito', label: 'Visa - Crédito' },
      { icon: iconDinheiro, value: 'nugo-credito', label: 'Nugo - Crédito' },
      {
        icon: iconDinheiro,
        value: 'mastercard-credito',
        label: 'Mastercard - Crédito',
      },
      { icon: iconDinheiro, value: 'elo-credito', label: 'Elo - Crédito' },
      { icon: iconDinheiro, value: 'amex-credito', label: 'Amex - Crédito' },
    ],
  },
  {
    category: 'Vale-refeição',
    methods: [
      {
        icon: iconDinheiro,
        value: 'vr-refeicao',
        label: 'VR Refeição - Vale-Refeição',
      },
      {
        icon: iconDinheiro,
        value: 'sodexo-refeicao',
        label: 'Sodexo Refeição - Vale-Refeição',
      },
      {
        icon: iconDinheiro,
        value: 'ticket-refeicao',
        label: 'Ticket - Vale-Refeição',
      },
    ],
  },
];

function FormularioPagamento() {
  const [formaDePagamento, setFormaDePagamento] = useState('');

  const handleMethodPayment = (paymentMethod) => {
    setFormaDePagamento(paymentMethod);
  };

  return (
    <div>
      <h2>Escolha a forma de pagamento:</h2>
      <Grid container spacing={2}>
        {arr.map((item) => (
          <Grid item xs={12} sm={6}>
            <strong>{item.category}</strong>
            <List>
              {item.methods.map((method) => (
                <ListItem onClick={() => handleMethodPayment('mastercard-debito')} selected={formaDePagamento === 'mastercard-debito'}>
                  <S.Icon src={method.icon} alt="logo da bandeira de cartão mastercard" />
                  <ListItemText primary={method.label} />
                </ListItem>
              ))}
            </List>
          </Grid>
        ))}
      </Grid>
    </div>
  );
}

export default FormularioPagamento;
