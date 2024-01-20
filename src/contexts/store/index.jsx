import { createContext, useEffect, useState } from 'react';
import toast, { Toaster } from 'react-hot-toast';
import { Backdrop, Box, CircularProgress } from '@mui/material';

export const StoreContext = createContext();

export const StoreProvider = (props) => {
  const [total, setTotal] = useState(0);
  const [quantityTotal, setQuantityTotal] = useState(0);
  const [store, setStore] = useState({});
  const [bag, setBag] = useState(null);
  const [loading, setLoading] = useState(false);

  const saveProduct = async (product) => {
    let bagSaved = await localStorage.getItem(store.storeUrl);
    bagSaved = JSON.parse(bagSaved);
    if (bagSaved?.products?.length) {
      const products = bagSaved.products;
      localStorage.setItem(store.storeUrl, JSON.stringify({ products: [...products, product] }));
    } else {
      localStorage.setItem(store.storeUrl, JSON.stringify({ products: [product] }));
    };

    getTotal();
  };

  const getTotal = async () => {
    let bag = await localStorage.getItem(store.storeUrl);
    bag = JSON.parse(bag);

    const products = bag?.products || [];

    if (products.length) {
      setBag(products);
      setTotal([...products].reduce((acc, item) => acc += (item.total || item.priceTotal), 0));
      setQuantityTotal([...products].reduce((acc, item) => acc += item.quantity, 0));
    }
  };

  const getBag = async (id = store.storeUrl) => {
    const storeId = id;
    let bag = await localStorage.getItem(storeId);
    bag = JSON.parse(bag);
    return bag || {};
  };

  const clearBag = (id = store.storeUrl) => {
    const storeId = id;
    localStorage.removeItem(storeId);
  };

  useEffect(() => {
    if (!store?.storeUrl) return;
    getTotal();
  }, [store]);

  return (
    <StoreContext.Provider 
      value={{ 
        saveProduct, 
        total, 
        quantityTotal, 
        getBag, 
        store, 
        setStore, 
        clearBag,
        setLoading, 
        toast
      }}
    >
      <Backdrop
        sx={{ color: '#000000', zIndex: (theme) => theme.zIndex.drawer + 100 }}
        open={loading}
      >
        <Box sx={{ display: 'grid', justifyContent: 'center', gap: 1 }}>
          <CircularProgress size="4rem" sx={{ margin: 'auto' }} />
          <strong style={{ color: '#fff' }}>{loading}</strong>
        </Box>
      </Backdrop>
      <Toaster position="top-center" reverseOrder={false} />
      {props.children}
    </StoreContext.Provider>
  );
};
