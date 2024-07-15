
export const useFormatPrice = () => {

  const formatPrice = (price: number | null) => {
    if(price)
    return price.toLocaleString('es-ES');
  };

  return {
    formatPrice
  };
};
