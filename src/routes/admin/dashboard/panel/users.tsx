import { lazy, Suspense } from 'react';
const UsersDashboardPage = lazy(
  () => import('@/pages/dashboard/UsersDashboardPage'),
);
import { createFileRoute, redirect, useNavigate } from '@tanstack/react-router';
import * as v from 'valibot';

const ItemFilters = v.object({
  page: v.optional(v.string(), '1'),
});

export type ItemsDashboardFilter = v.InferOutput<typeof ItemFilters>;

export const Route = createFileRoute('/admin/dashboard/panel/users')({
  validateSearch: (search) => v.parse(ItemFilters, search),
  beforeLoad: async ({ context }) => {
    const { isAuthenticateDashboard } = context.authentication;
    const isAuth = await isAuthenticateDashboard();

    if (!isAuth) {
      throw redirect({ to: '/auth/login' });
    }
  },
  component: () => <UsersDashboard />,
});

function UsersDashboard() {
  const { page } = Route.useSearch();
  const navigate = useNavigate({ from: Route.fullPath });

  return (
    <Suspense
      fallback={<div className="w-full h-screen bg-[#1f1f1f]">Loading...</div>}
    >
      <UsersDashboardPage navigate={navigate} page={page} />
    </Suspense>
  );
}
