import { Grid, List, ListItem, ListItemText } from '@mui/material';
import { useEffect, useState } from 'react';
import * as S from './style';

const PaymentMethods = ({ paymentOptions, getSelected }) => {
  const [paymentMethods, setPaymentMethods] = useState([]);
  const [methodCurrent, setMethodCurrent] = useState();

  useEffect(() => {
    console.log(paymentOptions)
    if (!paymentOptions || paymentOptions?.length < 1) return;

    const methodsParent = [];

    paymentOptions.forEach((item) => {
      const parent = item.parent;
      const objCorrespondente = methodsParent.find((obj) => obj.parent === parent);
      if (objCorrespondente) {
        objCorrespondente.options.push(item);
      } else {
        methodsParent.push({ parent: parent, options: [item] });
      }
    });

    console.log(methodsParent)

    setPaymentMethods(methodsParent);
  }, []);

  return (
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
                  src={method.image}
                  alt="logo da bandeira de cartão mastercard"
                />
                <ListItemText primary={method.title} />
              </ListItem>
            ))}
          </List>
        </Grid>
      ))}
    </Grid>
  );
};

export default PaymentMethods;