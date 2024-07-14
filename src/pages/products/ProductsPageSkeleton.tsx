import { Navbar } from '@/components/common/Navbar';
import { HomeIcon } from '@/components/icons/HomeIcon';
import SkeletonCardProduct from '@/components/products/skeletons/SkeletonCardProduct';

const ProductsPageSkeleton = () => {
  return (
    <>
      <Navbar />
      <header>
        <title>Productos | Compra los mejores juegos baratos</title>
        <meta
          name="description"
          content="Explora nuestra colección de juegos baratos en diversas categorías y plataformas. Compra los mejores juegos al mejor precio."
        />
        <meta
          name="keywords"
          content="juegos baratos, comprar juegos, juegos en oferta, juegos de acción, juegos de supervivencia, juegos de disparos"
        />
      </header>
      <section className="flex flex-col items-center mt-5 mb-20">
        <div className="self-center flex flex-col">
          <div className="flex flex-col w-full">
            <div className="flex gap-1 flex-row mt-7 items-center">
              <HomeIcon />
              <span className="text-gray-500 hover:text-sky-400 transition-colors duration-500">
                Inicio
              </span>
              <p className="text-gray-500">{'>'}</p>
              <p className="text-sky-700">Productos</p>
            </div>
            <h1 className="text-3xl mb-4 font-bold max-sm:hidden">
              ¡Compra los mejores juegos baratos!
            </h1>
          </div>
          <div className="flex flex-col md:flex-row md:items-start w-full">
            <div className="max-md:flex max-md:flex-col">
              <button
                type="button"
                className="md:hidden border border-sky-700 text-sky-700 p-1 rounded-md mb-4 self-end"
              >
                Filtros ⌄
              </button>
              <div className="bg-white flex-col max-md:max-w-[95%] max-md:self-center max-md:mr-0 h-fit shadow-md p-5 max-md:mb-5 mr-6 rounded-md md:flex">
                <p className="text-lg">Filtros</p>
                <hr />
                <div className="mt-2 text-sm max-md:text-base">
                  <p className="font-bold text-base">Rango de precio:</p>
                  <form className="ml-2 flex gap-1 items-center">
                    $
                    <input
                      type="number"
                      name="min"
                      placeholder="Minimo"
                      className="w-[4.5rem] max-md:w-[35%] pl-1 rounded border border-sky-500 outline-sky-700"
                    />
                    <p>-</p>
                    $
                    <input
                      type="number"
                      name="max"
                      placeholder="Maximo"
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
                  <input type="checkbox" id="sale" className="mr-1" />
                  <label
                    className="text-sky-700 max-md:text-base"
                    htmlFor="sale"
                  >
                    Ofertas
                  </label>
                </div>
                <div className="mt-2 text-sm">
                  <p className="font-bold text-base">Plataforma:</p>
                  <div className="ml-2 flex flex-col max-md:text-base text-sky-700">
                    <ul>
                      {[
                        'Steam',
                        'PlayStation 3',
                        'PlayStation 4',
                        'PlayStation 5',
                      ].map((platform) => (
                        <li key={platform}>
                          <input
                            type="radio"
                            name="platform"
                            id={platform}
                            value={platform}
                          />
                          <label className="ml-1" htmlFor={platform}>
                            {platform}
                          </label>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
                <div className="mt-2 text-sm">
                  <p className="font-bold text-base">Categoria:</p>
                  <div className="ml-2 flex flex-col max-md:text-base text-sky-700">
                    <ul>
                      {[
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
                      ].map((str) => (
                        <li key={str.category}>
                          <input
                            value={str.category}
                            name="category"
                            type="checkbox"
                            id={str.category}
                            className="mr-1"
                          />
                          <label htmlFor={str.category}>{str.title}</label>
                        </li>
                      ))}
                    </ul>
                  </div>
                  <div>
                    <button
                      type="button"
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
                {Array.from({ length: 24 }).map((_, index) => (
                  // biome-ignore lint/suspicious/noArrayIndexKey: <explanation>
                  <SkeletonCardProduct key={index} />
                ))}
              </div>
              <div className="mt-5 self-center">
                <div className="h-10 w-40 bg-gray-300 rounded-md animate-pulse" />
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default ProductsPageSkeleton;
