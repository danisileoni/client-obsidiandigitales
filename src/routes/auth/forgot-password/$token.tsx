import { lazy, Suspense } from 'react';
const ForgotPasswordPage = lazy(
  () => import('@/pages/auth/ForgotPasswordPage'),
);
import { createFileRoute } from '@tanstack/react-router';

export const Route = createFileRoute('/auth/forgot-password/$token')({
  component: () => <ForgotPassword />,
});

function ForgotPassword() {
  const { token } = Route.useParams();

  return (
    <Suspense fallback={<div>Loading...</div>}>
      <ForgotPasswordPage token={token} />
    </Suspense>
  );
}
