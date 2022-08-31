import FilterControl from "./components/FilterControl";
import Header from "./components/Header";
import Product from "./components/Product";
import './App.css';
import { useEffect, useState } from "react";
import ProductSkeleton from "./components/ProductSkeleton";
import FilterControlSkeleton from "./components/FilterControlSkeleton";

type ProductType = {
  brand: string, 
  category: string, 
  description?: string, 
  discountPercentage?: number, 
  id: number, 
  images?: string[], 
  price: number, 
  rating?: number, 
  stock?: number, 
  thumbnail: string, 
  title: string
};

type DummyJsonDataType = {
  products: ProductType[], 
  total: number, 
  skip: number, 
  limit: number
}

const App = () => {
  const [ productData, setProductData ] = useState({} as DummyJsonDataType);

  useEffect(() => {
    fetch("https://dummyjson.com/products/?select=thumbnail,title,price,category,brand")
      .then(res => res.json())
        .then(data => {
          setProductData(data);
        })
          .catch(err => console.error);
  }, []);

  let isLoading: boolean = !Boolean(Object.keys(productData).length);
  let filterMap = new Map<keyof ProductType, any>();

  if (!isLoading) {
    let filterArray: (keyof ProductType)[] = ['price', 'category', 'brand'];
    filterArray.forEach(filter => {
      filterMap.set(filter, productData.products.map(product => product[filter]));
    });
  }

  return (
    <>
      <Header />
      { isLoading ? 
        <FilterControlSkeleton /> :
        <FilterControl minPrice={ Math.min(...filterMap.get('price')) } 
          maxPrice={ Math.max(...filterMap.get('price')) } 
          categories={ filterMap.get('category') } brands={ filterMap.get('brand') }
        /> 
      }
      <main>
        <h2 className="heading">New Arrivals</h2>
        <ul className="product-container">
          { isLoading ? 
            ' '.repeat(10).split('').map((_, i) => (<ProductSkeleton key={ i } />)) :
            productData.products.map((product: ProductType) => (
              <Product id={ product.id }
                key={ product.id }
                name={ product.title }
                image={ product.thumbnail }
                price={ product.price } />
            ))
          }
        </ul>
      </main>
    </>
  );
};

export default App;