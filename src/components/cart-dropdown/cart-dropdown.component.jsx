// contains code related to products we see on cart dropdown
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";

import Button from "../button/button.component.jsx";
import CartItem from "../cart-item/cart-item.component.jsx";

import { selectCartItems } from "../../store/cart/cart.selector.js";

import "./cart-dropdown.styles.scss";

const CartDropdown = () => {
  const cartItems = useSelector(selectCartItems);
  const navigate = useNavigate();

  const goToCheckoutHandler = () => navigate("/checkout");
  return (
    <div className="cart-dropdown-container">
      <div className="cart-items">
        {cartItems.length ? (
          cartItems.map((cartItem) => (
            <CartItem key={cartItem.id} cartItem={cartItem} />
          ))
        ) : (
          <span className="empty-message">Your cart is empty</span>
        )}
      </div>
      <Button onClick={goToCheckoutHandler}>GO TO CHECKOUT</Button>
    </div>
  );
};

export default CartDropdown;
