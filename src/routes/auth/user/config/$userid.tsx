import { lazy, Suspense } from 'react';
import { createFileRoute, redirect } from '@tanstack/react-router';
import { ConfigUserPageSkeleton } from '@/pages/auth/user/ConfigUserPageSkeleton';
const ConfigUserPage = lazy(() => import('@/pages/auth/user/ConfigUserPage'));

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

  return (
    <Suspense fallback={<ConfigUserPageSkeleton />}>
      <ConfigUserPage id={userid} />
    </Suspense>
  );
};
