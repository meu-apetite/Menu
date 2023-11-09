import Catalog from '../pages/Store/Catalog';
import BagShopping from '../pages/Store/BagShopping';
import Address from 'pages/Store/Address';
import Payment from 'pages/Store/Payment';
import Order from 'pages/Store/Order';

const storeRoutes = [
  {
    path: '/',
    children: [
      { path: ':id/cardapio', element: <Catalog /> },
      { path: ':id/pedido', element: <BagShopping /> },
      { path: ':id/pedido/endereco', element: <Address /> },
      { path: ':id/pedido/pagamento', element: <Payment /> },
      { path: ':id/meupedido/:orderId', element: <Order /> },
    ]
  },
];

export default storeRoutes;
