import { useShoppingCart } from '@/store/shoppingCart';
import { CartIcon } from '../icons/CartIcon';

export const ShoppingCart = () => {
  const { shoppingCart } = useShoppingCart();

  return (
    <div className="flex hover:border-violet-500 rounded-md border-violet-700 border p-1 justify-center w-16 items-center text-violet-700 hover:text-violet-500 transition-colors duration-300">
      <CartIcon />{' '}
      <p className="text-white text-sm ml-1 p-1">{shoppingCart.length}</p>
    </div>
  );
};
