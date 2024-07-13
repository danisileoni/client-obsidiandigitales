import { LegalPolicyPage } from '@/pages/LegalPolicyPage';
import { createFileRoute } from '@tanstack/react-router';

export const Route = createFileRoute('/legal-policy')({
  component: () => <LegalPolicyPage />,
});
