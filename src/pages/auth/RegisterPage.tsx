import { GoogleIcon } from '@/components/icons/GoogleIcon';
import { Link, useNavigate } from '@tanstack/react-router';
import { useForm } from 'react-hook-form';
import { BannerAuth } from '@/components/auth/BannerAuth';
import { RegisterInput } from '../../services/types-services';
import { registerAuth } from '@/services/auth.service';
import { AxiosError } from 'axios';

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
    <>
      <section className="flex h-screen justify-center items-center">
        <div className="flex bg-white rounded-2xl shadow-lg">
          <BannerAuth />
          <div>
            <form
              className="flex flex-col items-center justify-center h-full w-[28rem]"
              onSubmit={handleSubmit(onSubmit)}
            >
              <p className="mb-5 text-5xl font-bold">Registrarse</p>
              <div className="flex flex-col">
                <p className="">Nombre:</p>
                <input
                  {...register('name', {
                    required: 'El nombre es obligatorio',
                    maxLength: {
                      value: 21,
                      message: 'El nombre no puede tener más de 21 caracteres',
                    },
                  })}
                  className="p-2 rounded-md border-2 focus:border-violet-500 focus:outline-none bg-gray-100 w-96"
                  type="text"
                />
                <div className="min-h-[20px]">
                  {errors.name && (
                    <p className="text-rose-500 text-sm">
                      {errors.name.message}
                    </p>
                  )}
                </div>
                <p>Usuario:</p>
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
                  onChange={() => clearErrors('customError')}
                  className="p-2 rounded-md border-2 focus:border-violet-500 focus:outline-none bg-gray-100 w-96"
                  type="text"
                />
                <div className="min-h-[20px]">
                  {errors.username && (
                    <p className="text-rose-500 text-sm">
                      {errors.username.message}
                    </p>
                  )}
                </div>
                <p>Email:</p>
                <input
                  {...register('email', {
                    required: 'El email es obligatorio',
                    pattern: {
                      value: /^\S+@\S+$/i,
                      message: 'El email no es válido',
                    },
                  })}
                  onChange={() => clearErrors('customError')}
                  className="p-2 rounded-md border-2 focus:border-violet-500 focus:outline-none bg-gray-100 w-96"
                  type="text"
                />
                <div className="min-h-[20px]">
                  {errors.email && (
                    <p className="text-rose-500 text-sm">
                      {errors.email.message}
                    </p>
                  )}
                </div>
                <p>Contraseña:</p>
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
                  className="p-2 rounded-md border-2 focus:border-violet-500 focus:outline-none bg-gray-100 w-96"
                  type="password"
                />
                <div className="min-h-[20px]">
                  {errors.password && (
                    <p className="text-rose-500 text-sm w-96">
                      {errors.password.message}
                    </p>
                  )}
                </div>
                <p>Confirmar Contraseña:</p>
                <input
                  {...register('confirmPassword', {
                    required: 'La confirmación de la contraseña es obligatoria',
                    validate: (value) =>
                      value === getValues('password') ||
                      'Las contraseñas no coinciden',
                  })}
                  className="p-2 rounded-md border-2 focus:border-violet-500 focus:outline-none bg-gray-100 w-96"
                  type="password"
                />
                <div className="min-h-[20px]">
                  <div>
                    {errors.customError && (
                      <p className="text-rose-500 text-sm">
                        {errors.customError?.message}
                      </p>
                    )}
                  </div>
                  <div>
                    {errors.confirmPassword && (
                      <p className="text-rose-500 text-sm">
                        {errors.confirmPassword.message}
                      </p>
                    )}
                  </div>
                </div>
                <button
                  type="submit"
                  className="p-2 rounded-md hover:bg-violet-700 transition-colors duration-300 text-white text-lg font-bold bg-violet-500"
                >
                  Registrarse
                </button>
                <Link
                  to="/auth/login"
                  className="text-violet-700 underline text-end"
                >
                  Ingresar
                </Link>
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
