import { createSelector } from "reselect";

// initial selector that returns slice from state that we want ie cart
const selectCartReducer = (state) => state.cart;

export const selectCartItems = createSelector(
  [selectCartReducer],
  (cart) => cart.cartItems
);

export const selectIsCartOpen = createSelector(
  [selectCartReducer],
  (cart) => cart.isCartOpen
);

export const selectCartTotal = createSelector(
  [selectCartItems],
  (newCartItems) =>
    newCartItems.reduce(
      (total, cartItem) => total + cartItem.quantity * cartItem.price,
      0
    )
);

export const selectCartCount = createSelector(
  [selectCartItems],
  (newCartItems) =>
    newCartItems.reduce((total, cartItem) => total + cartItem.quantity, 0)
);
