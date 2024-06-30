import { Footer } from '@/components/common/Footer';
import { Navbar } from '@/components/common/Navbar';
import { HomeIcon } from '@/components/icons/HomeIcon';
import { CardProduct } from '@/components/products/CardProduct';
import { PaginationProducts } from '@/components/products/PaginationProducts';
import { Category, handleFilter, handleFilterPrice } from '@/helpers';
import { useReSideWindows } from '@/hooks/re-side-window';
import type { ItemFilters } from '@/routes/product';
import { getAllProducts } from '@/services/products.services';
import { useQuery } from '@tanstack/react-query';
import { Link, type UseNavigateResult } from '@tanstack/react-router';
import { useState } from 'react';

interface ProductsProps extends ItemFilters {
  navigate: UseNavigateResult<'/product'>;
}

const categorysArray = [
  { category: 'supervivencia', title: 'Supervivencia' },
  { category: 'accion', title: 'Accion' },
  { category: 'disparos', title: 'Disparos' },
  { category: 'musica', title: 'Musica' },
  { category: 'guerra', title: 'Guerra' },
  { category: 'deporte', title: 'Deporte' },
  { category: 'conduccion', title: 'Conduccion' },
  { category: 'multijugador', title: 'Multijugador' },
  { category: 'infantil', title: 'Infantil' },
  { category: 'estrategia', title: 'Estrategia' },
  { category: 'simulacion', title: 'Simulacion' },
  { category: 'arcade', title: 'Arcade' },
];

const platformArray = [
  'Steam',
  'PlayStation 3',
  'PlayStation 4',
  'PlayStation 5',
];

