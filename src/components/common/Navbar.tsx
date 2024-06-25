import logo from '../../assets/logo.webp';
import { Link } from '@tanstack/react-router';
import { ShoppingCart } from '../shopping-cart/ShoppingCart';
import { SearchBar } from './SearchBar';
import { useAuth } from '@/hooks/useAuth';
import { useEffect } from 'react';
import { OptionsUser } from './OptionsUser';

export const Navbar = () => {
  const { isAuthenticate, isAuth } = useAuth();

  // biome-ignore lint/correctness/useExhaustiveDependencies: <explanation>
  useEffect(() => {
    (async () => {
      await isAuthenticate();
    })();
  }, []);

  return (
    <nav className="bg-[#000000] pl-28 pr-28">
      <div className=" flex items-center max-xs:justify-center justify-between">
        <Link to="/">
          <img className="w-24 md:w-40" src={logo} alt="Obsidian Digitales" />
        </Link>
        <SearchBar />
        <ul className="flex gap-5 text-lg font-bold max-xs:hidden">
          <li>
            <Link
              className="text-[#5C3A9C] hover:text-[#a16eff] [&.active]:text-[#a16eff]"
              to="/"
            >
              Inicio
            </Link>
          </li>
          <li>
            <Link
              className="text-[#5C3A9C] hover:text-[#a16eff] [&.active]:text-[#a16eff]"
              to="/product"
              search={() => ({ page: '1' })}
            >
              Productos
            </Link>
          </li>
          <li>
            <Link
              className="text-[#5C3A9C] hover:text-[#a16eff] [&.active]:text-[#a16eff]"
              to="/faq"
            >
              FAQ
            </Link>
          </li>
        </ul>
        <div className="flex items-center gap-3">
          <Link to="/shopping-cart">
            <ShoppingCart />
          </Link>
          <div className="w-14 flex justify-center">
            {isAuth ? (
              <OptionsUser />
            ) : (
              <Link
                to="/auth/login"
                className="text-[#5C3A9C] font-bold hover:text-[#a16eff] [&.active]:text-[#a16eff]"
              >
                Login
              </Link>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
};
