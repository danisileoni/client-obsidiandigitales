export interface Products {
  products: Product[];
  countsProducts: number;
  totalPages: number;
  currentPage: number;
  hasNextPage: boolean;
}

export interface Product {
  id: string;
  title: string;
  description: string;
  slug: string;
  tags: string[];
  productImages: string[];
  products: ProductElement[];
}

export interface ProductCart {
  id: string;
  title: string;
  description: string;
  slug: string;
  tags: string[];
  images: { url: string; id: number }[];
  product: ProductElement[];
}

export interface ProductElement {
  id: number;
  priceSecondary: null | string;
  pricePrimary: null | string;
  price: null | string;
  createAt: Date;
  platform: Platform;
  sale: Sale;
}

export interface Platform {
  id: number;
  namePlatform: string;
}

export interface Sale {
  id: null;
  sale: null;
  saleSecondary: null;
  salePrimary: null;
  salePrice: null;
  finallySaleAt: null;
}

export interface Stock {
  stockPs4: StockPS;
  stockPs5: StockPS;
}

export interface StockPS {
  primary: number;
  secondary: number;
}

export interface RegisterInput {
  name: string;
  email: string;
  username: string;
  password: string;
  confirmPassword: string;
  customError?: string;
}

export interface UpdateInput {
  name?: string;
  email?: string;
  username?: string;
  currentPassword?: string;
  password?: string;
  confirmPassword?: string;
}

export interface LoginInput {
  username: string;
  password: string;
  errorAuthorized?: string;
}

export interface User {
  id: string;
  name: string;
  username: string;
  email: string;
}
