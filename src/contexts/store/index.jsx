import React, { createContext, useEffect, useState } from 'react';

export const StoreContext = createContext();

export const StoreProvider = (props) => {
  const [total, setTotal] = useState(0);
  const [quantityTotal, setQuantityTotal] = useState(0);
  const [company, setCompany] = useState({});
  const [bag, setBag] = useState(null);

  const saveProduct = async (product) => {
    const productsSaved = await localStorage.getItem('products');
    if (productsSaved) {
      const products = JSON.parse(productsSaved);
      localStorage.setItem('products', JSON.stringify([product, ...products]));
    } else {
      localStorage.setItem('products', JSON.stringify([product]));
    };
    
    getTotal();
  };

  const getTotal = async () => {
    const productsSaved = await localStorage.getItem('products');
    if (productsSaved) {
      const products = JSON.parse(productsSaved);
      setBag(products);
      setTotal([...products].reduce((acc, item) =>  acc += item.total, 0));
      setQuantityTotal([...products].reduce((acc, item) =>  acc += item.quantity, 0));
    }
  };

  const getBag = async () => {
    const productsSaved = await localStorage.getItem('products');
    return productsSaved ? JSON.parse(productsSaved) : [];
  };

  useEffect(() => {
    getTotal();
  }, [])

  return (
    <StoreContext.Provider value={{ saveProduct, total, quantityTotal, getBag, company, setCompany }}>
      {props.children}
    </StoreContext.Provider>
  );
};
