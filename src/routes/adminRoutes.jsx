import Product from '../pages/Admin/Products/Index';
import ProductCreate from '../pages/Admin/Products/Create';
import ProductUpdate from '../pages/Admin/Products/Update';
import Category from '../pages/Admin/Categories/Index';
import CategoryCreate from '../pages/Admin/Categories/Create';
import CategoryUpdate from '../pages/Admin/Categories/Update';
import Orders from '../pages/Admin/Orders/Index';
import OrdersCreate from '../pages/Admin/Orders/Create';
import OrdersUpdate from '../pages/Admin/Orders/Update';
import OrdersView from '../pages/Admin/Orders/View';
import Appearance from '../pages/Admin/Appearance/Index';
import Setting from '../pages/Admin/Setting/Index';
import QrCode from '../pages/Admin/QrCode/Index';
import Home from '../pages/Admin/Home';
import Layout from '../components/Layout';

const adminRoutes = [
  {
    path: '/admin',
    element: <Layout />,
    children: [
      { path: 'products', element: <Product /> },
      { path: 'products/create', element: <ProductCreate /> },
      { path: 'products/update/:id', element: <ProductUpdate /> },
      { path: 'products/view', element: <ProductCreate /> },
      { path: 'categories', element: <Category /> },
      { path: 'categories/create', element: <CategoryCreate /> },
      { path: 'categories/update/:id', element: <CategoryUpdate /> },
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

export default adminRoutes;
