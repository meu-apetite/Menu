import React, { createContext, useEffect, useState } from 'react';

export const StoreContext = createContext();

export const StoreProvider = (props) => {
  const [total, setTotal] = useState(0);
  const [bag, setBag] = useState(null);

  const saveProduct = async (product) => {
    const productsSaved = await localStorage.getItem('products');
    if (productsSaved) {
      const products = JSON.parse(productsSaved);
      localStorage.setItem('products', JSON.stringify([product, ...products]));
      setTotal([...products].reduce((acc, item) =>  acc += item.total, 0));
    } else {
      localStorage.setItem('products', JSON.stringify([product]));
    };
  };

  const getPriceTotal = async (product) => {
    const productsSaved = await localStorage.getItem('products');
    if (productsSaved) {
      const products = JSON.parse(productsSaved);
      setBag(products);
      setTotal([...products].reduce((acc, item) =>  acc += item.total, 0));
    }
  };

  const getBag = async () => {
    const productsSaved = await localStorage.getItem('products');
    return productsSaved ? JSON.parse(productsSaved) : [];
  };

  useEffect(() => {
    getPriceTotal();
  }, [])

  return (
    <StoreContext.Provider value={{ saveProduct, total, getBag }}>
      {props.children}
    </StoreContext.Provider>
  );
};
