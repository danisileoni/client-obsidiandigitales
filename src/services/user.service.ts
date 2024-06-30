import { config } from './axios-config';
import { User } from './types-services';

export const getOneUser = async (id: string): Promise<User> => {
  const { data, status } = await config.get(`users/${id}`);

  if (status !== 200) throw data;

  return data;
};
