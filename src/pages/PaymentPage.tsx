import { BreadcrumbsPay } from '@/components/common/BreadcrumbsPay';
import { Navbar } from '@/components/common/Navbar';
import { MethodsPay } from '@/components/payments/MethodsPay';

export const PaymentPage = ({ id }: { id: string }) => {
  return (
    <>
      <div>
        <Navbar />
        <BreadcrumbsPay position={{ order: true, pay: false, finish: false }} />
        <section className="flex flex-col items-center mb-20">
          <h3>Pago</h3>
          <div className="flex max-md:flex-col max-md:gap-y-5 gap-x-10">
            <MethodsPay idOrder={id} />
          </div>
        </section>
      </div>
    </>
  );
};
