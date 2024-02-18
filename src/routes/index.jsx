import Menu from 'pages/Menu';
import Order from 'pages/Order';
import About from 'pages/About';
import Landing from 'pages/Landing';
import CartPage from 'pages/Cart';
import ClientContact from 'pages/StepsOrder/Step1_ClientContact';
import Address from 'pages/StepsOrder/Step2_Address';
import Payment from 'pages/StepsOrder/Step3_Payment';
import Checkout from 'layouts/Checkout';

export const checkoutRoutes = [
  {
    path: ':storeUrl/checkout',
    element: <CartPage />,
  },
  {
    path: ':storeUrl/checkout',
    element: <Checkout />,
    children: [
      { path: 'contact', element: <ClientContact /> },
      { path: 'address', element: <Address /> },
      { path: 'pay', element: <Payment /> },
    ],
  },
];

export const menuRoutes = [
  {
    path: '/',
    children: [
      { path: '', element: <Landing /> },
      { path: ':storeUrl/', element: <Menu /> },
      { path: ':storeUrl/about', element: <About /> },
      { path: ':storeUrl/meupedido/:orderId', element: <Order /> },
    ],
  },
];