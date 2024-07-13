import logo from '../../assets/logo.webp';
import { Link } from '@tanstack/react-router';
import { ShoppingCart } from '../shopping-cart/ShoppingCart';
import { SearchBar } from './SearchBar';
import { useAuth } from '@/hooks/useAuth';
import { useEffect, useState } from 'react';
import { OptionsUser } from './OptionsUser';
import { HamburgerIcon } from '../icons/hamburgerIcon';
import { useShoppingCart } from '@/store/shoppingCart';
import { useReSideWindows } from '@/hooks/re-side-window';

export const Navbar = () => {
  const { isAuthenticate, isAuth, getUserActive } = useAuth();
  const { shoppingCart } = useShoppingCart();
  const { showControls } = useReSideWindows();
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  useEffect(() => {
    (async () => {
      await isAuthenticate();
    })();
  }, [isAuthenticate]);

  return (
    <nav className="bg-[#262626] max-md:min-h-24 m-auto md:pl-28 md:pr-28">
      <div className="flex items-center justify-between max-md:flex-col max-md:pl-0 max-md:pr-0">
        <div className="flex justify-between max-md:w-full max-md:pl-4 max-md:pr-4">
          <Link to="/">
            <img
              className="w-20 scale-75 md:scale-75 md:w-40 mt-2 mb-2"
              src={logo}
              alt="QuaraStore"
            />
          </Link>
          <button
            className="max-md:block md:hidden text-white"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            type="button"
          >
            <HamburgerIcon />
          </button>
        </div>
        <SearchBar />
        <ul
          className={`flex gap-5 max-md:mt-5 text-lg font-bold max-md:flex-col max-md:w-full max-md:pl-4 max-md:pr-4 ${isMenuOpen ? 'block' : 'hidden'} md:flex md:items-center`}
        >
          <li>
            <Link
              className="text-sky-600 hover:text-sky-500 [&.active]:text-sky-500"
              to="/"
            >
              Inicio
            </Link>
          </li>
          <li>
            <Link
              className="text-sky-600 hover:text-sky-500 [&.active]:text-sky-500"
              to="/product"
              search={() => ({ page: '1' })}
            >
              Productos
            </Link>
          </li>
          <li>
            <Link
              className="text-sky-600 hover:text-sky-500 [&.active]:text-sky-500"
              to="/faq"
            >
              FAQ
            </Link>
          </li>
          {!showControls ? (
            <li>
              <Link
                to="/shopping-cart"
                className="text-sky-600 flex justify-between hover:text-sky-500 [&.active]:text-sky-500"
              >
                Carrito{' '}
                <span className="text-white rounded-sm border-2 items-center border-sky-700 pr-2 pl-2">
                  {shoppingCart.length}
                </span>
              </Link>
            </li>
          ) : (
            <li className="flex justify-center mt-3 md:mt-0">
              <Link to="/shopping-cart">
                <ShoppingCart />
              </Link>
            </li>
          )}
          <li className="flex justify-center mt-3 max-md:pb-5 max-md:self-end md:mt-0">
            {isAuth && getUserActive ? (
              <OptionsUser user={getUserActive} />
            ) : (
              <Link
                to="/auth/login"
                className="text-sky-600 hover:text-sky-500 [&.active]:text-sky-500"
              >
                Login
              </Link>
            )}
          </li>
        </ul>
      </div>
    </nav>
  );
};
