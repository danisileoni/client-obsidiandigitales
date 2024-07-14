import { GoogleIcon } from '@/components/icons/GoogleIcon';
import { Link, useNavigate } from '@tanstack/react-router';
import { useForm } from 'react-hook-form';
import { BannerAuth } from '@/components/auth/BannerAuth';
import { RegisterInput } from '../../services/types-services';
import { registerAuth } from '@/services/auth.service';
import { AxiosError } from 'axios';
import { useReSideWindows } from '@/hooks/re-side-window';

export const RegisterPage = () => {
  const {
    register,
    setError,
    formState: { errors },
    getValues,
    handleSubmit,
    clearErrors,
  } = useForm<RegisterInput>();
  const navigate = useNavigate();
  const { showControls } = useReSideWindows();

  const onSubmit = async (data: RegisterInput) => {
    try {
      const { confirmPassword, email, name, password, username } = data;
      await registerAuth({
        confirmPassword,
        password,
        email,
        name,
        username,
      });
      navigate({ to: '/' });
    } catch (error) {
      setError('customError', {
        type: 'manual',
        message: (() => {
          if (error instanceof AxiosError) {
            if (error.response?.data.message.includes('username')) {
              return 'El usuario ya existe';
            }
            if (error.response?.data.message.includes('email')) {
              return 'El email ya existe';
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
        {showControls && <BannerAuth />}
        <div className="flex flex-col items-center justify-center w-full md:w-1/2">
          <form
            className="flex flex-col items-center w-full"
            onSubmit={(e) => {
              clearErrors();
              handleSubmit(onSubmit)(e);
            }}
          >
            <p className="mb-5 text-3xl md:text-5xl font-bold">Registrarse</p>
            <div className="flex flex-col w-full">
              <label className="mb-1">Nombre:</label>
              <input
                {...register('name', {
                  required: 'El nombre es obligatorio',
                  maxLength: {
                    value: 21,
                    message: 'El nombre no puede tener más de 21 caracteres',
                  },
                })}
                className="p-2 mb-2 rounded-md border-2 focus:border-sky-500 focus:outline-none bg-gray-100 w-full"
                type="text"
              />
              {errors.name && (
                <p className="text-rose-500 text-sm mb-2">
                  {errors.name.message}
                </p>
              )}
              <label className="mb-1">Usuario:</label>
              <input
                {...register('username', {
                  required: 'El nombre de usuario es obligatorio',
                  maxLength: {
                    value: 16,
                    message: 'El usuario no puede tener más de 16 caracteres',
                  },
                  pattern: {
                    value: /^[^\s]+$/,
                    message: 'No debe de contener espacios',
                  },
                  minLength: {
                    value: 6,
                    message: 'El usuario debe tener al menos 6 caracteres',
                  },
                })}
                className="p-2 mb-2 rounded-md border-2 focus:border-sky-500 focus:outline-none bg-gray-100 w-full"
                type="text"
              />
              {errors.username && (
                <p className="text-rose-500 text-sm mb-2">
                  {errors.username.message}
                </p>
              )}
              <label className="mb-1">Email:</label>
              <input
                {...register('email', {
                  required: 'El email es obligatorio',
                  pattern: {
                    value: /^\S+@\S+$/i,
                    message: 'El email no es válido',
                  },
                })}
                className="p-2 mb-2 rounded-md border-2 focus:border-sky-500 focus:outline-none bg-gray-100 w-full"
                type="text"
              />
              {errors.email && (
                <p className="text-rose-500 text-sm mb-2">
                  {errors.email.message}
                </p>
              )}
              <label className="mb-1">Contraseña:</label>
              <input
                {...register('password', {
                  required: 'La contraseña es obligatoria',
                  pattern: {
                    value:
                      /(?:(?=.*\d)|(?=.*\W+))(?![.\n])(?=.*[A-Z])(?=.*[a-z]).*$/,
                    message:
                      'Debe tener mayúscula, minúscula y número/carácter especial',
                  },
                  minLength: {
                    value: 8,
                    message: 'La contraseña debe tener al menos 8 caracteres',
                  },
                  maxLength: {
                    value: 21,
                    message:
                      'La contraseña no puede tener más de 21 caracteres',
                  },
                })}
                className="p-2 mb-2 rounded-md border-2 focus:border-sky-500 focus:outline-none bg-gray-100 w-full"
                type="password"
              />
              {errors.password && (
                <p className="text-rose-500 text-sm mb-2">
                  {errors.password.message}
                </p>
              )}
              <label className="mb-1">Confirmar Contraseña:</label>
              <input
                {...register('confirmPassword', {
                  required: 'La confirmación de la contraseña es obligatoria',
                  validate: (value) =>
                    value === getValues('password') ||
                    'Las contraseñas no coinciden',
                })}
                className="p-2 mb-2 rounded-md border-2 focus:border-sky-500 focus:outline-none bg-gray-100 w-full"
                type="password"
              />
              {errors.confirmPassword && (
                <p className="text-rose-500 text-sm mb-2">
                  {errors.confirmPassword.message}
                </p>
              )}
              {errors.customError && (
                <p className="text-rose-500 text-sm mb-2">
                  {errors.customError.message}
                </p>
              )}
              <button
                type="submit"
                className="p-2 mb-2 rounded-md hover:bg-sky-700 transition-colors duration-300 text-white text-lg font-bold bg-sky-500 w-full"
              >
                Registrarse
              </button>
              <Link
                to="/auth/login"
                className="text-sky-700 underline text-end mb-2"
              >
                Ingresar
              </Link>
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
