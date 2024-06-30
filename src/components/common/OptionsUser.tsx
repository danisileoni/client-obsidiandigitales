import { useState } from 'react';
import { UserIcon } from '../icons/UserIcon';
import { SettingsIcon } from '../icons/SettingsIcon';
import { BagIcon } from '../icons/BagIcon';
import { DoorExitIcon } from '../icons/DoorExitIcon';
import { Link } from '@tanstack/react-router';
import { useAuth } from '@/hooks/useAuth';

type OptionsUserProps = {
  user: {
    exp: number;
    iat: number;
    id: string;
  };
};

export const OptionsUser = ({ user }: OptionsUserProps) => {
  const [hiddenOptions, setHiddenOptions] = useState(false);
  const { logout } = useAuth();

  const handleLogout = async () => {
    await logout();
    window.location.reload();
  };

  return (
    <>
      <button
        type="button"
        onClick={() => setHiddenOptions(!hiddenOptions)}
        className="flex"
      >
        <UserIcon />{' '}
        {hiddenOptions ? (
          <span className="text-xl text-sky-700">⌄</span>
        ) : (
          <span className="text-xl text-sky-700">⌃</span>
        )}
      </button>
      <div
        className={`${hiddenOptions ? '' : 'hidden'} rounded-b-md text-white absolute bg-[#2f2f2f] z-10 -translate-x-[72px] translate-y-[50px]`}
      >
        <ul className="flex flex-col w-48 p-1">
          <li>
            <Link
              to="/auth/user/config/$userid"
              params={{ userid: user.id }}
              className="p-2 pl-1 rounded-md hover:bg-[#4f4f4f] w-full text-start flex items-center gap-1"
              type="button"
            >
              <SettingsIcon /> <span>Configuracion</span>
            </Link>
          </li>
          <li>
            <Link
              to="/auth/user/buys/$userid"
              params={{ userid: user.id }}
              className="p-2 pl-1 rounded-md flex items-center gap-1 hover:bg-[#4f4f4f] w-full text-start "
              type="button"
            >
              <BagIcon /> <span>Compras</span>
            </Link>
          </li>
          <li>
            <button
              className="p-2 pl-1 rounded-md flex items-center gap-1 hover:bg-[#4f4f4f] w-full text-start"
              type="button"
              onClick={handleLogout}
            >
              <DoorExitIcon /> <span>Cerrar sesion</span>
            </button>
          </li>
        </ul>
      </div>
    </>
  );
};
