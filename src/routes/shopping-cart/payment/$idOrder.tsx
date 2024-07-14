import { lazy, Suspense } from 'react';
const PaymentPage = lazy(() => import('@/pages/PaymentPage'));
import { createFileRoute, redirect } from '@tanstack/react-router';
import { PaymentPageSkeleton } from '@/pages/PaymentPageSkeleton';

export const Route = createFileRoute('/shopping-cart/payment/$idOrder')({
  beforeLoad: async ({ context }) => {
    const { isAuthenticate } = context.authentication;
    const isAuth = await isAuthenticate();
    if (!isAuth) {
      throw redirect({
        to: '/auth/login',
      });
    }
  },
  component: () => <PaymentParams />,
});

const PaymentParams = () => {
  const { idOrder } = Route.useParams();

  return (
    <Suspense fallback={<PaymentPageSkeleton />}>
      <PaymentPage id={idOrder} />
    </Suspense>
  );
};
