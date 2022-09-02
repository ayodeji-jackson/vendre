import './Header.css';
import { SearchIcon, CartIcon, HeartIcon } from '../assets/icons';
import * as Popover from '@radix-ui/react-popover';
import { cartItemType } from '../types';

const Header = ({ cart }: { cart: cartItemType[] }) => { 
  let itemsInCart = cart.map(item => item.count).reduce((a, b) => a + b, 0);

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
              <input type="search" />
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
        <CartIcon />
        <span className='cart-count centered'>
          { itemsInCart < 100 ? itemsInCart : 99 }
        </span>
      </button>
    </header>
  )
};

export default Header;