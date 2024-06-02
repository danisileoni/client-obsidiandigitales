import { config } from './axios-config';
import type { Stock } from './types-services';

export const getStockProduct = async (id: string): Promise<Stock> => {
  const { data } = await config.get(`/accounts/stock/${id}`);
  console.log(id);

  return data;
};
