import { HeartIcon } from "../assets/icons";
import { ProductType, cartItemType } from "../types";
import './Product.css';
import { Downgraded, useHookstate } from "@hookstate/core";
import { cartGlobalState, PAGE_URL, wishlistGlobalState } from "../App";
import { globalFetchError } from "./Page";

const Product = ({ product }: { product: ProductType }) => {
  const wishlistState = useHookstate(wishlistGlobalState);
  const cartState = useHookstate(cartGlobalState);
  const fetchError = useHookstate(globalFetchError);

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
    fetch(`${PAGE_URL}/${product.id}`).then(() => 
      cartState.set(cleanCart([ 
        ...cartState.attach(Downgraded).get(), { id: product.id, count: productCartCount + val } 
      ]))
    )
      .catch(err => fetchError.set(true));
  };

  return (
    <li className="product">
      <button type="button" title={isLiked ? "Remove from wishlist" : "Add to wishlist"} 
        onClick={ handleLike }
        className={ `product__add-to-wishlist centered ${isLiked ? 'is-liked' : ''}` }
      >
        <HeartIcon />
      </button>
      <img alt={ product.title } src={ product.image } className="product__image" />
      <p className="product__name">{ product.title }</p>
      <div className="product-end">
        <p className="product__price">${ product.price.toLocaleString() }</p>
        { productCartCount > 0 ? 
          <span className='product__amount-in-cart-control'>
            <button onClick={ () => handleAddToCart(-1) } type="button"
              className="centered"
            >-</button>
            <p>{ productCartCount }</p>
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
    <span className="product__add-to-wishlist"></span>
    <div className="product__image"></div>
    <span className="product__name"></span>
    <div className="product-end">
      <span className="product__price"></span>
      <span className="product__add-to-cart"></span> 
    </div>
  </li>
);