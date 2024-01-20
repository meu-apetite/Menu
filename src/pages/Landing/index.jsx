// src/App.js
import React from 'react';
import { Container, Typography, Button, Grid, Card, CardContent } from '@mui/material';
import { styled } from '@mui/system';

const CustomCard = styled(Card)({
  height: '100%',
  display: 'flex',
  flexDirection: 'column',
  boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
  transition: 'transform 0.2s',
  '&:hover': {
    transform: 'scale(1.05)',
  },
});

const CustomCardContent = styled(CardContent)({
  flex: 1,
  display: 'flex',
  flexDirection: 'column',
});

const App = () => {
  return (
    <Container sx={{ marginTop: 2 }}>
      <Typography variant="h4" component="h1" gutterBottom>
        iFood Clone
      </Typography>
      <Grid container spacing={3}>
        <Grid item xs={12} sm={6} md={4}>
          <CustomCard>
            <CustomCardContent>
              <Typography variant="h6" gutterBottom>
                Restaurante 1
              </Typography>
              <Typography variant="body2" color="text.secondary">
                Descrição do restaurante 1.
              </Typography>
              <Button variant="contained" color="primary">
                Ver Cardápio
              </Button>
            </CustomCardContent>
          </CustomCard>
        </Grid>
        <Grid item xs={12} sm={6} md={4}>
          <CustomCard>
            <CustomCardContent>
              <Typography variant="h6" gutterBottom>
                Restaurante 2
              </Typography>
              <Typography variant="body2" color="text.secondary">
                Descrição do restaurante 2.
              </Typography>
              <Button variant="contained" color="primary">
                Ver Cardápio
              </Button>
            </CustomCardContent>
          </CustomCard>
        </Grid>
        {/* Adicione mais cartões conforme necessário */}
      </Grid>
    </Container>
  );
};

export default App;
