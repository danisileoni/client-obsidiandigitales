import { FAQPage } from '@/pages/FAQPage';
import { createLazyFileRoute } from '@tanstack/react-router';

export const Route = createLazyFileRoute('/faq')({
  component: Faq,
});

function Faq(): JSX.Element {
  return <FAQPage />;
}
