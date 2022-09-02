import { useState } from 'react';
import Header from './components/Header';
import Page from "./components/Page";
import { cartItemType } from './types';

const App = () => {
  const [ cart, setCart ] = useState([] as cartItemType[]);
  const getCart = (pageCart: cartItemType[]) => {
    setCart(pageCart);
  };

  return (
    <>
      <Header cart={ cart } />
      <Page name="New Arrivals"
        productsUrl="https://dummyjson.com/products/?select=thumbnail,title,price,category,brand,stock&limit=5" 
        returnCart={ getCart }
      />
    </>
  );
}

export default App;