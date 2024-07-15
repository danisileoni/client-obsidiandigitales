import { getOneUser } from '@/services/user.service';
import { useQuery } from '@tanstack/react-query';
import { Navbar } from '@/components/common/Navbar';
import { AccountConfig } from '@/components/user/AccountConfig';
import { useState } from 'react';
import { PasswordConfig } from '@/components/user/PasswordConfig';
import { HelpConfig } from '@/components/user/HelpConfig';

type ConfigUserProps = {
  id: string;
};

const ConfigUserPage = ({ id }: ConfigUserProps) => {
  const [currentOption, setCurrentOption] = useState('account');

  const { data } = useQuery({
    queryKey: ['configUser', id],
    queryFn: () => getOneUser(id),
  });

  return (
    <>
      <Navbar />
      <section className="px-4 sm:px-0 py-10 h-screen max-w-screen-md mx-auto">
        <div className="mb-8 text-center">
          <h1 className="text-4xl font-bold mb-2">Configuración de Usuario</h1>
          <p className="text-gray-600">
            Cambia tu perfil y ajustes de la cuenta
          </p>
        </div>
        <div className="flex flex-col sm:flex-row space-y-4 sm:space-y-0 sm:space-x-4 max-w-5xl mx-auto">
          <div className="w-full sm:w-1/4 bg-white shadow-md rounded-lg p-4">
            <ul className="flex flex-col space-y-2">
              <hr className="my-2" />
              <li>
                <button
                  type="button"
                  className={`text-lg w-full font-medium text-gray-700 hover:text-sky-500 ${
                    currentOption === 'account' && 'text-sky-500'
                  }`}
                  onClick={() => setCurrentOption('account')}
                >
                  Cuenta
                </button>
              </li>
              <hr className="my-2" />
              <li>
                <button
                  type="button"
                  className={`text-lg w-full font-medium text-gray-700 hover:text-sky-500 ${
                    currentOption === 'password' && 'text-sky-500'
                  }`}
                  onClick={() => setCurrentOption('password')}
                >
                  Contraseña
                </button>
              </li>
              <hr className="my-2" />
              <li>
                <button
                  type="button"
                  className={`text-lg w-full font-medium text-gray-700 hover:text-sky-500 ${
                    currentOption === 'help' && 'text-sky-500'
                  }`}
                  onClick={() => setCurrentOption('help')}
                >
                  Ayuda
                </button>
              </li>
              <hr className="my-2" />
            </ul>
          </div>
          <div className="w-full sm:w-3/4 shadow-md rounded-lg p-4 bg-white">
            {currentOption === 'account' ? (
              <AccountConfig user={data} />
            ) : currentOption === 'password' ? (
              <PasswordConfig id={data?.id} />
            ) : (
              <HelpConfig />
            )}
          </div>
        </div>
      </section>
    </>
  );
};

export default ConfigUserPage;
