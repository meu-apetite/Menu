import ProductCreate from '../pages/ControlPanel/Products/Create';
import Product from '../pages/ControlPanel/Products/Index';
import Category from '../pages/ControlPanel/Categories/Index';
import CategoryCreate from '../pages/ControlPanel/Categories/Create';
import CategoryUpdate from '../pages/ControlPanel/Categories/Update';
import Orders from '../pages/ControlPanel/Orders/Index';
import OrdersCreate from '../pages/ControlPanel/Orders/Create';
import OrdersUpdate from '../pages/ControlPanel/Orders/Update';
import OrdersView from '../pages/ControlPanel/Orders/View';
import Appearance from '../pages/ControlPanel/Appearance/Index';
import Setting from '../pages/ControlPanel/Setting/Index';
import QrCode from '../pages/ControlPanel/QrCode/Index';
import Home from '../pages/ControlPanel/Home';
import Layout from '../components/Layout';

const controlPanelRoutes = [
  {
    path: '/admin',
    element: <Layout />,
    children: [
      { path: 'product', element: <Product /> },
      { path: 'product/create', element: <ProductCreate /> },
      { path: 'product/update', element: <ProductCreate /> },
      { path: 'product/view', element: <ProductCreate /> },
      { path: 'categories', element: <Category /> },
      { path: 'categories/create', element: <CategoryCreate /> },
      { path: 'categories/update', element: <CategoryUpdate /> },
      { path: 'orders', element: <Orders /> },
      { path: 'orders/create', element: <OrdersCreate /> },
      { path: 'orders/update', element: <OrdersUpdate /> },
      { path: 'orders/view', element: <OrdersView /> },
      { path: 'appearance', element: <Appearance /> },
      { path: 'setting', element: <Setting /> },
      { path: 'qr-code', element: <QrCode /> },
      { path: '', element: <Home /> },
    ],
  },
];

export default controlPanelRoutes;
