import ProductCreate from '../pages/admin/products/Create'
import Product from '../pages/admin/products'

import Categories from '../pages/admin/categories'
import CategoriesCreate from '../pages/admin/categories/Create'
import CategoriesUpdate from '../pages/admin/categories/Update'

import Orders from '../pages/admin/orders'
import OrdersCreate from '../pages/admin/orders/Create'
import OrdersUpdate from '../pages/admin/orders/Update'
import OrdersView from '../pages/admin/orders/View'

import Inventory from '../pages/admin/inventory'
import InventoryCreate from '../pages/admin/inventory/Create'
import InventoryUpdate from '../pages/admin/inventory/Update'
import InventoryView from '../pages/admin/inventory/View'

import Discounts from '../pages/admin/discounts'
import DiscountsCreate from '../pages/admin/discounts/Create'
import DiscountsUpdate from '../pages/admin/discounts/Update'
import DiscountsView from '../pages/admin/discounts/View'

import PaymentMethods from '../pages/admin/paymentMethods'
import PaymentMethodsCreate from '../pages/admin/paymentMethods/Create'
import PaymentMethodsUpdate from '../pages/admin/paymentMethods/Update'
import PaymentMethodsView from '../pages/admin/paymentMethods/View'

const routes = [
  { path: 'products/', element: <Product /> },
  { path: 'products/create/', element: <ProductCreate /> },
  { path: 'products/update/', element: <ProductCreate /> },
  { path: 'products/view/', element: <ProductCreate /> },
  { path: 'categories/', element: <Categories /> },
  { path: 'categories/create/', element: <CategoriesCreate /> },
  { path: 'categories/update/', element: <CategoriesUpdate /> },
  { path: 'orders/', element: <Orders /> },
  { path: 'orders/create/', element: <OrdersCreate /> },
  { path: 'orders/update/', element: <OrdersUpdate /> },
  { path: 'orders/view/', element: <OrdersView /> },
  { path: 'inventory/', element: <Inventory /> },
  { path: 'inventory/create/', element: <InventoryCreate /> },
  { path: 'inventory/update/', element: <InventoryUpdate /> },
  { path: 'inventory/view/', element: <InventoryView /> },
  { path: 'discounts/', element: <Discounts /> },
  { path: 'discounts/create/', element: <DiscountsCreate /> },
  { path: 'discounts/update/', element: <DiscountsUpdate /> },
  { path: 'discounts/view/', element: <DiscountsView /> },
  { path: 'payment-methods/', element: <PaymentMethods /> },
  { path: 'payment-methods/create/', element: <PaymentMethodsCreate /> },
  { path: 'payment-methods/update/', element: <PaymentMethodsUpdate /> },
  { path: 'payment-methods/view/', element: <PaymentMethodsView /> },
]

export default routes
