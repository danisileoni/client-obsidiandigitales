import { lazy, Suspense } from 'react';
const BuysUserPage = lazy(() => import('@/pages/auth/user/BuysUserPage'));
import { createFileRoute, redirect } from '@tanstack/react-router';
import BuysUserPageSkeleton from '@/pages/auth/user/BuysUserPageSkeleton';

export const Route = createFileRoute('/auth/user/buys/$userid')({
  beforeLoad: async ({ context }) => {
    const { isAuthenticate } = context.authentication;
    const isAuth = await isAuthenticate();
    if (!isAuth) {
      throw redirect({
        to: '/auth/login',
      });
    }
  },
  component: () => <BuyRouter />,
});

const BuyRouter = () => {
  const { userid } = Route.useParams();

  return (
    <Suspense fallback={<BuysUserPageSkeleton />}>
      <BuysUserPage userId={userid} />
    </Suspense>
  );
};
