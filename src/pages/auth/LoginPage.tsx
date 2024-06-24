import { BannerAuth } from '@/components/auth/BannerAuth';
import { GoogleIcon } from '@/components/icons/GoogleIcon';
import { loginAuth } from '@/services/auth.service';
import { LoginInput } from '@/services/types-services';
import { Link, redirect } from '@tanstack/react-router';
import { AxiosError } from 'axios';
import { useForm } from 'react-hook-form';

export const LoginPage = () => {
  const {
    register,
    setError,
    formState: { errors },
    getValues,
    handleSubmit,
    clearErrors,
  } = useForm<LoginInput>();

  const onSubmit = async (data: LoginInput) => {
    try {
      console.log(getValues());
      const { password, username } = data;

      await loginAuth({ password, username });
      redirect({ to: '/' });
    } catch (error) {
      console.log(error);
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
              <p className="mb-5 text-5xl font-bold">Iniciar Sesion</p>
              <div className="flex flex-col">
                <p>Usuario:</p>
                <input
                  className=" p-2 rounded-md border-2 focus:border-violet-500 focus:outline-none bg-gray-100 w-96"
                  type="text"
                  {...register('username')}
                  onChange={() => clearErrors('errorAuthorized')}
                />
                &nbsp;
                <p>Contraseña:</p>
                <input
                  className="p-2 rounded-md border-2 focus:border-violet-500 focus:outline-none bg-gray-100 w-96"
                  type="text"
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
                  className=" p-2 rounded-md hover:bg-violet-700 transition-colors duration-300 text-white text-lg font-bold bg-violet-500"
                >
                  Ingresar
                </button>
                <div className="flex w-full justify-between">
                  <Link className="text-violet-700 underline">
                    Olvidate la contraseña?
                  </Link>
                  <Link
                    to="/auth/register"
                    className="text-violet-700 underline"
                  >
                    Registrarse
                  </Link>
                </div>
                <div className="flex flex-col gap-2 mt-2">
                  <p className="text-lg">Ingresar desde otra plataforma:</p>
                  <button
                    type="button"
                    className="border w-10 rounded-sm shadow-lg border-violet-300 flex items-center justify-center p-1"
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
