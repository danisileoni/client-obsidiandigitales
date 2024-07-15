import { useAuth } from '@/hooks/useAuth';
import { useOrders } from '@/hooks/useOrders';
import { ProductCartStore } from '@/store/shoppingCart';
import { useNavigate } from '@tanstack/react-router';
import { useState } from 'react';

type ButtonCreateOrderProps = {
  shoppingCart: ProductCartStore[];
};

type AccountType = 'Steam' | 'PlayStation 3' | 'Primary' | 'Secondary';

export const ButtonCreateOrder = ({ shoppingCart }: ButtonCreateOrderProps) => {
  const { isAuthenticate } = useAuth();
  const { createOrders } = useOrders();
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);
  const [disableButton, setDisableButton] = useState(false);

  const handleClick = async () => {
    if (!shoppingCart) {
      return;
    }

    setIsLoading(true);
    setDisableButton(true);

    const accountMapping: Record<
      AccountType,
      {
        quantityPrimary: number;
        quantitySecondary: number;
        quantityPlayStation3: number;
        quantitySteam: number;
      }
    > = {
      Steam: {
        quantityPrimary: 0,
        quantitySecondary: 0,
        quantityPlayStation3: 0,
        quantitySteam: 1,
      },
      'PlayStation 3': {
        quantityPrimary: 0,
        quantitySecondary: 0,
        quantityPlayStation3: 1,
        quantitySteam: 0,
      },
      Primary: {
        quantityPrimary: 1,
        quantitySecondary: 0,
        quantityPlayStation3: 0,
        quantitySteam: 0,
      },
      Secondary: {
        quantityPrimary: 0,
        quantitySecondary: 1,
        quantityPlayStation3: 0,
        quantitySteam: 0,
      },
    };

    const items = shoppingCart
      .map((product) => {
        if (product && accountMapping[product.account as AccountType]) {
          return {
            idProduct: product.id,
            ...accountMapping[product.account as AccountType],
          };
        }
        return null;
      })
      .filter((item) => item !== null);

    const isAuth = await isAuthenticate();
    console.log(items);

    if (isAuth) {
      const order = await createOrders({ items });
      if (order) {
        navigate({
          to: '/shopping-cart/payment/$idOrder',
          params: { idOrder: `${order.id}` },
        });
      }
    } else {
      navigate({ to: '/auth/login' });
    }

    setIsLoading(false);
  };

  return (
    <button
      type="button"
      onClick={handleClick}
      disabled={disableButton || isLoading}
      className={`${
        disableButton || isLoading
          ? 'bg-gray-400'
          : 'bg-sky-500 hover:bg-sky-600'
      } transition-colors duration-300 max-w-60 min-w-60 max-h-8 min-h-8 flex items-center justify-center text-white rounded-sm mt-2`}
    >
      {!isLoading ? (
        'Continuar con la compra'
      ) : (
        <div className="flex flex-col text-white scale-[0.2] items-center justify-center">
          <div className="lds-ring">
            <div />
            <div />
            <div />
            <div />
          </div>
        </div>
      )}
    </button>
  );
};
