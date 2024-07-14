import { lazy } from 'react';
const HomeDashboardPage = lazy(
  () => import('@/pages/dashboard/HomeDashboardPage'),
);
import { createFileRoute, redirect } from '@tanstack/react-router';

export const Route = createFileRoute('/admin/dashboard/panel/home')({
  beforeLoad: async ({ context }) => {
    const { isAuthenticateDashboard } = context.authentication;
    const isAuth = await isAuthenticateDashboard();

    if (!isAuth) {
      redirect({ to: '/auth/login' });
    }
  },
  component: () => <HomeDashboardPage />,
});
