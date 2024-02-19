import { CardMedia, CardContent, Typography, Card } from '@mui/material';
import iconMaps from 'assets/icons/maps.svg';
import * as S from './style'; 

const DeliveryInformationCard = ({ address, findAddress }) => {
  return (
    <>
      {address ? (
        <div>
          <Card sx={{ display: 'grid', gridTemplateColumns: '9fr 3fr', mt: 1.2 }}>
            <CardContent sx={{ flex: '1 0 auto' }}>
              <Typography variant="subtitle1" color="text.secondary">
                Cep:<strong>&#160;{`${address.zipCode}`}</strong> <br />
                Bairro:<strong>&#160;{`${address.district}`}</strong> <br />
                Endereço:
                <strong>
                  &#160;
                  {`${address.street.trim()}${address?.number ? ', Nº ' + address.number : ''}`}
                </strong>
              </Typography>

              {(address.deliveryOption === 'fixed' || address.deliveryOption === 'automatic') && (
                <Typography variant="subtitle1" color="text.secondary">
                  Taxa de entrega:
                  <strong>
                    &#160;
                    {address.price.toLocaleString('pt-BR', {
                      style: 'currency',
                      currency: 'BRL',
                    })}
                    /{Number(address?.distance).toFixed(2)} KM
                  </strong>
                </Typography>
              )}
            </CardContent>
            <CardMedia image={iconMaps} alt="Icone mapa" />
          </Card>

          <S.WrapperButtons>
            <S.ButtonDefault variant="outlined" onClick={findAddress}>
              Mudar endereço
            </S.ButtonDefault>
          </S.WrapperButtons>
        </div>
      ) : (
        <div>
          <p>
            Por favor, insira seu endereço corretamente para que possamos prosseguir com o seu pedido.
          </p>
          <S.WrapperButtons>
            <S.ButtonDefault variant="outlined" onClick={findAddress}>
              Adicionar endereço
            </S.ButtonDefault>
          </S.WrapperButtons>
        </div>
      )}
    </>
  );
};

export default DeliveryInformationCard;
