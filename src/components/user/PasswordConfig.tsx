import { updateAuth } from '@/services/auth.service';
import { Link } from '@tanstack/react-router';
import { AxiosError } from 'axios';
import { useForm } from 'react-hook-form';

interface UpdateUser {
  currentPassword: string;
  password: string;
  confirmPassword: string;
  customError: string;
}

export const PasswordConfig = ({ id }: { id: string | undefined }) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
    setError,
    getValues,
  } = useForm<UpdateUser>();

  const onSubmit = async (data: UpdateUser) => {
    try {
      const { confirmPassword, currentPassword, password } = data;

      if (id) {
        await updateAuth({ confirmPassword, currentPassword, password }, id);
      } else {
        return;
      }
    } catch (error) {
      setError('customError', {
        type: 'manual',
        message: (() => {
          if (error instanceof AxiosError) {
            if (
              error.response?.data.message.includes(
                'Current password is incorrect',
              )
            ) {
              return 'La contraseña actual es incorrecta';
            }
          }
          return 'Error desconocido, por favor intente de nuevo';
        })(),
      });
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col w-full">
      <h3 className="text-3xl font-bold mb-2">Contraseña</h3>
      <label htmlFor="currentPassword" className="text-lg font-bold mb-1">
        Contraseña actual:
      </label>
      <input
        className="rounded-md p-1 pl-2 border border-gray-300"
        type="password"
        {...register('currentPassword', {
          required: 'El passowrd es obligatorio',
        })}
      />
      <div className="min-h-[20px]">
        {errors.currentPassword && (
          <p className="text-rose-500 text-sm">
            {errors.currentPassword.message}
          </p>
        )}
      </div>

      <label htmlFor="username" className="text-lg font-bold mb-1">
        Nueva contraseña:
      </label>
      <input
        className="rounded-md p-1 pl-2 border border-gray-300"
        type="password"
        {...register('password', {
          required: 'La contraseña es obligatoria',
          pattern: {
            value: /(?:(?=.*\d)|(?=.*\W+))(?![.\n])(?=.*[A-Z])(?=.*[a-z]).*$/,
            message:
              'Debe tener mayúscula, minúscula y número/carácter especial',
          },
          minLength: {
            value: 8,
            message: 'La contraseña debe tener al menos 8 caracteres',
          },
          maxLength: {
            value: 21,
            message: 'La contraseña no puede tener más de 21 caracteres',
          },
        })}
      />
      <div className="min-h-[20px]">
        {errors.password && (
          <p className="text-rose-500 text-sm">{errors.password.message}</p>
        )}
      </div>

      <label htmlFor="confirmPassword" className="text-lg font-bold mb-1">
        Confirmar contraseña:
      </label>
      <input
        className="rounded-md p-1 pl-2 border border-gray-300"
        {...register('confirmPassword', {
          required: 'La confirmación de la contraseña es obligatoria',
          validate: (value) =>
            value === getValues('password') || 'Las contraseñas no coinciden',
        })}
        type="password"
      />
      <div className="min-h-[20px]">
        {errors.confirmPassword && (
          <p className="text-rose-500 text-sm">
            {errors.confirmPassword.message}
          </p>
        )}
      </div>
      <div className="min-h-[20px]">
        <div>
          {errors.customError && (
            <p className="text-rose-500 text-sm">
              {errors.customError?.message}
            </p>
          )}
        </div>
      </div>

      <button
        type="submit"
        className="bg-sky-500 mt- hover:bg-sky-700 transition-colors hover:text-white text-black p-2 rounded-md"
      >
        Actualizar contraseña
      </button>
      <Link className="text-sky-600 underline mt-1">
        Olvidaste la contraseña?
      </Link>
    </form>
  );
};
