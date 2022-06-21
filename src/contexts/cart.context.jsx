import { createContext, useState } from "react";

// 1. Cart Context
export const CartContext = createContext({
  isCartOpen: false,
  setIsCartOpen: () => {},
});

// 2. Provider
export const CartProvider = ({ children }) => {
  const [isCartOpen, setIsCartOpen] = useState(false);
  const value = { isCartOpen, setIsCartOpen };
  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
};
