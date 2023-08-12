import Catalog from '../pages/Store/Catalog';

const storeRoutes = [
  {
    path: '/',
    children: [{ path: 'cardapio', element: <Catalog /> }]
  },
];

export default storeRoutes;
