import { useNavigate } from '@tanstack/react-router';
import { useForm } from 'react-hook-form';
import { BannerAuth } from '@/components/auth/BannerAuth';
import { forgotPassword } from '@/services/auth.service';
import { AxiosError } from 'axios';
import { useReSideWindows } from '@/hooks/re-side-window';

const ForgotPasswordPage = ({ token }: { token: string }) => {
  const {
    register,
    setError,
    formState: { errors },
    getValues,
    handleSubmit,
    clearErrors,
  } = useForm<{
    password: string;
    confirmPassword: string;
    customError: string;
  }>();
  const navigate = useNavigate();
  const { showControls } = useReSideWindows();

  const onSubmit = async (data: {
    password: string;
    confirmPassword: string;
    customError: string;
  }) => {
    try {
      const { confirmPassword, password } = data;
      await forgotPassword(token, {
        confirmPassword,
        password,
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
            <p className="mb-5 text-3xl md:text-5xl font-bold">Recuperar</p>
            <div className="flex flex-col w-full">
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
                Cambiar contraseña
              </button>
            </div>
          </form>
        </div>
      </div>
    </section>
  );
};

export default ForgotPasswordPage;
