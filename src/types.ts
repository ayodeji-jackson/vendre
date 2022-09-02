export type cartItemType = {
  id: number, count: number
};

export type ProductType = {
  brand: string, 
  category: string, 
  description?: string, 
  discountPercentage?: number, 
  id: number, 
  images?: string[], 
  price: number, 
  rating?: number, 
  stock?: number, 
  thumbnail: string, 
  title: string
};

export type DummyJsonDataType = {
  products: ProductType[], 
  total: number, 
  skip: number, 
  limit: number
};

type DropdownMenuItemType = {
  name: string,
  value: string, 
};

export type DropdownMenuType = {
  name: string, 
  items: DropdownMenuItemType[], 
  value?: string, 
  onValueChange?: (value: string) => void
};

export type FilterBannerPropsType = { 
  categories: string[], 
  brands: string[], 
  minPrice: number,
  maxPrice: number, 
 };