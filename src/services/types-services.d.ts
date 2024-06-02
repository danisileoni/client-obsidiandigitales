export interface Product {
  id: string;
  title: string;
  description: string;
  slug: string;
  tags: string[];
  productImages: string[];
  products: ProductElement[];
}

export interface ProductElement {
  id: number;
  pricePrimary: null | string;
  priceSecondary: null | string;
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
  salePrimary: null;
  saleSecondary: null;
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
