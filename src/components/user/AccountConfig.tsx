import { updateAuth } from '@/services/auth.service';
import { User } from '@/services/types-services';
import { AxiosError } from 'axios';
import { useForm } from 'react-hook-form';

interface UpdateUser {
  email: string;
  username: string;
  name: string;
  customError: string;
}

export const AccountConfig = ({ user }: { user: User | undefined }) => {
  const {
    register,
    handleSubmit,
    setError,
    formState: { errors },
  } = useForm<UpdateUser>();

  const onSubmit = async (data: UpdateUser) => {
    if (
      user?.email === data.email &&
      user?.name === data.name &&
      user?.username === data.username
    ) {
      return;
    }
    try {
      const { email, name, username } = data;

      if (user) {
        await updateAuth({ username, email, name }, user?.id);
      } else {
        return;
      }
    } catch (error) {
      setError('customError', {
        type: 'manual',
        message: (() => {
          if (error instanceof AxiosError) {
            if (error.response?.data.message.includes('email')) {
              return 'Email ya existente';
            }
            if (error.response?.data.message.includes('username')) {
              return 'Usuario ya existente';
            }
          }
          return 'Error desconocido, por favor intente de nuevo';
        })(),
      });
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col w-full">
      <h3 className="text-3xl font-bold mb-2">Cuenta</h3>
      <label htmlFor="name" className="text-lg font-bold mb-1">
        Nombre:
      </label>
      <input
        className="rounded-md p-1 pl-2 border border-gray-300"
        type="text"
        {...register('name', {
          required: 'El nombre es obligatorio',
          value: user?.name,
          maxLength: {
            value: 21,
            message: 'El nombre no puede tener más de 21 caracteres',
          },
        })}
        defaultValue={user?.name && user.name}
      />
      <div className="min-h-[20px]">
        {errors.name && (
          <p className="text-rose-500 text-sm">{errors.name.message}</p>
        )}
      </div>

      <label htmlFor="username" className="text-lg font-bold mb-1">
        Usuario:
      </label>
      <input
        className="rounded-md p-1 pl-2 border border-gray-300"
        type="text"
        {...register('username', {
          required: 'El nombre de usuario es obligatorio',
          value: user?.username,
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
        defaultValue={user?.username && user.username}
      />
      <div className="min-h-[20px]">
        {errors.username && (
          <p className="text-rose-500 text-sm">{errors.username.message}</p>
        )}
      </div>

      <label htmlFor="email" className="text-lg font-bold mb-1">
        Email:
      </label>
      <input
        className="rounded-md p-1 pl-2 border border-gray-300"
        {...register('email', {
          required: 'El email es obligatorio',
          value: user?.email,
          pattern: {
            value: /^\S+@\S+$/i,
            message: 'El email no es válido',
          },
        })}
        type="text"
        defaultValue={user?.email && user.email}
      />
      <div className="min-h-[20px]">
        {errors.email && (
          <p className="text-rose-500 text-sm">{errors.email.message}</p>
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
        Actualizar cuenta
      </button>
    </form>
  );
};
