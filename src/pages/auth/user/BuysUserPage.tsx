import { Navbar } from '@/components/common/Navbar';
import { SkeletonBuy } from '@/components/user/SkeletonBuy';
import { findOrderUser } from '@/services/order.service';
import { useQuery } from '@tanstack/react-query';

export const BuysUserPage = ({ userId }: { userId: string }) => {
  const { data: orders, isLoading } = useQuery({
    queryKey: ['order-user', userId],
    queryFn: () => findOrderUser(userId),
  });

  return (
    <>
      <Navbar />
      <section className="w-full flex flex-col items-center justify-center bg-gray-100 p-4 md:p-8">
        <h1 className="text-2xl md:text-3xl font-bold text-center mb-6 md:mb-8">
          Compras realizadas
        </h1>
        <div className="space-y-6 w-full max-w-2xl">
          {isLoading ? (
            <SkeletonBuy />
          ) : (
            orders?.map((order) => (
              <div
                key={order.id}
                className="bg-white p-4 md:p-6 rounded-lg shadow-md"
              >
                <h4 className="text-lg md:text-xl font-semibold mb-4">
                  Orden N° {order.id}
                </h4>
                <div className="flex flex-wrap gap-4 overflow-x-auto">
                  {order.details.map((detail) => (
                    <div key={detail.id} className="flex items-center">
                      <img
                        className="w-16 h-24 md:w-20 md:h-28 object-cover rounded-md"
                        src={detail.product.infoProduct.images[0].url}
                        alt={detail.product.infoProduct.title}
                      />
                      <h5 className="text-xs md:text-sm mt-2 ml-2 text-center">
                        {detail.product.infoProduct.title}
                      </h5>
                    </div>
                  ))}
                </div>
                <h5 className="text-md md:text-lg w-full text-end font-semibold mt-4">
                  Total de la orden:{' '}
                  <span className="text-sky-600">${order.total}ARS</span>
                </h5>
              </div>
            ))
          )}
        </div>
      </section>
    </>
  );
};
