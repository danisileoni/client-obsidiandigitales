import { config } from './axios-config';
import type { Product } from './types-services';

export const getAllProducts = async (
  limit: number,
  offset: number,
): Promise<Product[]> => {
  const { data } = await config.get(
    `/products/?limit=${limit}&offset=${offset}`,
  );

  return data;
};

export const getOneProduct = async (term: string): Promise<Product> => {
  const { data } = await config.get(`/products/${term}`);

  return data;
};
