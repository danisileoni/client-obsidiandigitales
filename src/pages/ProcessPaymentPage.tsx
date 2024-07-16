import { CancelIcon } from '@/components/icons/CancelIcon';
import { CompleteIcon } from '@/components/icons/CompleteIcon';
import { StopIcon } from '@/components/icons/StopIcon';
import { useSocket } from '@/hooks/useSocket';
import { findOrder } from '@/services/order.service';
import { useShoppingCart } from '@/store/shoppingCart';
import { useQuery } from '@tanstack/react-query';
import { Link } from '@tanstack/react-router';
import { useEffect, useState } from 'react';

interface ResultPayment {
  pending: boolean;
  complete: boolean;
  cancel: boolean;
  paidTrue: boolean;
}

const ProcessPaymentPage = ({ orderId }: { orderId: string }) => {
  const { removeAllFromCart } = useShoppingCart();
  const [result, setResult] = useState<ResultPayment>();
  const [message, setMessage] = useState<string>();
  const { notification } = useSocket(orderId);

  const { data: order } = useQuery({
    queryKey: ['paid', notification],
    queryFn: () => findOrder(orderId),
  });

  useEffect(() => {
    if (
      notification?.message === undefined ||
      notification.message === 'Payment pending'
    ) {
      setResult({
        pending: true,
        cancel: false,
        complete: false,
        paidTrue: false,
      });
      setMessage('Pago pendiente');
    }
    if (notification?.message === 'Payment completed successfully') {
      removeAllFromCart();
      setResult({
        pending: false,
        cancel: false,
        complete: true,
        paidTrue: false,
      });
      setMessage('Pago autorizado y completado');
    }
    if (notification?.message === 'Payment cancel') {
      removeAllFromCart();
      setResult({
        pending: false,
        cancel: true,
        complete: false,
        paidTrue: false,
      });
      setMessage('Pago cancelado');
    }
    if (notification?.message === undefined && order?.paid) {
      removeAllFromCart();
      setResult({
        pending: false,
        cancel: false,
        complete: false,
        paidTrue: true,
      });
      setMessage('Esta orden ya a sido pagada');
    }
  }, [notification, order, removeAllFromCart]);

  const HandleResult = () => {
    if (result?.pending) {
      return (
        <div className="flex flex-col text-[#ffaa00] items-center justify-center">
          <div className="lds-ring">
            <div />
            <div />
            <div />
            <div />
          </div>
          <h4 className="text-2xl font-bold mt-4 text-black">{message}</h4>
        </div>
      );
    }
    if (result?.cancel) {
      return (
        <div className="flex flex-col items-center justify-center">
          <CancelIcon />
          <h4 className="text-2xl font-bold mt-4">{message}</h4>
        </div>
      );
    }
    if (result?.complete) {
      return (
        <div className="flex flex-col items-center justify-center">
          <CompleteIcon />
          <h4 className="text-2xl font-bold mt-4">{message}</h4>
          <Link className="underline text-sky-700 hover:text-sky-800" to="/">
            Volver al Inicio
          </Link>
        </div>
      );
    }
    if (result?.paidTrue) {
      return (
        <div className="flex flex-col items-center justify-center">
          <StopIcon />
          <h4 className="text-2xl font-bold mt-4">{message}</h4>
          <Link className="underline text-sky-700 hover:text-sky-800" to="/">
            Volver al Inicio
          </Link>
        </div>
      );
    }
  };

  return (
    <>
      <section className="flex h-screen items-center justify-center">
        <HandleResult />
      </section>
    </>
  );
};

export default ProcessPaymentPage;
