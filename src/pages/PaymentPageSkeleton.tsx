import { BreadcrumbsPay } from '@/components/common/BreadcrumbsPay';
import { Navbar } from '@/components/common/Navbar';

export const PaymentPageSkeleton = () => {
  return (
    <>
      <Navbar />
      <BreadcrumbsPay position={{ order: false, pay: true, finish: false }} />
      <div className="w-full flex justify-center items-center">
        <section className="max-md:flex max-md:flex-col">
          <fieldset className="flex md:min-w-[450px] flex-col gap-y-2">
            <div className="bg-gray-200 animate-pulse h-16 p-2 pr-3 rounded-md flex justify-between items-center">
              <div className="flex">
                <div className="bg-gray-300 h-4 w-4 rounded-full mr-2" />
                <div>
                  <div className="bg-gray-300 h-4 w-32 mb-1" />
                  <div className="bg-gray-300 h-3 w-48" />
                </div>
              </div>
              <div className="bg-gray-300 h-8 w-8 rounded-full" />
            </div>
            <div className="bg-gray-200 animate-pulse h-16 p-2 pr-3 rounded-md flex justify-between items-center">
              <div className="flex">
                <div className="bg-gray-300 h-4 w-4 rounded-full mr-2" />
                <div>
                  <div className="bg-gray-300 h-4 w-32 mb-1" />
                  <div className="bg-gray-300 h-3 w-48" />
                </div>
              </div>
              <div className="bg-gray-300 h-8 w-8 rounded-full" />
            </div>
          </fieldset>
        </section>
        <section className="w-full flex flex-col items-center justify-center h-[8.5rem] lg:w-[280px] p-2 rounded-lg border-sky-500 bg-gray-200 animate-pulse shadow-lg">
          <div className="w-full flex flex-col items-center rounded-sm justify-center">
            <div className="bg-gray-300 h-4 w-24 mb-2" />
            <div className="bg-gray-300 h-8 w-32 mb-2" />
            <div className="bg-gray-300 h-4 w-48 mb-2" />
            <div className="bg-gray-300 h-8 w-60 rounded-sm mt-2" />
          </div>
        </section>
      </div>
    </>
  );
};
