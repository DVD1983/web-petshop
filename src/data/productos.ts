export interface Product {
  id: string;
  name: string;
  description: string;
  specs: string[];
  price: number;
  image: string;
  categorySlug: string;
  stock: number;
}

export interface Category {
  slug: string;
  name: string;
  image: string;
  description: string;
  gradient: string;
}
