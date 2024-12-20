import { ProductCart } from '@/services/types-services';
import { ProductCartStore, useShoppingCart } from '@/store/shoppingCart';
import { TrashIcon } from '../icons/TrashIcon';
import { ButtonCreateOrder } from './ButtonCreateOrder';
import { useFormatPrice } from '@/hooks/useFormatPrice';

interface ProductsCartProps {
  infoProducts: ProductCart[] | undefined;
  shoppingCart: ProductCartStore[];
}

export const ProductsCart = ({
  infoProducts = [],
  shoppingCart,
}: ProductsCartProps) => {
  let totalPrice: number = 0;
  const { removeFromCart } = useShoppingCart();
  const { formatPrice } = useFormatPrice();

  if (!infoProducts.length) {
    return (
      <p className="text-center text-gray-500">
        No hay productos en el carrito.
      </p>
    );
  }

  const handleRemoveProductCart = (
    id: number | undefined,
    e: React.MouseEvent<HTMLButtonElement>,
  ) => {
    e.preventDefault();
    removeFromCart(id);
  };

  return (
    <div className="flex flex-col lg:flex-row gap-5">
      <section className="flex-1 flex flex-col gap-y-5">
        {infoProducts.map((info) => {
          let subTotal = 0;
          return (
            <article
              key={info.id}
              className="flex max-md:flex-col max-md:items-center shadow-lg bg-white p-6 pr-12 rounded-lg border border-gray-200"
            >
              <picture className="flex-shrink-0">
                <img
                  src={info.images[0]?.url || ''}
                  className="w-36 h-48 object-cover rounded-lg shadow-sm"
                  alt={info.title}
                />
              </picture>
              <div className="ml-4 flex-1">
                <h5 className="text-lg font-bold text-gray-700">
                  {info.title}
                </h5>
                <ul className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-x-12 gap-y-4 mt-2">
                  {info.product.map((product) => {
                    const productCart = shoppingCart.find(
                      (cart) => cart.id === product.id,
                    );

                    const price = (() => {
                      if (productCart?.account === 'Primary') {
                        if (product.sale?.salePrimary) {
                          subTotal += +product.sale.salePrimary;
                          totalPrice += +product.sale.salePrimary;
                          return product.sale.salePrimary;
                        }
                        if (product.pricePrimary) {
                          subTotal += +product.pricePrimary;
                          totalPrice += +product.pricePrimary;
                          return product.pricePrimary;
                        }
                      }
                      if (productCart?.account === 'Secondary') {
                        if (product.sale?.saleSecondary) {
                          subTotal += +product.sale.saleSecondary;
                          totalPrice += +product.sale.saleSecondary;
                          return product.sale.saleSecondary;
                        }
                        if (product.priceSecondary) {
                          subTotal += +product.priceSecondary;
                          totalPrice += +product.priceSecondary;
                          return product.priceSecondary;
                        }
                      }
                      if (productCart?.account) {
                        if (product.sale?.salePrice) {
                          subTotal += +product.sale.salePrice;
                          totalPrice += +product.sale.salePrice;
                          return product.sale.salePrice;
                        }
                        if (product.price) {
                          subTotal += +product.price;
                          totalPrice += +product.price;
                          return product.price;
                        }
                      }
                      return 'N/A';
                    })();

                    return (
                      <li
                        key={product.id}
                        className="border w-[280px] max-sm:w-[200px] border-sky-500 p-3 rounded-md relative bg-gray-50"
                      >
                        <p className="text-sm text-gray-600">
                          <span className="font-bold">Plataforma:</span>{' '}
                          {product.platform.namePlatform}{' '}
                          {productCart?.account !== 'Steam' &&
                          productCart?.account !== 'PlayStation 3'
                            ? productCart?.account
                            : ''}
                        </p>
                        <p className="text-sm text-gray-600">
                          <span className="font-bold">Precio:</span> $
                          {formatPrice(+price)} ARS
                        </p>
                        <button
                          type="button"
                          onClick={(e) =>
                            handleRemoveProductCart(productCart?.id, e)
                          }
                          className="text-black bg-red-500 rounded-sm absolute -top-2 -right-2 p-1 hover:bg-rose-600 transition-colors duration-300"
                        >
                          <TrashIcon />
                        </button>
                      </li>
                    );
                  })}
                </ul>
                <p className="text-sky-700 font-bold text-xl flex items-center">
                  <span className="text-black font-normal text-base">
                    Subtotal:
                  </span>{' '}
                  ${formatPrice(subTotal)} ARS
                </p>
              </div>
            </article>
          );
        })}
      </section>
      <section className="w-full flex flex-col items-center justify-center h-[8.5rem] lg:w-[280px] p-2 rounded-lg border-sky-500 bg-white shadow-lg">
        <div className="w-64 flex flex-col items-center rounded-sm justify-center">
          <div>
            <p className="self-start font-bold text-sm">Resumen</p>
            <h2 className="text-2xl text-sky-600 flex gap-2 items-center font-bold">
              <span className="font-bold text-base text-black">Total:</span> $
              {formatPrice(totalPrice)} ARS
            </h2>
            <p className="self-start text-xs">
              Total de productos: {shoppingCart.length}
            </p>
          </div>
          <ButtonCreateOrder shoppingCart={shoppingCart} />
        </div>
      </section>
    </div>
  );
};
