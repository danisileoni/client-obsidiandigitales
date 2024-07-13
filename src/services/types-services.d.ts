export interface Products {
  products: Product[];
  countsProducts: number;
  totalPages: number;
  currentPage: number;
  hasNextPage: boolean;
}

export interface Payments {
  totalPages: number;
  currentPage: number;
  hasNextPage: boolean;
  payments: Payment[];
}

export interface Payment {
  id: string;
  idPayment: string;
  paymentAt: string;
  email: sting;
  paymentGateway: string;
  order: Order;
}

export interface Order {
  id: number;
  createAt: Date;
  total: string;
  paid: boolean;
  details: Detail[];
  user: User;
}

export interface Detail {
  id: number;
  quantityPrimary: string;
  quantitySecondary: string;
  quantitySteam: string;
  quantityPlayStation3: string;
  product: Product;
}

export interface Product {
  id: number;
  pricePrimary: null;
  priceSecondary: null;
  price: string;
  createAt: Date;
}

export interface User {
  id: string;
  name: string;
  username: string;
  email: string;
  createAt: Date;
  roles: string;
  isActive: boolean;
  hashRefreshToken: null;
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
  id: number | null;
  sale: number | null;
  saleSecondary: string | null;
  salePrimary: string | null;
  salePrice: string | null;
  finallySaleAt: Date | null;
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

export interface LoginDashboard {
  email: string;
  password: string;
  errorAuthorized?: string;
}

export interface User {
  id: string;
  name: string;
  username: string;
  email: string;
}

export interface CreateOrder {
  items: ({
    quantityPrimary: number;
    quantitySecondary: number;
    quantityPlayStation3: number;
    quantitySteam: number;
    idProduct: number;
  } | null)[];
}

export interface Order {
  details: Detail[];
  id: number;
  total: number;
  createAt: string;
  paid: boolean;
}

export interface Detail {
  quantityPrimary: number;
  quantitySecondary: number;
  quantitySteam: number;
  quantityPlayStation3: number;
  product: Product;
  id: number;
}

export interface Product {
  id: number;
  pricePrimary: null;
  priceSecondary: null;
  price: string;
  createAt: Date;
  sale: null;
}

export interface BodyPayment {
  token?: string;
  email?: string;
  method?: string;
  type?: string;
  numbers?: string;
  paymentGateway: string;
}

export interface FindOrderUser {
  id: number;
  createAt: string;
  total: string;
  paid: boolean;
  details: Detail[];
}

export interface Detail {
  id: number;
  quantityPrimary: string;
  quantitySecondary: string;
  quantitySteam: string;
  quantityPlayStation3: string;
  product: Product;
}

export interface Product {
  id: number;
  pricePrimary: null;
  priceSecondary: null;
  price: string;
  createAt: Date;
  infoProduct: InfoProduct;
  sale: Sale | null;
}

export interface InfoProduct {
  id: string;
  title: string;
  description: string;
  slug: Slug;
  tags: string[];
  createAt: CreateAt;
  images: Image[];
}

export interface Image {
  id: number;
  url: string;
}

export interface Sale {
  id: number;
  sale: number;
  salePrimary: null;
  saleSecondary: null;
  salePrice: string;
  finallySaleAt: string;
  createAt: string;
}

export interface InfoProduct {
  title: string;
  description: string;
  tags: string[];
  images: Image[];
  slug: string;
  id: string;
  createAt: string;
}

export interface Image {
  url: string;
  id: number;
}

export interface Users {
  totalPages: number;
  currentPage: number;
  hasNextPage: boolean;
  users: UserElement[];
}

export interface UserElement {
  id: string;
  name: string;
  username: string;
  email: string;
  createAt: Date;
  roles: Role[];
  isActive: boolean;
  hashRefreshToken: null | string;
}

export enum Role {
  admin = 'admin',
  superUser = 'super-user',
  user = 'user',
}
