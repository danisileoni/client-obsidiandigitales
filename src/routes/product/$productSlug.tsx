import { lazy, Suspense } from 'react';
const ProductPage = lazy(() => import('@/pages/products/ProductPage'));
import { createFileRoute } from '@tanstack/react-router';
import { ProductPageSkeleton } from '@/pages/products/ProductPageSkeleton';

export const Route = createFileRoute('/product/$productSlug')({
  component: ProductParam,
});

function ProductParam() {
  const { productSlug } = Route.useParams();

  return (
    <Suspense fallback={<ProductPageSkeleton />}>
      <ProductPage key={productSlug} param={productSlug} />
    </Suspense>
  );
}
