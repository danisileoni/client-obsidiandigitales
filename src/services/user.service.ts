import { config } from './axios-config';
import { User, Users } from './types-services';

export const getOneUser = async (id: string): Promise<User> => {
  const { data, status } = await config.get(`users/search/${id}`);

  if (status !== 200) throw data;

  return data;
};

export const getCountUsers = async (): Promise<{ total: number }> => {
  const { data, status } = await config.get('users/count');

  if (status !== 200) throw data;

  return data;
};

export const getUsersAll = async (
  limit: number,
  offset: number,
  token: string | undefined,
  search: string,
): Promise<Users> => {
  const params = new URLSearchParams();

  params.append('limit', limit.toString());

  params.append('offset', offset.toString());

  if (search) {
    params.append('search', search);
  }

  const { data, status } = await config.get(`users/?${params.toString()}`, {
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`,
    },
    withCredentials: true,
  });

  if (status !== 200) throw data;

  return data;
};

export const deleteUser = async (id: string, token: string | undefined) => {
  const { data, status } = await config.delete(`/users/${id}`, {
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`,
    },
    withCredentials: true,
  });

  if (status !== 200) throw data;

  return data;
};
