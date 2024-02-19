import { createContext, useEffect, useState } from 'react';
import toast, { Toaster } from 'react-hot-toast';
import { 
  Backdrop, 
  Box, 
  CircularProgress, 
  ThemeProvider, 
  createTheme 
} from '@mui/material';
import { ApplicationUtils } from 'utils/ApplicationUtils';

export const GlobalContext = createContext();

export const GlobalProvider = (props) => {
  const [total, setTotal] = useState(0);
  const [quantityTotal, setQuantityTotal] = useState(0);
  const [company, setCompany] = useState({});
  const [cart, setCart] = useState(null);
  const [loading, setLoading] = useState(false);

  const saveProduct = async (product) => {
    const cart = await ApplicationUtils.getCartInLocalStorage(company.storeUrl);

    const products = cart?.products ?? [];

    localStorage.setItem(company.storeUrl, JSON.stringify({ 
      ...cart,
      products: [...products, product] 
    }));

    getTotal();
  };

  const getTotal = async () => {
    const products = await ApplicationUtils.getProductsInLocalStorage(company.storeUrl);

    if (products.length > 0) {
      setCart(products);
      setTotal(products.reduce((acc, item) => acc += (item.total || item.priceTotal), 0));
      setQuantityTotal(products.reduce((acc, item) => acc += item.quantity, 0));
    }
  };

  const clearCart = (company = company.storeUrl) => {
    if (company) localStorage.removeItem(company);
  };

  const customTheme = (colorPrimary, colorSecondary) => {
    return createTheme({
      palette: {
        primary: { main: colorPrimary || '#800080', },
        secondary: { main: colorSecondary || '#CD5C5C' },
      },
      typography: { fontFamily: 'Roboto, sans-serif' },
      spacing: factor => `${0.5 * factor}rem`
    });
  };

  useEffect(() => {
    if (company?.storeUrl) return;
    getTotal();
  }, [company]);

  return (
    <GlobalContext.Provider
      value={{
        saveProduct,
        total,
        quantityTotal,
        company,
        setCompany,
        clearCart,
        setLoading,
        toast
      }}
    >
      <ThemeProvider
        theme={customTheme(company?.custom?.colorPrimary, company?.custom?.colorSecondary)}
      >
        <Backdrop
          sx={{ color: '#000000', zIndex: (theme) => theme.zIndex.drawer + 100 }}
          open={loading ? true : false}
        >
          <Box sx={{ display: 'grid', justifyContent: 'center', gap: 1 }}>
            <CircularProgress size="4rem" sx={{ margin: 'auto' }} />
            <strong style={{ color: '#fff' }}>{loading}</strong>
          </Box>
        </Backdrop>
        <Toaster position="top-center" reverseOrder={false} />
        {props.children}
      </ThemeProvider>
    </GlobalContext.Provider>
  );
};
