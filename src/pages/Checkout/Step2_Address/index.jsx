import toast from 'react-hot-toast';
import { useContext, useEffect, useState } from 'react';
import { Tabs, Tab } from '@mui/material';
import { useNavigate, useParams } from 'react-router-dom';
import { GlobalContext } from 'contexts/global';
import { ApiService } from 'services/api.service';
import { ApplicationUtils } from 'utils/ApplicationUtils';
import FindAddress from 'components/FindAddress';
import DeliveryInformationCard from 'components/DeliveryInformationCard';
import DeliveryPickupCard from 'components/DeliveryPickupCard';
import ButtonFloat from 'components/ButtonFloat';


const Address = () => {
  const { storeUrl } = useParams();
  const navigate = useNavigate();
  const apiService = new ApiService(false);
  const { company, setLoading } = useContext(GlobalContext);
  const [deliveryType, setDeliveryType] = useState('delivery');
  const [address, setAddress] = useState(null);
  const [openFindAddress, setOpenFindAddress] = useState(false);
  const [cart, setCart] = useState({});
  const [settings, setSettings] = useState(null);

  const toggleFindAddress = () => setOpenFindAddress(!openFindAddress);

  const calculateFreight = async (data) => {
    if (!data?.street || !data?.district || !data?.city || !data?.number) {
      toast.error(
        'Endereço incompleto, verique seu endereço. Caso o erro seja recorrente, entre em contato com nosso suporte',
        { position: 'top-center' },
      );
    }

    try {
      setLoading(true);

      const { data: response } = await apiService.post('/calculateFreight', {
        address: data,
        companyId: company._id,
        cartId: cart._id,
      });

      setAddress(response.address);
      setCart(response);

      await ApplicationUtils.setDataInLocalStorage(storeUrl, response);

      toggleFindAddress();
    } catch (e) {
      toast.error(
        e.response.data?.message ||
        'Não foi possível recuperar as informações do endereço',
      );
    } finally {
      setLoading(false);
    }
  };

  const next = async () => {
    if (deliveryType === 'delivery' && !address) {
      toast.error('Adicione o seu endereço para continuar', {
        position: 'top-center',
      });
      return;
    }

    if (deliveryType === 'pickup' && !company.address.freeformAddress) {
      toast.error('Não foi possíver recuperar o endereço, tente novamente.', {
        position: 'top-center',
      });
      return;
    }

    await ApplicationUtils.setDataInLocalStorage(storeUrl, {
      ...cart,
      deliveryType,
    });

    navigate(`/${storeUrl}/checkout/pay`);
  };

  const changeDeliveryType = async (e, value) => setDeliveryType(value);

  useEffect(() => {
    (async () => {
      const cart = await ApplicationUtils.getCartInLocalStorage(storeUrl);
      setAddress(cart.address);
      setCart(cart);
    })();

    setSettings(company.settingsDelivery);
  }, []);

  return (
    <>
      {settings && (
        <section style={{ marginBottom: 2 }}>
          <h2>Informações de endereço</h2>

          <Tabs value={deliveryType} onChange={changeDeliveryType}>
            {settings.delivery && <Tab value="delivery" label="Entrega" />}
            {settings.allowStorePickup && <Tab value="pickup" label="Retirada" />}
          </Tabs>

          {
            settings.delivery && deliveryType === 'delivery' && (
              <DeliveryInformationCard
                address={address}
                findAddress={toggleFindAddress}
              />
            )
          }

          {
            settings.allowStorePickup
            && deliveryType === 'pickup'
            && company.address?.freeformAddress
            && <DeliveryPickupCard address={company.address} />
          }

          {address && deliveryType === 'delivery' && (
            <ButtonFloat onClick={next} text="Continuar" />
          )}

          {deliveryType === 'pickup' && (
            <ButtonFloat onClick={next} text="Continuar" />
          )}
        </section>
      )}

      {openFindAddress && (
        <FindAddress 
          closeModal={toggleFindAddress} 
          getData={calculateFreight}
        />
      )}
    </>
  );
};

export default Address;
