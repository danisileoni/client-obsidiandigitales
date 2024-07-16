import { config } from './axios-config';
import type { Stock } from './types-services';

export const getStockProduct = async (id: string): Promise<Stock> => {
  const { data } = await config.get(`/accounts/stock/${id}`);

  return data;
};

export const getAccountActives = async (): Promise<{ total: number }> => {
  const { data, status } = await config.get('/accounts/count');

  if (status !== 200) throw data;

  return data;
};

export const getQuantityAccounts = async (body: {
  productsId: string[] | undefined;
}): Promise<Array<{ id: number; quantity: number }>> => {
  const params = body.productsId
    ? { productsId: body.productsId.join(',') }
    : {};

  const { data, status } = await config.get('/accounts/find-accounts', {
    headers: {
      'Content-Type': 'application/json',
    },
    params,
  });

  if (status !== 200) throw data;

  return data;
};

export const postCreateAccount = async (
  body: {
    idProduct: number;
    email: string;
    password: string;
    quantityPrimary?: number | null;
    quantitySecondary?: number | null;
    typeAccount: string;
  },
  token: string | undefined,
): Promise<Array<{ id: number; quantity: number }>> => {
  const { data, status } = await config.post('/accounts/create', body, {
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`,
    },
    withCredentials: true,
  });

  if (status !== 201) throw data;

  return data;
};
