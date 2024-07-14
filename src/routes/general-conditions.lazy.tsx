import { GeneralConditionsPage } from '@/pages/GeneralConditionsPage';
import { createLazyFileRoute } from '@tanstack/react-router';

export const Route = createLazyFileRoute('/general-conditions')({
  component: () => <GeneralConditionsPage />,
});
