// file where our state lives but also where we receive actions & we dispatch them into our reducers to update the state.
import { compose, createStore, applyMiddleware } from "redux";
import logger from "redux-logger";
import { persistStore, persistReducer } from "redux-persist";
import storage from "redux-persist/lib/storage";
import createSagaMiddleware from "redux-saga";

import { rootSaga } from "./root-saga";

import { rootReducer } from "./root-reducer";

const persistConfig = {
  key: "root", // we want to persist the whole thing; start from the root level
  storage, // storage: storage
  whitelist: ["cart"], // store reducer values that we want to persist in local storage
};

// creating saga middleware
const sagaMiddleware = createSagaMiddleware();

// creating persistedReducer using persistConfig
const persistedReducer = persistReducer(persistConfig, rootReducer);

// array of middlewares we are using [logger, thunk]
// run only when we are not in production env; filer(Boolean) removes anything that's got false into it
const middleWares = [
  process.env.NODE_ENV !== "production" && logger,
  sagaMiddleware,
].filter(Boolean);

// decides whether to use compose from redux devTools or from redux
// if first 2 conditions are true then return window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ else compose
const composeEnhancer =
  (process.env.NODE_ENV !== "production" &&
    window &&
    window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__) ||
  compose;

// need to generate middlewares using compose in order them to work
const composedEnhancers = composeEnhancer(applyMiddleware(...middleWares));

// instantiating store with reducers and middlewares
export const store = createStore(
  persistedReducer, // passing persistedReducer instead of rootReducer
  undefined,
  composedEnhancers
); //[rootReducer, defaultState, middleWares]

// running saga middleware with our rootSaga
sagaMiddleware.run(rootSaga);

// exporting persistStore Obj
export const persistor = persistStore(store);
