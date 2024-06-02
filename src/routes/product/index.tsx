import { ProductsPage } from '@/pages/products/ProductsPage';
import { createFileRoute } from '@tanstack/react-router';

type ItemFilters = {
  category?: Category;
  page?: number;
  platform?: Platform;
  maxPrice?: number;
  minPrice?: number;
};

type Category =
  | 'survival'
  | 'action'
  | 'shooter'
  | 'role'
  | 'music'
  | 'war'
  | 'sport'
  | 'driving'
  | 'multiplayer'
  | 'children'
  | 'strategy'
  | 'simulation'
  | 'arcade';

type Platform = 'PlayStation 3' | 'PlayStation 4' | 'PlayStation 5' | 'Steam';

export const Route = createFileRoute('/product/')({
  validateSearch: (search: Record<string, unknown>): ItemFilters => {
    return {
      category: search.category as Category,
      page: search.page as number,
      platform: search.platform as Platform,
      maxPrice: search.maxPrice as number,
      minPrice: search.minPrice as number,
    };
  },
  component: Product,
});

function Product() {
  return (
    <>
      <ProductsPage />
    </>
  );
}
