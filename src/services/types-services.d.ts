export interface Product {
  id: string;
  title: string;
  description: string;
  slug: string;
  tags: string[];
  productImages: ProductImage[];
  products: ProductElement[];
}

export interface ProductImage {
  id: number;
  url: string;
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
  id: number | null;
  sale: number | null;
  salePrimary: null | string;
  saleSecondary: null | string;
  salePrice: null | string;
  finallySaleAt: null | string;
}
