import { createFileRoute, redirect, useNavigate } from '@tanstack/react-router';
import * as v from 'valibot';
import { DiscountsDashboardPage } from '../../../../pages/dashboard/DiscountsDashboardPage';

const ItemFilters = v.object({
  page: v.optional(v.string(), '1'),
});

export type ItemsDashboardFilter = v.InferOutput<typeof ItemFilters>;

export const Route = createFileRoute('/admin/dashboard/panel/discounts')({
  validateSearch: (search) => v.parse(ItemFilters, search),
  beforeLoad: async ({ context }) => {
    const { isAuthenticateDashboard } = context.authentication;
    const isAuth = await isAuthenticateDashboard();

    if (!isAuth) {
      redirect({ to: '/auth/login' });
    }
  },
  component: () => <DiscountsDashboard />,
});

function DiscountsDashboard() {
  const { page } = Route.useSearch();
  const navigate = useNavigate({ from: Route.fullPath });

  return <DiscountsDashboardPage navigate={navigate} page={page} />;
}
