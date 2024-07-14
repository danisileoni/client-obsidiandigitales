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

const ProductPage = ({ param }: ProductProps) => {
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
      <article className="flex flex-col items-center justify-start md:mt-5 md:flex-row md:justify-center md:items-start bg-white p-4 md:p-8 rounded-t-md">
        <div>
          {showControls && (
            <div className="flex gap-1 flex-row mt-7 items-center">
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
          <div className="flex flex-col items-center md:flex-row md:justify-center md:items-start">
            <Carousel
              plugins={[plugin.current]}
              onMouseEnter={plugin.current.stop}
              onMouseLeave={plugin.current.reset}
              className="shadow-md shadow-gray-300 rounded-md bg-gray-300 h-[350px] w-[250px] xs:h-[350px] xs:w-[300px]"
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
            <div className="md:pl-6 md:flex-col md:items-start flex flex-col items-center w-full">
              <div>
                <h2 className="text-xl md:text-3xl font-semibold">
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
                  <form>
                    <fieldset>
                      <legend className="mb-2 text-center">
                        Seleccione la plataforma que desea:
                      </legend>
                      <div className="grid grid-cols-1 gap-3 lg:grid-cols-2">
                        {product !== undefined ? (
                          <CardTargetPlatform
                            idInfo={`${product.id}`}
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
              <div className="mt-2 lg:mt-0 lg:ml-5 w-full lg:w-64">
                <div className="flex flex-col items-center">
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
                    className={` ${copyElement ? 'bg-sky-500 text-black' : ''} text-sm flex border border-sky-500 w-full justify-center items-center shadow hover:shadow-sky-500 transition-shadow duration-500 gap-2`}
                  >
                    {copyElement ? '¡Enlace copiado!' : 'Copiar enlace'}
                    <ShareIcon />
                  </button>
                  <button
                    type="button"
                    onClick={handleSetCart}
                    className="bg-sky-600 hover:bg-sky-800 text-white text-sm font-bold p-2 mt-3 w-full flex justify-center items-center gap-1 rounded-md shadow hover:shadow-md hover:shadow-sky-400 transition-all duration-500"
                  >
                    <CartIcon />
                    <span className="ml-1">Añadir al carrito</span>
                  </button>
                  <Toaster richColors />
                </div>
                <div className="flex flex-col items-center gap-3 mt-5">
                  <h3 className="text-sm font-bold text-center">
                    Pagalo hasta en 6 cuotas sin interés
                  </h3>
                  <div className="flex flex-row items-center gap-1">
                    <PaypalCardIcon />
                    <VisaMasterCardIcon />
                  </div>
                </div>
                <div className="flex flex-col items-center gap-3 mt-5">
                  <h3 className="text-sm font-bold text-center">
                    Garantías y beneficios
                  </h3>
                  <ul className="list-none text-xs text-gray-700 flex flex-col items-center gap-2">
                    <li className="flex items-center gap-2">
                      <WarrantyIcon />
                      <span className="text-center">
                        Garantía de devolución
                      </span>
                    </li>
                    <li className="flex items-center gap-2">
                      <VerifyIcon />
                      <span className="text-center">Producto verificado</span>
                    </li>
                    <li className="flex items-center gap-2">
                      <ListCheckIcon />
                      <span className="text-center">
                        Lista de productos certificados
                      </span>
                    </li>
                    <li className="flex items-center gap-2">
                      <SupplierIcon />
                      <span className="text-center">Proveedor confiable</span>
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
          <div className="mt-5">
            <h2 className="text-lg font-bold text-center">Otros productos</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5 mt-5">
              {products?.products.map((product) => (
                <CardProduct
                  key={product.id}
                  id={product.id}
                  image={product.infoProduct.images}
                  title={product.title}
                  price={product.price}
                  slug={product.slug}
                />
              ))}
            </div>
          </div>
        </div>
      </article>
    </>
  );
};

export default ProductPage;
