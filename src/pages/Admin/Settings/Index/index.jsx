import { useState, useEffect, useContext, forwardRef } from 'react';
import { Box, Button, FormControlLabel, Grid, Switch, Tab, Tabs, TextField } from '@mui/material';
import { AuthContext } from 'contexts/auth';
import { ApiService } from 'services/api.service';
import Header from 'components/Header';
import * as S from './style';
import { NumericFormat } from 'react-number-format';
import HorarioFuncionamento from '../HorarioFuncionamento';

const NumericFormatCustom = forwardRef((props, ref) => {
  const { onChange, ...other } = props;

  return (
    <NumericFormat
      {...other}
      getInputRef={ref}
      onValueChange={(values) => {
        onChange({ target: { name: props.name, value: values.value } });
      }}
      thousandSeparator
      valueIsNumericString
      prefix="R$"
    />
  );
});

// NumericFormatCustom.propTypes = {
//   name: PropTypes.string.isRequired,
//   onChange: PropTypes.func.isRequired,
// };
const Settings = () => {
  const apiService = new ApiService();
  const { setLoading, toast } = useContext(AuthContext);

  const [listPaymentMethods, setListPaymentMethods] = useState([]);
  const [paymentsmethods, setPaymentsmethods] = useState([]);
  const [tabValue, setTabValue] = useState('delivery');
  const [hasUpdate, setHasUpdate] = useState(false);
  const [dataMecardoPago, setDataMercardoPago] = useState({
    accessToken: '',
    publicKey: '',
  });
  const [values, setValues] = useState({
    minValue: 0
  });


  const handleChange = (event) => {
    setValues({
      ...values,
      [event.target.name]: event.target.value,
    });
  };

  const maskFormat = (text) => {
    const number = parseInt(text.replace(/\D/g, ''), 10);
    console.log((number  / 100).toFixed(2) )
    return (number / 100).toFixed(2) 
  }

  return (
    <section>
      <Header title="Configurações" back={-1} />

      <Tabs value={tabValue} onChange={(e, v) => setTabValue(v)}>
        <Tab value="orderTime" label="Horário de pedido" />
        <Tab value="delivery" label="Delivery" />
      </Tabs>

      {tabValue === 'delivery' && (
        <S.Wrapper>
          <S.Title>
            A responsabilidade pela entrega é sua. Disponibilizamos
            o cálculo de frete online para simplificar o processo,
            sendo você responsável pelo envio.
          </S.Title> <br /> <br />

            <FormControlLabel
              sx={{ my: 0.5, display: 'block' }}
              control={
                <Switch
                  checked={true}
                // onChange={() => toggleItem(index, m.id)}
                />
              }
              label="Opção de retirada"
            />

            <FormControlLabel
              sx={{ my: 0.5, display: 'block' }}
              control={
                <Switch
                  checked={true}
                // onChange={() => toggleItem(index, m.id)}
                />
              }
              label="Opção de entrega"
            />

            <FormControlLabel
              sx={{ my: 0.5, display: 'block' }}
              control={
                <Switch
                  checked={true}
                // onChange={() => toggleItem(index, m.id)}
                />
              }
              label="Calcular taxa de entrega"
            />

            <Grid container spacing={2}>
              <Grid item xs={12} sm={4}>
                <Grid>
                  <label>Taxa mínima de entrega</label>
                </Grid>
                <TextField
                  value={values.minValue}
                  onChange={e => setValues({ ...values, minValue: maskFormat(e.target.value) })}
                  fullWidth={true}
                />
              </Grid>

              <Grid item xs={12} sm={4}>
                <Grid>
                  <label>Taxa por KM</label>
                </Grid>
                <TextField
                  value={values.minValue}
                  onChange={e => setValues({ ...values, minValue: maskFormat(e.target.value) })}
                  fullWidth={true}
                />
              </Grid>
            </Grid>


          <S.WrapperButtonSaved>
            <Button
              variant="contained"
              disabled={!hasUpdate}
            // onClick={savePayment}
            >
              Salvar
            </Button>
          </S.WrapperButtonSaved>
        </S.Wrapper>
      )}

      {tabValue === 'orderTime' && (
        <S.Wrapper>
          <S.Title>Este é o horário durante o qual sua loja estará disponível para receber pedidos.</S.Title>{' '}
          <br />
          <HorarioFuncionamento />
        </S.Wrapper>
      )}
    </section>
  );
};

export default Settings;
