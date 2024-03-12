import LayoutMenu from 'layouts/LayoutMenu';
import LayoutCheckout from 'layouts/LayoutCheckout';
import Menu from 'pages/Menu';
import Order from 'pages/Order';
import About from 'pages/About';
import Landing from 'pages/Landing';
import ClientContact from 'pages/Checkout/Step1_ClientContact';
import Address from 'pages/Checkout/Step2_Address';
import Payment from 'pages/Checkout/Step3_Payment';
import CartPage from 'pages/Checkout/Cart';

export const checkoutRoutes = [
  {
    path: ':menuUrl/checkout',
    element: <LayoutCheckout />,
    children: [
      { path: '', element: <CartPage /> },
      { path: 'contact', element: <ClientContact /> },
      { path: 'address', element: <Address /> },
      { path: 'pay', element: <Payment /> },
    ],
  },
];

export const menuRoutes = [
  {
    path: '/',
    element: <LayoutMenu />,
    children: [
      { path: '', element: <Landing /> },
      { path: ':menuUrl/', element: <Menu /> },
      { path: ':menuUrl/about', element: <About /> },
      { path: ':menuUrl/order/:orderId', element: <Order /> },
    ],
  },
];