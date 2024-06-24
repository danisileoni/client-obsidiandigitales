import { config } from './axios-config';
import { LoginInput, RegisterInput } from './types-services';

export const registerAuth = async (registerBody: RegisterInput) => {
  const { data, status } = await config.post('/auth/register', registerBody, {
    headers: {
      'Content-Type': 'application/json',
      withCredentials: true,
    },
  });

  if (status !== 200) throw data;

  return data;
};

export const loginAuth = async (loginBody: LoginInput) => {
  const { data, status } = await config.post('/auth/login', loginBody, {
    headers: {
      'Content-Type': 'application/json',
      withCredentials: true,
    },
  });

  if (status !== 200) throw data;

  return data;
};

export const loginGoogle = async () => {
  const { data } = await config.get('/auth/google/login', {
    headers: {
      'Content-Type': 'application/json',
      withCredentials: true,
    },
  });

  return data;
};
