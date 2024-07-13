import { BuysUserPage } from '@/pages/auth/user/BuysUserPage';
import { createFileRoute, redirect } from '@tanstack/react-router';

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

  return <BuysUserPage userId={userid} />;
};
