import { config } from './axios-config';
import type {
  InfoProduct,
  Product,
  ProductCart,
  Products,
} from './types-services';

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

export const patchInfoProduct = async (
  id: string,
  formData: FormData,
  token: string | undefined,
): Promise<Product> => {
  const { data, status } = await config.patch(
    `/products/info-products/${id}`,
    formData,
    {
      headers: {
        'Content-Type': 'multipart/form-data',
        Authorization: `Bearer ${token}`,
      },
      withCredentials: true,
    },
  );

  if (status !== 200) throw data;

  return data;
};

export const patchProduct = async (
  id: number,
  body: { price?: number; pricePrimary?: number; priceSecondary?: number },
  token: string | undefined,
): Promise<Product> => {
  const { data, status } = await config.patch(`/products/${id}`, body, {
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`,
    },
    withCredentials: true,
  });

  if (status !== 200) throw data;

  return data;
};

export const postCreateProduct = async (
  body: {
    price?: number;
    pricePrimary?: number;
    priceSecondary?: number;
  },
  platformId: number,
  infoProductId: string,
  token: string | undefined,
) => {
  const { data, status } = await config.post(
    `/products/create/${platformId}/${infoProductId}`,
    body,
    {
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
      withCredentials: true,
    },
  );

  if (status !== 201) throw data;

  return data;
};

export const postCreateInfoProduct = async (
  formData: FormData,
  token: string | undefined,
): Promise<InfoProduct> => {
  const { data, status } = await config.post(
    '/products/info-products/create',
    formData,
    {
      headers: {
        'Content-Type': 'multipart/form-data',
        Authorization: `Bearer $${token}`,
      },
      withCredentials: true,
    },
  );

  if (status !== 201) throw data;

  return data;
};

export const deleteProducts = async (id: number, token: string | undefined) => {
  const { data, status } = await config.delete(`products/info-product/${id}`, {
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`,
    },
    withCredentials: true,
  });

  if (status !== 200) throw data;

  return data;
};
