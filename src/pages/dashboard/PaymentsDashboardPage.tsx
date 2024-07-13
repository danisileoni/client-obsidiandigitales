import { SideBar } from '@/components/dashboard/SideBar';
import { ViewIcon } from '@/components/icons/ViewIcon';
import { PaginationProducts } from '@/components/products/PaginationProducts';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import { useAuth } from '@/hooks/useAuth';
import { ItemsDashboardFilter } from '@/routes/admin/dashboard/panel/products';
import { getPayments } from '@/services/payment.service';
import { useQuery } from '@tanstack/react-query';
import { UseNavigateResult } from '@tanstack/react-router';
import { useEffect, useState } from 'react';

interface PaymentsProps extends ItemsDashboardFilter {
  navigate: UseNavigateResult<'/admin/dashboard/panel/accounts'>;
}

export const PaymentsDashboardPage = ({ page, navigate }: PaymentsProps) => {
  const limit = 10;
  const currentPage = Number(page);
  const offset = (currentPage - 1) * limit;

  const [search, setSearch] = useState('');
  const { isAuthenticate, token } = useAuth();

  useEffect(() => {
    (async () => {
      const isAuth = await isAuthenticate();
      if (!isAuth) {
        navigate({ to: '/auth/login' });
      }
    })();
  }, [isAuthenticate, navigate]);

  const { data: infoPayments } = useQuery({
    queryKey: ['payments', search, currentPage],
    queryFn: () => getPayments(limit, offset, token, search),
  });

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
            placeholder="Buscar pago"
            className="w-full h-8 rounded-full p-5 mt-4 bg-[#2f2f2f]"
            onKeyDown={handleKeyDown}
          />
        </div>
        <div className="flex flex-col w-[95%] gap-y-2 mt-5">
          {/* biome-ignore lint/complexity/useOptionalChain: <explanation> */}
          {infoPayments?.payments &&
            infoPayments?.payments.map((payment) => (
              <div
                className="bg-[#2f2f2f] p-3 rounded-lg w-full flex items-center justify-between"
                key={payment.id}
              >
                <div className="flex items-center gap-2">
                  <h5 className="text-xl">ID: {payment.idPayment}</h5>
                  <h5 className="text-xl">
                    Fecha:{' '}
                    {(() => {
                      const date = new Date(payment.paymentAt);
                      const day = date.getDay();
                      const month = date.getMonth();
                      const year = date.getFullYear();
                      return `${day}/${month}/${year}`;
                    })()}
                  </h5>
                </div>
                <div>
                  <Dialog>
                    <DialogTrigger asChild>
                      <button
                        type="button"
                        className="bg-[#3c3c3c] flex items-center font-bold hover:bg-[#494949] p-2 rounded-full transition-colors duration-300"
                      >
                        <ViewIcon />
                      </button>
                    </DialogTrigger>
                    <DialogContent className="bg-black text-white">
                      <DialogHeader>
                        <DialogTitle>Mirar Pago</DialogTitle>
                      </DialogHeader>
                      <div>
                        <ul>
                          <h3 className="font-bold">Pago:</h3>
                          <li>ID: {payment.id}</li>
                          <li>ID PAGO: {payment.idPayment}</li>
                          <li>PASARELA: {payment.paymentGateway}</li>
                          <li>EMAIL: {payment.email}</li>
                          <h3 className="font-bold mt-2">Orden:</h3>
                          <li>ID: {payment.order.id}</li>
                          <li>
                            ID:{' '}
                            {(() => {
                              const date = new Date(payment.paymentAt);
                              const day = date.getDay();
                              const month = date.getMonth();
                              const year = date.getFullYear();
                              return `${day}/${month}/${year}`;
                            })()}
                          </li>
                          <li>
                            Pagado:{' '}
                            {payment.order.paid ? 'Pagado' : 'No pagado'}
                          </li>
                          <li>Total: {payment.order.total}</li>
                          <li>User ID: {payment.order.user.id}</li>
                          <li>User ID: {payment.order.user.email}</li>
                          <h3 className="font-bold mt-2">
                            Detelles de la Orden:
                          </h3>
                          {payment.order.details.map((detail) => {
                            return (
                              <li key={detail.id}>
                                PRODUCTO ID: {detail.product.id}
                              </li>
                            );
                          })}
                        </ul>
                      </div>
                    </DialogContent>
                  </Dialog>
                </div>
              </div>
            ))}
        </div>
        <PaginationProducts
          navigate={navigate}
          products={infoPayments ?? null}
        />
      </div>
    </section>
  );
};
