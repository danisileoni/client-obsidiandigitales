import { useQuery } from '@tanstack/react-query';
import { getSelectedProducts } from '@/services/products.services';
import { useShoppingCart } from '@/store/shoppingCart';
import { ProductsCart } from '@/components/shopping-cart/ProductsCart';
import { Navbar } from '@/components/common/Navbar';
import { BreadcrumbsPay } from '@/components/common/BreadcrumbsPay';

export const ShoppingCartPage = () => {
  const { shoppingCart } = useShoppingCart();

  const { data: infoProducts } = useQuery({
    queryKey: ['shoppingCart', shoppingCart],
    queryFn: () => getSelectedProducts(shoppingCart),
  });

  return (
    <>
      <Navbar />
      <BreadcrumbsPay position={{ order: false, pay: false, finish: false }} />
      <section className="flex flex-col items-center mt-2 mb-20">
        <h3 className="mb-5 text-2xl font-bold">Carrito</h3>
        <ProductsCart infoProducts={infoProducts} shoppingCart={shoppingCart} />
      </section>
    </>
  );
};
