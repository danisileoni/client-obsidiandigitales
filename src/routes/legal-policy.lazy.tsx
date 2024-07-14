import { LegalPolicyPage } from '@/pages/LegalPolicyPage';
import { createLazyFileRoute } from '@tanstack/react-router';

export const Route = createLazyFileRoute('/legal-policy')({
  component: () => <LegalPolicyPage />,
});
