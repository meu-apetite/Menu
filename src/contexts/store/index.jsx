import { createContext, useEffect, useState } from 'react';

export const StoreContext = createContext();

export const StoreProvider = (props) => {
  const [total, setTotal] = useState(0);
  const [quantityTotal, setQuantityTotal] = useState(0);
  const [store, setStore] = useState({});
  const [bag, setBag] = useState(null);

  const saveProduct = async (product) => {
    let bagSaved = await localStorage.getItem(store.storeUrl);
    bagSaved = JSON.parse(bagSaved)
    if (bagSaved?.products.length) {
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
      setTotal([...products].reduce((acc, item) =>  acc += (item.total || item.priceTotal), 0));
      setQuantityTotal([...products].reduce((acc, item) =>  acc += item.quantity, 0));
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
    if (!store.storeUrl) return;
    getTotal();
  }, [store])

  return (
    <StoreContext.Provider value={{ saveProduct, total, quantityTotal, getBag, store, setStore, clearBag }}>
      {props.children}
    </StoreContext.Provider>
  );
};
