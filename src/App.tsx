import Header from './components/Header';
import Page from "./components/Page";
import { cartItemType, filterType } from './types';
import { CartContext, WishlistContext, FilterContext } from './Contexts';
import { useEffect, useState } from 'react';
import { ToastProvider, ToastViewport } from '@radix-ui/react-toast';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { HeartIcon } from './assets/icons';

export const PAGE_URL = "https://fakestoreapi.com/products";

const App = () => {
  const [ cartState, setCartState ] = 
    useState<cartItemType[]>(JSON.parse(localStorage.getItem('cart')!));
  const [ wishlistState, setWishlistState ] = 
    useState<number[]>(JSON.parse(localStorage.getItem('wishlist')!));
  const [ filterState, setFilterState ] = useState({
    category: '', brand: '', price: '', range: [0, 1000], search: ''
  });

  const setCart = (value: cartItemType[]) => setCartState(value);
  const setWishlist = (value: number[]) => setWishlistState(value);
  const setFilter = (value: filterType) => setFilterState(value);

  useEffect(() => {
    localStorage.setItem('cart', JSON.stringify(cartState));
  }, [cartState]);
  useEffect(() => {
    localStorage.setItem('wishlist', JSON.stringify(wishlistState));
  }, [wishlistState]);

  return (
    <BrowserRouter>
      <ToastProvider swipeDirection='right'>
        <ToastViewport className="toast centered" />
        <CartContext.Provider value={{ cartState, setCart }}>
          <WishlistContext.Provider value={{ wishlistState, setWishlist }}>
            <FilterContext.Provider value={{ filterState, setFilter }}>
              <Header />
              <Routes>
                <Route path="/" element={
                  <Page title="New Arrivals" urls={ [PAGE_URL] } />
                } />
                <Route path="/wishlist" element={
                  <Page title="Wishlist" icon={ <HeartIcon /> }
                    urls={ wishlistState.map(id => `${PAGE_URL}/${id}`) } />
                } />
                <Route path="/mens-clothing" element={
                  <Page title="Men's Clothing" urls={ [`${PAGE_URL}/category/men's%20clothing`] } />
                } />
                <Route path="/womens-clothing" element={
                  <Page title="Women's Clothing" urls={ [`${PAGE_URL}/category/women's%20clothing`] } />
                } />
              </Routes>
            </FilterContext.Provider>
          </WishlistContext.Provider>
        </CartContext.Provider>
      </ToastProvider>
    </BrowserRouter>
  );
}

export default App;