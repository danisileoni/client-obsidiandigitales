import { config } from './axios-config';
import type { Product, ProductCart, Products } from './types-services';

export const getAllProducts = async (
  limit: number,
  offset: number,
  minPrice?: string,
  maxPrice?: string,
  categories?: string[],
  platform?: string,
  sale?: boolean,
  search?: string,
): Promise<Products> => {
  const params = new URLSearchParams();
  params.append('limit', limit.toString());
  params.append('offset', offset.toString());

  if (minPrice) {
    params.append('minPrice', minPrice);
  }

  if (maxPrice) {
    params.append('maxPrice', maxPrice);
  }

  console.log(categories);

  if (categories && categories.length > 0) {
    for (const category of categories) {
      params.append('tags', category);
    }
  }

  if (platform) {
    params.append('platform', platform);
  }

  if (sale === true) {
    params.append('sale', '1');
  }

  if (search) {
    params.append('search', search);
  }

  const { data } = await config.get(`/products/?${params.toString()}`);

  return data;
};

export const getSearchProduct = async (term: string): Promise<Product[]> => {
  const { data, status } = await config.get(`/products/search/${term}?limit=5`);

  if (status !== 200) throw data;

  return data;
};

export const getSelectedProducts = async (
  products: {
    id: number;
    account: string | null;
  }[],
): Promise<ProductCart[]> => {
  const productsIds = products.map((product) => product.id);

  const { data } = await config.get(
    `/products/select/products?productsId=${productsIds.toString()}`,
  );

  return data;
};

export const getOneProduct = async (term: string): Promise<Product> => {
  const { data } = await config.get(`/products/${term}`);

  return data;
};
