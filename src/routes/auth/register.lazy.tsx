import { RegisterPage } from '@/pages/auth/RegisterPage';
import { createLazyFileRoute } from '@tanstack/react-router';

export const Route = createLazyFileRoute('/auth/register')({
  component: () => <RegisterPage />,
});
