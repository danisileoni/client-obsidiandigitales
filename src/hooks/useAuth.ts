import { verifyTokens } from '@/services/auth.service';
import Cookies from 'js-cookie';
import { useState } from 'react';

export const useAuth = () => {
  const [isAuth, setIsAuth] = useState(false);

  const isAuthenticate = async (): Promise<boolean> => {
    const refreshToken = Cookies.get('rs-token');
    const accessToken = Cookies.get('token');

    if (!refreshToken || !accessToken) {
      setIsAuth(false);
    }

    try {
      const verify = await verifyTokens(refreshToken, accessToken);

      if (verify) {
        setIsAuth(true);
      }
    } catch (error) {
      console.error('Error during authentication:', error);
    }

    return false;
  };

  return {
    isAuthenticate,
    isAuth,
  };
};
