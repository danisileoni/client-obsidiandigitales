import { ProcessPaymentPage } from '@/pages/ProcessPaymentPage';
import { createFileRoute, redirect } from '@tanstack/react-router';

export const Route = createFileRoute(
  '/shopping-cart/payment/process-payment/$idOrder',
)({
  beforeLoad: async ({ context }) => {
    const { isAuthenticate } = context.authentication;
    const isAuth = await isAuthenticate();
    if (!isAuth) {
      throw redirect({
        to: '/auth/login',
      });
    }
  },
  component: () => <ProcessPayment />,
});

const ProcessPayment = () => {
  const { idOrder } = Route.useParams();

  return <ProcessPaymentPage orderId={idOrder} />;
};
