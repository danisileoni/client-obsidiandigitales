import { useState } from 'react';
import { AccountsIcon } from '../icons/AccountsIcon';

export function ToolTipAccount() {
  const [showToolTip, setShowToolTip] = useState<boolean>();

  const handleMouseEnter = () => {
    setShowToolTip(true);
  };

  const handleMouseLeave = () => {
    setShowToolTip(false);
  };
  return (
    <div className="relative group">
      <AccountsIcon
        MouseEnter={handleMouseEnter}
        MouseLeave={handleMouseLeave}
      />
      {showToolTip && (
        <div className="absolute bottom-full mb-2 left-32 md:-translate-x-[16rem]  max-md:-translate-x-[16rem] transform -translate-x-1/2 w-72 p-2 bg-black text-white text-xs rounded opacity-0 group-hover:opacity-100 transition-opacity ">
          <ul>
            CUENTA:
            <li className="pb-1">
              - Te proporcionamos una cuenta con el juego.
            </li>
            <li className="pb-1">
              - Vas a poder entrar y jugar cuando quieras.
            </li>
            <li className="pb-1">
              - No incluye el online pero incluye todos los demás modos que
              contenga el juego.
            </li>
          </ul>
        </div>
      )}
    </div>
  );
}
