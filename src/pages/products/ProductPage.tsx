import { useEffect, useRef, useState } from 'react';
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from '@/components/ui/carousel';
import { getAllProducts, getOneProduct } from '@/services/products.services';
import type { ProductElement } from '@/services/types-services';
import Autoplay from 'embla-carousel-autoplay';
import { Toaster, toast } from 'sonner';
import { CardTargetPlatform } from '@/components/products/CardTargetPlatform';
import { ShareIcon } from '@/components/icons/ShareIcon';
import { CartIcon } from '@/components/icons/CartIcon';
import { PaypalCardIcon } from '@/components/icons/PaypalCardIcon';
import { VisaMasterCardIcon } from '@/components/icons/VisaMasterCardIcon';
import { WarrantyIcon } from '@/components/icons/WarrantyIcon';
import { VerifyIcon } from '@/components/icons/VerifyIcon';
import { ListCheckIcon } from '@/components/icons/ListCheckIcon';
import { SupplierIcon } from '@/components/icons/SupplierIcon';
import { CardProduct } from '@/components/products/CardProduct';
import { Link } from '@tanstack/react-router';
import { HomeIcon } from '@/components/icons/HomeIcon';
import { useQuery } from '@tanstack/react-query';
import { useReSideWindows } from '@/hooks/re-side-window';
import { useShoppingCart } from '@/store/shoppingCart';
import { Navbar } from '@/components/common/Navbar';

interface AccountProductId {
  id: string;
  account: string | null;
}

type ProductProps = {
  param: string;
};

