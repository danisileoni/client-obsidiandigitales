import { Navbar } from '@/components/common/Navbar';

export const ConfigUserPageSkeleton = () => {
  return (
    <>
      <Navbar />
      <section className="px-4 sm:px-0 py-10 h-screen max-w-screen-md mx-auto">
        <div className="mb-8 text-center">
          <div className="h-10 w-64 bg-gray-300 animate-pulse rounded mb-2" />
          <div className="h-6 w-80 bg-gray-300 animate-pulse rounded" />
        </div>
        <div className="flex flex-col sm:flex-row space-y-4 sm:space-y-0 sm:space-x-4 max-w-5xl mx-auto">
          <div className="w-full sm:w-1/4 bg-white shadow-md rounded-lg p-4">
            <ul className="flex flex-col space-y-2">
              <hr className="my-2" />
              <li>
                <div className="h-8 w-full bg-gray-300 animate-pulse rounded" />
              </li>
              <hr className="my-2" />
              <li>
                <div className="h-8 w-full bg-gray-300 animate-pulse rounded" />
              </li>
              <hr className="my-2" />
              <li>
                <div className="h-8 w-full bg-gray-300 animate-pulse rounded" />
              </li>
              <hr className="my-2" />
            </ul>
          </div>
          <div className="w-full sm:w-3/4 shadow-md rounded-lg p-4 bg-white">
            <div className="space-y-4">
              <div className="h-6 bg-gray-300 animate-pulse rounded" />
              <div className="h-6 bg-gray-300 animate-pulse rounded" />
              <div className="h-6 bg-gray-300 animate-pulse rounded" />
              <div className="h-6 bg-gray-300 animate-pulse rounded" />
              <div className="h-6 bg-gray-300 animate-pulse rounded" />
            </div>
          </div>
        </div>
      </section>
    </>
  );
};
