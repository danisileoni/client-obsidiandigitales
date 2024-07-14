import logo from '@/assets/logo.webp';
import { Link } from '@tanstack/react-router';
import { MercadoPagoIcon } from '../icons/MercadoPagoIcon';
import { PaypalIcon } from '../icons/PaypalIcon';

const copyrigth = new Date().getFullYear().toString();

export const Footer = () => {
  return (
    <footer className="bg-[#262626] text-white py-10 w-full">
      <div className="container mx-auto flex flex-col md:flex-row justify-between items-center px-6 md:px-12">
        <div className="flex flex-col items-center md:items-start mb-6 md:mb-0">
          <picture>
            <img src={logo} className="w-40 md:w-52 mb-4" alt="QuaraStore" />
          </picture>
          <ul className="flex space-x-4">
            <li>
              <MercadoPagoIcon />
            </li>
            <li>
              <PaypalIcon />
            </li>
          </ul>
        </div>
        <div className="flex flex-col md:flex-row gap-8 md:gap-16">
          <div className="text-center md:text-left">
            <h5 className="text-lg font-bold mb-2">Información</h5>
            <ul className="space-y-2">
              <li>
                <Link to="/about" className="text-sky-500 hover:underline">
                  Quiénes Somos
                </Link>
              </li>
              <li>
                <Link to="/faq" className="text-sky-500 hover:underline">
                  Preguntas frecuentes
                </Link>
              </li>
            </ul>
          </div>
          <div className="text-center md:text-left">
            <h5 className="text-lg font-bold mb-2">Legal</h5>
            <ul className="space-y-2">
              <li>
                <Link
                  to="/privacy-policy"
                  className="text-sky-500 hover:underline"
                >
                  Políticas de privacidad
                </Link>
              </li>
              <li>
                <Link
                  to="/legal-policy"
                  className="text-sky-500 hover:underline"
                >
                  Politicas Legales
                </Link>
              </li>
              <li>
                <Link
                  to="/general-conditions"
                  className="text-sky-500 hover:underline"
                >
                  Condiciones generales
                </Link>
              </li>
            </ul>
          </div>
          <div className="text-center md:text-left">
            <h5 className="text-lg font-bold mb-2">Redes Sociales</h5>
            <ul className="space-y-2">
              <li>
                <a
                  href="https://www.instagram.com/quarastoree/"
                  className="text-sky-500 hover:underline"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  Instagram
                </a>
              </li>
              <li>
                <a
                  href="https://www.facebook.com/Quarastore"
                  className="text-sky-500 hover:underline"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  Facebook
                </a>
              </li>
              <li>
                <a
                  href="https://api.whatsapp.com/send/?phone=3517410781&text&type=phone_number&app_absent=0"
                  className="text-sky-500 hover:underline"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  Whatsapp
                </a>
              </li>
              <li>
                <a
                  href="https://t.me/provquarastore"
                  className="text-sky-500 hover:underline"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  Telegram
                </a>
              </li>
            </ul>
          </div>
        </div>
      </div>
      <div className="container mx-auto mt-6 px-6 md:px-12">
        <hr className="border-gray-700" />
        <p className="text-center md:text-right mt-4 text-gray-400">
          &copy; {copyrigth} Todos los derechos reservados para QuaraStore
        </p>
      </div>
    </footer>
  );
};
