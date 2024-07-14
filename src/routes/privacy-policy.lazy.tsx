import { PrivacyPolicyPage } from '@/pages/PrivacyPolicyPage';
import { createLazyFileRoute } from '@tanstack/react-router';

export const Route = createLazyFileRoute('/privacy-policy')({
  component: () => <PrivacyPolicyPage />,
});
