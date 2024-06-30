import { getUser, logoutUser, verifyTokens } from '@/services/auth.service';
import Cookies from 'js-cookie';
import { useEffect, useState } from 'react';

export const useAuth = () => {
  const [isAuth, setIsAuth] = useState(false);
  const [getUserActive, setGetUserActive] = useState();

  useEffect(() => {
    (async () => {
      const at = Cookies.get('token');
      const user = await getUser(at);
      setGetUserActive(user);
    })();
  }, []);

  const isAuthenticate = async (): Promise<boolean> => {
    const refreshToken = Cookies.get('rs-token');
    const accessToken = Cookies.get('token');

    if (!refreshToken || !accessToken) {
      setIsAuth(false);
      return false;
    }

    try {
      const verify = await verifyTokens(refreshToken, accessToken);

      if (verify) {
        setIsAuth(true);
        return true;
      }
    } catch (error) {
      console.error('Error during authentication:', error);
    }

    setIsAuth(false);
    return false;
  };

  const logout = async () => {
    const accessToken = Cookies.get('token');
    await logoutUser(accessToken);
    Cookies.remove('token');
    Cookies.remove('rs-token');
  };

  return {
    isAuthenticate,
    logout,
    isAuth,
    getUserActive,
  };
};

export type AuthContext = ReturnType<typeof useAuth>;
