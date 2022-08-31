import './ProductSkeleton.css';

const ProductSkeleton = () => (
  <li className="product product-skeleton" hidden>
      <span></span>
      <div className="product__image"></div>
      <p className="product__name"></p>
      <div className="product-end">
        <p className="product__price"></p>
        <span className="product__add-to-cart button"></span>
      </div>
    </li>
);

export default ProductSkeleton;