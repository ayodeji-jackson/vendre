import './Header.css';
import { SearchIcon, CartIcon, HeartIcon } from '../assets/icons';
import * as Popover from '@radix-ui/react-popover';
import { useContext } from 'react';
import { CartContext } from '../App';

const Header = () => { 
  const { cart } = useContext(CartContext);

  return (
    <header>
      <Popover.Root>
        <Popover.Trigger asChild>
          <button type="button" className="open-search" title='Open search'>
            <SearchIcon />
          </button>
        </Popover.Trigger>
        <Popover.Portal>
          <Popover.Content align='start'>
            <form className='form-search'>
              <input type="search" placeholder='Search query' />
            </form>
          </Popover.Content>
        </Popover.Portal>
      </Popover.Root>
      <p className="info centered">Check Vendre app</p>
      <h1 className="logo centered">Vendre.</h1>
      <nav>
        <a href="#">New collection</a>
        <a href="#">Men</a>
        <a href="#">Women</a>
        <a href="#" className="cta-link">Sale 🔥</a>
      </nav>
      <Popover.Root>
        <Popover.Anchor className='anchor' />
        <Popover.Trigger asChild>
          <button type="button" className="open-menu icon-button">
            Menu
          </button>
        </Popover.Trigger>
        <Popover.Portal>
          <Popover.Content align='end'>
            <ul className='menu centered'>
              <li><a href="#"><HeartIcon />Wishlist</a></li>
            </ul>
          </Popover.Content>
        </Popover.Portal>
      </Popover.Root>
      <button type="button" className="open-cart" title='Open cart'>
        <CartIcon /><span className='cart-count centered'>{ cart.length }</span>
      </button>
    </header>
  )
};

export default Header;