export const ProductPage = ({ param }: ProductProps) => {
  const { addCart, removeFromCart, updateCart, shoppingCart } =
    useShoppingCart();

  const [copyElement, setCopyElement] = useState<boolean>(false);
  const [accountProduct, setAccountProduct] = useState<AccountProductId>();
  const { showControls } = useReSideWindows();
  const plugin = useRef(Autoplay({ delay: 4000, stopOnInteraction: true }));

  const { data: product } = useQuery({
    queryKey: ['Product'],
    queryFn: () => getOneProduct(param),
  });

  const { data: products } = useQuery({
    queryKey: ['ProductAll'],
    queryFn: () => getAllProducts(10, 0),
  });

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

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

  const handleSetIdPriceChild = (data: AccountProductId) => {
    setAccountProduct(data);
  };

  const handleSelectPriceProduct = (data: AccountProductId | undefined) => {
    let foundProduct: ProductElement | undefined;
    if (data) {
      foundProduct = product?.products.find(
        (_product) => _product.id === +data.id,
      );
    }

    if (data?.account === 'Primary') {
      if (foundProduct?.sale.salePrice) {
        return foundProduct.sale.salePrimary;
      }
      return foundProduct?.pricePrimary;
    }

    if (data?.account === 'Secondary') {
      if (foundProduct?.sale.saleSecondary) {
        return foundProduct.sale.saleSecondary;
      }
      return foundProduct?.priceSecondary;
    }

    if (data?.account) {
      if (foundProduct?.sale.salePrice) {
        return foundProduct.sale.salePrice;
      }
      return foundProduct?.price;
    }

    return 0;
  };

  const handleSetCart = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();

    if (product && accountProduct) {
      const foundProduct = product?.products.find(
        ($product) => $product.id === +accountProduct.id,
      );

      console.log(product);
      console.log(accountProduct);
      console.log(foundProduct);

      if (foundProduct && accountProduct.account) {
        const existingProduct = shoppingCart.find(
          (item) => item.id === foundProduct.id,
        );

        if (existingProduct) {
          if (existingProduct.account === 'Primary') {
            updateCart({
              id: foundProduct.id,
              account: accountProduct.account,
            });
            toast.info('Se actualizado correctamente el producto');
          } else if (existingProduct.account === 'Secondary') {
            updateCart({
              id: foundProduct.id,
              account: accountProduct.account,
            });
            toast.info('Se actualizado correctamente el producto');
          } else {
            removeFromCart(existingProduct.id);
            addCart({ id: foundProduct.id, account: accountProduct.account });
            toast.success('Se a añadido correctamente el producto');
          }
        } else {
          addCart({ id: foundProduct.id, account: accountProduct.account });
          toast.success('Se a añadido correctamente el producto');
        }
      }
    }
  };

  return (
    <>
      <Navbar />
      <article className="flex flex-col items-center justify-start max-lg:mt-5 md:flex-row md:justify-center md:items-start max-md:bg-white">
        <div>
          {showControls && (
            <div className=" flex gap-1 flex-row mt-7 items-center">
              <HomeIcon />
              <Link
                className="text-gray-500 hover:text-sky-400 transition-colors duration-500"
                to="/"
              >
                Inicio
              </Link>
              <p className="text-gray-500">{'>'}</p>
              <Link
                search={() => ({ page: '1' })}
                className="text-gray-500 hover:text-sky-400 transition-colors duration-500"
                to="/product"
              >
                Productos
              </Link>
              <p className="text-gray-500">{'>'}</p>
              <p className="text-sky-700">{product?.title}</p>
            </div>
          )}
          <div className="flex flex-col items-center bg-white p-4 md:p-8 rounded-t-md justify-start md:flex-row md:justify-center md:items-start">
            <Carousel
              plugins={[plugin.current]}
              onMouseEnter={plugin.current.stop}
              onMouseLeave={plugin.current.reset}
              className="shadow-md shadow-gray-300 rounded-md bg-gray-300 h-[350px] w-[250px] max-xs:h-[350px] max-xs:w-[300px]"
            >
              <CarouselContent>
                {product?.productImages.map((image) => {
                  return (
                    <CarouselItem key={image}>
                      <picture>
                        <img
                          src={image}
                          className="object-cover rounded-md h-[350px] w-[300px]"
                          alt={product.title}
                        />
                      </picture>
                    </CarouselItem>
                  );
                })}
              </CarouselContent>
            </Carousel>
            <div className="md:pl-6 max-lg:flex-col max-md:items-center item flex max-md:w-full">
              <div>
                <h2 className=" max-w-[520px] overflow-hidden text-start text-xl max-md:w-full md:text-3xl font-semibold">
                  {product?.title}
                </h2>
                <p className="text-2xl font-bold">
                  Desde{' '}
                  <span className="text-2xl font-bold text-sky-700">
                    $
                    {product?.products
                      ? handleSearchMoreSmall(product.products)
                      : ''}{' '}
                    ARS
                  </span>
                </p>
                <div>
                  <form action="">
                    <fieldset>
                      <legend className="mb-2 w-full max-md:flex max-md:justify-center">
                        Seleccione la plataforma que desea:
                      </legend>
                      <div className="grid md:grid-cols-1 grid-cols-1 gap-3 lg:grid-cols-2 max-md:gap-2 justify-center">
                        {product !== undefined ? (
                          <CardTargetPlatform
                            idInfo={product.id}
                            product={product}
                            sendIdProduct={handleSetIdPriceChild}
                          />
                        ) : (
                          ''
                        )}
                      </div>
                    </fieldset>
                  </form>
                </div>
              </div>
              <div className="ml-0 mt-2 lg:ml-5 lg:mt-0 max-lg:w-64 ">
                <div className="flex flex-col max-md:items-center">
                  <p className="text-xs font-bold mb-1">
                    ¡Compártelo con alguien a quien creas podría <br />{' '}
                    gustarle!
                  </p>
                  <button
                    type="button"
                    onClick={() => {
                      navigator.clipboard.writeText(
                        `https://www.quarastore.com/product/${product?.slug}`,
                      );
                      setCopyElement(true);
                    }}
                    className={` ${copyElement ? 'bg-sky-500 text-black' : ''} text-sm flex border border-sky-500 w-52 lg:w-full justify-center items-center shadow hover:shadow-sky-500 transition-shadow duration-500 gap-2`}
                  >
                    {copyElement ? 'Copiado' : 'Compartir'} <ShareIcon />
                  </button>
                </div>
                <div className="">
                  <div className="mt-4 shadow-md shadow-gray-300 flex flex-col border rounded-sm border-sky-500">
                    <p className="text-xs bg-sky-500 font-bold text-black text-center p-1">
                      AÑADIR | COMPRAR
                    </p>
                    <p className="ml-2 mt-4">Precio final:</p>
                    <p className="text-2xl font-bold ml-2 text-gray-800 w-full">
                      ${handleSelectPriceProduct(accountProduct)} ARS
                    </p>
                    <div className="gap-2 mb-1 mt-4 flex flex-col items-center">
                      <button
                        type="button"
                        className="w-[92%] shadow-sm shadow-gray-400 hover:bg-sky-600 bg-sky-500 rounded-md text-black pr-2 pt-1 pb-1 pl-2 transition-all duration-300"
                      >
                        Comprar
                      </button>
                      <button
                        type="button"
                        className="flex justify-center w-[92%] border border-sky-500 rounded-md mb-2 mt-2 pr-2 pt-1 pb-1 pl-2 shadow-sm shadow-gray-400 hover:bg-sky-500 text-sky-700 transition-all duration-300"
                        onClick={handleSetCart}
                      >
                        Añadir al carrito <CartIcon />
                      </button>
                    </div>
                  </div>
                  <div className="shadow-md shadow-gray-300 mt-3 border rounded-sm border-sky-500">
                    <p className="text-xs pl-1 font-bold bg-sky-500 text-black">
                      DISPONIBLE AL COMPRAR:
                    </p>
                    <div className="p-2 gap-2 flex">
                      <PaypalCardIcon />
                      <VisaMasterCardIcon />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="w-full pb-8 bg-white rounded-b-md max-md:flex max-lg:items-center max-lg:flex-col max-md:items-center flex flex-col">
            <div>
              <div className="lg:pb-4 max-md:flex-col max-md:p-5 max-lg:p-3 lg:pl-6 lg:pr-6 lg:ml-8 justify-between lg:mr-8 bg-sky-500 rounded-xl flex shadow-md shadow-sky-900">
                <div className="flex flex-col items-center">
                  <WarrantyIcon />
                  <p className="font-bold text-white">Garantia permanente.</p>
                </div>
                <div className="flex flex-col items-center">
                  <VerifyIcon />
                  <p className="font-bold text-center text-white">Original.</p>
                </div>{' '}
                <div className="flex flex-col items-center">
                  <ListCheckIcon />
                  <p className="font-bold text-center text-white">
                    Stock garantizado.
                  </p>
                </div>
                <div className="flex flex-col items-center">
                  <SupplierIcon />
                  <p className="font-bold text-white">
                    Proveedor con antiguedad.
                  </p>
                </div>
              </div>
            </div>
            <div className="mt-5 ml-8 flex flex-col max-lg:ml-0 max-md:ml-0">
              <p className="text-lg font-bold">Descripcion:</p>
              <div className="whitespace-pre-line bg-gray-100 max-md:max-w-64 max-lg:max-w-xl max-w-[1057px] p-2 rounded-md">
                <p>{product?.description}</p>
              </div>
            </div>
          </div>
        </div>
      </article>
      <div className=" mt-5 flex flex-col mb-20 items-center max-lg:ml-0 max-md:ml-0">
        <p className="text-xl font-bold md:text-2xl mb-4">Otros Productos</p>
        <Carousel
          opts={{
            align: 'start',
          }}
          className="w-[79%]"
        >
          <CarouselContent className="-ml-5 md:-ml-2">
            {' '}
            {products?.products.map((product) => {
              return (
                <CarouselItem
                  className="max-md:basis-52 md:basis-56 xl:basis-56 lg:basis-56 mb-6 max-xs:basis-40"
                  key={product.id}
                >
                  <CardProduct product={product} />
                </CarouselItem>
              );
            })}
          </CarouselContent>
          {showControls && <CarouselPrevious />}
          {showControls && <CarouselNext />}
        </Carousel>
        <Toaster position="bottom-right" richColors />
      </div>
    </>
  );
};
