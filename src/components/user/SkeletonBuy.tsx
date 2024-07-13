export const SkeletonBuy = () => {
  return (
    <div className="space-y-6 w-full max-w-2xl">
      {[...Array(3)].map((_, index) => (
        <div
          // biome-ignore lint/suspicious/noArrayIndexKey: <explanation>
          key={index}
          className="bg-white flex flex-col p-4 md:p-6 rounded-lg shadow-md animate-pulse"
        >
          <div className="h-6 bg-gray-300 rounded w-1/3 mb-4" />
          <div className="flex flex-wrap gap-4 overflow-x-auto">
            {[...Array(3)].map((_, idx) => (
              // biome-ignore lint/suspicious/noArrayIndexKey: <explanation>
              <div key={idx} className="flex items-center">
                <div className="w-16 h-24 md:w-20 md:h-28 bg-gray-300 rounded-md" />
                <div className="h-4 ml-2 bg-gray-300 rounded w-24 mt-2" />
              </div>
            ))}
          </div>
          <div className="h-6 self-end bg-gray-300 rounded w-1/4 mt-4" />
        </div>
      ))}
    </div>
  );
};
