// contains data related to cart
import { createContext, useState, useEffect } from "react";

// helper fun that matches the id of the product in existing cart array
const addCartItem = (cartItems, productToAdd) => {
  // find if cartItems contains productToAdd
  const existingCartItem = cartItems.find(
    (cartItem) => cartItem.id === productToAdd.id
  );
  // if found, return a new array with card items & productToAdd's increment quantity
  if (existingCartItem) {
    return cartItems.map((cartItem) =>
      cartItem.id === productToAdd.id
        ? { ...cartItem, quantity: cartItem.quantity + 1 }
        : cartItem
    );
  }

  // if not found; return new array with modified cartItems/new cart item
  // if productToAdd doesnt exist in cart then we are adding all the fields of productToAdd with additional quantity field
  return [...cartItems, { ...productToAdd, quantity: 1 }];
};

// 1. Cart Context
export const CartContext = createContext({
  isCartOpen: false,
  setIsCartOpen: () => {},
  cartItems: [], // same as product with additional quantity field
  addItemToCart: () => {},
  cartCount: 0,
});

// 2. Cart Provider
export const CartProvider = ({ children }) => {
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [cartItems, setCartItems] = useState([]);
  const [cartCount, setCartCount] = useState(0);

  // recalcutes the cartCount count everytime cartItems array changes
  useEffect(() => {
    const newCartCount = cartItems.reduce(
      (total, cartItem) => total + cartItem.quantity,
      0
    );
    setCartCount(newCartCount);
  }, [cartItems]);

  // when addItemToCart() is called using cart context, setCartItems() will set the productToAdd to cartItems
  const addItemToCart = (productToAdd) =>
    setCartItems(addCartItem(cartItems, productToAdd));

  // values contains things we want to expose in our context
  const value = {
    isCartOpen,
    setIsCartOpen,
    addItemToCart,
    cartItems,
    cartCount,
  };
  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
};
