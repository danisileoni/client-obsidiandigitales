import { lazy } from 'react';
const ConfigUserPage = lazy(() => import('@/pages/auth/user/ConfigUserPage'));
import { createFileRoute, redirect } from '@tanstack/react-router';

export const Route = createFileRoute('/auth/user/config/$userid')({
  beforeLoad: async ({ context }) => {
    const { isAuthenticate } = context.authentication;
    const isAuth = await isAuthenticate();
    if (!isAuth) {
      throw redirect({
        to: '/auth/login',
      });
    }
  },
  component: () => <ConfigUserRoute />,
});

const ConfigUserRoute = () => {
  const { userid } = Route.useParams();

  return <ConfigUserPage id={userid} />;
};
