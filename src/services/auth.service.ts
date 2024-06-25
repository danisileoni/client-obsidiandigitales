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

export const verifyTokens = async (
  rt: string | undefined,
  at: string | undefined,
): Promise<boolean> => {
  try {
    const { status: rtStatus } = await config.get('/auth/verify-refresh', {
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${rt}`,
      },
    });

    const { status: atStatus } = await config.get('/auth/verify-access', {
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${at}`,
      },
    });

    if (rtStatus === 200 && atStatus === 200) {
      return true;
    }

    return false;
  } catch (error) {
    console.error('Error verifying tokens');
    return false;
  }
};
