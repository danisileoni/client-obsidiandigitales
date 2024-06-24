import { Navbar } from '@/components/common/Navbar';

export const FAQPage = () => {
  return (
    <>
      <Navbar />
      <div className="flex flex-col w-full items-center bg-gray-100 min-h-screen py-10">
        <h1 className="text-5xl text-center mt-8 font-bold text-violet-600 underline mb-10">
          Preguntas Frecuentes
        </h1>
        <section className="w-full max-w-4xl rounded-md shadow-lg p-8 bg-white">
          <article className="mb-8">
            <h3 className="text-3xl font-bold text-violet-600 underline mb-4">
              Políticas de reembolso
            </h3>
            <div className="ml-4 text-lg leading-relaxed">
              <p className="font-semibold">
                ¿Qué requisitos debo cumplir para pedir un reembolso?
              </p>
              <p className="mt-2">
                Si una vez ya entregado el juego te arrepientes y todavía no
                accediste a él, estás en tu derecho de pedir un reembolso. En el
                caso contrario de haber adquirido por completo el producto,
                queda inhabilitado su reembolso a menos que se involucre algún
                problema relacionado a nuestro equipo. En ese caso, te
                brindaremos soporte para encontrar la solución, o si decides el
                reembolso, se te será dado. No está en nuestra responsabilidad
                si no leíste las especificaciones del juego y tu dispositivo no
                lo soporta, o si no tienes almacenamiento en ese caso no
                aplicaría un reembolso.
              </p>
            </div>
          </article>
          <article className="mb-8">
            <h3 className="text-3xl font-bold text-violet-600 underline mb-4">
              Problemas en el producto
            </h3>
            <div className="ml-4 text-lg leading-relaxed">
              <p className="font-semibold">
                ¿El producto que adquirí presentó un problema, qué hago en ese
                caso?
              </p>
              <p className="mt-2">
                Si en la guía proporcionada no damos solución a tu problema, te
                puedes poner en contacto con nosotros. En el caso de no haber
                una solución aparente, y si no has incumplido ninguna de las
                políticas mencionadas a la hora de la entrega del producto
                digital, te proporcionaremos una reposición.
              </p>
            </div>
          </article>
          <article className="mb-8">
            <h3 className="text-3xl font-bold text-violet-600 underline mb-4">
              Pagos
            </h3>
            <div className="ml-4 text-lg leading-relaxed">
              <p className="font-semibold">¿Qué formas de pago toman?</p>
              <ul className="list-disc list-inside mt-2">
                <h5 className="font-bold">Al contactar con nosotros:</h5>
                <li>Transferencias por alias/cvu</li>
                <li>Aceptamos Rapipago, Pago fácil</li>
                <li>Aceptamos tarjetas de débito (una cuota)</li>
                <h5 className="font-bold mt-4">A través de la web:</h5>
                <li>Paypal</li>
                <li>Tarjeta de débito</li>
              </ul>
            </div>
          </article>
        </section>
      </div>
    </>
  );
};
