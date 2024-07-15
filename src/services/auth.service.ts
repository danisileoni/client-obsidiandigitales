import { AxiosError } from 'axios';
import { config } from './axios-config';
import {
  LoginDashboard,
  LoginInput,
  RegisterInput,
  UpdateInput,
} from './types-services';

export const registerAuth = async (registerBody: RegisterInput) => {
  const { data, status } = await config.post('/auth/register', registerBody, {
    headers: {
      'Content-Type': 'application/json',
    },
    withCredentials: true,
  });

  if (status !== 200) throw data;

  return data;
};

export const loginAuth = async (loginBody: LoginInput) => {
  const { data, status } = await config.post('/auth/login', loginBody, {
    headers: {
      'Content-Type': 'application/json',
    },
    withCredentials: true,
  });

  if (status !== 200) throw data;

  return data;
};

export const forgotPassword = async (
  token: string,
  forgotBody: { password: string; confirmPassword: string },
) => {
  const { data, status } = await config.post(
    `/auth/forgot-password/${token}`,
    forgotBody,
    {
      headers: {
        'Content-Type': 'application/json',
      },
      withCredentials: true,
    },
  );

  if (status !== 201) throw data;

  return data;
};

export const sendForgotPassword = async (forgotBody: { email: string }) => {
  const { data, status } = await config.post(
    '/auth/send-forgot-password',
    forgotBody,
    {
      headers: {
        'Content-Type': 'application/json',
      },
      withCredentials: true,
    },
  );

  if (status !== 201) throw data;

  return data;
};

export const loginAuthDashboard = async (loginBody: LoginDashboard) => {
  const { data, status } = await config.post(
    '/auth/login-dashboard',
    loginBody,
    {
      headers: {
        'Content-Type': 'application/json',
      },
      withCredentials: true,
    },
  );

  if (status !== 200) throw data;

  return data;
};

export const loginGoogle = async () => {
  const { data } = await config.get('/auth/google/login', {
    headers: {
      'Content-Type': 'application/json',
    },
    withCredentials: true,
  });

  return data;
};

export const verifyTokens = async (
  rt: string | undefined,
  at: string | undefined,
): Promise<boolean> => {
  try {
    const { status: atStatus } = await config.get('/auth/verify-access', {
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${at}`,
      },
    });

    if (atStatus === 200) {
      return true;
    }
  } catch (error) {
    if (error instanceof AxiosError) {
      const { status: refreshStatus } = await config.post(
        '/auth/refresh',
        {},
        {
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${rt}`,
          },
          withCredentials: true,
        },
      );

      if (refreshStatus === 200) {
        return true;
      }
    }
  }

  return false;
};

export const verifyTokensDashboard = async (
  rt: string | undefined,
  at: string | undefined,
): Promise<boolean> => {
  try {
    const { status: atStatus } = await config.get(
      '/auth/verify-access-dashboard',
      {
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${at}`,
        },
        withCredentials: true,
      },
    );

    if (atStatus === 200) {
      return true;
    }
  } catch (error) {
    if (error instanceof AxiosError) {
      const { status: refreshStatus } = await config.post(
        '/auth/refresh-dashboard',
        {},
        {
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${rt}`,
          },
          withCredentials: true,
        },
      );

      if (refreshStatus === 200) {
        return true;
      }
    }
  }

  return false;
};

export const getUser = async (at: string | undefined) => {
  const { data, status } = await config.get('/auth/active', {
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${at}`,
    },
  });

  if (status !== 200) throw data;

  return data;
};

export const logoutUser = async (at: string | undefined) => {
  const { data } = await config.post(
    '/auth/logout',
    {},
    {
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${at}`,
      },
    },
  );

  return data;
};

export const updateAuth = async (updateBody: UpdateInput, id: string) => {
  const { data, status } = await config.patch(`/auth/${id}`, updateBody, {
    headers: {
      'Content-Type': 'application/json',
    },
    withCredentials: true,
  });

  if (status !== 200) throw data;

  return data;
};
