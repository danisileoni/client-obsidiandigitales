import { PaymentPage } from '@/pages/PaymentPage';
import { createFileRoute, redirect } from '@tanstack/react-router';

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
  component: () => PaymentPage,
});
