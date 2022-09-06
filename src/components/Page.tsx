import { ProductType } from "../types";
import FilterBanner, { FilterBannerSkeleton } from "./FilterBanner";
import Product, { ProductSkeleton } from "./Product";
import './Page.css';
import { useEffect, useState } from "react";
import * as Toast from '@radix-ui/react-toast';

const Page = ({ title, productsUrl }: 
    { title: string, productsUrl: string 
  }) => {
  const [ products, setProducts ] = useState({} as ProductType[]);
  const [ fetchError, setFetchError ] = useState(false);

  useEffect(() => {
    fetch(productsUrl)
      .then(res => res.json())
        .then(data => setProducts(data.products))
          .catch(() => setFetchError(true));
  }, []);

  let isLoading: boolean = !Boolean(Object.keys(products).length);

  return (
    <>
      { isLoading ? 
        <FilterBannerSkeleton /> :
        <FilterBanner products={ products } /> 
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
        <h2 className="heading">{ title }</h2>
        <ul className="product-container">
          { isLoading ? 
            ' '.repeat(10).split('').map((_, i) => (<ProductSkeleton key={ i } />)) :
            products.map((product: ProductType) => (
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