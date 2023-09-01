import Catalog from '../pages/Store/Catalog';
import BagShopping from '../pages/Store/BagShopping';

const storeRoutes = [
  {
    path: '/',
    children: [
      { path: ':id/cardapio', element: <Catalog /> },
      { path: ':id/pedido', element: <BagShopping /> },
    ]
  },
];

export default storeRoutes;
