import './FilterControl.css';
import { useEffect, useState } from 'react';
import * as Slider from '@radix-ui/react-slider';
import * as styles from '../assets/styles';
import Dropdown from './Dropdown';

type FilterControlProps = { 
  categories: string[], 
  brands: string[], 
  minPrice: number,
  maxPrice: number, 
 };

const FilterControl = ({ categories, brands, minPrice, maxPrice }: FilterControlProps) => {
  const [ isExpanded, setExpanded ] = useState(false);
  const [ categorySort, setCategorySort ] = useState('');
  const [ rangeSort, setRangeSort ] = useState([ minPrice, maxPrice ]);
  const [ brandSort, setBrandSort ] = useState('');
  const [ priceSort, setPriceSort ] = useState('');

  useEffect(() => {
    // handling form events on component update
  }, [priceSort, categorySort, rangeSort, brandSort]);
  
  categories = Array.from(new Set(categories)); // remove duplicates
  brands = Array.from(new Set(brands));
  
  return (
  <form className="filter-container">
    <button onClick={ () => setExpanded(!isExpanded) } 
      className='centered button' type="button"
    >
      { isExpanded ? 'Close' : 'Open' } filter 
      <span className='icon' aria-hidden="true">{ isExpanded ? '-' : '+' }</span>
    </button>
    <div className={ `more-filters overlay ${isExpanded ? '' : 'is-closed'}` }>
      <Dropdown name="Categories" onValueChange={ setCategorySort } value={ categorySort }
        items={ categories.map(category => {
          return { name: capitalize(category), value: category }
        }) 
        } 
      />
      <label className='price-range'>Price range: ${ rangeSort[0] }-${ rangeSort[1] }
        <Slider.Root className="range-input" aria-label="price range" 
          onValueChange={ setRangeSort } value={[ rangeSort[0], rangeSort[1] ]}
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
      <Dropdown name="Brand" onValueChange={ setBrandSort } value={ brandSort }
        items={ brands.map(brand => {
          return { name: capitalize(brand), value: brand }
        })
        } 
      />
    </div>
    <Dropdown name="Sort by price" value={ priceSort } 
      onValueChange={ setPriceSort }
      items={ [ { name: "Lowest to highest", value: "asc"}, 
        { name: "Highest to lowest", value: 'desc' } ] 
      } 
    />
  </form>
  );
};

function capitalize(word: string) {
  return word[0].toUpperCase() + word.slice(1);
}

export default FilterControl;