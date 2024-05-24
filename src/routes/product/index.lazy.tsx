import { createLazyFileRoute } from '@tanstack/react-router';

export const Route = createLazyFileRoute('/product/')({
  component: Product,
});

function Product() {
  return (
    <>
      <div>hola</div>
    </>
  );
}
