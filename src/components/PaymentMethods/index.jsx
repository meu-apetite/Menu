import { Grid, List, ListItem, ListItemText } from '@mui/material';
import { useEffect, useState } from 'react';
import iconDinheiro from 'assets/icons/dinheiro.png';
import iconElo from 'assets/icons/elo.webp';
import iconMastercard from 'assets/icons/mastercard.webp';
import iconVisa from 'assets/icons/visa.webp';
import iconHipercard from 'assets/icons/hipercard.png';
import iconNugo from 'assets/icons/nugo.avif';
import iconAmex from 'assets/icons/amex.png';
import iconSodexo from 'assets/icons/sodexo.png';
import iconVr from 'assets/icons/vr.avif';
import iconTicket from 'assets/icons/ticket.png';
import * as S from './style';

const PaymentMethods = ({ paymentOptions, getSelected }) => {
  const [paymentMethods, setPaymentMethods] = useState([]);
  const [methodCurrent, setMethodCurrent] = useState();

  useEffect(() => {
    if (!paymentOptions || paymentOptions?.length < 1) return;

    const methods = [];
    const methodsParent = [];

    paymentOptions.forEach((item) => {
      if (item.id.indexOf('elo') >= 0) {
        return methods.push({ ...item, icon: iconElo });
      } else if (item.id.indexOf('dinheiro') >= 0) {
        return methods.push({ ...item, icon: iconDinheiro });
      } else if (item.id.indexOf('mastercard') >= 0) {
        return methods.push({ ...item, icon: iconMastercard });
      } else if (item.id.indexOf('hipercard') >= 0) {
        return methods.push({ ...item, icon: iconHipercard });
      } else if (item.id.indexOf('visa') >= 0) {
        return methods.push({ ...item, icon: iconVisa });
      } else if (item.id.indexOf('amex') >= 0) {
        return methods.push({ ...item, icon: iconAmex });
      } else if (item.id.indexOf('nugo') >= 0) {
        return methods.push({ ...item, icon: iconNugo });
      } else if (item.id.indexOf('sodexo') >= 0) {
        return methods.push({ ...item, icon: iconSodexo });
      } else if (item.id.indexOf('vr') >= 0) {
        return methods.push({ ...item, icon: iconVr });
      } else if (item.id.indexOf('ticket') >= 0) {
        return methods.push({ ...item, icon: iconTicket });
      } else {
        return methods.push({ ...item, icon: iconNugo });
      }
    });

    methods.forEach((item) => {
      const parent = item.parent;
      const objCorrespondente = methodsParent.find(
        (obj) => obj.parent === parent,
      );
      if (objCorrespondente) {
        objCorrespondente.options.push(item);
      } else {
        methodsParent.push({ parent: parent, options: [item] });
      }
    });

    setPaymentMethods(methodsParent);
  }, []);

  return (
    <div>
      <h4>Escolha a forma de pagamdento:</h4>
      <Grid container spacing={2}>
        {paymentMethods?.map((item, i) => (
          <Grid item xs={12} sm={6} key={i}>
            <strong>{item.parent}</strong>
            <List>
              {item.options.map((method) => (
                <ListItem
                  key={method.id}
                  sx={{ display: 'flex', alignItems: 'center' }}
                >
                  <input
                    style={{ margin: '0 1rem 0 0' }}
                    type="radio"
                    checked={methodCurrent === method.id}
                    onChange={() => {
                      setMethodCurrent(method.id);
                      getSelected(method);
                    }}
                  />
                  <S.Icon
                    src={method?.icon}
                    alt="logo da bandeira de cartão mastercard"
                  />
                  <ListItemText primary={method.title} />
                </ListItem>
              ))}
            </List>
          </Grid>
        ))}
      </Grid>
    </div>
  );
};

export default PaymentMethods;