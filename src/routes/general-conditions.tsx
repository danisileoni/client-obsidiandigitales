import { GeneralConditionsPage } from '@/pages/GeneralConditionsPage';
import { createFileRoute } from '@tanstack/react-router';

export const Route = createFileRoute('/general-conditions')({
  component: () => <GeneralConditionsPage />,
});
