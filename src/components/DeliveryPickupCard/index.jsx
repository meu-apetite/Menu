
import { CardMedia, CardContent, Typography, Card, Button } from '@mui/material';
import iconMaps from 'assets/icons/maps.svg';

const DeliveryPickupCard = (props) => {
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

export default DeliveryPickupCard;