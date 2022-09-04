import { DummyJsonDataType, ProductType } from "../types";
import FilterBanner, { FilterBannerSkeleton } from "./FilterBanner";
import Product, { ProductSkeleton } from "./Product";
import './Page.css';
import { useEffect, useState } from "react";

const Page = ({ name, productsUrl }: 
    { name: string, productsUrl: string 
  }) => {
  const [ productData, setProductData ] = useState({} as DummyJsonDataType);

  useEffect(() => {
    fetch(productsUrl)
      .then(res => res.json())
        .then(data => setProductData(data))
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
              />
            ))
          }
        </ul>
      </main>
    </>
  );
};

export default Page;