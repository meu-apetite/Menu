import { Routes, Route } from 'react-router-dom';
import { AuthProvider } from 'contexts/auth';

import Login from './pages/auth/login';
import Register from './pages/auth/register';

import ProductCreate from './pages/admin/product/create';
import Product from './pages/admin/product';

import CategoryCreate from 'pages/admin/categories/create';
import CategoryUpdate from 'pages/admin/categories/update';
import Category from 'pages/admin/categories';

import Orders from './pages/admin/orders';
import OrdersCreate from './pages/admin/orders/Create';
import OrdersUpdate from './pages/admin/orders/Update';
import OrdersView from './pages/admin/orders/View';
import Appearance from './pages/admin/appearance/index';
import Home from './pages/admin/home';
import Layout from './components/Layout';
import Setting from 'pages/admin/setting';
import QrCode from 'pages/admin/qr-code';
import Store from 'pages/store';

export default function App() {
  return (
    <AuthProvider>
      <Routes>
        <Route path="/">
          <Route path="login" element={<Login />} />
          <Route path="register" element={<Register />} />
          <Route path="store" element={<Store />} />
        </Route>

        <Route path="/admin" element={<Layout />}>
          <Route path="product" element={<Product />} />
          <Route path="product/create" element={<ProductCreate />} />
          <Route path="product/update" element={<ProductCreate />} />
          <Route path="product/view" element={<ProductCreate />} />

          <Route path="categories" element={<Category />} />
          <Route path="categories/create" element={<CategoryCreate />} />
          <Route path="categories/update" element={<CategoryUpdate />} />

          <Route path="orders" element={<Orders />} />
          <Route path="orders/create" element={<OrdersCreate />} />
          <Route path="orders/update" element={<OrdersUpdate />} />
          <Route path="orders/view" element={<OrdersView />} />

          <Route path="appearance" element={<Appearance />} />
          <Route path="setting" element={<Setting />} />
          <Route path="qr-code" element={<QrCode />} />
          <Route path="" element={<Home />} />
        </Route>
      </Routes>
    </AuthProvider>
  );
}
