import { lazy } from 'react';
import { createFileRoute, redirect, useNavigate } from '@tanstack/react-router';
import * as v from 'valibot';
const AccountsDashboardPage = lazy(
  () => import('@/pages/dashboard/AccountsDashboardPage'),
);
const ItemFilters = v.object({
  page: v.optional(v.string(), '1'),
});

export type ItemsDashboardFilter = v.InferOutput<typeof ItemFilters>;

export const Route = createFileRoute('/admin/dashboard/panel/accounts')({
  validateSearch: (search) => v.parse(ItemFilters, search),
  beforeLoad: async ({ context }) => {
    const { isAuthenticateDashboard } = context.authentication;
    const isAuth = await isAuthenticateDashboard();

    if (!isAuth) {
      redirect({ to: '/auth/login' });
    }
  },
  component: () => <AccountsDashboard />,
});

function AccountsDashboard() {
  const { page } = Route.useSearch();
  const navigate = useNavigate({ from: Route.fullPath });

  return <AccountsDashboardPage page={page} navigate={navigate} />;
}
