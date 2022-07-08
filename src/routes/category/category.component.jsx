// lists data for the selected category @ /shop/{category} url based on the url parameter
import { Fragment, useContext, useEffect, useState } from "react";
import { useParams } from "react-router-dom";

import { CategoriesContext } from "../../contexts/categories.context";
import ProductCard from "../../components/product-card/product-card.component";

import "./category.styles.scss";

const Category = () => {
  // get category value from the url; is called when <Category> is called on <Shop>
  const { category } = useParams();
  const { categoriesMap } = useContext(CategoriesContext);

  // creating a state var so that products value does not changes everytime the <Category/> rerenders
  const [products, setProducts] = useState(categoriesMap[category]);

  // products val only updated when category or categoriesMap is changes
  useEffect(() => {
    setProducts(categoriesMap[category]);
  }, [category, categoriesMap]);

  return (
    <Fragment>
      <h2 className="category-title">{category.toUpperCase()}</h2>
      <div className="category-container">
        {products &&
          products.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
      </div>
    </Fragment>
  );
};

export default Category;
