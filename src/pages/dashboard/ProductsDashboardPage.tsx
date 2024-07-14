import React, { useEffect, useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import { toast, Toaster } from 'sonner';
import {
  deleteProducts,
  getAllProducts,
  patchInfoProduct,
  patchProduct,
  postCreateInfoProduct,
  postCreateProduct,
} from '@/services/products.services';
import { UseNavigateResult } from '@tanstack/react-router';
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import { SideBar } from '@/components/dashboard/SideBar';
import { DeleteIcon } from '@/components/icons/DeleteIcon';
import { PenEditIcon } from '@/components/icons/PenEditIcon';
import { PaginationProducts } from '@/components/products/PaginationProducts';
import {
  ToolTipPs3,
  ToolTipPs4,
  ToolTipPs5,
  ToolTipSteam,
} from '@/components/tooltip';
import { Button } from '@/components/ui/button';
import { ItemsDashboardFilter } from '@/routes/admin/dashboard/panel/products';
import { PlatformValid } from '@/services/enum-services';
import { PlusIcon } from '@/components/icons/PlusIcon';
import { useAuth } from '@/hooks/useAuth';

interface ProductsProps extends ItemsDashboardFilter {
  navigate: UseNavigateResult<'/admin/dashboard/panel/products'>;
}

const ProductsDashboardPage = ({ page, navigate }: ProductsProps) => {
  const limit = 10;
  const currentPage = Number(page);
  const offset = (currentPage - 1) * limit;

  const [search, setSearch] = useState<string>();
  const [selectPlatform, setSelectPlatform] = useState<string>();
  const [event, setEvent] = useState<boolean>();
  const [update, setUpdate] = useState(false);
  const { isAuthenticate, token } = useAuth();

  useEffect(() => {
    (async () => {
      const isAuth = await isAuthenticate();
      if (!isAuth) {
        navigate({ to: '/auth/login' });
      }
    })();
  }, [isAuthenticate, navigate]);

  const { data: infoProducts, refetch } = useQuery({
    queryKey: ['products', page, event, search, update],
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

  const handleFormSubmitInfoProduct = async (
    event: React.FormEvent<HTMLFormElement>,
    productId: string,
  ) => {
    event.preventDefault();
    const formElement = event.target as HTMLFormElement;
    const formData = new FormData(formElement);

    try {
      const response = await patchInfoProduct(productId, formData, token);
      if (response) {
        toast.success('El producto se ha actualizado correctamente');
        setEvent(true);
      }
    } catch (error) {
      toast.error('Ha ocurrido un error al actualizar el producto');
    }
  };

  const handleFormSubmitProduct = async (
    event: React.FormEvent<HTMLFormElement>,
    productId: number,
  ) => {
    event.preventDefault();
    const formElement = event.target as HTMLFormElement;
    const formData = new FormData(formElement);

    // biome-ignore lint/suspicious/noExplicitAny: <explanation>
    const data: { [key: string]: any } = {};
    formData.forEach((value, key) => {
      data[key] = +value;
    });

    try {
      const response = await patchProduct(
        productId,
        data as {
          price?: number;
          pricePrimary?: number;
          priceSecondary?: number;
        },
        token,
      );
      if (response) {
        toast.success('El producto se ha actualizado correctamente');
        setEvent(true);
      }
    } catch (error) {
      toast.error('Ha ocurrido un error al actualizar el producto');
    }
  };

  const handleDeleteProduct = async (id: number) => {
    try {
      const product = await deleteProducts(id, token);
      if (product) {
        toast.success('Se a eliminado correctamente');
        setUpdate(true);
        refetch();
      }
    } catch (error) {
      toast.error('A sucedido un error');
    }
  };

  const handleSubmitCreateProduct = async (
    e: React.FormEvent<HTMLFormElement>,
    infoProductId: string,
  ) => {
    e.preventDefault();
    const formElement = e.target as HTMLFormElement;
    const formData = new FormData(formElement);

    let data: {
      price?: number;
      pricePrimary?: number;
      priceSecondary?: number;
    } = {};
    let platformId: number | undefined;

    const platform = formData.get('platform') as string;
    const pricePrimary = formData.get('pricePrimary');
    const priceSecondary = formData.get('priceSecondary');
    const price = formData.get('price');

    if (
      platform === PlatformValid.Steam ||
      platform === PlatformValid.PlayStation3
    ) {
      if (price) {
        platformId = platform === PlatformValid.Steam ? 1 : 4;
        data = {
          price: +price,
        };
      }
    } else if (
      platform === PlatformValid.PlayStation4 ||
      platform === PlatformValid.PlayStation5
    ) {
      if (pricePrimary && priceSecondary) {
        platformId = platform === PlatformValid.PlayStation4 ? 2 : 3;
        data = {
          pricePrimary: +pricePrimary,
          priceSecondary: +priceSecondary,
        };
      }
    } else {
      return;
    }

    try {
      if (data && platformId !== undefined) {
        const response = await postCreateProduct(
          data,
          platformId,
          infoProductId,
          token,
        );
        if (response) {
          toast.success('El producto se ha creado correctamente');
          setEvent(true);
        }
      }
    } catch (error) {
      toast.error('Ha ocurrido un error al crear el producto');
    }
  };

  const handleCreateInfoProduct = async (
    e: React.FormEvent<HTMLFormElement>,
  ) => {
    e.preventDefault();
    let bodyProduct: {
      price?: number;
      pricePrimary?: number;
      priceSecondary?: number;
    } = {};
    let platformId: number | undefined;

    const formElement = e.target as HTMLFormElement;
    const formData = new FormData(formElement);

    const platform = formData.get('platform') as string;
    const pricePrimary = formData.get('pricePrimary');
    const priceSecondary = formData.get('priceSecondary');
    const price = formData.get('price');

    if (
      platform === PlatformValid.Steam ||
      platform === PlatformValid.PlayStation3
    ) {
      if (price) {
        platformId = platform === PlatformValid.Steam ? 1 : 4;
        bodyProduct = {
          price: +price,
        };
      }
    } else if (
      platform === PlatformValid.PlayStation4 ||
      platform === PlatformValid.PlayStation5
    ) {
      if (pricePrimary && priceSecondary) {
        platformId = platform === PlatformValid.PlayStation4 ? 2 : 3;
        bodyProduct = {
          pricePrimary: +pricePrimary,
          priceSecondary: +priceSecondary,
        };
      }
    } else {
      return;
    }

    formData.delete('platform');
    formData.delete('pricePrimary');
    formData.delete('priceSecondary');
    formData.delete('price');

    try {
      if (bodyProduct && platformId !== undefined) {
        const infoProduct = await postCreateInfoProduct(formData, token);
        const product = await postCreateProduct(
          bodyProduct,
          platformId,
          infoProduct.id,
          token,
        );
        if (product) {
          toast.success('Se a creado correctamente');
          setEvent(true);
        }
      }
    } catch (error) {
      console.log(error);
      toast.error('Ha ocurrido un error al crear el producto');
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      setSearch(e.currentTarget.value);
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
                <DialogTitle>Añadir Informacion de producto</DialogTitle>
              </DialogHeader>
              <form
                onSubmit={handleCreateInfoProduct}
                className="flex flex-col gap-y-4"
              >
                <label className="flex flex-col">
                  Titulo
                  <input
                    type="text"
                    name="title"
                    className="bg-[#141414] p-3 rounded-lg"
                    placeholder="ej: God of War"
                  />
                </label>
                <label className="flex flex-col">
                  Descripcion
                  <textarea
                    name="description"
                    className="bg-[#141414] p-3 rounded-lg"
                    placeholder="ej: Una vez habia un pajarito pun se murio "
                  />
                </label>
                <label className="flex flex-col">
                  Tags
                  <input
                    type="text"
                    name="tags"
                    className="bg-[#141414] p-3 rounded-lg"
                    placeholder="ej: aventura, accion, etc"
                  />
                </label>
                <label className="flex flex-col">
                  Imagenes
                  <input type="file" name="images" multiple />
                </label>
                <DialogHeader>
                  <DialogTitle>Añadir un producto</DialogTitle>
                </DialogHeader>
                <label className="flex flex-col">
                  Selecciona una plataforma
                  <select
                    onChange={(e) => setSelectPlatform(e.target.value)}
                    name="platform"
                    className="bg-[#292929] p-1 rounded-md"
                    id="pet-select"
                  >
                    <option value="">
                      --Por favor seleccione una opcion--
                    </option>
                    <option value="Steam">Steam</option>
                    <option value="PlayStation 3">PlayStation 3</option>
                    <option value="PlayStation 4">PlayStation 4</option>
                    <option value="PlayStation 5">PlayStation 5</option>
                  </select>
                  {selectPlatform ? (
                    selectPlatform === PlatformValid.Steam ||
                    selectPlatform === PlatformValid.PlayStation3 ? (
                      <div className="min-h-[200px]">
                        <label className="flex mt-5 gap-1 flex-col">
                          Precio del producto
                          <input
                            type="number"
                            name="price"
                            className="bg-[#141414] p-3 rounded-lg"
                            placeholder="precio"
                          />
                        </label>
                      </div>
                    ) : (
                      <div className="min-h-[200px]">
                        <label className="flex mt-5 gap-1 flex-col">
                          Precio primaria
                          <input
                            type="number"
                            name="pricePrimary"
                            className="bg-[#141414] p-3 rounded-lg"
                            placeholder="primaria"
                          />
                        </label>
                        <label className="flex mt-5 gap-1 flex-col">
                          Precio secundaria
                          <input
                            type="number"
                            name="priceSecondary"
                            className="bg-[#141414] p-3 rounded-lg"
                            placeholder="secundaria"
                          />
                        </label>
                      </div>
                    )
                  ) : (
                    <div className="min-h-[200px]" />
                  )}
                </label>
                <DialogFooter className="flex justify-between">
                  <DialogClose asChild>
                    <Button type="button" variant="secondary">
                      Cerrar
                    </Button>
                  </DialogClose>
                  <Button type="submit" className="bg-sky-600">
                    Guardar cambios
                  </Button>
                </DialogFooter>
              </form>
            </DialogContent>
          </Dialog>
        </div>
        <div className="flex flex-col w-[95%] gap-y-2 mt-5">
          {infoProducts?.products.map((product) => (
            <div
              className="bg-[#2f2f2f] p-3 rounded-lg w-full flex items-center justify-between"
              key={product.id}
            >
              <div className="flex items-center gap-2">
                <h5 className="text-xl">{product.title}</h5>
                {product.products.map((subProduct) => {
                  if (
                    subProduct.platform.namePlatform ===
                      PlatformValid.PlayStation3 &&
                    subProduct.price
                  ) {
                    return (
                      <Dialog key={subProduct.id}>
                        <DialogTrigger asChild>
                          <button
                            type="button"
                            className="bg-[#ffffff] flex items-center font-bold hover:bg-sky-300 p-1 rounded-full transition-colors duration-300"
                          >
                            <ToolTipPs3
                              key={subProduct.id}
                              price={subProduct.price}
                              salePrice={subProduct.sale.salePrice}
                              sale={subProduct.sale.sale}
                            />
                          </button>
                        </DialogTrigger>
                        <DialogContent className="bg-black text-white">
                          <DialogHeader>
                            <DialogTitle>Editar Producto</DialogTitle>
                          </DialogHeader>
                          <form
                            onSubmit={(e) =>
                              handleFormSubmitProduct(e, subProduct.id)
                            }
                            className="flex flex-col gap-y-5"
                          >
                            <label className="flex flex-col">
                              Precio
                              <input
                                type="number"
                                name="price"
                                className="bg-[#141414] p-3 rounded-lg"
                                defaultValue={subProduct.price}
                              />
                            </label>
                            <DialogFooter className="flex justify-between">
                              <DialogClose asChild>
                                <Button type="button" variant="secondary">
                                  Cerrar
                                </Button>
                              </DialogClose>
                              <Button type="submit" className="bg-sky-600">
                                Guardar edicion
                              </Button>
                            </DialogFooter>
                          </form>
                        </DialogContent>
                      </Dialog>
                    );
                  }
                  if (
                    subProduct.platform.namePlatform ===
                      PlatformValid.PlayStation4 &&
                    subProduct.pricePrimary &&
                    subProduct.priceSecondary
                  ) {
                    return (
                      <Dialog key={subProduct.id}>
                        <DialogTrigger asChild>
                          <button
                            type="button"
                            className="bg-[#ffffff] flex items-center font-bold hover:bg-sky-300 p-1 rounded-full transition-colors duration-300"
                          >
                            <ToolTipPs4
                              key={subProduct.id}
                              pricePrimary={subProduct.pricePrimary}
                              priceSecondary={subProduct.priceSecondary}
                              salePrimary={subProduct.sale.salePrimary}
                              saleSecondary={subProduct.sale.saleSecondary}
                              sale={subProduct.sale.sale}
                            />
                          </button>
                        </DialogTrigger>
                        <DialogContent className="bg-black text-white">
                          <DialogHeader>
                            <DialogTitle>Editar Producto</DialogTitle>
                          </DialogHeader>
                          <form
                            onSubmit={(e) =>
                              handleFormSubmitProduct(e, subProduct.id)
                            }
                            className="flex flex-col gap-y-5"
                          >
                            <label className="flex flex-col">
                              Precio primaria
                              <input
                                type="number"
                                name="pricePrimary"
                                className="bg-[#141414] p-3 rounded-lg"
                                defaultValue={subProduct.pricePrimary}
                              />
                            </label>
                            <label className="flex flex-col">
                              Precio secundaria
                              <input
                                type="number"
                                name="priceSecondary"
                                className="bg-[#141414] p-3 rounded-lg"
                                defaultValue={subProduct.priceSecondary}
                              />
                            </label>
                            <DialogFooter className="flex justify-between">
                              <DialogClose asChild>
                                <Button type="button" variant="secondary">
                                  Cerrar
                                </Button>
                              </DialogClose>
                              <Button type="submit" className="bg-sky-600">
                                Guardar edicion
                              </Button>
                            </DialogFooter>
                          </form>
                        </DialogContent>
                      </Dialog>
                    );
                  }
                  if (
                    subProduct.platform.namePlatform ===
                      PlatformValid.PlayStation5 &&
                    subProduct.pricePrimary &&
                    subProduct.priceSecondary
                  ) {
                    return (
                      <Dialog key={subProduct.id}>
                        <DialogTrigger asChild>
                          <button
                            type="button"
                            className="bg-[#ffffff] flex items-center font-bold hover:bg-sky-300 p-1 rounded-full transition-colors duration-300"
                          >
                            <ToolTipPs5
                              key={subProduct.id}
                              sale={subProduct.sale.sale}
                              pricePrimary={subProduct.pricePrimary}
                              priceSecondary={subProduct.priceSecondary}
                              salePrimary={subProduct.sale.salePrimary}
                              saleSecondary={subProduct.sale.saleSecondary}
                            />
                          </button>
                        </DialogTrigger>
                        <DialogContent className="bg-black text-white">
                          <DialogHeader>
                            <DialogTitle>Editar Producto</DialogTitle>
                          </DialogHeader>
                          <form
                            onSubmit={(e) =>
                              handleFormSubmitProduct(e, subProduct.id)
                            }
                            className="flex flex-col gap-y-5"
                          >
                            <label className="flex flex-col">
                              Precio primaria
                              <input
                                type="number"
                                name="pricePrimary"
                                className="bg-[#141414] p-3 rounded-lg"
                                defaultValue={subProduct.pricePrimary}
                              />
                            </label>
                            <label className="flex flex-col">
                              Precio secundaria
                              <input
                                type="number"
                                name="priceSecondary"
                                className="bg-[#141414] p-3 rounded-lg"
                                defaultValue={subProduct.priceSecondary}
                              />
                            </label>
                            <DialogFooter className="flex justify-between">
                              <DialogClose asChild>
                                <Button type="button" variant="secondary">
                                  Cerrar
                                </Button>
                              </DialogClose>
                              <Button type="submit" className="bg-sky-600">
                                Guardar edicion
                              </Button>
                            </DialogFooter>
                          </form>
                        </DialogContent>
                      </Dialog>
                    );
                  }
                  if (
                    subProduct.platform.namePlatform === PlatformValid.Steam &&
                    subProduct.price
                  ) {
                    return (
                      <Dialog key={subProduct.id}>
                        <DialogTrigger asChild>
                          <button
                            type="button"
                            className="bg-[#ffffff] flex items-center font-bold hover:bg-sky-300 p-1 rounded-full transition-colors duration-300"
                          >
                            <ToolTipSteam
                              key={subProduct.id}
                              price={subProduct.price}
                              sale={subProduct.sale.sale}
                              salePrice={subProduct.sale.salePrice}
                            />
                          </button>
                        </DialogTrigger>
                        <DialogContent className="bg-black text-white">
                          <DialogHeader>
                            <DialogTitle>Editar Producto</DialogTitle>
                          </DialogHeader>
                          <form
                            onSubmit={(e) =>
                              handleFormSubmitProduct(e, subProduct.id)
                            }
                            className="flex flex-col gap-y-5"
                          >
                            <label className="flex flex-col">
                              Precio
                              <input
                                type="number"
                                name="price"
                                className="bg-[#141414] p-3 rounded-lg"
                                defaultValue={subProduct.price}
                              />
                            </label>
                            <DialogFooter className="flex justify-between">
                              <DialogClose asChild>
                                <Button type="button" variant="secondary">
                                  Cerrar
                                </Button>
                              </DialogClose>
                              <Button type="submit" className="bg-sky-600">
                                Guardar edicion
                              </Button>
                            </DialogFooter>
                          </form>
                        </DialogContent>
                      </Dialog>
                    );
                  }
                })}
                <Dialog>
                  <DialogTrigger asChild>
                    <button
                      type="button"
                      className="bg-[#494949] hover:bg-[#343434] flex items-center font-bold p-2  rounded-full transition-colors duration-300"
                    >
                      <PlusIcon />
                    </button>
                  </DialogTrigger>
                  <DialogContent className="bg-black text-white">
                    <DialogHeader>
                      <DialogTitle>Crear Producto</DialogTitle>
                    </DialogHeader>
                    <form
                      onSubmit={(e) =>
                        handleSubmitCreateProduct(e, `${product.id}`)
                      }
                      className="flex flex-col gap-y-5"
                    >
                      <label className="flex flex-col">
                        Selecciona una plataforma
                        <select
                          onChange={(e) => setSelectPlatform(e.target.value)}
                          name="platform"
                          className="bg-[#292929] p-1 rounded-md"
                          id="pet-select"
                        >
                          <option value="">
                            --Por favor seleccione una opcion--
                          </option>
                          <option value="Steam">Steam</option>
                          <option value="PlayStation 3">PlayStation 3</option>
                          <option value="PlayStation 4">PlayStation 4</option>
                          <option value="PlayStation 5">PlayStation 5</option>
                        </select>
                        {selectPlatform ? (
                          selectPlatform === PlatformValid.Steam ||
                          selectPlatform === PlatformValid.PlayStation3 ? (
                            <div className="min-h-[200px]">
                              <label className="flex mt-5 gap-1 flex-col">
                                Precio del producto
                                <input
                                  type="number"
                                  name="price"
                                  className="bg-[#141414] p-3 rounded-lg"
                                  placeholder="precio"
                                />
                              </label>
                            </div>
                          ) : (
                            <div className="min-h-[200px]">
                              <label className="flex mt-5 gap-1 flex-col">
                                Precio primaria
                                <input
                                  type="number"
                                  name="pricePrimary"
                                  className="bg-[#141414] p-3 rounded-lg"
                                  placeholder="primaria"
                                />
                              </label>
                              <label className="flex mt-5 gap-1 flex-col">
                                Precio secundaria
                                <input
                                  type="number"
                                  name="priceSecondary"
                                  className="bg-[#141414] p-3 rounded-lg"
                                  placeholder="secundaria"
                                />
                              </label>
                            </div>
                          )
                        ) : (
                          <div className="min-h-[200px]" />
                        )}
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
              <div className="flex gap-2">
                <Dialog>
                  <DialogTrigger asChild>
                    <button
                      type="button"
                      className="bg-[#494949] hover:bg-[#343434] p-2 rounded-full transition-colors duration-300"
                    >
                      <PenEditIcon />
                    </button>
                  </DialogTrigger>
                  <DialogContent className="bg-black text-white">
                    <DialogHeader>
                      <DialogTitle>Editar Informacion de Producto</DialogTitle>
                    </DialogHeader>
                    <form
                      onSubmit={(e) =>
                        handleFormSubmitInfoProduct(e, `${product.id}`)
                      }
                      className="flex flex-col gap-y-4"
                    >
                      <label className="flex flex-col">
                        Titulo
                        <input
                          type="text"
                          name="title"
                          className="bg-[#141414] p-3 rounded-lg"
                          placeholder="ej: God of War"
                          defaultValue={product.title}
                        />
                      </label>
                      <label className="flex flex-col">
                        Descripcion
                        <textarea
                          name="description"
                          defaultValue={product.description}
                          className="bg-[#141414] p-3 rounded-lg"
                          placeholder="ej: Una vez habia un pajarito pun se murio "
                        />
                      </label>
                      <label className="flex flex-col">
                        Tags
                        <input
                          type="text"
                          name="tags"
                          className="bg-[#141414] p-3 rounded-lg"
                          placeholder="ej: aventura, accion, etc"
                          defaultValue={product.tags}
                        />
                      </label>
                      <label className="flex flex-col">
                        Imagenes
                        <input type="file" name="images" multiple />
                      </label>
                      <DialogFooter className="flex justify-between">
                        <DialogClose asChild>
                          <Button type="button" variant="secondary">
                            Cerrar
                          </Button>
                        </DialogClose>
                        <Button type="submit" className="bg-sky-600">
                          Guardar cambios
                        </Button>
                      </DialogFooter>
                    </form>
                  </DialogContent>
                </Dialog>

                <button
                  type="button"
                  className="bg-red-600 hover:bg-red-800 p-2 rounded-full transition-colors duration-300"
                  onClick={() => handleDeleteProduct(product.id)}
                >
                  <DeleteIcon />
                </button>
              </div>
            </div>
          ))}
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

export default ProductsDashboardPage;
