import { useContext, useEffect, useState } from 'react';
import { CardMedia, CardContent, Typography, Card, Tabs, Tab, Container } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { StoreContext } from 'contexts/store';
import { AuthContext } from 'contexts/auth';
import { ApiService } from 'services/api.service';
import FindAddressClient from 'components/FindAddressClient';
import iconMaps from 'assets/icons/maps.svg';
import * as S from './style';

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
            Endereço:{' '}
            <strong>{` ${address.street.trim()}${address?.number ? ', Nº ' + address.number : ''
              }`}</strong>
          </Typography>
          <Typography variant="subtitle1" color="text.secondary">
            Taxa de entrega:
            <strong>
              &#160;
              {address?.price.toLocaleString('pt-BR', {
                style: 'currency',
                currency: 'BRL',
              })}
              /{Number(address?.distance).toFixed(2)} KM
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

  const { store: storeSaved, getBag } = useContext(StoreContext);
  const { setLoading, toast } = useContext(AuthContext);

  const [deliveryType, setDeliveryType] = useState('delivery'); //delivery | pickup
  const [address, setAddress] = useState(null);
  const [addressToken, setAddressToken] = useState(null);
  const [store, setStore] = useState({});
  const [openFindAddress, setOpenFindAddress] = useState(false);
  const [settings, setSettings] = useState({});

  const toggleFindAddress = () => setOpenFindAddress(!openFindAddress);

  const calculateFreight = async (data) => {
    try {
      setLoading(true);
      const { data: response } = await apiService.post('/store/calculateFreight', { address: data, companyId: store._id  });
      setAddress(response.address);
      setAddressToken(response.addressToken);
      toggleFindAddress();
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  const next = async () => {
    if (!address && deliveryType === 'delivery') {
      return toast.error('Adicione o seu endereço para continuar', {
        position: 'top-center',
      });
    }

    const bag = localStorage.getItem(`bag_${store._id}`);

    if (deliveryType === 'pickup') {
      const newBag = { ...JSON.parse(bag), deliveryType: 'pickup' };
      localStorage.setItem(`bag_${store._id}`, JSON.stringify(newBag));
    } else if (deliveryType === 'delivery') {
      const newBag = { ...JSON.parse(bag), deliveryType: 'delivery', addressToken };
      localStorage.setItem(`bag_${store._id}`, JSON.stringify(newBag));
    }
    navigate(`/${store._id}/pedido/pagamento`);
  };

  const changeDeliveryType = async (e, value) => setDeliveryType(value);

  useEffect(() => {
    if (!storeSaved?._id) {
      navigate(`/${window.location.href.split('/').reverse()[2]}/pedido`);
    }
    setStore(storeSaved);
    setSettings(storeSaved.settingsDelivery)
  }, []);

  return (
    <div>
      <S.Header>
        <S.Logo src={store?.custom?.logo?.url} alt={`Logomarca de ${store.name}`} />
      </S.Header>

      <Container maxWidth="md">
        <section style={{ marginBottom: 2 }}>
          <S.Title>Informações de endereço</S.Title>
          <Tabs value={deliveryType} onChange={changeDeliveryType}>
            {settings?.delivery && <Tab value="delivery" label="Entrega" />}
            {settings?.allowStorePickup && <Tab value="pickup" label="Retirada" />}
          </Tabs>

          {settings?.delivery && deliveryType === 'delivery' && (
            <div>
              {address ? (
                <DeliveryComponent address={address} />
              ) : (
                <>
                  <p>
                    Por favor, insira seu endereço corretamente para que
                    possamos prosseguir com o seu pedido.
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

          {(settings?.allowStorePickup && deliveryType === 'pickup') 
            ? <PickupComponent address={store.address} />
            : <></>
          }

          {(address?.price || deliveryType === 'pickup') && (
            <S.ButtonNext variant="contained" onClick={next}>Continuar</S.ButtonNext>
          )}
        </section>
      </Container>

      {openFindAddress && (
        <FindAddressClient
          closeModal={toggleFindAddress}
          getAddress={(data) => calculateFreight(data)}
        />
      )}
    </div>
  );
};

export default Address;
