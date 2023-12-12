import Menu from '../pages/Store/Menu';
import BagShopping from '../pages/Store/BagShopping';
import Address from 'pages/Store/Address';
import Payment from 'pages/Store/Payment';
import Order from 'pages/Store/Order';
import About from 'pages/Store/About';

const storeRoutes = [
  {
    path: '/',
    children: [
      { path: 'cardapio/:storeUrl/', element: <Menu /> },
      { path: 'cardapio/:storeUrl/about', element: <About /> },
      { path: 'cardapio/:storeUrl/pedido', element: <BagShopping /> },
      { path: 'cardapio/:storeUrl/pedido/endereco', element: <Address /> },
      { path: 'cardapio/:storeUrl/pedido/pagamento', element: <Payment /> },
      { path: 'cardapio/:storeUrl/meupedido/:orderId', element: <Order /> },
    ]
  },
];

export default storeRoutes;
