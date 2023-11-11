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
import Chart from 'chart.js/auto';
import { Bar, Line, Pie } from 'react-chartjs-2';

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
    <section>
      {/* <QRCode
        size={200}
        style={{ height: 'auto', maxWidth: '500px', width: '20%' }}
        value={'http://192.168.0.135:3000/644d03bb1169fea569ff4348/cardapio'}
        viewBox={`0 0 256 256`}
      /> */}

      <CardContent sx={{ display: 'grid', gridTemplateColumns: '50% 50%', maxWidth: '100%' }}>
        <div>
          <h2>Pedidos</h2>
          <Bar data={barChartData} options={barChartOptions} />
        </div>
        <div>
          <h2>Visualizações</h2>
          <Line data={lineChartData} />
        </div>
        <div>
          <h2>Pie Chart</h2>
          <Pie data={pieChartData} />
        </div>
      </CardContent>



    </section>
  );
}
