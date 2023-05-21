import ProductCreate from '../pages/admin/products/create'
import Product from '../pages/admin/products'

import Orders from '../pages/admin/orders'
import OrdersCreate from '../pages/admin/orders/Create'
import OrdersUpdate from '../pages/admin/orders/Update'
import OrdersView from '../pages/admin/orders/View'

import Home from 'pages/admin/home';
import Appearance from 'pages/admin/appearance';


const routes = [
  { path: 'products/', element: <Product /> },
  { path: 'products/create/', element: <ProductCreate /> },
  { path: 'products/update/', element: <ProductCreate /> },
  { path: 'products/view/', element: <ProductCreate /> },

  { path: 'orders/', element: <Orders /> },
  { path: 'orders/create/', element: <OrdersCreate /> },
  { path: 'orders/update/', element: <OrdersUpdate /> },
  { path: 'orders/view/', element: <OrdersView /> },

  { path: 'appearance/', element: <Appearance /> },

  { path: '', element: <Home /> },
]

export default routes
