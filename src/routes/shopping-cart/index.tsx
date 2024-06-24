import { ShoppingCartPage } from '@/pages/ShoppingCartPage';
import { createFileRoute } from '@tanstack/react-router';

export const Route = createFileRoute('/shopping-cart/')({
  component: () => <ShoppingCartPage />,
});
