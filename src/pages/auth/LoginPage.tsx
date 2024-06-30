import { BannerAuth } from '@/components/auth/BannerAuth';
import { GoogleIcon } from '@/components/icons/GoogleIcon';
import { loginAuth } from '@/services/auth.service';
import { LoginInput } from '@/services/types-services';
import { useNavigate } from '@tanstack/react-router';
import { Link } from '@tanstack/react-router';
import { AxiosError } from 'axios';
import { useForm } from 'react-hook-form';

export const LoginPage = () => {
  const {
    register,
    setError,
    formState: { errors },
    handleSubmit,
    clearErrors,
  } = useForm<LoginInput>();
  const navigate = useNavigate();

  const onSubmit = async (data: LoginInput) => {
    try {
      const { password, username } = data;

      await loginAuth({ password, username });
      navigate({ to: '/' });
    } catch (error) {
      setError('errorAuthorized', {
        type: 'manual',
        message: (() => {
          if (error instanceof AxiosError) {
            if (
              error.response?.data.message.includes('Credentials are not valid')
            ) {
              return 'Usuario o contraseña incorrectos';
            }
          }
          return 'Error desconocido, por favor intente de nuevo';
        })(),
      });
    }
  };

  return (
    <>
      <section className="flex h-screen justify-center items-center">
        <div className="flex bg-white rounded-2xl shadow-lg">
          <BannerAuth />
          <div>
            <form
              className="flex flex-col items-center justify-center h-full w-[28rem]"
              onSubmit={handleSubmit(onSubmit)}
            >
              <p className="mb-5 text-5xl font-bold">Inicia Sesion</p>
              <div className="flex flex-col">
                <p>Usuario:</p>
                <input
                  className=" p-2 rounded-md border-2 focus:border-sky-500 focus:outline-none bg-gray-100 w-96"
                  type="text"
                  {...register('username')}
                  onChange={() => clearErrors('errorAuthorized')}
                />
                &nbsp;
                <p>Contraseña:</p>
                <input
                  className="p-2 rounded-md border-2 focus:border-sky-500 focus:outline-none bg-gray-100 w-96"
                  type="password"
                  {...register('password')}
                  onChange={() => clearErrors('errorAuthorized')}
                />
                <div className="min-h-[20px]">
                  <div>
                    {errors.errorAuthorized && (
                      <p className="text-rose-500 text-sm">
                        {errors.errorAuthorized?.message}
                      </p>
                    )}
                  </div>
                </div>
                <button
                  type="submit"
                  className=" p-2 rounded-md hover:bg-sky-700 transition-colors duration-300 text-white text-lg font-bold bg-sky-500"
                >
                  Ingresar
                </button>
                <div className="flex w-full justify-between">
                  <Link className="text-sky-700 underline">
                    Olvidaste la contraseña?
                  </Link>
                  <Link to="/auth/register" className="text-sky-700 underline">
                    Registrarse
                  </Link>
                </div>
                <div className="flex flex-col gap-2 mt-2">
                  <p className="text-lg">Ingresar desde otra plataforma:</p>
                  <button
                    type="button"
                    className="border w-10 rounded-sm shadow-lg border-sky-300 flex items-center justify-center p-1"
                    onClick={async () => {
                      window.location.href =
                        'http://localhost:3000/api/v1/auth/google/login';
                    }}
                  >
                    <GoogleIcon />
                  </button>
                </div>
              </div>
            </form>
          </div>
        </div>
      </section>
    </>
  );
};
