import { styled } from '@mui/material/styles';
import Card from '@mui/material/Card';
import CardHeader from '@mui/material/CardHeader';
import CardContent from '@mui/material/CardContent';
import QRCode from 'react-qr-code';
import { Bar } from 'react-chartjs-2';
import Chart from 'chart.js/auto';
import * as S from './style';
import { ApiService } from 'services/api.service';
import { useEffect, useState } from 'react';
import { Box, CardMedia, Typography } from '@mui/material';

const StyledCard = styled(Card)({ maxWidth: '100%', marginBottom: '20px' });
const ChartContainer = styled('div')({ width: '100%' });

export default function Home() {
  const apiService = new ApiService();

  const [barChartData, setBarChartData] = useState(null);

  const getOrders = async () => {
    try {
      const { data } = await apiService.get('/admin/orders-all');

      const ordersByDate = data.reduce((acc, order) => {
        const dateWithoutTime = new Date(order.date).toLocaleDateString();
        acc[dateWithoutTime] = (acc[dateWithoutTime] || 0) + order.products.length;
        return acc;
      }, {});
      const dates = Object.keys(ordersByDate);
      const quantities = Object.values(ordersByDate);

      setBarChartData({
        labels: dates,
        datasets: [
          {
            label: 'Quantidade de Pedidos',
            backgroundColor: 'rgba(75,192,192,0.4)',
            borderColor: 'rgba(75,192,192,1)',
            borderWidth: 1,
            hoverBackgroundColor: 'rgba(75,192,192,0.6)',
            hoverBorderColor: 'rgba(75,192,192,1)',
            data: quantities,
          },
        ],
      });

      console.log({
        labels: dates,
        datasets: [
          {
            label: 'Quantidade de Pedidos',
            backgroundColor: 'rgba(75,192,192,0.4)',
            borderColor: 'rgba(75,192,192,1)',
            borderWidth: 1,
            hoverBackgroundColor: 'rgba(75,192,192,0.6)',
            hoverBorderColor: 'rgba(75,192,192,1)',
            data: quantities,
          },
        ],
      });
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getOrders();
  }, []);


  return (
    <div>
      <Card sx={{ display: 'flex', gap: 2, mb: 4 }}>
        <Box sx={{ display: 'flex', flexDirection: 'column', }}>
          <CardContent sx={{ flex: '1 0 auto' }}>
            <Typography component="div" variant="h5">Bem-vindo(a)!</Typography>
            <Typography variant="subtitle1" color="text.secondary" component="div">
              Este é o seu painel administrativo. Aqui, você pode adicionar e excluir
              produtos, gerenciar categorias e ajustar as configurações e aparência
              do seu cardápio.
            </Typography>
          </CardContent>

        </Box>

        <CardMedia
          component="img"
          sx={{ width: 151 }}
          image="/static/images/cards/live-from-space.jpg"
          alt="Live from space album cover"
        />
      </Card>

      <S.SectionChart>
        <StyledCard>
          <CardHeader title="Pedidos" />
          <CardContent>
            <ChartContainer sx={{ width: '100%' }}>
              {
                (barChartData !== null) && <Bar
                  data={barChartData}
                  options={{
                    scales: { x: { type: 'category' }, y: { beginAtZero: true, } },
                  }}
                />
              }
            </ChartContainer>
          </CardContent>
        </StyledCard>

      </S.SectionChart>
    </div>
  );
}
