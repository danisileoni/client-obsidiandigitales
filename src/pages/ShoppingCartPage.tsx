import { useQuery } from '@tanstack/react-query';
import { getSelectedProducts } from '@/services/products.services';
import { useShoppingCart } from '@/store/shoppingCart';
import { ProductsCart } from '@/components/shopping-cart/ProductsCart';
import { Navbar } from '@/components/common/Navbar';

export const ShoppingCartPage = () => {
  const { shoppingCart } = useShoppingCart();

  const { data: infoProducts } = useQuery({
    queryKey: ['shoppingCart', shoppingCart],
    queryFn: () => getSelectedProducts(shoppingCart),
  });

  return (
    <>
      <Navbar />
      <section className="flex items-center bg-violet-700">
        <div>
          <p>a</p>
        </div>
        <hr className="w-20" />
        <div>
          <p>b</p>
        </div>
        <hr />
        <div>
          <p>c</p>
        </div>
      </section>
      <section className="flex flex-col items-center">
        <h3>Mi Carrito</h3>
        <ProductsCart infoProducts={infoProducts} shoppingCart={shoppingCart} />
      </section>
    </>
  );
};