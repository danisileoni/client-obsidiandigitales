import { lazy, Suspense } from 'react';
import { createFileRoute, useNavigate } from '@tanstack/react-router';
import * as v from 'valibot';
import ProductsPageSkeleton from '@/pages/products/ProductsPageSkeleton';
const ProductsPage = lazy(() => import('@/pages/products/ProductsPage'));

const Category = v.union([
  v.literal('supervivencia'),
  v.literal('accion'),
  v.literal('disparos'),
  v.literal('rol'),
  v.literal('musica'),
  v.literal('guerra'),
  v.literal('deporte'),
  v.literal('conduccion'),
  v.literal('multijugador'),
  v.literal('infantil'),
  v.literal('estrategia'),
  v.literal('simulacion'),
  v.literal('arcade'),
]);

const Platform = v.union([
  v.literal('PlayStation 3'),
  v.literal('PlayStation 4'),
  v.literal('PlayStation 5'),
  v.literal('Steam'),
]);

const ItemFilters = v.object({
  category: v.optional(v.array(Category)),
  page: v.optional(v.string(), '1'),
  platform: v.optional(Platform),
  maxPrice: v.optional(v.string()),
  minPrice: v.optional(v.string()),
  sale: v.optional(v.boolean()),
  search: v.optional(v.string()),
});

export type ItemFilters = v.InferOutput<typeof ItemFilters>;

export const Route = createFileRoute('/product/')({
  validateSearch: (search) => v.parse(ItemFilters, search),
  component: Product,
});

function Product() {
  const { category, maxPrice, minPrice, page, platform, sale, search } =
    Route.useSearch();
  const navigate = useNavigate({ from: Route.fullPath });

  return (
    <Suspense fallback={<ProductsPageSkeleton />}>
      <ProductsPage
        category={category}
        maxPrice={maxPrice}
        minPrice={minPrice}
        page={page}
        platform={platform}
        sale={sale}
        search={search}
        navigate={navigate}
      />
    </Suspense>
  );
}
