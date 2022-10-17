import * as React from 'react'
import { Routes, Route, Link } from 'react-router-dom'
import {AuthProvider} from 'contexts/auth'
import Login from './pages/login'
import Register from './pages/register'

//Admin
import Home from './pages/admin/home'
import ProductCreate from './pages/admin/products/Create'
import Product from './pages/admin/products'

import Categories from './pages/admin/categories'
import CategoriesCreate from './pages/admin/categories/Create'
import CategoriesUpdate from './pages/admin/categories/Update'
import CategoriesView from './pages/admin/categories/View'

import Orders from './pages/admin/orders'
import OrdersCreate from './pages/admin/orders/Create'
import OrdersUpdate from './pages/admin/orders/Update'
import OrdersView from './pages/admin/orders/View'

import Inventory from './pages/admin/inventory'
import InventoryCreate from './pages/admin/inventory/Create'
import InventoryUpdate from './pages/admin/inventory/Update'
import InventoryView from './pages/admin/inventory/View'

import Discounts from './pages/admin/discounts'
import DiscountsCreate from './pages/admin/discounts/Create'
import DiscountsUpdate from './pages/admin/discounts/Update'
import DiscountsView from './pages/admin/discounts/View'

import PaymentMethods from './pages/admin/paymentMethods'
import PaymentMethodsCreate from './pages/admin/paymentMethods/Create'
import PaymentMethodsUpdate from './pages/admin/paymentMethods/Update'
import PaymentMethodsView from './pages/admin/paymentMethods/View'


const App = () => {  
  return (
    <AuthProvider>
      <Routes>
        <Route path="login" element={<Login />} />
        <Route path="register" element={<Register />} />
        <Route path="admin" element={<Home />} />
        {/* <Route path="admin/product" element={<Home />} /> */}
        <Route path="admin/products/" element={<Product />} />
        <Route path="admin/products/create/" element={<ProductCreate />} />
        <Route path="admin/products/update/" element={<ProductCreate />} />
        <Route path="admin/products/view/" element={<ProductCreate />} />

        <Route path="admin/categories/" element={<Categories />} />
        <Route path="admin/categories/create/" element={<CategoriesCreate />} />
        <Route path="admin/categories/update/" element={<CategoriesUpdate />} />
        <Route path="admin/categories/view/" element={<CategoriesView />} />

        <Route path="admin/orders/" element={<Orders />} />
        <Route path="admin/orders/create/" element={<OrdersCreate />} />
        <Route path="admin/orders/update/" element={<OrdersUpdate />} />
        <Route path="admin/orders/view/" element={<OrdersView />} />

        <Route path="admin/inventory/" element={<Inventory />} />
        <Route path="admin/inventory/create/" element={<InventoryCreate />} />
        <Route path="admin/inventory/update/" element={<InventoryUpdate />} />
        <Route path="admin/inventory/view/" element={<InventoryView />} />

        <Route path="admin/discounts/" element={<Discounts />} />
        <Route path="admin/discounts/create/" element={<DiscountsCreate />} />
        <Route path="admin/discounts/update/" element={<DiscountsUpdate />} />
        <Route path="admin/discounts/view/" element={<DiscountsView />} />

        <Route path="admin/payment-methods/" element={<PaymentMethods />} />
        <Route path="admin/payment-methods/create/" element={<PaymentMethodsCreate />} />
        <Route path="admin/payment-methods/update/" element={<PaymentMethodsUpdate />} />
        <Route path="admin/payment-methods/view/" element={<PaymentMethodsView />} />
      </Routes>
    </AuthProvider>
  )
}

export default App
