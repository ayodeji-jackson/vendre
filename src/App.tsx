import { createContext } from 'react';
import Header from './components/Header';
import Page from "./components/Page";

export const CartContext = createContext({
  cart: [] as { id: number, count: number }[], 
  updateCart: (): void => {}
});

const App = () => (
  <>
    <Header />
    <Page name="New Arrivals"
      productsUrl="https://dummyjson.com/products/?select=thumbnail,title,price,category,brand,stock&limit=5" 
    />
  </>
);

export default App;