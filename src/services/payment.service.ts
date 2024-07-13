import { config } from './axios-config';
import { BodyPayment, Payments } from './types-services';

export const createPay = async (
  id: string,
  body: BodyPayment,
  token: string | undefined,
) => {
  const { data, status } = await config.post(`payments/create/${id}`, body, {
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`,
    },
    withCredentials: true,
  });

  if (status !== 201) throw data;

  return data;
};

export const getPayments = async (
  limit: number,
  offset: number,
  token: string | undefined,
  search?: string | undefined,
): Promise<Payments> => {
  const params = new URLSearchParams();

  params.append('limit', limit.toString());

  params.append('offset', offset.toString());

  if (search) {
    params.append('search', search);
  }

  const { data, status } = await config.get(`/payments/?${params.toString()}`, {
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`,
    },
    withCredentials: true,
  });

  if (status !== 200) throw data;

  return data;
};
