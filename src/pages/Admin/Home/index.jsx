import * as React from 'react';
import { styled } from '@mui/material/styles';
import Card from '@mui/material/Card';
import CardHeader from '@mui/material/CardHeader';
import CardContent from '@mui/material/CardContent';
import CardActions from '@mui/material/CardActions';
import Avatar from '@mui/material/Avatar';
import IconButton from '@mui/material/IconButton';
import FavoriteIcon from '@mui/icons-material/Favorite';
import ShareIcon from '@mui/icons-material/Share';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import QRCode from 'react-qr-code';
import { Bar, Line, Pie } from 'react-chartjs-2';
import Chart from 'chart.js/auto';
import * as S from './style';

const StyledCard = styled(Card)({
  maxWidth: '100%',
  marginBottom: '20px',
});

const ChartContainer = styled('div')({
  width: '100%',
});

export default function Home() {
  const [expanded, setExpanded] = React.useState(false);

  // Fictitious data for the charts
  const barChartData = {
    labels: ['January', 'February', 'March', 'April', 'May'],
    datasets: [
      {
        label: 'Monthly Sales',
        data: [12, 19, 3, 5, 2],
        backgroundColor: 'rgba(75, 192, 192, 0.2)',
        borderColor: 'rgba(75, 192, 192, 1)',
        borderWidth: 1,
      },
    ],
  };

  // Add scales property for backward compatibility
  const barChartOptions = {
    scales: {
      x: {
        type: 'category',
      },
      y: {
        beginAtZero: true,
      },
    },
  };

  const lineChartData = {
    labels: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday'],
    datasets: [
      {
        label: 'Daily Visitors',
        data: [30, 25, 45, 32, 50],
        fill: false,
        borderColor: 'rgba(255, 99, 132, 1)',
      },
    ],
  };

  const pieChartData = {
    labels: ['Red', 'Blue', 'Yellow', 'Green', 'Purple', 'Orange'],
    datasets: [
      {
        data: [12, 19, 3, 5, 2, 3],
        backgroundColor: [
          '#FF6384',
          '#36A2EB',
          '#FFCE56',
          '#4CAF50',
          '#9C27B0',
          '#FF9800',
        ],
      },
    ],
  };

  return (
    <div>
      <S.SectionChart>
        <StyledCard>
          <CardHeader title="Pedidos" />
          <CardContent>
            <ChartContainer sx={{ width: '100%' }}>
              <Bar data={barChartData} options={barChartOptions} />
            </ChartContainer>
          </CardContent>
        </StyledCard>

        <StyledCard>
          <CardHeader title="Visualizações" />
          <CardContent>
            <ChartContainer sx={{ width: '100%' }}>
              <Line data={lineChartData} />
            </ChartContainer>
          </CardContent>
        </StyledCard>

        <StyledCard>
          <CardHeader title="Pie Chart" />
          <CardContent>
            <ChartContainer sx={{ width: '100%' }}>
              <Pie data={pieChartData} />
            </ChartContainer>
          </CardContent>
        </StyledCard>
      </S.SectionChart>
    </div>
  );
}
