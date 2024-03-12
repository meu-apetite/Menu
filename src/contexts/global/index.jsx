import { createContext, useState } from 'react';
import { Backdrop, Box, CircularProgress } from '@mui/material';
import CustomError from 'components/CustomError';
import toast, { Toaster } from 'react-hot-toast';
import { ApplicationUtils } from 'utils/ApplicationUtils';

export const GlobalContext = createContext();

export const GlobalProvider = (props) => {
  const [total, setTotal] = useState(0);
  const [quantityTotal, setQuantityTotal] = useState(0);
  const [company, setCompany] = useState(null);
  const [cart, setCart] = useState(null);
  const [globalError, setGlobalError] = useState(null);
  const [loading, setLoading] = useState(false);

  const saveProduct = async (product) => {
    const cart = await ApplicationUtils.getCartInLocalStorage(company.storeUrl);

    const products = cart?.products ?? [];

    localStorage.setItem(company.storeUrl, JSON.stringify({
      ...cart, products: [...products, product]
    }));

    getTotal();
  };

  const getTotal = async () => {
    const products = await ApplicationUtils.getProductsInLocalStorage(company.storeUrl);

    if (products?.length > 0) {
      setCart(products);
      setTotal(products.reduce((acc, item) => acc += (item.total || item.priceTotal), 0));
      setQuantityTotal(products.reduce((acc, item) => acc += item.quantity, 0));
    }
  };

  const clearCart = () => {
    if (company) localStorage.removeItem(company.storeUrl);
  };

  return (
    <GlobalContext.Provider
      value={{
        saveProduct,
        total,
        getTotal,
        quantityTotal,
        company,
        setCompany,
        clearCart,
        setLoading,
        setGlobalError,
        loading,
        toast
      }}
    >
       <Backdrop
          sx={{ color: '#000000', zIndex: 9999 }}
          open={!!loading ? true : false}
        >
          <Box sx={{ display: 'grid', justifyContent: 'center', gap: 1 }}>
            <CircularProgress size="4rem" sx={{ margin: 'auto' }} />
            <strong style={{ color: '#fff' }}>{loading}</strong>
          </Box>
        </Backdrop>
      <Toaster position="top-center" reverseOrder={false} />

      {props.children}

      {globalError && <CustomError error={globalError} />}
    </GlobalContext.Provider>
  );
};
