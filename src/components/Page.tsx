import { ProductType } from "../types";
import FilterBanner, { FilterBannerSkeleton } from "./FilterBanner";
import Product, { ProductSkeleton } from "./Product";
import './Page.css';
import { useEffect, useState, useContext } from "react";
import * as Toast from '@radix-ui/react-toast';
import { FilterContext } from "../Contexts";

const Page = ({ title, urls, icon }: 
    { title: string, urls: string[], icon?: JSX.Element 
  }) => {
  const { filterState, setFilter } = useContext(FilterContext);
  const [ products, setProducts ] = useState([] as ProductType[]);
  const [ fetchError, setFetchError ] = useState(false);
  const [ minPrice, maxPrice ] = filterState.range;
  const categoryFilter = filterState.category;
  const searchFilter = filterState.search;
  // const brandFilter = filterState.brand;
  const priceFilter = filterState.price;
  const isLoading: boolean = !Boolean(Object.keys(products).length);

  useEffect(() => {
    setProducts([]);
    setFilter({...filterState, 
      category: '', brand: '', price: '', search: ''
    }); // reset filters
    Promise.all(
      urls.map(url => fetch(url))
    ).then(responses => Promise.all(responses.map(res => res.json()))
      .then(values => setProducts(values.flat())))
      .catch(err => setFetchError(true));
  }, [title]);

  return (
    !urls.length ? 
    <div className="empty-page-message centered">
      { icon }
      <p>No items in { title }</p>
    </div> : 
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
            Something went wrong
          </Toast.Description>
          <div className="centered">
            <Toast.Action asChild altText="Refresh">
              <button onClick={ () => window.location.reload() } className="button toast__button">Refresh</button>
            </Toast.Action>
            <Toast.Close className="toast__close" aria-label="close">
              <span aria-hidden="true">✕</span>
            </Toast.Close>
          </div>
        </Toast.Root>
        <h2 className="heading">{ title }</h2>
        <ul className="product-container">
          { isLoading ? 
            [...Array(10)].map((_, i) => (<ProductSkeleton key={ i } />)) :
            products
              .filter(({ category }) => categoryFilter.length ? category === categoryFilter : true)
              .filter(({ price }) => price >= minPrice && price <= maxPrice)
              // .filter(({ brand }) => brandFilter.length ? brand === brandFilter : true)
              .filter(({ title, category }) => new RegExp(searchFilter.toLowerCase()).test(title.toLowerCase() + category.toLowerCase()))
              .sort((a, b) => priceFilter === 'asc' ? a.price - b.price : priceFilter === 'desc' ? b.price - a.price : 0)
              .map((prod: ProductType) => (
                <Product key={ prod.id }
                  product={ prod } setFetchError={ setFetchError }
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