import { createContext } from "react";
import { cartItemType, filterType } from "./types";

export const CartContext = createContext({
  cartState: <cartItemType[]>[], setCart: (value: cartItemType[]) => {}
});
export const WishlistContext = createContext({
  wishlistState: <number[]>[], setWishlist: (value: number[]) => {}
});
export const FilterContext = createContext({
  filterState: <filterType>{}, setFilter: (value: filterType) => {}
});