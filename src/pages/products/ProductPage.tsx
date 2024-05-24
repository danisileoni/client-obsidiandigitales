import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from '@/components/ui/carousel';
import { getOneProduct } from '@/services/products.services';
import { Product } from '@/services/types-services';
import { useEffect, useRef, useState } from 'react';
import Autoplay from 'embla-carousel-autoplay';

type ProductProps = {
  param: string;
};

const MAX_SCREEN_WIDTH = 768;

export const ProductPage = ({ param }: ProductProps) => {
  const [product, setProduct] = useState<Product>();
  const [showControls, setShowControls] = useState(true);
  const plugin = useRef(Autoplay({ delay: 4000, stopOnInteraction: true }));

  useEffect(() => {
    (async () => {
      const data = await getOneProduct(param);
      setProduct(data);
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
    <>
      <article className="flex flex-col items-center justify-start mt-5 md:flex-row md:justify-center md:items-start md:mt-14">
        <div className="flex flex-col items-center justify-start md:flex-row md:justify-center md:items-start">
          <Carousel
            plugins={[plugin.current]}
            onMouseEnter={plugin.current.stop}
            onMouseLeave={plugin.current.reset}
          >
            <CarouselContent>
              {product?.productImages.map((image) => {
                return (
                  <CarouselItem key={image.id}>
                    <img
                      src={image.url}
                      className="object-cover h-[300px] w-[250px] xs:h-[350px] xs:w-[300px]"
                      alt={product.title}
                    />
                  </CarouselItem>
                );
              })}
            </CarouselContent>
          </Carousel>
          <h2 className="md:pl-2 text-start text-xl max-md:w-full md:text-3xl font-bold">
            {product?.title}
          </h2>
        </div>
      </article>
    </>
  );
};
