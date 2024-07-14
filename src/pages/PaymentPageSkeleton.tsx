import { Navbar } from '@/components/common/Navbar';

export const PaymentPageSkeleton = () => {
  return (
    <>
      <Navbar />
      <div className="animate-pulse">
        <div className="bg-white p-4 md:p-8 rounded-t-md flex flex-col items-center md:flex-row md:items-start max-w-screen-lg mx-auto">
          <div className="bg-gray-300 h-[350px] w-[250px] max-xs:h-[350px] max-xs:w-[300px] rounded-md" />
          <div className="md:pl-6 flex flex-col items-start md:items-center max-md:w-full mt-4 md:mt-0">
            <div className="h-8 bg-gray-300 rounded w-full max-w-[520px]" />
            <div className="mt-2 h-6 bg-gray-300 rounded w-40" />
            <div className="mt-4 h-8 bg-gray-300 rounded w-full max-w-[520px]" />
            <div className="mt-4 grid md:grid-cols-1 lg:grid-cols-2 gap-3 w-full">
              <div className="h-24 bg-gray-300 rounded" />
              <div className="h-24 bg-gray-300 rounded" />
            </div>
          </div>
          <div className="mt-4 lg:mt-0 lg:ml-5 w-full max-lg:w-64">
            <div className="flex flex-col items-center">
              <div className="h-6 bg-gray-300 rounded w-full" />
              <div className="mt-2 h-10 bg-gray-300 rounded w-full" />
            </div>
            <div className="mt-4 shadow-md shadow-gray-300 flex flex-col border rounded-sm border-gray-300 p-2">
              <div className="h-6 bg-gray-300 rounded w-full" />
              <div className="mt-4 h-6 bg-gray-300 rounded w-40" />
              <div className="mt-4 h-10 bg-gray-300 rounded w-full" />
            </div>
            <div className="mt-4 shadow-md shadow-gray-300 flex flex-col border rounded-sm border-gray-300 p-2">
              <div className="h-6 bg-gray-300 rounded w-full" />
              <div className="mt-4 flex space-x-2">
                <div className="h-8 w-8 bg-gray-300 rounded" />
                <div className="h-8 w-8 bg-gray-300 rounded" />
              </div>
            </div>
          </div>
        </div>
        <div className="w-full pb-8 bg-white rounded-b-md flex flex-col items-center">
          <div className="w-full flex flex-col items-center lg:items-start lg:flex-row lg:justify-between p-4 lg:p-8 bg-gray-300 rounded-xl max-w-screen-lg mx-auto">
            <div className="flex flex-col items-center">
              <div className="h-10 w-10 bg-gray-300 rounded-full" />
              <div className="mt-2 h-4 w-24 bg-gray-300 rounded" />
            </div>
            <div className="flex flex-col items-center">
              <div className="h-10 w-10 bg-gray-300 rounded-full" />
              <div className="mt-2 h-4 w-24 bg-gray-300 rounded" />
            </div>
            <div className="flex flex-col items-center">
              <div className="h-10 w-10 bg-gray-300 rounded-full" />
              <div className="mt-2 h-4 w-24 bg-gray-300 rounded" />
            </div>
            <div className="flex flex-col items-center">
              <div className="h-10 w-10 bg-gray-300 rounded-full" />
              <div className="mt-2 h-4 w-24 bg-gray-300 rounded" />
            </div>
          </div>
          <div className="mt-4 w-full max-w-[1057px] p-2 bg-gray-300 rounded-md" />
        </div>
        <div className="mt-5 w-full flex flex-col items-center">
          <div className="h-6 bg-gray-300 rounded w-48" />
          <div className="mt-4 w-[79%] flex space-x-2 justify-center">
            <div className="h-52 w-52 bg-gray-300 rounded" />
            <div className="h-52 w-52 bg-gray-300 rounded" />
            <div className="h-52 w-52 bg-gray-300 rounded" />
          </div>
        </div>
      </div>
    </>
  );
};
