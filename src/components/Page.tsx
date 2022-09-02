import { cartItemType, DummyJsonDataType, ProductType } from "../types";
import FilterBanner, { FilterBannerSkeleton } from "./FilterBanner";
import Product, { ProductSkeleton } from "./Product";
import './Page.css';
import { useEffect, useState } from "react";

const Page = ({ name, productsUrl, returnCart }: 
    { name: string, productsUrl: string, returnCart: (cart: cartItemType[]) => void 
  }) => {
  const [ productData, setProductData ] = useState({} as DummyJsonDataType);
  const [ wishlist, setWishlist ] = 
    useState((JSON.parse(localStorage.getItem('wishlist')!) || []) as number[]);
  const [ cart, setCart ] = 
    useState((JSON.parse(localStorage.getItem('cart')!) || []) as cartItemType[]);

  const cleanCart = (arr: cartItemType[]): cartItemType[] => {
    return [ ...new Map(arr.map(v => [v.id, v])).values() ]
      .filter(item => item.count !== 0);
  };

  useEffect(() => {
    fetch(productsUrl)
      .then(res => res.json())
        .then(data => setProductData(data))
          .catch(err => console.error);
  }, []);

  useEffect(() => {
    localStorage.setItem('wishlist', JSON.stringify(wishlist));
    localStorage.setItem('cart', JSON.stringify(cart));
    returnCart(cart);
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
        <FilterBannerSkeleton /> :
        <FilterBanner minPrice={ Math.min(...filterMap.get('price')) } 
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
                onAddToCart={ count => setCart(cleanCart([ ...cart, { id: product.id, count }]))}
              />
            ))
          }
        </ul>
      </main>
    </>
  );
};

export default Page;