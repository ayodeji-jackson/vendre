import './Header.css';
import { SearchIcon, CartIcon, HeartIcon } from '../assets/icons';
import * as Popover from '@radix-ui/react-popover';
import { Downgraded, useHookstate } from '@hookstate/core';
import { cartGlobalState, filterGlobalState } from '../App';
import CartItem, { CartItemSkeleton } from './CartItem';
import { PAGE_URL } from '../App';
import { cartItemType, ProductType } from '../types';
import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';

const Header = () => { 
  const cartState = useHookstate(cartGlobalState);
  const filterState = useHookstate(filterGlobalState);
  const itemsInCart = cartState.attach(Downgraded).get()
    .map(item => item.count).reduce((a, b) => a + b, 0);
  const [ products, setProducts ] = useState([] as ProductType[]);

  let isLoading: boolean = !Boolean(Object.keys(products).length);

  const getProducts = (urlArray: cartItemType[]) => {
    Promise.all(
      urlArray
        .map(({ id }) => fetch(`${PAGE_URL}/${id}`))
    ).then(responses => Promise.all(responses.map(res => res.json()))
      .then(values => setProducts(values)))
      .catch(err => console.error);
  };

  useEffect(() => getProducts(cartState.attach(Downgraded).get()), []);

  useEffect(() => {
    // syncing cart global state with product local state
    const cart = cartState.attach(Downgraded).get();
    setProducts(
      products.filter(({ id }) => 
        cart.findIndex(item => item.id === id) !== -1
      )
    );

    getProducts(cart);
  }, [cartState]);

  const getTotal = (products: ProductType[]): number => {
    let total: number = 0;
    for (let { id, price } of products) {
      let count = cartState.attach(Downgraded).get().find(item => item.id === id)?.count;
      total += count! * price;
    }
    return total;
  };

  return (
    <header>
      <Popover.Root>
        <Popover.Trigger asChild>
          <button type="button" className="open-search" title='Open search'>
            <SearchIcon />
          </button>
        </Popover.Trigger>
        <Popover.Portal>
          <Popover.Content className='search-container' align='start'>
            <input type="search" onInput={ 
              e => filterState.set({ ...filterState.attach(Downgraded).get(), search: (e.target as HTMLInputElement).value })
            } value={ filterState.get().search } />
          </Popover.Content>
        </Popover.Portal>
      </Popover.Root>
      <p className="info centered">Check Vendre app</p>
      <h1 className="logo centered">Vendre.</h1>
      <nav>
        <ul>
          <li><Link to="/">New collection</Link></li>
          <li><Link to="/mens-clothing">Men</Link></li>
          <li><Link to="/womens-clothing">Women</Link></li>
          <li><Link to="/sale" className="cta-link">Sale 🔥</Link></li>
        </ul>
      </nav>
      <Popover.Root modal={true}>
        <Popover.Anchor className='anchor' />
        <Popover.Trigger asChild>
          <button type="button" className="open-menu icon-button">
            Menu
          </button>
        </Popover.Trigger>
        <Popover.Portal>
          <Popover.Content className='menu side-bar' align='end'>
            <h2 className="side-bar__heading">
              Menu<Popover.Close aria-label='close'><span aria-hidden="true">✕</span></Popover.Close>
            </h2>
            <ul className='side-bar__body'>
              <li><Link to="/wishlist"><HeartIcon />Wishlist</Link></li>
              <li><a href="#"><span>🔥</span>Sale</a></li>
            </ul>
          </Popover.Content>
        </Popover.Portal>
      </Popover.Root>
      <Popover.Root modal={true}>
        <Popover.Anchor className='anchor' />
        <Popover.Trigger asChild>
        <button type="button" className="open-cart" title='Open cart'>
          <CartIcon />
          <span className='cart-count centered'>
            { itemsInCart < 100 ? itemsInCart : 99 }
          </span>
        </button>
        </Popover.Trigger>
        <Popover.Portal>
          <Popover.Content className="cart side-bar" align='end'>
            <h2 className="side-bar__heading">
              Cart<Popover.Close aria-label='close'><span aria-hidden="true">✕</span></Popover.Close>
            </h2>
            { cartState.get().length ? 
              <ul className="side-bar__body">
                { isLoading ? 
                  [...Array(cartState.get().length)].map((_, i) => (<CartItemSkeleton key={ i } />)) :
                  products.map(product => (
                    <CartItem key={ product.id }
                      product={ product } 
                    />
                  ))
                }
              </ul> : 
              <span className='cart-empty'>
                <CartIcon />
                <p>Your cart is empty</p>
              </span>
            }
            { !isLoading && 
              <button className="checkout button">
                Checkout (${ getTotal(products) })
              </button> 
            }
          </Popover.Content>
        </Popover.Portal>
      </Popover.Root>
    </header>
  )
};

export default Header;