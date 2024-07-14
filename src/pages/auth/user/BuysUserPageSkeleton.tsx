import { Navbar } from '@/components/common/Navbar';

const BuysUserPageSkeleton = () => {
  return (
    <>
      <Navbar />
      <section className="w-full flex flex-col items-center justify-center bg-gray-100 p-4 md:p-8">
        <div className="h-10 w-64 bg-gray-300 animate-pulse rounded mb-6 md:mb-8" />
        <div className="space-y-6 w-full max-w-2xl">
          {Array.from({ length: 3 }).map((_, index) => (
            <div
              // biome-ignore lint/suspicious/noArrayIndexKey: <explanation>
              key={index}
              className="bg-white p-4 md:p-6 rounded-lg shadow-md"
            >
              <div className="h-6 w-32 bg-gray-300 animate-pulse rounded mb-4" />
              <div className="flex flex-wrap gap-4 overflow-x-auto">
                {Array.from({ length: 3 }).map((_, index) => (
                  // biome-ignore lint/suspicious/noArrayIndexKey: <explanation>
                  <div key={index} className="flex items-center">
                    <div className="w-16 h-24 md:w-20 md:h-28 bg-gray-300 animate-pulse rounded-md" />
                    <div className="h-4 w-16 bg-gray-300 animate-pulse rounded mt-2 ml-2" />
                  </div>
                ))}
              </div>
              <div className="h-6 w-40 bg-gray-300 animate-pulse rounded mt-4 self-end" />
            </div>
          ))}
        </div>
      </section>
    </>
  );
};

export default BuysUserPageSkeleton;
