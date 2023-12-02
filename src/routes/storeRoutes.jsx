import Catalog from '../pages/Store/Catalog';
import BagShopping from '../pages/Store/BagShopping';
import Address from 'pages/Store/Address';
import Payment from 'pages/Store/Payment';
import Order from 'pages/Store/Order';

const storeRoutes = [
  {
    path: '/',
    children: [
      { path: 'cardapio/:storeUrl/', element: <Catalog /> },
      { path: 'cardapio/:storeUrl/pedido', element: <BagShopping /> },
      { path: 'cardapio/:storeUrl/pedido/endereco', element: <Address /> },
      { path: 'cardapio/:storeUrl/pedido/pagamento', element: <Payment /> },
      { path: 'cardapio/:storeUrl/meupedido/:orderId', element: <Order /> },
    ]
  },
];

export default storeRoutes;
