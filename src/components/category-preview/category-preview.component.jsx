// displays first 4 items from the respective shopping category on Shop tab
import { Link } from "react-router-dom";

import ProductCard from "../product-card/product-card.component.jsx";

import "./category-preview.styles.scss";

const CategoryPreview = ({ title, products }) => {
  return (
    <div className="category-preview-container">
      <h2>
        <Link className="title" to={title}>
          {title.toUpperCase()}
        </Link>
      </h2>
      <div className="preview">
        {products
          .filter((_, idx) => idx < 4)
          .map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
      </div>
    </div>
  );
};

export default CategoryPreview;

// adding <span> inside <h2> inorder to make title inside span clickable. Because we only want title to be clickable not the whole h2
