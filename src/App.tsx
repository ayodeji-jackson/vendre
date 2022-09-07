import Header from './components/Header';
import Page from "./components/Page";
import { cartItemType } from './types';
import { Downgraded, hookstate, useHookstate } from '@hookstate/core';
import { useEffect } from 'react';
import { ToastProvider, ToastViewport } from '@radix-ui/react-toast';

export const PAGE_URL = "https://dummyjson.com/products";

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
  const filters = useHookstate(filterGlobalState);

  useEffect(() => {
    localStorage.setItem('cart', JSON.stringify(cart.attach(Downgraded).get()));
  }, [cart]);
  useEffect(() => {
    localStorage.setItem('wishlist', JSON.stringify(wishlist.attach(Downgraded).get()));
  }, [wishlist]);

  return (
    <ToastProvider swipeDirection='right'>
      <ToastViewport className="toast centered" />
      <Header />
      <Page title="New Arrivals"
        productsUrl={ 
          `${PAGE_URL}${filters.get().category ? `/category/${filters.get().category}` : filters.get().search ? `/search` : ''}?select=thumbnail,title,price,category,brand,stock${filters.get().search ? `&q=${filters.get().search}` : ''}&limit=20` 
        } 
      />
    </ToastProvider>
  );
}

export default App;