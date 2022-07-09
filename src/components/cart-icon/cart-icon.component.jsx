// component to display cart Icon on navigation bar
import { useContext } from "react";

import { CartContext } from "../../contexts/cart.context";

// import { ReactComponent as ShoppingIcon } from "../../assets/shopping-bag.svg";
import {
  ShoppingIcon,
  CartIconContainer,
  ItemCount,
} from "./cart-icon.styles.jsx";

const CartIcon = () => {
  const { isCartOpen, setIsCartOpen, cartCount } = useContext(CartContext);

  // opens; if cart is closed and vice versa
  const toggleIsCartOpen = () => setIsCartOpen(!isCartOpen);

  return (
    <CartIconContainer>
      <ShoppingIcon className="shopping-icon" onClick={toggleIsCartOpen} />
      <ItemCount>{cartCount}</ItemCount>
    </CartIconContainer>
  );
};

export default CartIcon;
