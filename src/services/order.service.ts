import { config } from './axios-config';

export const orderCreate = async (token: string, body) => {
  const { data, status } = await config.post('/orders/create', body, {
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`,
    },
    withCredentials: true,
  });

  if (status !== 200) throw data;

  return data;
};
