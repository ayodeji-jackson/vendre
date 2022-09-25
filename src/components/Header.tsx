import './Header.css';
import { SearchIcon, CartIcon, HeartIcon } from '../assets/icons';
import * as Popover from '@radix-ui/react-popover';
import { CartContext, FilterContext } from '../Contexts';
import CartItem, { CartItemSkeleton } from './CartItem';
import { PAGE_URL } from '../App';
import { cartItemType, ProductType } from '../types';
import { useEffect, useState, useContext } from 'react';
import { Link } from 'react-router-dom';

const NavLinks = ({orientation, onClick}: {orientation: "horizontal" | "vertical", onClick?: () => void}) => (
  <>
    <li><Link to="/" onClick={onClick}>{ orientation === 'horizontal' ? '' : '✨' } New collection</Link></li>
    <li><Link to="/mens-clothing" onClick={onClick}>{ orientation === 'horizontal' ? '' : '👖'  } Men</Link></li>
    <li><Link to="/womens-clothing" onClick={onClick}>{ orientation === 'horizontal' ? '' : '👗' } Women</Link></li>
    <li><Link to="/" className="cta-link" onClick={onClick}>{ orientation === "horizontal" ? "Sale 🔥" : "🔥 Sale" }</Link></li>
  </>
);

const Header = () => { 
  const { cartState, setCart } = useContext(CartContext);
  const { filterState, setFilter} = useContext(FilterContext);
  const itemsInCart = cartState.map(item => item.count).reduce((a, b) => a + b, 0);
  const [ products, setProducts ] = useState([] as ProductType[]);
  const [ sideBarOpen, setSideBarOpen ] = useState(false);

  let isLoading: boolean = !Boolean(Object.keys(products).length);

  const getProducts = (cart: cartItemType[]) => {
    Promise.all(
      cart
        .map(({ id }) => fetch(`${PAGE_URL}/${id}`))
    ).then(responses => Promise.all(responses.map(res => res.json()))
      .then(values => setProducts(values)))
      .catch(err => console.error);
  };

  useEffect(() => {
    setProducts([]);
    getProducts(cartState);
    // syncing cart global state with product local state
    setProducts(
      products.filter(({ id }) => 
        cartState.findIndex(item => item.id === id) !== -1
      )
    );
  }, [cartState]);

  const getTotal = (products: ProductType[]): string => {
    let total: number = 0;
    for (let { id, price } of products) {
      let count = cartState.find(item => item.id === id)?.count;
      total += count! * price;
    }
    return total.toFixed(2);
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
              e => setFilter({ ...filterState, search: (e.target as HTMLInputElement).value })
            } value={ filterState.search } />
          </Popover.Content>
        </Popover.Portal>
      </Popover.Root>
      <p className="info centered">Check Vendre app</p>
      <h1 className="logo centered"><Link to="/" className='logo-link'>Vendre.</Link></h1>
      <nav>
        <ul>
          <NavLinks orientation='horizontal' />
        </ul>
      </nav>
      <Popover.Root modal={true} open={sideBarOpen} onOpenChange={setSideBarOpen}>
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
              { window.innerWidth < 768 && <NavLinks orientation='vertical' onClick={ () => setSideBarOpen(false) } /> } { /* 48em */ }
              <li><Link to="/wishlist" className='centered' onClick={ () => setSideBarOpen(false) }><HeartIcon />&nbsp;Wishlist</Link></li>
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
            { cartState.length ? 
              <ul className="side-bar__body">
                { isLoading ? 
                  [...Array(cartState.length)].map((_, i) => (<CartItemSkeleton key={ i } />)) :
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