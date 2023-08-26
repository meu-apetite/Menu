import Catalog from '../pages/Store/Catalog';
import BagShopping from '../pages/Store/BagShopping';

const storeRoutes = [
  {
    path: '/',
    children: [
      { path: 'cardapio', element: <Catalog /> },
      { path: 'pedido', element: <BagShopping /> },
    ]
  },
];

export default storeRoutes;
