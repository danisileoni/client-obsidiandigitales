import { CartIcon } from '@/components/icons/CartIcon';
import { PlatformValid } from '@/services/enum-services';
import type { Product, ProductElement } from '@/services/types-services';
import { Link } from '@tanstack/react-router';
import { ToolTipPs3, ToolTipPs4, ToolTipPs5, ToolTipSteam } from '../tooltip';

type CardProductProps = {
  product: Product;
};

export const CardProduct = ({ product }: CardProductProps) => {
  const handleSearchMoreSmall = (
    products: ProductElement[],
  ): number | undefined => {
    let priceLow: number | undefined;
    const prices = products
      .map((product) => {
        if (product.price) {
          if (product.sale.salePrice) {
            return product.sale.salePrice;
          }
          return +product.price;
        }
        if (product.priceSecondary) {
          if (product.sale.saleSecondary) {
            return product.sale.saleSecondary;
          }
          return +product.priceSecondary;
        }
      })
      .filter((price): price is number => price !== null);

    if (prices.length > 0) {
      priceLow = Math.min(...prices);
    }

    return priceLow;
  };

  return (
    <Link to="/product/$productSlug" params={{ productSlug: product.slug }}>
      <article className="flex flex-col items-center bg-[#ffffff] p-2 rounded-md hover:bg-[#f3f3f3] hover:shadow-xl shadow-md hover:shadow-gray-400 transition-all duration-300">
        <picture className="flex">
          <img
            src={product.productImages[0]}
            alt={product.title}
            className="rounded-sm w-52 h-64 object-cover max-md:w-40 max-md:h-48 max-xs:w-32 max-xs:h-40"
          />
        </picture>
        <div className="flex flex-col w-full">
          <h4 className="text-md max-xs:text-sm font-bold whitespace-nowrap overflow-hidden">
            {product.title}
          </h4>
        </div>
        <div className="flex w-full gap-3 items-center">
          {product.products.map((product) => {
            if (product.platform.namePlatform === PlatformValid.PlayStation3) {
              return (
                <ToolTipPs3
                  key={product.id}
                  price={product.price}
                  salePrice={product.sale.salePrice}
                  sale={product.sale.sale}
                />
              );
            }
            if (product.platform.namePlatform === PlatformValid.PlayStation4) {
              return (
                <ToolTipPs4
                  key={product.id}
                  pricePrimary={product.priceSecondary}
                  priceSecondary={product.priceSecondary}
                  salePrimary={product.sale.saleSecondary}
                  saleSecondary={product.sale.saleSecondary}
                  sale={product.sale.sale}
                />
              );
            }
            if (product.platform.namePlatform === PlatformValid.PlayStation5) {
              return (
                <ToolTipPs5
                  key={product.id}
                  sale={product.sale.sale}
                  pricePrimary={product.priceSecondary}
                  priceSecondary={product.priceSecondary}
                  salePrimary={product.sale.saleSecondary}
                  saleSecondary={product.sale.saleSecondary}
                />
              );
            }
            if (product.platform.namePlatform === PlatformValid.Steam) {
              return (
                <ToolTipSteam
                  key={product.id}
                  price={product.price}
                  sale={product.sale.sale}
                  salePrice={product.sale.salePrice}
                />
              );
            }
          })}
        </div>
        <div className="w-full flex flex-col items-start pb-1">
          <p className="text-xs text-gray-600 font-bold">DESDE</p>
          <p className="font-bold text-xl">
            ${handleSearchMoreSmall(product.products)} ARS
          </p>
        </div>
        <button
          type="button"
          className="flex text-sky-700 border hover:bg-sky-700 text-black transition-all duration-300 border-sky-700 w-full justify-center p-1 rounded-md gap-2"
        >
          Agregar <CartIcon />
        </button>
      </article>
    </Link>
  );
};
