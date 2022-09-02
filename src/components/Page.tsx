import FilterControl from "./FilterControl";
import Product from "./Product";
import './Page.css';
import { useEffect, useState } from "react";
import ProductSkeleton from "./ProductSkeleton";
import FilterControlSkeleton from "./FilterControlSkeleton";

export type ProductType = {
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

const Page = ({ name, productsUrl }: { name: string, productsUrl: string }) => {
  const [ productData, setProductData ] = useState({} as DummyJsonDataType);
  const [ wishlist, setWishlist ] = 
    useState((JSON.parse(localStorage.getItem('wishlist')!) || []) as number[]);
  const [ cart, setCart ] = 
    useState((JSON.parse(localStorage.getItem('cart')!) || []) as { id: number, count: number}[]);

  useEffect(() => {
    fetch(productsUrl)
      .then(res => res.json())
        .then(data => setProductData(data))
          .catch(err => console.error);
  }, []);

  useEffect(() => {
    localStorage.setItem('wishlist', JSON.stringify(wishlist));
    console.log(cart);
  }, [wishlist, cart]);

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
      { isLoading ? 
        <FilterControlSkeleton /> :
        <FilterControl minPrice={ Math.min(...filterMap.get('price')) } 
          maxPrice={ Math.max(...filterMap.get('price')) } 
          categories={ filterMap.get('category') } brands={ filterMap.get('brand') }
        /> 
      }
      <main>
        <h2 className="heading">{ name }</h2>
        <ul className="product-container">
          { isLoading ? 
            ' '.repeat(10).split('').map((_, i) => (<ProductSkeleton key={ i } />)) :
            productData.products.map((product: ProductType) => (
              <Product key={ product.id }
                product={ product } 
                onLike={ () => setWishlist([ ...wishlist, product.id ]) } 
                onAddToCart={ 
                  (id, count) => setCart(
                    cart.some(item => item.id == id) ? 
                    cart.map(item => item.id == id ? { id, count } : item) :
                    [ ...cart, { id, count }]
                    )
                }
              />
            ))
          }
        </ul>
      </main>
    </>
  );
};

export default Page;