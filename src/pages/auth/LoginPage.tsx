import { BannerAuth } from '@/components/auth/BannerAuth';
import { GoogleIcon } from '@/components/icons/GoogleIcon';
import { useReSideWindows } from '@/hooks/re-side-window';
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
  const { showControls } = useReSideWindows();

  const onSubmit = async (data: LoginInput) => {
    try {
      const { password, username } = data;

      console.log({
        password,
        username,
      });

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
    <section className="flex justify-center items-center min-h-screen bg-gray-100">
      <div className="flex flex-col md:flex-row bg-white rounded-2xl shadow-lg max-md:p-6 md:pr-10 max-w-4xl w-full">
        {showControls ? <BannerAuth /> : ''}
        <div className="flex flex-col items-center justify-center w-full md:w-1/2">
          <form
            className="flex flex-col items-center w-full"
            onSubmit={(e) => {
              clearErrors();
              handleSubmit(onSubmit)(e);
            }}
          >
            <p className="mb-5 text-3xl md:text-5xl font-bold">Inicia Sesión</p>
            <div className="flex flex-col w-full">
              <label className="mb-1">Usuario:</label>
              <input
                className="p-2 mb-2 rounded-md border-2 focus:border-sky-500 focus:outline-none bg-gray-100 w-full"
                type="text"
                {...register('username')}
              />
              <label className="mb-1">Contraseña:</label>
              <input
                className="p-2 mb-2 rounded-md border-2 focus:border-sky-500 focus:outline-none bg-gray-100 w-full"
                type="password"
                {...register('password')}
              />
              <div className="min-h-[20px] mb-2">
                {errors.errorAuthorized && (
                  <p className="text-rose-500 text-sm">
                    {errors.errorAuthorized?.message}
                  </p>
                )}
              </div>
              <button
                type="submit"
                className="p-2 mb-2 rounded-md hover:bg-sky-700 transition-colors duration-300 text-white text-lg font-bold bg-sky-500 w-full"
              >
                Ingresar
              </button>
              <div className="flex w-full justify-between mb-2">
                <Link
                  to="/auth/forgot-password/send"
                  className="text-sky-700 underline"
                >
                  ¿Olvidaste la contraseña?
                </Link>
                <Link to="/auth/register" className="text-sky-700 underline">
                  Registrarse
                </Link>
              </div>
              <div className="flex flex-col gap-2 mt-2 w-full items-center">
                <p className="text-lg">Ingresar desde otra plataforma:</p>
                <button
                  type="button"
                  className="border w-10 rounded-sm shadow-lg border-sky-300 flex items-center justify-center p-1"
                  onClick={async () => {
                    window.location.href = `${import.meta.env.VITE_HOST_BACKEND}/auth/google/login`;
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
  );
};
