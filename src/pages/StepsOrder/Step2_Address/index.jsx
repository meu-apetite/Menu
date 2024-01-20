import toast from 'react-hot-toast';
import { useContext, useEffect, useState } from 'react';
import { CardMedia, CardContent, Typography, Card, Tabs, Tab, Button } from '@mui/material';
import { useNavigate, useParams } from 'react-router-dom';
import { StoreContext } from 'contexts/store';
import { ApiService } from 'services/api.service';
import iconMaps from 'assets/icons/maps.svg';
import FindAddress from 'components/FindAddress';
import * as S from './style';

export const PickupComponent = (props) => {
  return (
    <>
      <p>Ao chegar no ponto de retirada, gentilmente forneça seu nome juntamente com o código do pedido que será fornecido.</p>

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

      <br />

      <Button variant="text" color="secondary">Copiar endereço completo</Button>

      <Button variant="outlined" color="info">
        <a
          rel="noreferrer"
          href={`http://maps.google.com/?q=${props.address?.freeformAddress}`}
          target="_blank"
          style={{ textDecoration: 'none', color: 'inherit' }}
        >
          Abrir no google maps
        </a>
      </Button>
    </>
  );
};

export const DeliveryComponent = ({ address, toggleFindAddress }) => {
  return (
    <div>
      <Card sx={{ display: 'grid', gridTemplateColumns: '9fr 3fr', mt: 1.2 }}>
        <CardContent sx={{ flex: '1 0 auto' }}>
          <Typography variant="subtitle1" color="text.secondary">
            Cep:<strong>&#160;{`${address.zipCode}`}</strong> <br />
            Bairro:<strong>&#160;{`${address.district}`}</strong> <br />
            Endereço:
            <strong>
              &#160;{`${address.street.trim()}${address?.number ? ', Nº ' + address.number : ''}`}
            </strong>
          </Typography>

          {
            (address.deliveryOption === 'fixed' || address.deliveryOption === 'automatic') && (
              <Typography variant="subtitle1" color="text.secondary">
                Taxa de entrega:
                <strong>
                  &#160;
                  {address.price.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL', })}
                  /{Number(address?.distance).toFixed(2)} KM
                </strong>
              </Typography>
            )
          }
        </CardContent>
        <CardMedia image={iconMaps} alt="Icone mapa" />
      </Card>
      <S.WrapperButtons>
        <S.ButtonDefault variant="outlined" onClick={toggleFindAddress}>Mudar endereço</S.ButtonDefault>
      </S.WrapperButtons>
    </div>
  );
};

const Address = () => {
  const { storeUrl } = useParams();
  const navigate = useNavigate();
  const apiService = new ApiService(false);
  const { store: storeSaved, getBag, setLoading } = useContext(StoreContext);
  const [deliveryType, setDeliveryType] = useState('delivery'); //delivery | pickup
  const [address, setAddress] = useState(null);
  const [addressToken, setAddressToken] = useState(null);
  const [store, setStore] = useState({});
  const [openFindAddress, setOpenFindAddress] = useState(false);
  const [settings, setSettings] = useState({});

  const toggleFindAddress = () => setOpenFindAddress(!openFindAddress);

  const calculateFreight = async (data) => {
    if (!data?.street || !data?.district || !data?.city || !data.number) {
      toast.error(
        'Endereço incompleto, verique seu endereço. Caso o erro seja recorrente, entre em contato com nosso suporte',
        { position: 'top-center' }
      );
    }

    try {
      setLoading(true);
      const { data: response } = await apiService.post(
        '/store/calculateFreight', { address: data, companyId: store._id }
      );
      setAddress(response.address);
      setAddressToken(response.addressToken);
      toggleFindAddress();
    } catch (e) {
      toast.error(e.response.data?.message || 'Não foi possível recuperar as informações do endereço');
    } finally {
      setLoading(false);
    }
  };

  const next = async () => {
    if (deliveryType === 'delivery' && !addressToken) {
      toast.error('Adicione o seu endereço para continuar', { position: 'top-center' });
      return;
    }

    if (deliveryType === 'pickup' && !store.address.freeformAddress) {
      toast.error('Não foi possíver recuperar o endereço, tente novamente.', { position: 'top-center' });
      return;
    }

    const bag = await getBag(store.storeUrl);

    if (deliveryType === 'pickup') {
      localStorage.setItem(store.storeUrl, JSON.stringify({ ...bag, deliveryType }));
    }
    if (deliveryType === 'delivery') {
      localStorage.setItem(store.storeUrl, JSON.stringify({ ...bag, address, addressToken, deliveryType }));
    }

    navigate(`/${store.storeUrl}/checkout/pay`);
  };

  const changeDeliveryType = async (e, value) => setDeliveryType(value);

  useEffect(() => {
    if (!storeSaved?.storeUrl) navigate(`/${storeUrl}/checkout`);

    (async() => {
      const bag = await getBag(store.storeUrl);
      setAddress(bag?.address);
      setAddressToken(bag?.addressToken);
    })();

    setStore(storeSaved);
    setSettings(storeSaved.settingsDelivery);
  }, []);

  return (
    <div>
      <section style={{ marginBottom: 2 }}>
        <h2>Informações de endereço</h2>
        <Tabs value={deliveryType} onChange={changeDeliveryType}>
          {settings?.delivery && <Tab value="delivery" label="Entrega" />}
          {
            (settings?.allowStorePickup && store.address?.freeformAddress)
            && <Tab value="pickup" label="Retirada" />
          }
        </Tabs>

        {settings?.delivery && deliveryType === 'delivery' && (
          <div>
            {address ? (
              <DeliveryComponent address={address} toggleFindAddress={toggleFindAddress} />
            ) : (
              <>
                <p>Por favor, insira seu endereço corretamente para que possamos prosseguir com o seu pedido.</p>
                <S.WrapperButtons>
                  <S.ButtonDefault variant="outlined" onClick={toggleFindAddress}>
                    Adicionar endereço
                  </S.ButtonDefault>
                </S.WrapperButtons>
              </>
            )}
          </div>
        )}

        {(settings?.allowStorePickup && deliveryType === 'pickup' && store.address?.freeformAddress)
          ? <PickupComponent address={store.address} />
          : <></>
        }

        {
          ((addressToken && deliveryType === 'delivery') || (store.address?.freeformAddress && deliveryType === 'pickup'))
          && <S.ButtonNext variant="contained" onClick={next}>Continuar</S.ButtonNext>
        }
      </section>

      {openFindAddress && (
        <FindAddress
          closeModal={toggleFindAddress}
          getData={(data) => calculateFreight(data)}
        />
      )}
    </div>
  );
};

export default Address;
