import { loginAuthDashboard } from '@/services/auth.service';
import { LoginDashboard } from '@/services/types-services';
import { useNavigate } from '@tanstack/react-router';
import { AxiosError } from 'axios';
import { useForm } from 'react-hook-form';

export const LoginDashboardPage = () => {
  const navigate = useNavigate();

  const {
    register,
    setError,
    formState: { errors },
    handleSubmit,
    clearErrors,
  } = useForm<LoginDashboard>();

  const onSubmit = async (data: LoginDashboard) => {
    try {
      const { email, password } = data;

      await loginAuthDashboard({ email, password });
      navigate({ to: '/admin/dashboard/panel/home' });
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
    <section className="flex text-white bg-[#0b0b0b] flex-col items-center h-screen justify-center">
      <div className="bg-[#202020] p-5 rounded-sm">
        <h3 className="text-xl mb-2">Ingresar al Dashboard</h3>
        <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col w-60">
          <label htmlFor="email">Email:</label>
          <input
            id="email"
            type="text"
            className="bg-[#1b1b1b] p-1 pt-2 pb-2 rounded"
            placeholder="example@email.com"
            {...register('email')}
            onChange={() => clearErrors('errorAuthorized')}
          />
          <label className="mt-2" htmlFor="password">
            Password:
          </label>
          <input
            id="password"
            type="password"
            className="bg-[#1b1b1b] p-1 pb-2 pt-2 rounded"
            placeholder="password"
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
          <button type="submit" className="rounded bg-sky-700 p-1 mt-2">
            Ingresar
          </button>
        </form>
      </div>
    </section>
  );
};