export const ProductsPage = ({
  category,
  page,
  platform,
  maxPrice,
  minPrice,
  sale,
  search,
  navigate,
}: ProductsProps) => {
  const limit = 24;
  const currentPage = Number(page);
  const offset = (currentPage - 1) * limit;

  const [inputMinPrice, setInputMinPrice] = useState<string | undefined>();
  const [inputMaxPrice, setInputMaxPrice] = useState<string | undefined>();
  const { showControls } = useReSideWindows();
  const [isFilterMenuOpen, setIsFilterMenuOpen] = useState(false);

  const { data: products } = useQuery({
    queryKey: [
      'allProducts',
      offset,
      limit,
      category,
      sale,
      platform,
      minPrice,
      maxPrice,
      page,
      search,
    ],
    queryFn: () =>
      getAllProducts(
        limit,
        offset,
        minPrice,
        maxPrice,
        category,
        platform,
        sale,
        search,
      ),
  });

  const handleQueryPrice = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    handleFilterPrice(inputMinPrice, inputMaxPrice, navigate);
  };

  const handleDeleteQueryParams = () => {
    navigate({ search: (prev) => ({ page: prev.page }), replace: true });
  };

  return (
    <>
      <Navbar />
      <head>
        <title>Productos | Compra los mejores juegos baratos</title>
        <meta
          name="description"
          content="Explora nuestra colección de juegos baratos en diversas categorías y plataformas. Compra los mejores juegos al mejor precio."
        />
        <meta
          name="keywords"
          content="juegos baratos, comprar juegos, juegos en oferta, juegos de acción, juegos de supervivencia, juegos de disparos"
        />
      </head>
      <section className="flex flex-col items-center mt-5 mb-20">
        <div className="self-center flex flex-col">
          <div className="flex flex-col w-full">
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
                <p className="text-sky-700">Productos</p>
              </div>
            )}
            <h1 className="text-3xl mb-4 font-bold max-sm:hidden">
              ¡Compra los mejores juegos baratos!
            </h1>
          </div>
          <div className="flex flex-col md:flex-row md:items-start w-full">
            <div className="max-md:flex max-md:flex-col">
              <button
                type="button"
                className="md:hidden border border-sky-700 text-sky-700 p-1 rounded-md mb-4 self-end"
                onClick={() => setIsFilterMenuOpen(!isFilterMenuOpen)}
              >
                {isFilterMenuOpen ? 'Filtros ⌃' : 'Filtros ⌄'}
              </button>
              <div
                className={`bg-white flex-col max-md:max-w-[95%] max-md:self-center max-md:mr-0 h-fit shadow-md p-5 max-md:mb-5 mr-6 rounded-md ${isFilterMenuOpen ? 'flex' : 'hidden'} md:flex`}
              >
                <p className="text-lg">Filtros</p>
                <hr />
                <div className="mt-2 text-sm max-md:text-base">
                  <p className="font-bold text-base">Rango de precio:</p>
                  <form
                    action=""
                    onSubmit={handleQueryPrice}
                    className="ml-2 flex gap-1 items-center"
                  >
                    $
                    <input
                      type="number"
                      name="min"
                      placeholder="Minimo"
                      defaultValue={minPrice}
                      onChange={(e) => setInputMinPrice(e.target.value)}
                      className="w-[4.5rem] max-md:w-[35%] pl-1 rounded border border-sky-500 outline-sky-700"
                    />
                    <p>-</p>
                    $
                    <input
                      type="number"
                      name="max"
                      placeholder="Maximo"
                      defaultValue={maxPrice}
                      onChange={(e) => setInputMaxPrice(e.target.value)}
                      className="w-[4.5rem] max-md:w-[35%] pl-1 rounded border border-sky-500 outline-sky-700"
                    />
                    <button
                      type="submit"
                      className="bg-sky-500 text-black rounded-md pr-1 pl-1 pb-0.5 pt-0.5"
                    >
                      Aplicar
                    </button>
                  </form>
                </div>
                <div className="mt-2">
                  <input
                    type="checkbox"
                    id="sale"
                    checked={sale}
                    name="sale"
                    onChange={(e) => handleFilter(e, navigate)}
                    className="mr-1"
                  />
                  <label
                    className="text-sky-700 max-md:text-base"
                    htmlFor="sale"
                  >
                    Ofertas
                  </label>{' '}
                </div>
                <div className="mt-2 text-sm">
                  <p className="font-bold text-base">Plataforma:</p>
                  <div className="ml-2 flex flex-col max-md:text-base text-sky-700">
                    <ul>
                      {platformArray.map(($platform) => {
                        return (
                          <li key={$platform}>
                            <input
                              type="radio"
                              name="platform"
                              checked={platform === $platform}
                              id={$platform}
                              value={$platform}
                              onChange={(e) => handleFilter(e, navigate)}
                            />
                            <label className="ml-1" htmlFor={$platform}>
                              {$platform}
                            </label>
                          </li>
                        );
                      })}
                    </ul>
                  </div>
                </div>
                <div className="mt-2 text-sm">
                  <p className="font-bold text-base">Categoria:</p>
                  <div className="ml-2 flex flex-col max-md:text-base text-sky-700">
                    <ul>
                      {categorysArray.map((str) => (
                        <li key={str.category}>
                          <input
                            value={str.category}
                            name="category"
                            checked={
                              category
                                ? category?.includes(str.category as Category)
                                : false
                            }
                            onChange={(e) => handleFilter(e, navigate)}
                            className="mr-1"
                            type="checkbox"
                            id={str.category}
                          />
                          <label htmlFor={str.category}>{str.title}</label>{' '}
                        </li>
                      ))}
                    </ul>
                  </div>
                  <div>
                    <button
                      type="button"
                      onClick={handleDeleteQueryParams}
                      className="w-full bg-sky-500 text-black pt-1 pb-1 rounded-md mt-2"
                    >
                      Eliminar filtros
                    </button>
                  </div>
                </div>
              </div>
            </div>
            <div className="flex flex-col items-center md:items-start w-full">
              <div className="grid grid-cols-4 max-md:grid-cols-2 max-lg:grid-cols-3 gap-4">
                {products?.products.map((product) => {
                  return (
                    <article key={product.id} className="w-52 max-xs:w-36">
                      <CardProduct product={product} />
                    </article>
                  );
                })}
              </div>
              <div className="mt-5 self-center">
                <PaginationProducts
                  navigate={navigate}
                  products={products ?? null}
                />
              </div>
            </div>
          </div>
        </div>
      </section>
      <Footer />
    </>
  );
};
