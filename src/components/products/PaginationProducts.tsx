import { Products } from '@/services/types-services';
import { UseNavigateResult } from '@tanstack/react-router';

type PaginationProps = {
  navigate: UseNavigateResult<'/product'>;
  products: Products | null;
};

const PaginationButton = ({
  page,
  currentPage,
  onClick,
}: {
  page: number;
  currentPage: number;
  onClick: () => void;
}) => (
  <button
    className={`${currentPage === page ? 'underline text-sky-500' : 'text-sky-700'} mr-1 ml-1 font-bold`}
    disabled={currentPage === page}
    type="button"
    onClick={onClick}
  >
    {page}
  </button>
);

export const PaginationProducts = ({ navigate, products }: PaginationProps) => {
  if (!products) return null;

  const handlePageChange = (newPage: number) => {
    navigate({
      search: (prev) => ({
        ...prev,
        page: `${newPage}`,
      }),
    });
  };

  const { currentPage, totalPages } = products;
  const showFirstPage = currentPage > 6;
  const showLastPage = totalPages > 10 && currentPage <= totalPages - 6;
  const startPage = Math.max(1, currentPage - 4);

  const pages = Array.from({ length: Math.min(10, totalPages) }, (_, index) => {
    if (totalPages <= 10) return index + 1;
    if (currentPage <= 6) return index + 1;
    if (currentPage > totalPages - 6) return totalPages - 9 + index;
    return startPage + index;
  });

  return (
    <div className="col-span-4 items-center flex justify-center w-full">
      <button
        type="button"
        onClick={() => handlePageChange(currentPage - 1)}
        disabled={currentPage === 1}
        className="text-sky-700 text-2xl mx-2 disabled:opacity-50 disabled:cursor-not-allowed"
      >
        ￩
      </button>
      {showFirstPage && (
        <>
          <PaginationButton
            page={1}
            currentPage={currentPage}
            onClick={() => handlePageChange(1)}
          />
          <p>...</p>
        </>
      )}
      {pages.map((page) => (
        <PaginationButton
          key={page}
          page={page}
          currentPage={currentPage}
          onClick={() => handlePageChange(page)}
        />
      ))}
      {showLastPage && (
        <>
          <p>...</p>
          <PaginationButton
            page={totalPages}
            currentPage={currentPage}
            onClick={() => handlePageChange(totalPages)}
          />
        </>
      )}
      <button
        type="button"
        onClick={() => handlePageChange(currentPage + 1)}
        disabled={!products.hasNextPage}
        className="text-sky-700 text-2xl mx-2 disabled:opacity-50 disabled:cursor-not-allowed"
      >
        ￫
      </button>
    </div>
  );
};
