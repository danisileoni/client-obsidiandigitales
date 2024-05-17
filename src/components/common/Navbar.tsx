import logo from '@/assets/logo.webp';
import { Link } from '@tanstack/react-router';

export const Navbar = () => {
  return (
    <nav className="bg-[#000000] pl-16 pr-16">
      <div className=" flex items-center max-xs:justify-center justify-between">
        <Link to="/">
          <img className="w-24 md:w-40" src={logo} alt="Obsidian Digitales" />
        </Link>
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
              to="/products"
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
      </div>
    </nav>
  );
};
