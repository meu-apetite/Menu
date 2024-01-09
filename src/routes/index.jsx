import Menu from 'pages/Menu';
import Bag from 'pages/Bag';
import Order from 'pages/Order';
import About from 'pages/About';
import Landing from 'pages/Landing';
import ClientContact from 'pages/StepsOrder/Step1_ClientContact';
import Address from 'pages/StepsOrder/Step2_Address';
import Payment from 'pages/StepsOrder/Step3_Payment';
import Layout from 'components/Layout';

export const finishOrderRoutes = [
  {
    path: ':storeUrl/checkout',
    element: <Layout />,
    children: [
      { path: 'contact', element: <ClientContact /> },
      { path: 'address', element: <Address /> },
      { path: 'pay', element: <Payment /> },
    ],
  },
  {
    path: ':storeUrl/checkout/bag',
    element: <Bag />,
  },
];

export const storeRoutes = [
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