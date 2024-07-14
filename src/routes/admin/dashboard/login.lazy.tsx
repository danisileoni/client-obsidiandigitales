import { LoginDashboardPage } from '@/pages/dashboard/LoginDashboardPage';
import { createLazyFileRoute } from '@tanstack/react-router';

export const Route = createLazyFileRoute('/admin/dashboard/login')({
  component: () => <LoginDashboardPage />,
});
