import { useRoutes } from 'react-router-dom';
import { GlobalProvider } from 'contexts/global';
import { checkoutRoutes, menuRoutes } from 'routes';

const GlobalStyles = () => (
  <style>
    {`
      input:-webkit-autofill, input:-webkit-autofill:hover, 
      input:-webkit-autofill:focus, input:-webkit-autofill:active {
        -webkit-box-shadow: 0 0 0 30px #02020200 inset !important;
        background-color: inherit !important;
        color: inherit !important;
      }
    `}
  </style>
);

export const MenuRoutes = () => {
  const appRoutes = useRoutes([...menuRoutes]);
  return <>{appRoutes}</>;
};

export const CheckoutRoutes = () => {
  const appRoutes = useRoutes([...checkoutRoutes]);
  return <>{appRoutes}</>;
};

const App = () => {
  return (
    <GlobalProvider>
      <GlobalStyles />
      <MenuRoutes />
      <CheckoutRoutes />
    </GlobalProvider>
  );
};

export default App;
