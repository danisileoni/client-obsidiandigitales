import { useEffect, useState } from 'react';
import banner from '../assets/banner.webp';
import { getAllProducts } from '@/services/products.services';
import type { Product } from '@/services/types-services.d.ts';
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from '@/components/ui/carousel';
import { CardProduct } from '@/components/products/CardProduct';

const MAX_SCREEN_WIDTH = 768;

export const LandingPage = () => {
  const [products, setProducts] = useState<Product[]>();
  const [showControls, setShowControls] = useState(true);

  useEffect(() => {
    (async () => {
      const data = await getAllProducts(10, 0);
      setProducts(data);
    })();
  }, []);

  useEffect(() => {
    const handleResize = () => {
      setShowControls(window.innerWidth > MAX_SCREEN_WIDTH);
    };

    handleResize();

    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  return (
    <div>
      <div className="relative">
        <img
          className="w-full h-[400px] object-cover"
          src={banner}
          alt="Banner"
        />
        <h1 className="md:text-4xl lg:text-5xl  absolute transform -translate-x-1/2 -translate-y-1/2 left-1/2 top-1/2 text-white font-bold">
          <span className="text-violet-600">Obsidian digitales</span>
          , Tu <br />
          Tienda de Juegos de <br />
          Preferencia.
        </h1>
      </div>
      <section className="pt-5 pl-2 pr-2 md:pt-10 md:pl-24 md:pr-24 xl:pr-32 xl:pl-32">
        <h2 className="text-2xl font-bold md:text-4xl">Ofertas</h2>
      </section>
      <section className="pt-5 pl-2 pr-2 md:pt-10 md:pl-20 md:pr-20 xl:pr-32 xl:pl-32">
        <div className="justify-between flex items-end">
          <h2 className="text-2xl font-bold md:text-4xl pb-4">Ingresos</h2>
          <p className="text-violet-700">Ver mas</p>
        </div>
        <hr className="pb-5" />
        <Carousel
          opts={{
            align: 'start',
          }}
          className="w-full"
        >
          <CarouselContent className="-ml-2 md:-ml-4">
            {' '}
            {products?.map((product) => {
              return (
                <CarouselItem
                  className="max-md:basis-52 md:basis-52 xl:basis-56 lg:basis-56 mb-6 max-xs:basis-40"
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
      </section>
    </div>
  );
};
