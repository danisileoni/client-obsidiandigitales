import { config } from './axios-config';
import { CreateOrder, FindOrderUser, Order } from './types-services';

export const createOrder = async (
  token: string | undefined,
  body: CreateOrder,
): Promise<Order> => {
  const { data, status } = await config.post('/orders/create', body, {
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`,
    },
    withCredentials: true,
  });

  if (status !== 201) throw data;

  return data;
};

export const findOrder = async (id: string): Promise<Order> => {
  const { data, status } = await config.get(`/orders/search/${id}`);

  if (status !== 200) throw data;

  return data;
};

export const findOrderUser = async (id: string): Promise<FindOrderUser[]> => {
  const { data, status } = await config.get(`/orders/user/${id}`);

  if (status !== 200) throw data;

  return data;
};

export const getTotalProceeds = async (): Promise<{ total: number }> => {
  const { data, status } = await config.get('/orders/total');

  if (status !== 200) throw data;

  return data;
};

export const getTotalByMonth = async (): Promise<
  {
    month: number;
    total: string | null;
  }[]
> => {
  const { data, status } = await config.get('/orders/total-by-month');

  if (status !== 200) throw data;

  return data;
};

export const getCountOrderPaid = async (): Promise<
  {
    month: number;
    total: string | null;
  }[]
> => {
  const { data, status } = await config.get('/orders/count-order-paid');

  if (status !== 200) throw data;

  return data;
};
