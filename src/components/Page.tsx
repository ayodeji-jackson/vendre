import { DummyJsonDataType, ProductType } from "../types";
import FilterBanner, { FilterBannerSkeleton } from "./FilterBanner";
import Product, { ProductSkeleton } from "./Product";
import './Page.css';
import { useEffect, useState } from "react";
import * as Toast from '@radix-ui/react-toast'

const Page = ({ name, productsUrl }: 
    { name: string, productsUrl: string 
  }) => {
  const [ productData, setProductData ] = useState({} as DummyJsonDataType);
  const [ fetchError, setFetchError ] = useState(false);

  useEffect(() => {
    fetch(productsUrl)
      .then(res => res.json())
        .then(data => setProductData(data))
          .catch(() => setFetchError(true));
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
        <Toast.Root className="overlay toast__body" open={ fetchError }
          onOpenChange={ setFetchError }
        >
          <Toast.Description>
            You're offline
          </Toast.Description>
          <div className="centered">
            <Toast.Action asChild altText="Refresh">
              <button onClick={ () => window.location.reload() } className="button">Refresh</button>
            </Toast.Action>
            <Toast.Close className="toast__close" aria-label="close">
              <span aria-hidden="true">✕</span>
            </Toast.Close>
          </div>
        </Toast.Root>
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