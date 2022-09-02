import { useState } from "react";
import { HeartIcon } from "../assets/icons";
import { cartItemType, ProductType } from "../types";
import './Product.css';

type ProductComponentType = {
  product: ProductType, 
  onLike: () => void, 
  onAddToCart: (count: number) => void
}

const Product = ({ product, onLike, onAddToCart }: ProductComponentType) => {
  const [ isLiked, setLiked ] = useState(
    (JSON.parse(localStorage.getItem('wishlist')!) as number[])
      .includes(product.id) || false
  );
  const [ productCartCount, setProductCartCount ] = useState(
    (JSON.parse(localStorage.getItem('cart')!) as cartItemType[])
      .find(item => item.id === product.id)?.count || 0
  );

  const handleLike = (): void => {
    setLiked(!isLiked);
    onLike();
  };

  const handleAddToCart = (val: number): void => {
    setProductCartCount(count => count + val);
    onAddToCart(productCartCount + val);
  };

  return (
    <li className="product">
      <button type="button" title="Add to wishlist" 
        onClick={ handleLike }
        className={ `product__add-to-wishlist centered ${isLiked ? 'is-liked' : ''}` }
      >
        <HeartIcon />
      </button>
      <img alt="Product image" src={ product.thumbnail } className="product__image" />
      <p className="product__name">{ product.title }</p>
      <div className="product-end">
        <p className="product__price">${ product.price.toLocaleString() }</p>
        { productCartCount > 0 ? 
          <span className='product__amount-in-cart-control'>
            <button onClick={ () => handleAddToCart(-1) } type="button"
            >-</button>
            <label>{ productCartCount }</label>
            <button onClick={ () => handleAddToCart(1) } 
              type="button" disabled={ productCartCount >= product.stock! }
            >+</button>
          </span> :
          <button onClick={ () => handleAddToCart(1) } 
            className="product__add-to-cart button"
          >Add to cart</button>
        }
      </div>
    </li>
  );
};

export default Product;

export const ProductSkeleton = () => (
  <li className="product product-skeleton" hidden>
      <div className="product__image"></div>
      <p className="product__name"></p>
    </li>
);