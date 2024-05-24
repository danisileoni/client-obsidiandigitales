import { useState } from 'react';
import { AccountPrimary } from '../icons/AccountPrimary';
import { AccountSecondary } from '../icons/AccountSecondary';
import { Ps5Icon } from '../icons/Ps5Icon';

type Ps5Prop = {
  pricePrimary: null | string;
  priceSecondary: null | string;
  salePrimary: null | string;
  saleSecondary: null | string;
  sale: null | number;
};

export function ToolTipPs5({
  pricePrimary,
  priceSecondary,
  salePrimary,
  saleSecondary,
  sale,
}: Ps5Prop) {
  const [showToolTip, setShowToolTip] = useState<boolean>();

  const handleMouseEnter = () => {
    setShowToolTip(true);
  };

  const handleMouseLeave = () => {
    setShowToolTip(false);
  };
  return (
    <div className="relative group">
      <Ps5Icon MouseEnter={handleMouseEnter} MouseLeave={handleMouseLeave} />
      {showToolTip && (
        <div className="absolute bottom-4 p1 mb-2 left-32 transform -translate-x-[8.2rem] w-72 p-2 bg-white text-black text-xs rounded opacity-0 group-hover:opacity-100 duration-200 transition-opacity">
          <ul className="flex flex-col">
            <li className="text-[18px] mb-2">Precios:</li>
            <div className="flex ml-3 text-xl font-bold">
              <div>
                <li
                  className={`flex items-center ${salePrimary ? 'text-gray-400' : ''}`}
                >
                  <AccountPrimary />· ${' '}
                  <p
                    className={`${salePrimary ? 'line-through text-gray-400' : ''}`}
                  >
                    {pricePrimary}
                  </p>
                </li>
                <li
                  className={`flex items-center ${salePrimary ? 'text-gray-400' : ''}`}
                >
                  <AccountSecondary />· ${' '}
                  <p
                    className={`${saleSecondary ? 'line-through text-gray-400' : ''}`}
                  >
                    {priceSecondary}
                  </p>
                </li>
              </div>
              <div className="ml-4 text-violet-500">
                {salePrimary && (
                  <li className="flex items-center">
                    · ${salePrimary}{' '}
                    <p className="ml-1 border border-rose-500 rounded-md text-xs flex items-center text-rose-500 h-5 w-9 justify-center">
                      -{sale}%
                    </p>
                  </li>
                )}
                {saleSecondary && (
                  <li className="flex items-center">
                    · ${saleSecondary}{' '}
                    <p className="ml-1 border border-rose-500 rounded-md text-xs flex items-center text-rose-500 h-5 w-9 justify-center">
                      -{sale}%
                    </p>
                  </li>
                )}
              </div>
            </div>
          </ul>
        </div>
      )}
    </div>
  );
}
