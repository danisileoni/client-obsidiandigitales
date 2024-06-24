import type { UseNavigateResult } from '@tanstack/react-router';

export const handleFilterPrice = (
  minPrice: string | undefined,
  maxPrice: string | undefined,
  navigate: UseNavigateResult<'/product'>,
) => {
  navigate({
    search: (prev) => ({
      ...prev,
      minPrice: minPrice ? minPrice : undefined,
    }),
  });
  navigate({
    search: (prev) => ({
      ...prev,
      maxPrice: maxPrice ? maxPrice : undefined,
    }),
  });
};
