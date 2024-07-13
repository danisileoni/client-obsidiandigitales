import { Link, redirect, useNavigate } from '@tanstack/react-router';
import { HomeDashboardIcon } from '../icons/HomeDashboardIcon';
import { ProductsIcon } from '../icons/ProductsIcon';
import { JoystickIcon } from '../icons/JoystickIcon';
import { PushPaymentIcon } from '../icons/PushPaymentIcon';
import { DiscountIcon } from '../icons/DiscountIcon';
import { UsersIcon } from '../icons/UsersIcon';
import { LogOutIcon } from 'lucide-react';
import { useAuth } from '@/hooks/useAuth';
import { useEffect } from 'react';

export const SideBar = () => {
  const { logout, isAuthenticate } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    (async () => {
      await isAuthenticate();
    })();
  }, [isAuthenticate]);

  return (
    <div className="bg-[#151515] p-5 h-full flex flex-col w-min">
      <h1 className="text-2xl font-bold mb-2">
        Dashboard <span className="text-sky-500">Quara</span>
      </h1>
      <ul className="flex gap-y-2 flex-col">
        <li className="">
          <Link
            className="bg-[#212121] hover:bg-[#3e3e3e] transition-colors duration-300 w-full flex pl-3 rounded text-lg pr-16 pt-2 pb-2"
            to="/admin/dashboard/panel/home"
          >
            <span className="text-white bg-sky-600 flex flex-col items-center justify-center p-1 mr-2 rounded">
              <HomeDashboardIcon />
            </span>
            Dashboard
          </Link>
        </li>
        <li>
          <Link
            search={() => ({ page: '1' })}
            className="bg-[#212121] hover:bg-[#3e3e3e] transition-colors duration-300 w-full flex pl-3 rounded text-lg pr-12 pt-2 pb-2"
            to="/admin/dashboard/panel/products"
          >
            <span className="text-white flex flex-col items-center justify-center p-1 mr-2 rounded">
              <ProductsIcon />
            </span>
            Productos
          </Link>
        </li>
        <li>
          <Link
            search={() => ({ page: '1' })}
            className="bg-[#212121] hover:bg-[#3e3e3e] transition-colors duration-300 w-full flex pl-3 rounded text-lg pr-12 pt-2 pb-2"
            to="/admin/dashboard/panel/accounts"
          >
            <span className="text-white flex flex-col items-center justify-center p-1 mr-2 rounded">
              <JoystickIcon />
            </span>
            Cuentas
          </Link>
        </li>
        <li>
          <Link
            className="bg-[#212121] hover:bg-[#3e3e3e] transition-colors duration-300 w-full flex pl-3 rounded text-lg pr-12 pt-2 pb-2"
            to="/admin/dashboard/panel/payments"
            search={() => ({ page: '1' })}
          >
            <span className="text-white flex flex-col items-center justify-center p-1 mr-2 rounded">
              <PushPaymentIcon />
            </span>
            Pagos
          </Link>
        </li>
        <li>
          <Link
            search={() => ({ page: '1' })}
            className="bg-[#212121] hover:bg-[#3e3e3e] transition-colors duration-300 w-full flex pl-3 rounded text-lg pr-12 pt-2 pb-2"
            to="/admin/dashboard/panel/discounts"
          >
            <span className="text-white flex flex-col items-center justify-center p-1 mr-2 rounded">
              <DiscountIcon />
            </span>
            Descuentos
          </Link>
        </li>
        <li>
          <Link
            search={() => ({ page: '1' })}
            className="bg-[#212121] hover:bg-[#3e3e3e] transition-colors duration-300 w-full flex pl-3 rounded text-lg pr-12 pt-2 pb-2"
            to="/admin/dashboard/panel/users"
          >
            <span className="text-white flex flex-col items-center justify-center p-1 mr-2 rounded">
              <UsersIcon />
            </span>
            Usuarios
          </Link>
        </li>
      </ul>
      <button
        type="button"
        onClick={async () => {
          await logout();
          navigate({ to: '/auth/login' });
        }}
        className="mt-auto bg-red-500 flex items-center text-white p-2 rounded"
      >
        <span className="text-white flex items-center justify-center p-1 mr-1 rounded">
          <LogOutIcon />
        </span>
        Cerrar sesión
      </button>
    </div>
  );
};
