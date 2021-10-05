import { createContext, useContext, useState } from 'react';

const LocalStateContext = createContext();

const LocalStateProvider = LocalStateContext.Provider;

const CartStateProvider = ({ children }) => {
  // This  is our own custom provider! We will store data and functionality in here and anyone can access it via consumer

  const [cartOpen, setCartOpen] = useState(false);

  const toggleCart = () => {
    setCartOpen(!cartOpen);
  };

  const openCart = () => {
    setCartOpen(true);
  };

  const closeCart = () => {
    setCartOpen(false);
  };

  return (
    <LocalStateProvider value={{ cartOpen, toggleCart, openCart, closeCart }}>
      {children}
    </LocalStateProvider>
  );
};

// make a custom hook for accesing the cart local state

const useCart = () => {
  const all = useContext(LocalStateContext);
  return all;
};

export { CartStateProvider, useCart };
