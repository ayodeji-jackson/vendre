import { useEffect, useState } from "react";
import { HeartIcon } from "../assets/icons";

export type ProductType = { id: number, name: string, image: string, price: number };

const Product = ({ id, name, image, price }: ProductType) => {
  const [ liked, setLiked ] = useState(false);
  let wishlist = JSON.parse(localStorage.getItem('wishlist')!) as number[];

  useEffect(() => {
    if (wishlist && wishlist.includes(id))
      setLiked(true);
  }, []);

  useEffect(() => {
    if (liked && wishlist && !wishlist.includes(id)) {
      wishlist.push(id);
      localStorage.setItem('wishlist', JSON.stringify(wishlist));
    } else if (liked && !wishlist) {
      localStorage.setItem('wishlist', JSON.stringify([id]));
    } else if (!liked && wishlist.includes(id)) {
      wishlist = wishlist.filter(wishID => wishID != id);
      localStorage.setItem('wishlist', JSON.stringify(wishlist));
    }
  });

  return (
    <li className="product">
      <button type="button" title="Add to wishlist" 
        onClick={ () => setLiked(!liked) }
        className={ `product__add-to-wishlist centered ${liked ? 'liked' : ''}` }
      >
        <HeartIcon />
      </button>
      <img alt="Product image" src={ image } className="product__image" />
      <p className="product__name">{ name }</p>
      <div className="product-end">
        <p className="product__price">${ price.toLocaleString() }</p>
        <button className="product__add-to-cart button">Add to cart</button>
      </div>
    </li>
  );
};

export default Product;