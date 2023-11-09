import { useContext, useEffect, useState } from 'react';
import { CardMedia, CardContent, Typography, Card, Tabs, Tab, Container } from '@mui/material';
import { StoreContext } from 'contexts/store';
import { AuthContext } from 'contexts/auth';
import { ApiService } from 'services/api.service';
import FindAddressClient from 'components/FindAddressClient';
import iconMaps from 'assets/icons/maps.svg';
import * as S from './style';
import { useNavigate } from 'react-router-dom';

export const PickupComponent = (props) => {
  return (
    <Card sx={{ display: 'grid', gridTemplateColumns: '9fr 3fr', mt: 1.2 }}>
      <CardContent sx={{ flex: '1 0 auto' }}>
        <Typography variant="subtitle1" color="text.secondary">
          Cep: {`${props?.address?.zipCode || ''}`}
        </Typography>
        <Typography variant="subtitle1" color="text.secondary">
          Endereço:{' '}
          {`${props?.address?.street || ''}, ${props?.address?.district || ''}`}
        </Typography>
        <Typography variant="subtitle1" color="text.secondary">
          Nº {`${props?.address?.number || '-'}`}
        </Typography>
      </CardContent>
      <CardMedia image={iconMaps} alt="Icone mapa" />
    </Card>
  );
};

export const DeliveryComponent = ({ address, onChangeAddress }) => {
  return (
    <div>
      <Card sx={{ display: 'grid', gridTemplateColumns: '9fr 3fr', mt: 1.2 }}>
        <CardContent sx={{ flex: '1 0 auto' }}>
          <Typography variant="subtitle1" color="text.secondary">
            Cep:<strong>&#160;{`${address.zipCode}`}</strong> <br />
            Bairro:<strong>&#160;{`${address.district}`}</strong> <br />
            Endereço:
            <strong>
              {
                ` ${address.street.trim()}${address?.number ? ', Nº ' + address.number : ''}`
              }
            </strong>
          </Typography>
          <Typography variant="subtitle1" color="text.secondary">
            Taxa de entrega:
            <strong>
              &#160;
              {
                address?.price.toLocaleString('pt-BR', {
                  style: 'currency', currency: 'BRL'
                })
              } /
              {Number(address?.distance).toFixed(2)} KM
            </strong>
          </Typography>
        </CardContent>
        <CardMedia image={iconMaps} alt="Icone mapa" />
      </Card>
      <S.WrapperButtons>
        <S.ButtonDefault variant="outlined" onClick={onChangeAddress}>
          Mudar endereço
        </S.ButtonDefault>
      </S.WrapperButtons>
    </div>
  );
};

const Address = () => {
  const navigate = useNavigate();
  const apiService = new ApiService(false);

  const { company, getBag } = useContext(StoreContext);
  const { setLoading, toast } = useContext(AuthContext);

  const [deliveryType, setDeliveryType] = useState('delivery'); //delivery | pickup
  const [address, setAddress] = useState(null);
  const [addressToken, setAddressToken] = useState(null);
  const [store, setStore] = useState({});
  const [openFindAddress, setOpenFindAddress] = useState(false);

  const toggleFindAddress = () => setOpenFindAddress(!openFindAddress);

  const calculateFreight = async (data) => {
    try {
      setLoading(true);
      const { data: response } = await apiService.post('/store/calculateFreight', { address: data });
      setAddress(response.address);
      setAddressToken(response.addressToken)
      toggleFindAddress();
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  const next = async () => {
    if (!address && deliveryType === 'delivery')
    return toast.error('Adicione o seu endereço para continuar', {
      position: 'top-center',
    })

    const bag = await localStorage.getItem('bag');

    if (deliveryType === 'pickup') {
      const newBag = { ...JSON.parse(bag), deliveryType: 'pickup' };
      await localStorage.setItem('bag', JSON.stringify(newBag));
    } else if (deliveryType === 'delivery') {
      const newBag = { ...JSON.parse(bag), deliveryType: 'delivery', addressToken };
      await localStorage.setItem('bag', JSON.stringify(newBag));
    }
    navigate(`/${store._id}/pedido/pagamento`);
  };

  const changeDeliveryType = async (e, value) => setDeliveryType(value);

  useEffect(() => {
    if (!company?._id) {
      navigate(`/${window.location.href.split('/').reverse()[2]}/pedido`);
    }
    setStore(company);
  }, []);

  return (
    <div>
      <S.Header>
        <S.Logo src={store?.custom?.logo?.url} alt={`Logomarca de ${store?.name}`} />
      </S.Header>

      <Container maxWidth="md">
        <section style={{ marginBottom: 2 }}>
          <S.Title>Informações de endereço</S.Title>
          <Tabs
            value={deliveryType}
            onChange={changeDeliveryType}
            aria-label="Opções de entrega"
          >
            <Tab value="delivery" label="Entrega" />
            <Tab value="pickup" label="Retirada" />
          </Tabs>

          {deliveryType === 'delivery' && (
            <div>
              {address ? (
                <DeliveryComponent
                  address={address}
                // delivery={order.delivery}
                // onChangeAddress={() => setAddressOpen(!addressOpen)}
                />
              ) : (
                <>
                  <p>
                    Por favor, insira seu endereço corretamente
                    para que possamos prosseguir com o seu pedido.
                  </p>
                  <S.WrapperButtons>
                    <S.ButtonDefault variant="outlined" onClick={toggleFindAddress}>
                      Adicionar endereço
                    </S.ButtonDefault>
                  </S.WrapperButtons>
                </>
              )}
            </div>
          )}

          {deliveryType === 'pickup' && <PickupComponent address={store.address} />}

          {
            (address?.price || deliveryType === 'pickup') &&
            <S.ButtonNext variant="contained" onClick={next}>
              Continuar
            </S.ButtonNext>
          }
        </section>
      </Container>

      {openFindAddress &&
        <FindAddressClient
          closeModal={toggleFindAddress}
          getAddress={(data) => calculateFreight(data)}
        />
      }
    </div>
  );
};

export default Address;
