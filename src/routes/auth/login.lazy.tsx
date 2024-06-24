import { LoginPage } from '@/pages/auth/LoginPage';
import { createLazyFileRoute } from '@tanstack/react-router';

export const Route = createLazyFileRoute('/auth/login')({
  component: () => <LoginPage />,
});
