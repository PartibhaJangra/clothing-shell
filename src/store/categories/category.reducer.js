import { CATEGORIES_ACTION_TYPES } from "./category.types";

const CATEGORIES_INITIAL_VALUE = {
  categories: [],
};

export const categoriesReducer = (
  state = CATEGORIES_INITIAL_VALUE,
  action = {}
) => {
  const { type, payload } = action;

  switch (type) {
    case CATEGORIES_ACTION_TYPES.SET_CATEGORIES:
      return {
        ...state,
        categories: payload,
      };
    default:
      return state;
  }
};
