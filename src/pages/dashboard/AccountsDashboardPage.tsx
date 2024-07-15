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
import {
  getQuantityAccounts,
  postCreateAccount,
} from '@/services/account.service';
import { PlatformValid } from '@/services/enum-services';
import { getAllProducts } from '@/services/products.services';
import { useQuery } from '@tanstack/react-query';
import { UseNavigateResult } from '@tanstack/react-router';
import React, { useEffect, useState } from 'react';
import { useAuth } from '@/hooks/useAuth';

interface ProductsProps extends ItemsDashboardFilter {
  navigate: UseNavigateResult<'/admin/dashboard/panel/accounts'>;
}

const AccountsDashboardPage = ({ page, navigate }: ProductsProps) => {
  const limit = 10;
  const currentPage = Number(page);
  const offset = (currentPage - 1) * limit;

  const [selectPlatform, setSelectPlatform] = useState<string>('');
  const [search, setSearch] = useState<string>();
  const [update, setUpdate] = useState<boolean>(false);
  const { token, isAuthenticate } = useAuth();

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

  const productsId = infoProducts?.products.map((product) => {
    return product.products.map((products) => {
      return `${products.id}`;
    });
  });

  const { data: accountProducts } = useQuery({
    queryKey: ['products-accounts', infoProducts],
    queryFn: () => getQuantityAccounts({ productsId: productsId?.flat() }),
  });

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      setSearch(e.currentTarget.value);
    }
  };

  const handleCreateAccount = async (
    e: React.FormEvent<HTMLFormElement>,
    idProduct: number,
  ) => {
    e.preventDefault();

    const formElement = e.target as HTMLFormElement;
    const formData = new FormData(formElement);

    const email = formData.get('email') as string;
    const password = formData.get('password') as string;

    const quantityPrimary = formData.get('quantityPrimary');
    const quantitySecondary = formData.get('quantitySecondary');

    const bodyProduct: {
      idProduct: number;
      email: string;
      password: string;
      quantityPrimary?: number | null;
      quantitySecondary?: number | null;
      typeAccount: string;
    } = {
      idProduct,
      email,
      password,
      typeAccount: selectPlatform,
      quantityPrimary: quantityPrimary ? +quantityPrimary : null,
      quantitySecondary: quantitySecondary ? +quantitySecondary : null,
    };

    try {
      const account = await postCreateAccount(bodyProduct, token);
      if (account) {
        toast.success('La cuenta se a creado correctamente');
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
        </div>
        <div className="flex flex-col w-[95%] gap-y-2 mt-5">
          {infoProducts?.products.map((product) => {
            return (
              <div
                className="bg-[#2f2f2f] p-3 rounded-lg w-full flex items-center justify-between"
                key={product.id}
              >
                <div className="flex items-center gap-2">
                  <h5 className="text-xl">{product.title}</h5>
                  {product.products.map((subProduct) => {
                    const quantityAccount = accountProducts?.find(
                      (item) => item.id === subProduct.id,
                    );

                    const platformComponentMap = {
                      [PlatformValid.PlayStation3]: ToolTipPs3,
                      [PlatformValid.PlayStation4]: ToolTipPs4,
                      [PlatformValid.PlayStation5]: ToolTipPs5,
                      [PlatformValid.Steam]: ToolTipSteam,
                    };

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
                          <Dialog>
                            <DialogTrigger asChild>
                              <button
                                type="button"
                                className="bg-[#494949] hover:bg-[#343434] flex items-center text-white font-bold p-1 rounded-full transition-colors duration-300"
                                onClick={() =>
                                  setSelectPlatform(
                                    subProduct.platform.namePlatform,
                                  )
                                }
                              >
                                <PlusIcon />
                              </button>
                            </DialogTrigger>
                            <DialogContent className="bg-black text-white">
                              <DialogHeader>
                                <DialogTitle>Crear Producto</DialogTitle>
                              </DialogHeader>
                              <form
                                key={subProduct.id}
                                className="flex flex-col gap-y-5"
                                onSubmit={(e) =>
                                  handleCreateAccount(e, subProduct.id)
                                }
                              >
                                <div>
                                  {selectPlatform ? (
                                    <>
                                      <label className="flex mt-5 gap-1 flex-col">
                                        Email
                                        <input
                                          type="email"
                                          name="email"
                                          className="bg-[#141414] p-3 rounded-lg"
                                          placeholder="email"
                                        />
                                      </label>
                                      <label className="flex mt-5 gap-1 flex-col">
                                        Contraseña
                                        <input
                                          type="password"
                                          name="password"
                                          className="bg-[#141414] p-3 rounded-lg"
                                          placeholder="contraseña"
                                        />
                                      </label>
                                      {(selectPlatform ===
                                        PlatformValid.PlayStation5 ||
                                        selectPlatform ===
                                          PlatformValid.PlayStation4) && (
                                        <>
                                          <label className="flex mt-5 gap-1 flex-col">
                                            Cantidad Primarias
                                            <input
                                              type="number"
                                              name="quantityPrimary"
                                              className="bg-[#141414] p-3 rounded-lg"
                                              placeholder="ej: 5"
                                            />
                                          </label>
                                          <label className="flex mt-5 gap-1 flex-col">
                                            Cantidad Secundarias
                                            <input
                                              type="number"
                                              name="quantitySecondary"
                                              className="bg-[#141414] p-3 rounded-lg"
                                              placeholder="ej: 2"
                                            />
                                          </label>
                                        </>
                                      )}
                                    </>
                                  ) : (
                                    <div className="min-h-[200px]" />
                                  )}
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
                        Total: {quantityAccount?.quantity ?? 0}
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

export default AccountsDashboardPage;
