import { ShoppingCartPage } from '@/pages/ShoppingCartPage';
import { createLazyFileRoute } from '@tanstack/react-router';

export const Route = createLazyFileRoute('/shopping-cart/')({
  component: () => <ShoppingCartPage />,
});
