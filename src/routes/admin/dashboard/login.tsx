import { LoginDashboardPage } from '@/pages/dashboard/LoginDashboardPage';
import { createFileRoute } from '@tanstack/react-router';

export const Route = createFileRoute('/admin/dashboard/login')({
  component: () => <LoginDashboardPage />,
});
