import { Routes, Route } from 'react-router-dom'
import { AuthProvider } from 'contexts/auth'

import Login from './pages/auth/login'
import Register from './pages/auth/register'

import ProductCreate from './pages/admin/products/create'
import Product from './pages/admin/products'

import CategoriesCreate from 'pages/admin/categories/Create'
import Categories from 'pages/admin/categories'

import Orders from './pages/admin/orders'
import OrdersCreate from './pages/admin/orders/Create'
import OrdersUpdate from './pages/admin/orders/Update'
import OrdersView from './pages/admin/orders/View'
import Appearance from './pages/admin/appearance/index'
import Home from './pages/admin/home'
import Layout from './components/Layout'

export default function App() {
  return (
    <AuthProvider>
      <Routes>
        <Route path="/">
          <Route path="login" element={<Login />} />
          <Route path="register" element={<Register />} />
        </Route>

        <Route path="/admin/" element={<Layout />}>
          <Route path="products" element={<Product />} />
          <Route path="products/create" element={<ProductCreate />} />
          <Route path="products/update" element={<ProductCreate />} />
          <Route path="products/view" element={<ProductCreate />} />

          <Route path="categories" element={<Categories />} />
          <Route path="categories/create" element={<CategoriesCreate />} />

          <Route path="orders" element={<Orders />} />
          <Route path="orders/create" element={<OrdersCreate />} />
          <Route path="orders/update" element={<OrdersUpdate />} />
          <Route path="orders/view" element={<OrdersView />} />
          <Route path="appearance" element={<Appearance />} />
          <Route path="" element={<Home />} />
        </Route>
      </Routes>
    </AuthProvider>
  )
}
