import { PlatformValid } from '@/services/enum-services';
import { AccountSecondary } from '@/components/icons/AccountSecondary';
import { AccountPrimary } from '@/components/icons/AccountPrimary';
import { ToolTipAccount } from '@/components/tooltip/ToolTipAccount';
import type { Product, Stock } from '@/services/types-services';
import React, { useEffect, useState } from 'react';
import { getStockProduct } from '@/services/account.service';
import { useFormatPrice } from '@/hooks/useFormatPrice';

interface InputRadio {
  id: string;
  account: string | null;
}

type CardTargetPlatformProp = {
  product: Product;
  idInfo: string;
  sendIdProduct?: (e: InputRadio) => void;
};

export const CardTargetPlatform = ({
  product,
  idInfo,
  sendIdProduct,
}: CardTargetPlatformProp) => {
  const [stock, setStock] = useState<Stock>();
  const { formatPrice } = useFormatPrice();

  useEffect(() => {
    (async () => {
      const data = await getStockProduct(idInfo);
      setStock(data);
    })();
  }, [idInfo]);

  const handleChangePrice = (e: React.ChangeEvent<HTMLInputElement>) => {
    const [number, text] = e.target.value.split('|');

    if (sendIdProduct) {
      if (text === 'Primary') {
        sendIdProduct({
          id: number,
          account: text,
        });
      } else if (text === 'Secondary') {
        sendIdProduct({
          id: number,
          account: text,
        });
      } else {
        sendIdProduct({
          id: number,
          account: text,
        });
      }
    }
  };

  return (
    <>
      {product.products.map((product) => {
        if (product.priceSecondary) {
          return (
            <React.Fragment key={product.id}>
              <div className="shadow-md hover:shadow-sky-500 transition-shadow duration-500 cursor-pointer border pl-2 w-[250px] border-sky-500 rounded-sm flex">
                <input
                  type="radio"
                  id={`${product.platform.id}|Primary`}
                  className="cursor-pointer m-[1px]"
                  name="platform"
                  onChange={handleChangePrice}
                  value={`${product.id}|Primary`}
                />

                <label
                  className="p-1 w-full cursor-pointer"
                  htmlFor={`${product.platform.id}|Primary`}
                >
                  {product.platform.namePlatform} Primaria
                  <div>
                    <span
                      className={`${product.sale.salePrimary ? 'line-through text-gray-500' : ''} font-bold`}
                    >
                      $
                      {product.pricePrimary &&
                        formatPrice(+product.pricePrimary)}{' '}
                      ARS
                    </span>
                    {product.sale.salePrimary ? (
                      <>
                        <span className="pl-2 text-sky-700 font-bold">
                          $
                          {product.sale.salePrimary &&
                            formatPrice(+product.sale.salePrimary)}{' '}
                          ARS
                        </span>
                        <p className="ml-1 border border-rose-500 bg-rose-500 rounded-md font-bold text-xs flex items-center absolute translate-x-48 -translate-y-[3.6rem] text-black h-5 w-9 justify-center">
                          -{product.sale.sale}%
                        </p>
                      </>
                    ) : (
                      <></>
                    )}
                    <p className="text-xs">
                      Stock:{' '}
                      {product.platform.namePlatform ===
                      PlatformValid.PlayStation4 ? (
                        stock && stock.stockPs4.primary > 0 ? (
                          <span className="text-green-600 font-bold">
                            Disponible
                          </span>
                        ) : (
                          <span className="text-orange-500 font-bold">
                            Disponible en 24h
                          </span>
                        )
                      ) : stock && stock.stockPs5.primary > 0 ? (
                        <span className="text-green-600 font-bold">
                          Disponible
                        </span>
                      ) : (
                        <span className="text-orange-500 font-bold">
                          Disponible en 24h
                        </span>
                      )}
                    </p>
                  </div>
                  <div className="absolute translate-x-40 -translate-y-[60px]">
                    <AccountPrimary />
                  </div>
                </label>
              </div>
              <div className="shadow-md hover:shadow-sky-500 transition-shadow duration-500 cursor-pointer border pl-2 w-[250px] border-sky-500 rounded-sm flex">
                <input
                  type="radio"
                  id={`${product.platform.id}|Secondary`}
                  name="platform"
                  onChange={handleChangePrice}
                  className="cursor-pointer m-[1px]"
                  value={`${product.id}|Secondary`}
                />

                <label
                  className="p-1 w-full cursor-pointer"
                  htmlFor={`${product.platform.id}|Secondary`}
                >
                  {product.platform.namePlatform} Secundaria
                  <div>
                    <span
                      className={`${product.sale.saleSecondary ? 'line-through text-gray-500' : ''} font-bold`}
                    >
                      $
                      {product.priceSecondary &&
                        formatPrice(+product.priceSecondary)}{' '}
                      ARS
                    </span>
                    {product.sale.saleSecondary ? (
                      <>
                        <span className="pl-2 text-sky-700 font-bold">
                          $
                          {product.sale.saleSecondary &&
                            formatPrice(+product.sale.saleSecondary)}{' '}
                          ARS
                        </span>
                        <span className="ml-1 border border-rose-500 bg-rose-500 rounded-md text-xs font-bold flex items-center absolute translate-x-48 -translate-y-[3.6rem] text-black h-5 w-9 justify-center">
                          -{product.sale.sale}%
                        </span>
                      </>
                    ) : (
                      <></>
                    )}
                    <p className="text-xs">
                      Stock:{' '}
                      {product.platform.namePlatform ===
                      PlatformValid.PlayStation4 ? (
                        stock && stock.stockPs4.secondary > 0 ? (
                          <span className="text-green-600 font-bold">
                            Disponible
                          </span>
                        ) : (
                          <span className="text-orange-500 font-bold">
                            Disponible en 24h
                          </span>
                        )
                      ) : stock && stock.stockPs5.secondary > 0 ? (
                        <span className="text-green-600 font-bold">
                          Disponible
                        </span>
                      ) : (
                        <span className="text-orange-500 font-bold">
                          Disponible en 24h
                        </span>
                      )}
                    </p>
                  </div>
                  <div className="absolute translate-x-44 -translate-y-[60px]">
                    <AccountSecondary />
                  </div>
                </label>
              </div>
            </React.Fragment>
          );
        }

        return (
          <div
            key={product.platform.id}
            className="shadow-md mr-1 hover:shadow-sky-500 transition-shadow duration-500 cursor-pointer border pl-2 w-[250px] h-fit  border-sky-500 rounded-sm flex"
          >
            <input
              type="radio"
              id={`${product.platform.id}|${product.platform.namePlatform}`}
              name="platform"
              onChange={handleChangePrice}
              className=" cursor-pointer m-[1px]"
              value={`${product.id}|${product.platform.namePlatform}`}
            />

            <label
              className="p-1 w-full h-full cursor-pointer"
              htmlFor={`${product.platform.id}|${product.platform.namePlatform}`}
            >
              <div className="flex items-center gap-1">
                {product.platform.namePlatform}
                {product.platform.namePlatform === PlatformValid.Steam
                  ? ' (PC)'
                  : ''}{' '}
                <ToolTipAccount />
              </div>
              <div>
                <span
                  className={`${product.sale.salePrice ? 'line-through text-gray-500' : ''} font-bold`}
                >
                  ${product.price && formatPrice(+product.price)} ARS
                </span>
                {product.sale.salePrice ? (
                  <>
                    <span className="pl-2 text-sky-700 font-bold">
                      $
                      {product.sale.salePrice &&
                        formatPrice(+product.sale.salePrice)}{' '}
                      ARS
                    </span>
                    <span className="ml-1 border font-bold border-rose-500 bg-rose-500 rounded-md text-xs flex items-center absolute translate-x-48 -translate-y-[3.6rem] text-black h-5 w-9 justify-center">
                      -{product.sale.sale}%
                    </span>
                  </>
                ) : (
                  <></>
                )}
                <p className="text-xs">
                  Stock:{' '}
                  <span className="text-green-600 font-bold">Disponible</span>
                </p>
              </div>
            </label>
          </div>
        );
      })}
    </>
  );
};
