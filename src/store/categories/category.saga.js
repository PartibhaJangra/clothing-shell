import { takeLatest, all, call, put } from "redux-saga/effects";

import { getCategoriesAndDocuments } from "../../utils/firebase/firebase.utils";

import {
  fetchCategoriesSuccess,
  fetchCategoriesFailed,
} from "./category.action";

import { CATEGORIES_ACTION_TYPES } from "./category.types";

export function* fetchCategoriesAsync() {
  try {
    const categoriesArray = yield call(getCategoriesAndDocuments);
    // put -> generator version of dispatch
    yield put(fetchCategoriesSuccess(categoriesArray));
  } catch (error) {
    yield put(fetchCategoriesFailed(error));
  }
}

// triggers when we call fetchCategoriesStart
// saga listening for FETCH_CATEGORIES_START action
export function* onFetchCategories() {
  // takeLatest(action, what_you_want_to_happen)
  yield takeLatest(
    CATEGORIES_ACTION_TYPES.FETCH_CATEGORIES_START,
    fetchCategoriesAsync
  );
}

// accumulator that holds all the sagas related to the category
export function* categoriesSaga() {
  // all -> run everything inside & only complete when everything is done
  yield all([call(onFetchCategories)]);
}
