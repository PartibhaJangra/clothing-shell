import { CATEGORIES_ACTION_TYPES } from "./category.types";

const CATEGORIES_INITIAL_VALUE = {
  categories: [],
  isLoading: false, // check if the reducer is in loading state for the data it will hold
  error: null, // to check if an error occured in the fetching process
};

export const categoriesReducer = (
  state = CATEGORIES_INITIAL_VALUE,
  action = {}
) => {
  const { type, payload } = action;

  switch (type) {
    case CATEGORIES_ACTION_TYPES.FETCH_CATEGORIES_START:
      return {
        ...state,
        isLoading: true, // the moment we start fetching we are in a loading state
      };
    case CATEGORIES_ACTION_TYPES.FETCH_CATEGORIES_SUCCESS:
      return {
        ...state,
        categories: payload,
        isLoading: false, // once we get back actual result & its successfull then we are not loading anymore
      };
    case CATEGORIES_ACTION_TYPES.FETCH_CATEGORIES_FAILED:
      return {
        ...state,
        isLoading: false,
        error: payload,
      };
    default:
      return state;
  }
};
