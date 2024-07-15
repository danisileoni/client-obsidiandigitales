import { initMercadoPago, CardPayment } from '@mercadopago/sdk-react';
import { useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import { findOrder } from '@/services/order.service';
import { PaypalCompleteIcon } from '../icons/PaypalCompleteIcon';
import { VisaMasterCompleteIcon } from '../icons/VisaMasterCompleteIcon';
import { FormDataMercadoPago, PaypalLinks } from './type-payments';
import { createPay } from '@/services/payment.service';
import { useAuth } from '@/hooks/useAuth';
import { useNavigate } from '@tanstack/react-router';
import { useFormatPrice } from '@/hooks/useFormatPrice';

initMercadoPago(import.meta.env.VITE_MP_SECRET, {
  locale: 'es-AR',
});

export const MethodsPay = ({ idOrder }: { idOrder: string }) => {
  const [payment, setPayment] = useState<string | undefined>();
  const [openCardPay, setOpenCardPay] = useState(false);
  const [disableButton, setDisableButton] = useState(true);
  const [isLoading, setIsLoading] = useState(false);
  const { isAuthenticate, token } = useAuth();
  const navigate = useNavigate();
  const { formatPrice } = useFormatPrice();

  const { data: order } = useQuery({
    queryKey: ['order'],
    queryFn: () => findOrder(idOrder),
  });

  const handleDivClick = (id: string) => {
    const radioElement = document.getElementById(id) as HTMLInputElement;
    if (radioElement) {
      radioElement.checked = true;
      handleChangePayment(radioElement.value);
      setDisableButton(false);
    }
  };

  const handleChangePayment = async (value: string) => {
    setPayment(value);
    if (value === 'mercadopago') {
      setOpenCardPay(true);
    } else if (value === 'paypal') {
      setOpenCardPay(false);
    }
    const isAuth = await isAuthenticate();
    if (!isAuth) {
      navigate({ to: '/auth/login' });
    }
  };

  const createPayment = async () => {
    setIsLoading(true);
    try {
      if (payment === 'mercadopago') {
        let formData: FormDataMercadoPago;

        try {
          formData =
            await // biome-ignore lint/suspicious/noExplicitAny: <explanation>
            (window as any).cardPaymentBrickController.getFormData();

          await fetch('/process_payment', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify(formData),
          });

          const paymentResult = await createPay(
            idOrder,
            {
              method: formData.payment_method_id,
              email: formData.payer.email,
              paymentGateway: 'mercadopago',
              numbers: formData.payer.identification.number,
              type: formData.payer.identification.type,
              token: formData.token,
            },
            token,
          );

          navigate({
            to: '/shopping-cart/payment/process-payment/$idOrder',
            params: { idOrder },
          });
        } catch (error) {
          throw 'an error has occurred';
        }
      }
      if (payment === 'paypal') {
        const paymentResult: PaypalLinks = await createPay(
          idOrder,
          {
            paymentGateway: 'paypal',
          },
          token,
        );

        if (paymentResult) {
          const link = paymentResult.links.find(
            (link) => link.rel === 'approve',
          )?.href;

          if (link) {
            window.location.href = link;
          }
        }
      }
    } catch (error) {
      console.error(error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <>
      <section className="max-md:flex max-md:flex-col">
        <fieldset className="flex  md:min-w-[450px] flex-col gap-y-2">
          <div
            className="bg-white shadow-md  hover:bg-gray-100 transition-colors duration-300 flex cursor-pointer h-16 p-2 pr-3 rounded-md justify-between items-center"
            onClick={() => handleDivClick('debit-credit')}
            tabIndex={0}
            role="radio"
            aria-checked={payment === 'mercadopago'}
          >
            <div className="flex">
              <input
                type="radio"
                name="payment"
                value="mercadopago"
                className="cursor-pointer mr-2"
                onChange={() => setPayment('mercadopago')}
                id="debit-credit"
                checked={payment === 'mercadopago'}
              />
              <div>
                <label htmlFor="debit-credit" className="w-full cursor-pointer">
                  Credito o debito [Argentina]
                </label>
                <p className="text-xs text-gray-500">
                  Paga con tarjeta Visa, Mastercard o American Express
                </p>
              </div>
            </div>
            <VisaMasterCompleteIcon />
          </div>
          <div
            style={{
              transform: 'scale(1)',
              transformOrigin: 'top left',
            }}
            className={`w-[450px] max-md:w-[310px] ${openCardPay ? '' : 'hidden'}`}
          >
            <CardPayment
              onSubmit={async (): Promise<void> => {
                'a';
              }}
              customization={{
                visual: { hidePaymentButton: true, hideFormTitle: true },
              }}
              initialization={{
                amount: (() => (order?.total ? +order.total : 0))(),
              }}
            />
          </div>
          <div
            className="bg-white shadow-md hover:bg-gray-100 transition-colors duration-300 cursor-pointer flex h-16 p-2 pr-3 rounded-md justify-between items-center"
            onClick={() => handleDivClick('paypal')}
            tabIndex={0}
            role="radio"
            aria-checked={payment === 'paypal'}
          >
            <div>
              <input
                type="radio"
                className="cursor-pointer mr-2"
                name="payment"
                value="paypal"
                id="paypal"
                onChange={() => setPayment('paypal')}
                checked={payment === 'paypal'}
              />
              <label htmlFor="paypal" className="w-full cursor-pointer">
                PayPal
              </label>
            </div>
            <PaypalCompleteIcon />
          </div>
        </fieldset>
      </section>
      <section className="w-full flex flex-col items-center justify-center h-[8.5rem] lg:w-[280px] p-2 rounded-lg border-sky-500 bg-white shadow-lg">
        <div className="w-full flex flex-col items-center rounded-sm justify-center">
          <div>
            <p className="self-start font-bold text-sm">Resumen</p>
            <h2 className="text-2xl text-sky-600 flex gap-2 items-center font-bold">
              <span className="font-bold text-base text-black">Total:</span> $
              {order?.total && formatPrice(+order?.total)} ARS
            </h2>
            <p className="self-start text-xs">
              Total de productos: {order?.details.length}
            </p>
          </div>
          <button
            type="button"
            onClick={createPayment}
            disabled={disableButton || isLoading}
            className={`${
              disableButton || isLoading
                ? 'bg-gray-400'
                : 'bg-sky-500 hover:bg-sky-600'
            } transition-colors duration-300 max-w-60 min-w-60 max-h-8 min-h-8 flex items-center justify-center text-white pr-[6rem] p-1 pl-[6rem] rounded-sm mt-2`}
          >
            {!isLoading ? (
              'Comprar'
            ) : (
              <div className="flex flex-col text-white scale-[0.2] items-center justify-center">
                <div className="lds-ring">
                  <div />
                  <div />
                  <div />
                  <div />
                </div>
              </div>
            )}
          </button>
        </div>
      </section>
    </>
  );
};
