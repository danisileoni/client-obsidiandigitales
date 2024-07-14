import { Navbar } from '@/components/common/Navbar';
import { useNavigate } from '@tanstack/react-router';
import notFound from '@/assets/not-found.svg';

export const NotFoundPage = () => {
  const navigate = useNavigate();

  const handleGoHome = () => {
    navigate({ to: '/' });
  };

  return (
    <>
      <Navbar />
      <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100 p-4">
        <div className="text-center">
          <h1 className="text-6xl font-bold text-sky-500">404</h1>
          <p className="text-2xl mt-4 text-gray-800">Página no encontrada</p>
          <p className="text-lg mt-2 text-gray-600">
            Lo sentimos, la página que estás buscando no existe.
          </p>
          <button
            type="button"
            onClick={handleGoHome}
            className="mt-6 bg-sky-500 hover:bg-sky-600 text-white font-semibold py-2 px-4 rounded transition-colors duration-300"
          >
            Volver al inicio
          </button>
        </div>
        <div className="mt-10">
          <img
            src={notFound}
            alt="Not Found"
            className="w-full max-w-md mx-auto"
          />
        </div>
      </div>
    </>
  );
};
