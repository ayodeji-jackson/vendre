import { HeartIcon } from "../assets/icons";
import { ProductType, cartItemType } from "../types";
import './Product.css';
import { Downgraded, useHookstate } from "@hookstate/core";
import { cartGlobalState, wishlistGlobalState } from "../App";

const Product = ({ product }: { product: ProductType }) => {
  const wishlistState = useHookstate(wishlistGlobalState);
  const cartState = useHookstate(cartGlobalState);

  const cleanCart = (arr: cartItemType[]): cartItemType[] => {
    return [ ...new Map(arr.map(v => [v.id, v])).values() ]
      .filter(item => item.count !== 0);
  };

  const isLiked = wishlistState.get().includes(product.id);
  const productCartCount = 
    cartState.get().find(item => item.id == product.id)?.count || 0;

  const handleLike = (): void => {
    if (!isLiked) 
      wishlistState.set([ ...wishlistState.attach(Downgraded).get(), product.id ]);
    else 
      wishlistState.set(wishlistState.attach(Downgraded).get().filter(id => product.id !== id));
  };

  const handleAddToCart = (val: number): void => {
    cartState.set(cleanCart([ 
      ...cartState.attach(Downgraded).get(), { id: product.id, count: productCartCount + val } 
    ]));
  };

  return (
    <li className="product">
      <button type="button" title="Add to wishlist" 
        onClick={ handleLike }
        className={ `product__add-to-wishlist centered ${isLiked ? 'is-liked' : ''}` }
      >
        <HeartIcon />
      </button>
      <img alt={ product.title } src={ product.thumbnail } className="product__image" />
      <p className="product__name">{ product.title }</p>
      <div className="product-end">
        <p className="product__price">${ product.price.toLocaleString() }</p>
        { productCartCount > 0 ? 
          <span className='product__amount-in-cart-control'>
            <button onClick={ () => handleAddToCart(-1) } type="button"
              className="centered"
            >-</button>
            <label>{ productCartCount }</label>
            <button onClick={ () => handleAddToCart(1) } className="centered"
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
    <p className="product__text"></p>
  </li>
);