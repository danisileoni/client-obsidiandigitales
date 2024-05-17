import { createLazyFileRoute } from '@tanstack/react-router';

export const Route = createLazyFileRoute('/faq')({
  component: Faq,
});

function Faq(): JSX.Element {
  return <div className="p-2">Faq</div>;
}
