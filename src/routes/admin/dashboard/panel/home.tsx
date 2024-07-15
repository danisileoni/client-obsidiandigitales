import { lazy, Suspense } from 'react';
const HomeDashboardPage = lazy(
  () => import('@/pages/dashboard/HomeDashboardPage'),
);
import { createFileRoute, redirect } from '@tanstack/react-router';

export const Route = createFileRoute('/admin/dashboard/panel/home')({
  beforeLoad: async ({ context }) => {
    const { isAuthenticateDashboard } = context.authentication;
    const isAuth = await isAuthenticateDashboard();

    if (!isAuth) {
      throw redirect({ to: '/auth/login' });
    }
  },
  component: () => (
    <Suspense
      fallback={<div className="w-full h-screen bg-[#1f1f1f]">Loading...</div>}
    >
      <HomeDashboardPage />
    </Suspense>
  ),
});
