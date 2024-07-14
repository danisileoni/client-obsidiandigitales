import { AboutPage } from '@/pages/AboutPage';
import { createLazyFileRoute } from '@tanstack/react-router';

export const Route = createLazyFileRoute('/about')({
  component: () => <AboutPage />,
});
