import { HeartIcon } from "../assets/icons";
import { ProductType, cartItemType } from "../types";
import './Product.css';
import { PAGE_URL } from "../App";
import { useContext } from "react";
import { CartContext, FilterContext, WishlistContext } from "../Contexts";

const Product = ({ product, setFetchError }: 
  { product: ProductType, setFetchError: React.Dispatch<React.SetStateAction<boolean>> 
  }) => {
  const { cartState, setCart } = useContext(CartContext);
  const { wishlistState, setWishlist } = useContext(WishlistContext)

  const cleanCart = (arr: cartItemType[]): cartItemType[] => {
    return [ ...new Map(arr.map(v => [v.id, v])).values() ]
      .filter(item => item.count !== 0);
  };

  const isLiked = wishlistState.includes(product.id);
  const productCartCount = 
    cartState.find(item => item.id == product.id)?.count || 0;

  const handleLike = (): void => {
    if (!isLiked) 
      setWishlist([ ...wishlistState, product.id ]);
    else 
      setWishlist(wishlistState.filter(id => product.id !== id));
  };

  const handleAddToCart = (val: number): void => {
    fetch(`${PAGE_URL}/${product.id}`).then(() => 
      setCart(cleanCart([ 
        ...cartState, { id: product.id, count: productCartCount + val } 
      ]))
    )
      .catch(err => setFetchError(true));
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