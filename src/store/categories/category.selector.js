import { createSelector } from "reselect";

// initial selector(i/p selector) that returns slice of reducer that we need ie category reducer
const selectCategoryReducer = (state) => state.categories;
// memoized selector
// returns the categories array that lives on the category slice of redux state
const selectCategories = createSelector(
  [selectCategoryReducer],
  (categoriesSlice) =>
    // categoriesSlice is the o/p we get from selectCategoryReducer
    categoriesSlice.categories
);

// memoized selector
export const selectCategoriesMap = createSelector(
  [selectCategories],
  (categories) =>
    categories.reduce((acc, category) => {
      const { title, items } = category;
      acc[title.toLowerCase()] = items;
      return acc;
    }, {})
);

// selector to get the value of isLoading
export const selectCategoriesIsLoading = createSelector(
  [selectCategoryReducer],
  (categorySlice) => categorySlice.isLoading
);
