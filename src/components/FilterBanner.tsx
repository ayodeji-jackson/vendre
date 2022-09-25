import './FilterBanner.css';
import { useEffect, useState, useContext } from 'react';
import * as Slider from '@radix-ui/react-slider';
import * as styles from '../assets/styles';
import Dropdown from './Dropdown';
import { ProductType } from '../types';
import { MinusIcon, PlusIcon } from '../assets/icons';
import { FilterContext } from '../Contexts';

const FilterBanner = ({ products }: { products: ProductType[] }) => {
  const [ isExpanded, setExpanded ] = useState(false);
  const { filterState, setFilter } = useContext(FilterContext);
  const capitalize = (word: string) => {
    return word[0].toUpperCase() + word.slice(1);
  };
  const minPrice = Math.min(...products.map(({ price }) => price));
  const maxPrice = Math.max(...products.map(({ price }) => price));
  const categories = Array.from(new Set(products.map(({ category }) => category)));
  // const brands = Array.from(new Set(products.map(({ brand }) => brand)));

  useEffect(() => {
    setFilter({ ...filterState, range: [minPrice, maxPrice]});
  }, [products]);
  
  return (
  <form className="filter-banner">
    <button onClick={ () => setExpanded(!isExpanded) } 
      className='centered button' type="button"
    >
      { isExpanded ? 'Close' : 'Open' } filter 
      <span aria-hidden="true" className='icon centered'>{ isExpanded ? <MinusIcon /> : <PlusIcon /> }</span>
    </button>
    <div className={ `more-filters overlay ${isExpanded ? '' : 'is-closed'}` }>
      <Dropdown name="Categories" onValueChange={ 
          value => setFilter({ ...filterState, category: value }) 
        } 
        value={ filterState.category }
        items={ [ { name: 'All', value: '' }, ...categories.map(category => {
          return { name: capitalize(category), value: category }
        }) ]
        } 
      />
      <label className='price-range'>
        <span>Price range: ${ filterState.range[0] }
        -${ filterState.range[1] }</span>
        <Slider.Root className="range-input" aria-label="price range" 
          onValueChange={ value => setFilter({ ...filterState, range: value }) }
          value={ [filterState.range[0], filterState.range[1]] }
          min={ minPrice } max={ maxPrice } step={ 1 } minStepsBetweenThumbs={ 1 }
          defaultValue={[ minPrice, maxPrice ]} style={ styles.sliderRootStyles }
        >
          <Slider.Track style={ styles.sliderTrackStyles }>
            <Slider.Range style={ styles.sliderRangeStyles } />
          </Slider.Track>
          <Slider.Thumb style={ styles.sliderThumbStyles } />
          <Slider.Thumb style={ styles.sliderThumbStyles } />
        </Slider.Root>
      </label>
      {/* <Dropdown name="Brand" onValueChange={ 
          value => filterState.set({ ...filterState.attach(Downgraded).get(), brand: value }) 
        } 
        value={ filterState.get().brand }
        items={ [ { name: 'All', value: '' }, ...brands.map(brand => {
          return { name: capitalize(brand), value: brand }
        }) ]
        } 
      /> */}
    </div>
    <Dropdown name="Sort by price" 
      value={ filterState.price } onValueChange={ 
        value => setFilter({ ...filterState, price: value }) 
      }
      items={ [ { name: "Lowest to highest", value: "asc"}, 
        { name: "Highest to lowest", value: 'desc' } ] 
      } 
    />
  </form>
  );
};

export default FilterBanner;

export const FilterBannerSkeleton = () => (
  <div className="filter-banner filter-banner-skeleton" hidden>
    <span></span>
    <span></span>
  </div>
);