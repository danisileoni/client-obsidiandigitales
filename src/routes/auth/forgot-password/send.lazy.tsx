import SendForgotPasswordPage from '@/pages/auth/SendForgotPasswordPage';
import { createLazyFileRoute } from '@tanstack/react-router';

export const Route = createLazyFileRoute('/auth/forgot-password/send')({
  component: () => <SendForgotPasswordPage />,
});
