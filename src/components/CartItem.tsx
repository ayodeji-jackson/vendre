import { cartItemType, ProductType } from '../types';
import { Downgraded, useHookstate } from '@hookstate/core';
import { cartGlobalState } from '../App';
import './CartItem.css';
import { TrashIcon } from '../assets/icons';

const CartItem = ({ product }: { product: ProductType }) => {
  const cartState = useHookstate(cartGlobalState);

  const productCartCount = 
    cartState.get().find(item => item.id == product.id)?.count || 0;

  const cleanCart = (arr: cartItemType[]): cartItemType[] => {
    return [ ...new Map(arr.map(v => [v.id, v])).values() ]
      .filter(item => item.count !== 0);
  };

  const handleAddToCart = (val: number): void => {
    cartState.set(cleanCart([ 
      ...cartState.attach(Downgraded).get(), { id: product.id, count: productCartCount + val } 
    ]));
  };
  
  const removeFromCart = (): void => {
    cartState.set(cleanCart([
      ...cartState.attach(Downgraded).get(), { id: product.id, count: 0 }
    ]));
  }

  return (
    <li className='cart-item'>
      <div className="cart-item__row-1">
        <img className='cart-item__image' src={ product.image } alt={ product.title } />
        <div className='cart-item__text'>
          <p className='cart-item__title'>{ product.title }</p>
          <p className='cart-item__price'>${ product.price.toLocaleString() }</p>
        </div>
      </div>
      <div className='cart-item__row-2'>
        <button className='button centered cart-item__remove' 
          type="button" onClick={ removeFromCart }
        ><TrashIcon />Remove</button>
        <span className='product__amount-in-cart-control'>
          <button onClick={ () => handleAddToCart(-1) } type="button"
            disabled={ productCartCount === 1 } className="centered"
          >-</button>
          <p>{ productCartCount }</p>
          <button onClick={ () => handleAddToCart(1) } className="centered"
            type="button" disabled={ productCartCount >= product.stock! }
          >+</button>
        </span>
      </div>
    </li>
  )
};

export default CartItem;

export const CartItemSkeleton = () => (
  <li className='cart-item-skeleton'>
    <div className='cart-item-skeleton__image'></div>
    <span className='cart-item-skeleton__text'></span>
  </li>
);