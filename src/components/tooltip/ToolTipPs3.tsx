import { useState } from 'react';
import { Ps3Icon } from '../icons/Ps3Icon';

type Ps3Prop = {
  price: null | string;
  salePrice: null | string;
  sale: number | null;
};

export function ToolTipPs3({ price, salePrice, sale }: Ps3Prop) {
  const [showToolTip, setShowToolTip] = useState<boolean>();

  const handleMouseEnter = () => {
    setShowToolTip(true);
  };

  const handleMouseLeave = () => {
    setShowToolTip(false);
  };

  return (
    <div className="relative group">
      <Ps3Icon MouseEnter={handleMouseEnter} MouseLeave={handleMouseLeave} />
      {showToolTip && (
        <div className="absolute bottom-4 p1 mb-2 left-32 transform -translate-x-[8.2rem] w-72 p-2 bg-white text-black text-xs rounded opacity-0 group-hover:opacity-100 duration-200 transition-opacity">
          <ul className="flex flex-col">
            <li className="text-[18px] mb-2">Precios:</li>
            <div className="flex ml-3 text-xl font-bold">
              <div>
                <li className={`flex ${salePrice ? 'text-gray-400' : ''}`}>
                  · ${' '}
                  <p
                    className={`${salePrice ? 'line-through text-gray-400' : ''}`}
                  >
                    {price}
                  </p>
                </li>
              </div>
              <div className="ml-4 text-violet-500">
                {salePrice && (
                  <li className="flex items-center">
                    · ${salePrice}{' '}
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
