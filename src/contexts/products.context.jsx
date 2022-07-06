import { createContext, useState, useEffect } from "react";

import SHOP_DATA from "../shop-data.js";

import { getCategoriesAndDocuments } from "../utils/firebase/firebase.utils.js";

export const ProductContext = createContext({
  products: [],
});

export const ProductProvider = ({ children }) => {
  const [products, setProducts] = useState([]);
  const value = { products };

  useEffect(() => {
    addCollectionAndDocuments("categories", SHOP_DATA);
  }, []);

  useEffect(() => {
    getCategoriesAndDocuments();
  }, []);
  return (
    <ProductContext.Provider value={value}>{children}</ProductContext.Provider>
  );
};
