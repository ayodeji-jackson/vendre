import Header from './components/Header';
import Page from "./components/Page";
import { cartItemType } from './types';
import { Downgraded, hookstate, useHookstate } from '@hookstate/core';
import { useEffect } from 'react';
import { ToastProvider, ToastViewport } from '@radix-ui/react-toast';

export const URL = "https://dummyjson.com/products";

export const cartGlobalState = hookstate(
  (JSON.parse(localStorage.getItem('cart')!) || []) as cartItemType[]
);
export const wishlistGlobalState = hookstate(
  (JSON.parse(localStorage.getItem('wishlist')!) || []) as number[]
);

const App = () => {
  const cart = useHookstate(cartGlobalState);
  const wishlist = useHookstate(wishlistGlobalState);

  useEffect(() => {
    localStorage.setItem('cart', JSON.stringify(cart.attach(Downgraded).get()));
  }, [cart.get()]);
  useEffect(() => {
    localStorage.setItem('wishlist', JSON.stringify(wishlist.attach(Downgraded).get()));
  }, [wishlist.get()]);

  return (
    <ToastProvider swipeDirection='right'>
      <ToastViewport className="toast centered" />
      <Header />
      <Page name="New Arrivals"
        productsUrl={ `${URL}?select=thumbnail,title,price,category,brand,stock&limit=5` } 
      />
    </ToastProvider>
  );
}

export default App;