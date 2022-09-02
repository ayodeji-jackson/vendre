import './ProductSkeleton.css';

const ProductSkeleton = () => (
  <li className="product product-skeleton" hidden>
      <div className="product__image"></div>
      <p className="product__name"></p>
    </li>
);

export default ProductSkeleton;