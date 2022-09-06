import './FilterBanner.css';
import { useEffect, useState } from 'react';
import * as Slider from '@radix-ui/react-slider';
import * as styles from '../assets/styles';
import Dropdown from './Dropdown';
import { filterGlobalState } from '../App';
import { useHookstate } from '@hookstate/core';
import { ProductType } from '../types';

const FilterBanner = ({ products }: { products: ProductType[] }) => {
  const [ isExpanded, setExpanded ] = useState(false);
  const filterState = useHookstate(filterGlobalState);
  const [ local, setLocal ] = useState(filterState.get());
  const capitalize = (word: string) => {
    return word[0].toUpperCase() + word.slice(1);
  };
  const minPrice = Math.min(...products.map(({ price }) => price));
  const maxPrice = Math.max(...products.map(({ price }) => price));
  const categories = Array.from(new Set(products.map(({ category }) => category)));
  const brands = Array.from(new Set(products.map(({ brand }) => brand)));

  useEffect(() => {
    setLocal({ ...local, range: [minPrice, maxPrice]});
  }, []);

  useEffect(() => {
    filterState.set(JSON.parse(JSON.stringify(local)));
  }, [local]);
  
  return (
  <div className="filter-banner">
    <button onClick={ () => setExpanded(!isExpanded) } 
      className='centered button' type="button"
    >
      { isExpanded ? 'Close' : 'Open' } filter 
      <span className='icon' aria-hidden="true">{ isExpanded ? '-' : '+' }</span>
    </button>
    <div className={ `more-filters overlay ${isExpanded ? '' : 'is-closed'}` }>
      <Dropdown name="Categories" onValueChange={ value => setLocal({ ...local, category: value }) } 
        value={ local.category }
        items={ categories.map(category => {
          return { name: capitalize(category), value: category }
        }) 
        } 
      />
      <label className='price-range'>Price range: ${ local.range[0] }-${ local.range[1] }
        <Slider.Root className="range-input" aria-label="price range" 
          onValueChange={ value => setLocal({ ...local, range: [...value] }) }
          min={ minPrice } max={ maxPrice } step={ 50 } minStepsBetweenThumbs={ 1 }
          defaultValue={[ minPrice, maxPrice ]} style={ styles.sliderRootStyles }
        >
          <Slider.Track style={ styles.sliderTrackStyles }>
            <Slider.Range style={ styles.sliderRangeStyles } />
          </Slider.Track>
          <Slider.Thumb style={ styles.sliderThumbStyles } />
          <Slider.Thumb style={ styles.sliderThumbStyles } />
        </Slider.Root>
      </label>
      <Dropdown name="Brand" onValueChange={ value => setLocal({ ...local, brand: value }) } 
        value={ local.brand }
        items={ brands.map(brand => {
          return { name: capitalize(brand), value: brand }
        })
        } 
      />
    </div>
    <Dropdown name="Sort by price" 
      value={ local.price } 
      onValueChange={ value => setLocal({ ...local, price: value }) }
      items={ [ { name: "Lowest to highest", value: "asc"}, 
        { name: "Highest to lowest", value: 'desc' } ] 
      } 
    />
  </div>
  );
};

export default FilterBanner;

export const FilterBannerSkeleton = () => (
  <div className="filter-banner filter-banner-skeleton" hidden>
    <span></span>
    <span></span>
  </div>
);