import Menu from 'pages/Menu';
import Bag from 'pages/Bag';
import Order from 'pages/Order';
import About from 'pages/About';
import Landing from 'pages/Landing';
import Address from 'pages/Bag/steps/Address';
import Payment from 'pages/Bag/steps/Payment';

const storeRoutes = [
  {
    path: '/',
    children: [
      { path: '', element: <Landing /> },
      { path: ':storeUrl/', element: <Menu /> },
      { path: ':storeUrl/about', element: <About /> },
      { path: ':storeUrl/pedido', element: <Bag /> },
      { path: ':storeUrl/pedido/endereco', element: <Address /> },
      { path: ':storeUrl/pedido/pagamento', element: <Payment /> },
      { path: ':storeUrl/meupedido/:orderId', element: <Order /> },
    ]
  }
];

export default storeRoutes;
