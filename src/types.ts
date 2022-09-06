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
