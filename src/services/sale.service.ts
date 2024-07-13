import { config } from './axios-config';

export const postCreateSale = async (
  id: number,
  body: { sale: number | null },
  token: string | undefined,
) => {
  const { data, status } = await config.post(`/sales/create/${id}`, body, {
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`,
    },
    withCredentials: true,
  });

  if (status !== 201) throw data;

  return data;
};

export const postSetterTimer = async (
  body: {
    title: string;
    endDate: Date | null;
  },
  token: string | undefined,
) => {
  const { data, status } = await config.post(
    '/sales/setter-timer-sales',
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

export const deleteSale = async (id: number, token: string | undefined) => {
  const { data, status } = await config.delete(`/sales/${id}`, {
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`,
    },
    withCredentials: true,
  });

  if (status !== 200) throw data;

  return data;
};
