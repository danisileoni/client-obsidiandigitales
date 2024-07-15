import { useForm } from 'react-hook-form';
import { BannerAuth } from '@/components/auth/BannerAuth';
import { sendForgotPassword } from '@/services/auth.service';
import { AxiosError } from 'axios';
import { useReSideWindows } from '@/hooks/re-side-window';

const SendForgotPasswordPage = () => {
  const {
    register,
    setError,
    formState: { errors },
    handleSubmit,
    clearErrors,
    getValues,
    setValue,
  } = useForm<{
    email: string;
    customError: string;
    customMessage: string;
  }>();
  const { showControls } = useReSideWindows();

  const onSubmit = async (data: { email: string; customError: string }) => {
    try {
      const { email } = data;
      await sendForgotPassword({ email });
      setValue('customMessage', 'Se a enviado un mail al correo electronico');
    } catch (error) {
      setError('customError', {
        type: 'manual',
        message: (() => {
          if (error instanceof AxiosError) {
            if (error.response?.data.message.includes('email')) {
              return 'El email no se a encontrado';
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
              {getValues('customMessage') !== '' && (
                <p className="text-green-600 text-sm mb-2">
                  {getValues('customMessage')}
                </p>
              )}

              <button
                type="submit"
                className="p-2 mb-2 rounded-md hover:bg-sky-700 transition-colors duration-300 text-white text-lg font-bold bg-sky-500 w-full"
              >
                Recuperar contraseña
              </button>
            </div>
          </form>
        </div>
      </div>
    </section>
  );
};

export default SendForgotPasswordPage;
