import React, { createContext, useState } from 'react';
import toast, { Toaster } from 'react-hot-toast';

import Loading from 'components/Loading';

export const StoreContext = createContext();

export const AuthProvider = (props) => {
  const [company, setCompany] = useState({});
  const [cart, setCart] = useState('');
  const [loading, setLoading] = useState(false);

  return (
    <StoreContext.Provider value={{ company, setCompany, cart, setCart, loading, setLoading, toast }}>
      {loading && <Loading text={loading} />}
      <Toaster position="bottom-right" reverseOrder={false} />
      {props.children}
    </StoreContext.Provider>
  );
};
