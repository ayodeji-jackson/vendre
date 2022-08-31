import './Header.css';
import { SearchIcon, CartIcon } from '../assets/icons';

const Header = () => (
  <header>
    <button type="button" className="open-search" title='Open search'><SearchIcon /></button>
    <p className="info centered">Check Vendre app</p>
    <h1 className="logo centered">Vendre.</h1>
    <nav>
      <a href="#">New collection</a>
      <a href="#">Men</a>
      <a href="#">Women</a>
      <a href="#" className="cta-link">Sale 🔥</a>
    </nav>
    <button type="button" className="open-menu icon-button">Menu</button>
    <button type="button" className="open-cart" title='Open cart'><CartIcon /><span className='cart-count centered'>3</span></button>
  </header>
);

export default Header;