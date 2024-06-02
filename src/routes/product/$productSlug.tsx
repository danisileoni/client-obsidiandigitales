import { ProductPage } from '@/pages/products/ProductPage';
import { createFileRoute } from '@tanstack/react-router';

export const Route = createFileRoute('/product/$productSlug')({
  component: ProductParam,
});

function ProductParam() {
  const { productSlug } = Route.useParams();

  return <ProductPage key={productSlug} param={productSlug} />;
}
