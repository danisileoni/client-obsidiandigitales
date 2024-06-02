import { CardProduct } from '@/components/products/CardProduct';
import { getAllProducts } from '@/services/products.services';
import { useQuery } from '@tanstack/react-query';
import { Link } from '@tanstack/react-router';
import { useState } from 'react';

export const ProductsPage = () => {
  const [limit, setLimit] = useState(24);
  const [offset, setOffset] = useState(0);

  const { data: products } = useQuery({
    queryKey: ['productsPagination'],
    queryFn: () => getAllProducts(limit, offset),
  });

  return (
    <>
      <section className="flex m-10 justify-center">
        <div className="bg-white flex flex-col h-fit shadow-md p-5 mr-6 rounded-md">
          <p className="text-lg">Filtros</p>
          <hr />
          <div className="mt-2 text-sm">
            <p className="font-bold text-base">Rango de precio:</p>
            <form action="" className="ml-2 flex gap-1 items-center">
              $
              <input
                type="text"
                placeholder="Minimo"
                className="w-16 pl-1 rounded border border-violet-500 outline-violet-700"
              />
              <p>-</p>
              $
              <input
                type="text"
                placeholder="Maximo"
                className="w-16 pl-1 rounded border border-violet-500 outline-violet-700"
              />
              <button
                type="submit"
                className="bg-violet-500 text-white rounded-md pr-1 pl-1 pb-0.5 pt-0.5"
              >
                Aplicar
              </button>
            </form>
          </div>
          <div className="mt-2 text-sm">
            <p className="font-bold text-base">Plataforma:</p>
            <div className="ml-2 flex flex-col text-violet-700">
              <Link
                to="/product"
                search={{
                  platform: 'Steam',
                }}
              >
                Steam
              </Link>
              <Link
                to="/product"
                search={{
                  platform: 'PlayStation 3',
                }}
              >
                PlayStation 3
              </Link>
              <Link
                to="/product"
                search={{
                  platform: 'PlayStation 4',
                }}
              >
                PlayStation 4
              </Link>
              <Link
                to="/product"
                search={{
                  platform: 'PlayStation 5',
                }}
              >
                PlayStation 5
              </Link>
            </div>
          </div>
          <div className="mt-2 text-sm">
            <p className="font-bold text-base">Categoria:</p>
            <div className="ml-2 flex flex-col text-violet-700">
              <Link to="/product" search={{ category: 'survival' }}>
                Supervivencia
              </Link>
              <Link to="/product" search={{ category: 'action' }}>
                Accion
              </Link>
              <Link to="/product" search={{ category: 'shooter' }}>
                Disparos
              </Link>
              <Link to="/product" search={{ category: 'role' }}>
                Rol
              </Link>
              <Link to="/product" search={{ category: 'music' }}>
                Musica
              </Link>
              <Link to="/product" search={{ category: 'war' }}>
                Guerra
              </Link>
              <Link to="/product" search={{ category: 'sport' }}>
                Deporte
              </Link>
              <Link to="/product" search={{ category: 'driving' }}>
                Conduccion
              </Link>
              <Link to="/product" search={{ category: 'multiplayer' }}>
                Multijugador
              </Link>
              <Link to="/product" search={{ category: 'children' }}>
                Infantil
              </Link>
              <Link to="/product" search={{ category: 'strategy' }}>
                Estrategia
              </Link>
              <Link to="/product" search={{ category: 'simulation' }}>
                Simulacion
              </Link>
              <Link to="/product" search={{ category: 'arcade' }}>
                Arcade
              </Link>
            </div>
          </div>
        </div>
        <div className="grid grid-rows-4 grid-cols-4 gap-6">
          {products?.map((product) => {
            return (
              <article key={product.id} className="w-52">
                <CardProduct product={product} />
              </article>
            );
          })}
        </div>
      </section>
    </>
  );
};
