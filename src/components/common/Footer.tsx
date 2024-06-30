import logo from '@/assets/logo.webp';
import { Link } from '@tanstack/react-router';
import { MercadoPagoIcon } from '../icons/MercadoPagoIcon';
import { PaypalIcon } from '../icons/PaypalIcon';

const copyrigth = new Date().getFullYear().toString();

export const Footer = () => {
  return (
    <footer className="bg-black pt-14 text-white flex flex-col items-center py-4 space-y-6">
      <div className="flex flex-col md:flex-row md:justify-between items-center w-full max-w-screen-lg px-6 md:px-0">
        <div className="flex flex-col items-center md:items-start md:mb-0">
          <picture>
            <img src={logo} className="w-40 md:w-52" alt="QuaraStore" />
          </picture>
          <hr className="my-2 w-full" />
          <ul className="flex text-sky-500 gap-4 mt-2">
            <li>
              <MercadoPagoIcon />
            </li>
            <li>
              <PaypalIcon />
            </li>
          </ul>
        </div>
        <div className="flex flex-col md:flex-row gap-8 md:gap-16 mt-6 md:mt-0">
          <div className="text-center md:text-left">
            <h5 className="text-lg font-bold">Información</h5>
            <ul>
              <li>
                <Link className="text-sky-500 underline">Quiénes Somos</Link>
              </li>
              <li>
                <Link className="text-sky-500 underline">
                  Preguntas frecuentes
                </Link>
              </li>
            </ul>
          </div>
          <div className="text-center md:text-left">
            <h5 className="text-lg font-bold">Legal</h5>
            <ul>
              <li>
                <Link className="text-sky-500 underline">
                  Políticas de privacidad
                </Link>
              </li>
              <li>
                <Link className="text-sky-500 underline">
                  Condiciones generales
                </Link>
              </li>
              <li>
                <Link className="text-sky-500 underline">Contacto</Link>
              </li>
            </ul>
          </div>
          <div className="text-center md:text-left">
            <h5 className="text-lg font-bold">Redes Sociales</h5>
            <ul>
              <li>
                <Link className="text-sky-500 underline">Instagram</Link>
              </li>
              <li>
                <Link className="text-sky-500 underline">Facebook</Link>
              </li>
              <li>
                <Link className="text-sky-500 underline">Whatsapp</Link>
              </li>
              <li>
                <Link className="text-sky-500 underline">Telegram</Link>
              </li>
            </ul>
          </div>
        </div>
      </div>
      <div className="w-full">
        <hr className="w-full my-2" />
        <p className="text-center md:text-end pr-0 md:pr-5">
          © Copyright {copyrigth} Todos los derechos reservados para QuaraStore
        </p>
      </div>
    </footer>
  );
};
