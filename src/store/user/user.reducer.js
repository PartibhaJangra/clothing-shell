import { USER_ACTION_TYPES } from "./user.types";

// contains reducer code for user
const INITIAL_STATE = {
  currentUser: null,
};

// state takes INITIAL_STATE value when userReducer runs for the first time
export const userReducer = (state = INITIAL_STATE, action) => {
  const { type, payload } = action;

  switch (type) {
    case USER_ACTION_TYPES.SET_CURRENT_USER: {
      return {
        ...state, // spreading the values on the previous state
        currentUser: payload,
      };
    }
    default:
      return state; // when actions doesn't match return the same state; component doesn't rerender
  }
};
