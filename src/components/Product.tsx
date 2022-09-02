import { useEffect, useState } from "react";
import { HeartIcon } from "../assets/icons";
import { ProductType } from "./Page";
import './Product.css';

type ProductComponentType = {
  product: ProductType, 
  onLike: () => void, 
  onAddToCart: (id: number, count: number) => void
}

const Product = ({ product, onLike, onAddToCart }: ProductComponentType) => {
  const [ isLiked, setLiked ] = useState(false);
  const [ productCartCount, setProductCartCount ] = useState(0);

  useEffect(() => {
    let wishlist = JSON.parse(localStorage.getItem('wishlist')!) as number[];
    if (wishlist && wishlist.includes(product.id))
      setLiked(true);
  }, []);

  return (
    <li className="product">
      <button type="button" title="Add to wishlist" 
        onClick={ () => { 
          setLiked(!isLiked);
          onLike();
        } }
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
            <button onClick={ () => {
              setProductCartCount(val => val - 1);
              onAddToCart(product.id, productCartCount);
            }} type="button"
            >-</button>
            <label>{ productCartCount }</label>
            <button onClick={ () => {
              setProductCartCount(val => val + 1);
              onAddToCart(product.id, productCartCount);
            }} type="button" disabled={ productCartCount >= product.stock! }
            >+</button>
          </span> :
          <button onClick={ () => {
            setProductCartCount(1);
            onAddToCart(product.id, productCartCount);
          }} className="product__add-to-cart button"
          >Add to cart</button>
        }
      </div>
    </li>
  );
};

export default Product;