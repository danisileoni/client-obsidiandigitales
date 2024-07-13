const SkeletonCardProduct = () => {
  return (
    <div className="animate-pulse flex flex-col items-center bg-[#ffffff] p-2 rounded-md shadow-md">
      <div className="w-48 h-64 max-md:w-40 max-md:h-48 max-xs:w-32 max-xs:h-[9.7rem] bg-gray-300 rounded-sm" />
      <div className="w-full flex flex-col mt-1 space-y-2">
        <div className="h-3 bg-gray-300 rounded w-[95%]" />
      </div>
      <div className="w-full flex gap-3 items-center mt-2">
        <div className="h-3 w-3 bg-gray-300 rounded-full" />
        <div className="h-3 w-3 bg-gray-300 rounded-full" />
        <div className="h-3 w-3 bg-gray-300 rounded-full" />
      </div>
      <div className="w-full flex flex-col items-start pb-1 mt-2">
        <div className="h-4 bg-gray-300 rounded w-1/4" />
        <div className="h-5 bg-gray-300 rounded w-1/2 mt-2" />
      </div>
      <div className="flex text-gray-300 border border-gray-300 w-full justify-center p-1 rounded-md gap-2 mt-1">
        <div className="h-6 w-1/2 bg-gray-300 rounded" />
      </div>
    </div>
  );
};

export default SkeletonCardProduct;
