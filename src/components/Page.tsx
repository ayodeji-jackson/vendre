import { ProductType } from "../types";
import FilterBanner, { FilterBannerSkeleton } from "./FilterBanner";
import Product, { ProductSkeleton } from "./Product";
import './Page.css';
import { useEffect, useState } from "react";
import * as Toast from '@radix-ui/react-toast';
import { useHookstate } from "@hookstate/core";
import { filterGlobalState } from "../App";

const Page = ({ title, productsUrl }: 
    { title: string, productsUrl: string 
  }) => {
  const [ products, setProducts ] = useState([] as ProductType[]);
  const [ refetchedProducts, setRefetchedProducts ] = useState([] as ProductType[]);
  const [ fetchError, setFetchError ] = useState(false);
  const [ minPrice, maxPrice ] = useHookstate(filterGlobalState).get().range;
  const categoryFilter = useHookstate(filterGlobalState).get().category;
  const brandFilter = useHookstate(filterGlobalState).get().brand;
  const priceFilter = useHookstate(filterGlobalState).get().price;
  const isLoading: boolean = !Boolean(Object.keys(products).length);

  useEffect(() => {
    fetch(productsUrl)
      .then(res => res.json())
        .then(data => setProducts(data.products))
          .catch(() => setFetchError(true));
  }, []);

  useEffect(() => {
    setRefetchedProducts([] as ProductType[]);
    fetch(productsUrl)
      .then(res => res.json())
        .then(data => setRefetchedProducts(data.products))
          .catch(() => setFetchError(true));
  }, [productsUrl]);

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
            refetchedProducts
              .filter(({ category }) => categoryFilter.length ? category === categoryFilter : true)
              .filter(({ price }) => price >= minPrice && price <= maxPrice)
              .filter(({ brand }) => brandFilter.length ? brand === brandFilter : true)
              .sort((a, b) => priceFilter === 'asc' ? a.price - b.price : b.price - a.price)
              .map((prod: ProductType) => (
                <Product key={ prod.id }
                  product={ prod }
                />
              )
            )
          }
        </ul>
      </main>
    </>
  );
};

export default Page;