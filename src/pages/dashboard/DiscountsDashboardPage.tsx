import { SideBar } from '@/components/dashboard/SideBar';
import { toast, Toaster } from 'sonner';
import { PlusIcon } from '@/components/icons/PlusIcon';
import { PaginationProducts } from '@/components/products/PaginationProducts';
import {
  ToolTipPs3,
  ToolTipPs4,
  ToolTipPs5,
  ToolTipSteam,
} from '@/components/tooltip';
import { Button } from '@/components/ui/button';
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import { ItemsDashboardFilter } from '@/routes/admin/dashboard/panel/products';
import { PlatformValid } from '@/services/enum-services';
import { getAllProducts } from '@/services/products.services';
import { useQuery } from '@tanstack/react-query';
import { UseNavigateResult } from '@tanstack/react-router';
import React, { useEffect, useState } from 'react';
import { postCreateSale, postSetterTimer } from '@/services/sale.service';
import { MinusIcon } from '@/components/icons/MinusIcon';
import { deleteSale } from '../../services/sale.service';
import { useAuth } from '@/hooks/useAuth';

interface ProductsProps extends ItemsDashboardFilter {
  navigate: UseNavigateResult<'/admin/dashboard/panel/accounts'>;
}

const DiscountsDashboardPage = ({ page, navigate }: ProductsProps) => {
  const limit = 10;
  const currentPage = Number(page);
  const offset = (currentPage - 1) * limit;

  const { isAuthenticate, token } = useAuth();
  const [search, setSearch] = useState<string>();
  const [update, setUpdate] = useState<boolean>(false);

  useEffect(() => {
    (async () => {
      const isAuth = await isAuthenticate();
      if (!isAuth) {
        navigate({ to: '/auth/login' });
      }
    })();
  }, [isAuthenticate, navigate]);

  const { data: infoProducts, refetch } = useQuery({
    queryKey: ['info-products-accounts', page, update],
    queryFn: () =>
      getAllProducts(
        limit,
        offset,
        undefined,
        undefined,
        undefined,
        undefined,
        undefined,
        search,
      ),
  });

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      setSearch(e.currentTarget.value);
    }
  };

  const handleDeleteDiscount = async (id: number) => {
    try {
      const sale = await deleteSale(id, token);
      if (sale) {
        toast.success('El descuento se a eliminado correctamente');
        setUpdate(true);
        refetch();
      }
    } catch (error) {
      toast.error('A habido un error');
    }
  };

  const handleCreateTimer = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formElement = e.target as HTMLFormElement;
    const formData = new FormData(formElement);

    const title = formData.get('title') as string;
    const endDate = formData.get('endDate') as Date | null;

    try {
      const timer = await postSetterTimer({ title, endDate }, token);
      if (timer) {
        toast.success('El descuento se a creado correctamente');
        setUpdate(true);
        refetch();
      }
    } catch (error) {
      toast.error('A habido un error');
    }
  };

  const handleCreateDiscount = async (
    e: React.FormEvent<HTMLFormElement>,
    idProduct: number,
  ) => {
    e.preventDefault();

    const formElement = e.target as HTMLFormElement;
    const formData = new FormData(formElement);

    const sale = formData.get('sale');

    try {
      const discount = await postCreateSale(
        idProduct,
        {
          sale: sale ? +sale : null,
        },
        token,
      );
      if (discount) {
        toast.success('El descuento se a creado correctamente');
        setUpdate(true);
        refetch();
      }
    } catch (error) {
      toast.error('A habido un error');
    }
  };

  return (
    <section className="h-screen flex text-[#c1c1c1] bg-[#0a0a0a]">
      <SideBar />
      <div className="bg-[#212121] items-center w-full m-3 rounded-lg flex flex-col">
        <div className="w-[95%] flex items-center gap-4">
          <input
            type="text"
            placeholder="Buscar Producto"
            className="w-full h-8 rounded-full p-5 mt-4 bg-[#2f2f2f]"
            onKeyDown={handleKeyDown}
          />
          <Dialog>
            <DialogTrigger asChild>
              <button
                className="bg-green-500 text-white font-bold rounded-sm mt-4 p-2"
                type="button"
              >
                Añadir
              </button>
            </DialogTrigger>
            <DialogContent className="bg-black text-white">
              <DialogHeader>
                <DialogTitle>Creacion de temporizador global</DialogTitle>
              </DialogHeader>
              <form
                onSubmit={handleCreateTimer}
                className="flex flex-col gap-y-4"
              >
                <label className="flex flex-col">
                  Titulo
                  <input
                    type="text"
                    name="title"
                    placeholder="ej: Descuentos de invierno"
                    className="bg-[#141414] p-3 rounded-lg"
                  />
                </label>
                <label className="flex flex-col">
                  Hasta
                  <input
                    name="endDate"
                    type="datetime-local"
                    className="bg-[#141414] p-3 rounded-lg"
                  />
                </label>
                <DialogFooter className="flex justify-between">
                  <DialogClose asChild>
                    <Button type="button" variant="secondary">
                      Cerrar
                    </Button>
                  </DialogClose>
                  <Button type="submit" className="bg-sky-600">
                    Crear
                  </Button>
                </DialogFooter>
              </form>
            </DialogContent>
          </Dialog>
        </div>
        <div className="flex flex-col w-[95%] gap-y-2 mt-5">
          {infoProducts?.products.map((product) => {
            return (
              <div
                className="bg-[#2f2f2f] p-3 rounded-lg w-full flex items-center "
                key={product.id}
              >
                <div className="flex items-center gap-2">
                  <h5 className="text-xl">{product.title}</h5>
                  {product.products.map((subProduct) => {
                    const platformComponentMap = {
                      [PlatformValid.PlayStation3]: ToolTipPs3,
                      [PlatformValid.PlayStation4]: ToolTipPs4,
                      [PlatformValid.PlayStation5]: ToolTipPs5,
                      [PlatformValid.Steam]: ToolTipSteam,
                    };

                    let sale: number | null = null;

                    if (subProduct.sale) {
                      sale = subProduct.sale.sale;
                    }

                    const platformName = subProduct.platform
                      .namePlatform as keyof typeof platformComponentMap;
                    const PlatformComponent =
                      platformComponentMap[platformName];

                    return (
                      <button
                        key={subProduct.id}
                        type="button"
                        className="bg-[#ffffff] gap-2 flex text-black items-center font-bold p-1 rounded-full transition-colors duration-300"
                      >
                        <>
                          <PlatformComponent
                            price={subProduct.price}
                            sale={subProduct.sale.sale}
                            salePrice={subProduct.sale.salePrice}
                            pricePrimary={subProduct.pricePrimary}
                            priceSecondary={subProduct.priceSecondary}
                            salePrimary={subProduct.sale.salePrimary}
                            saleSecondary={subProduct.sale.saleSecondary}
                          />
                          {sale ? (
                            <p className="ml-1 border border-rose-500 rounded-md text-xs flex items-center text-rose-500 h-5 w-9 justify-center">
                              -{sale}%
                            </p>
                          ) : (
                            ''
                          )}
                          {sale ? (
                            <button
                              type="button"
                              className="bg-[#494949] hover:bg-[#343434] flex items-center  font-bold p-1 rounded-full text-white transition-colors duration-300"
                              onClick={() =>
                                handleDeleteDiscount(subProduct.id)
                              }
                            >
                              <MinusIcon />
                            </button>
                          ) : (
                            ''
                          )}

                          <Dialog>
                            <DialogTrigger asChild>
                              <button
                                type="button"
                                className="bg-[#494949] hover:bg-[#343434] flex items-center text-white font-bold p-1 rounded-full transition-colors duration-300"
                              >
                                <PlusIcon />
                              </button>
                            </DialogTrigger>
                            <DialogContent className="bg-black text-white">
                              <DialogHeader>
                                <DialogTitle>Crear Descuento</DialogTitle>
                              </DialogHeader>
                              <form
                                key={subProduct.id}
                                className="flex flex-col gap-y-5"
                                onSubmit={(e) =>
                                  handleCreateDiscount(e, subProduct.id)
                                }
                              >
                                <div>
                                  <label className="flex flex-col">
                                    Cantidad en porcentaje
                                    <input
                                      type="number"
                                      className="bg-[#141414] p-3 rounded-lg"
                                      name="sale"
                                      placeholder="ej: 40"
                                    />
                                  </label>
                                </div>
                                <DialogFooter className="flex justify-between">
                                  <DialogClose asChild>
                                    <Button type="button" variant="secondary">
                                      Cerrar
                                    </Button>
                                  </DialogClose>
                                  <Button type="submit" className="bg-sky-600">
                                    Crear
                                  </Button>
                                </DialogFooter>
                              </form>
                            </DialogContent>
                          </Dialog>
                        </>
                      </button>
                    );
                  })}
                </div>
              </div>
            );
          })}
        </div>
        <PaginationProducts
          navigate={navigate}
          products={infoProducts ?? null}
        />
      </div>
      <Toaster position="bottom-right" richColors />
    </section>
  );
};

export default DiscountsDashboardPage;
