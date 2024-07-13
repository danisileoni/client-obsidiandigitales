import { BoxIcon } from '../icons/BoxIcon';
import { CheckedIcon } from '../icons/CheckedIcon';
import { PaymentIcon } from '../icons/PaymentIcon';

interface Position {
  order: boolean;
  pay: boolean;
  finish: boolean;
}

export const BreadcrumbsPay = ({ position }: { position: Position }) => {
  return (
    <section className="flex items-center justify-center h-16 bg-sky-700">
      <div
        className={`${position.order ? 'text-green-500 border-green-500' : 'text-white border-white'} flex flex-col border rounded-md w-14 h-12 justify-center items-center`}
      >
        <BoxIcon />
        <p className="text-xs font-bold">Orden</p>
      </div>
      <hr className={`w-60 ${position.order ? 'border-green-500' : ''}`} />
      <div
        className={`${position.pay ? 'text-green-500 border-green-500' : 'text-white border-white'} flex flex-col border rounded-md w-14 h-12 justify-center items-center`}
      >
        <PaymentIcon />
        <p className="text-xs font-bold">Pago</p>
      </div>
      <hr className={`w-60 ${position.pay ? 'border-green-500' : ''}`} />
      <div
        className={`${position.finish ? 'text-green-500 border-green-500' : 'text-white border-white'} flex flex-col border rounded-md w-14 h-12 justify-center items-center`}
      >
        <CheckedIcon />
        <p className="text-xs font-bold">Enviado</p>
      </div>
    </section>
  );
};
