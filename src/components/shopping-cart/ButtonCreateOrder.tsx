import { ProductCartStore } from '@/store/shoppingCart';

type ButtonCreateOrderProps = {
  shoppingCart: ProductCartStore[];
};

export const ButtonCreateOrder = ({ shoppingCart }: ButtonCreateOrderProps) => {
  const handleClick = async () => {
    if (!shoppingCart) {
      return;
    }

    const items = shoppingCart.map((product) => {
      if (product.account)
        return {
          idProduct: product.id,
        };
    });
  };

  return (
    <button
      type="button"
      className="mt-2 w-full bg-sky-500 text-black py-1 rounded-md hover:bg-sky-600 transition-colors duration-300"
      onClick={handleClick}
    >
      Continuar con la compra
    </button>
  );
};
