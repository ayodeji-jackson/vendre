import Header from './components/Header';
import Page from "./components/Page";
import { cartItemType } from './types';
import { Downgraded, hookstate, useHookstate } from '@hookstate/core';
import { useEffect } from 'react';
import { ToastProvider, ToastViewport } from '@radix-ui/react-toast';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { HeartIcon } from './assets/icons';

export const PAGE_URL = "https://fakestoreapi.com/products";

export const cartGlobalState = hookstate(
  (JSON.parse(localStorage.getItem('cart')!) || []) as cartItemType[]
);
export const wishlistGlobalState = hookstate(
  (JSON.parse(localStorage.getItem('wishlist')!) || []) as number[]
);
export const filterGlobalState = hookstate({
  category: '', brand: '', price: '', range: [0, 1000], search: ''
});

const App = () => {
  const cart = useHookstate(cartGlobalState);
  const wishlist = useHookstate(wishlistGlobalState);

  useEffect(() => {
    localStorage.setItem('cart', JSON.stringify(cart.attach(Downgraded).get()));
  }, [cart]);
  useEffect(() => {
    localStorage.setItem('wishlist', JSON.stringify(wishlist.attach(Downgraded).get()));
  }, [wishlist]);

  return (
    <BrowserRouter>
      <ToastProvider swipeDirection='right'>
        <ToastViewport className="toast centered" />
        <Header />
        <Routes>
          <Route path="/" element={
            <Page title="New Arrivals" urls={ [PAGE_URL] } />
          } />
          <Route path="/wishlist" element={
            <Page title="Wishlist" icon={ <HeartIcon /> }
              urls={ wishlist.get().map(id => `${PAGE_URL}/${id}`) } />
          } />
          <Route path="/mens-clothing" element={
            <Page title="Men's Clothing" urls={ [`${PAGE_URL}/category/men's%20clothing`] } />
          } />
          <Route path="/womens-clothing" element={
            <Page title="Women's Clothing" urls={ [`${PAGE_URL}/category/women's%20clothing`] } />
          } />
        </Routes>
      </ToastProvider>
    </BrowserRouter>
  );
}

export default App;