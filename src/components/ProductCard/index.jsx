import * as React from 'react';
import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';

/**
 * props: {
 *  product: {
 *    name: string,
 *    price: number
 *    description: string,
 *    image?: [] 
 *  }
 *}
*/

export default function ProductCard(props) {
  const product = props.product;
  const images = product?.images;

  console.log(images)

  return (
    <Card sx={{ display: 'flex', justifyContent: 'space-between', gap: 1}}>
      <Box sx={{ display: 'flex', flexDirection: 'column' }}>
        <CardContent sx={{ flex: '1 0 auto', pt: 0 }}>
          <Typography component="div" variant="h5" sx={{ fontSize: '1.4rem', fontWeight: 300 }}>
            {product.name}
          </Typography>
          <Typography variant="subtitle1" color="text.secondary" component="div">
            {product.description}
          </Typography>
        </CardContent>

        <CardContent  sx={{ pt: 0, pb: '0 !important' }}>
          <Typography component="span" variant="h6">
            {product.price.toLocaleString("pt-BR", { style: "currency", currency: "BRL" })}
          </Typography>
        </CardContent>
      </Box>

      <CardMedia 
        component="img" 
        sx={{ minWidth: 110, maxWidth: 110, height: 110, objectFit: 'cover' }} 
        image={images.length ? images[0].url : 1} 
        alt={`Image do produto: ${props.name}`}
      />
    </Card>
  );
}