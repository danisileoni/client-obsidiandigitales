import { Navbar } from '@/components/common/Navbar';

export const AboutPage = () => {
  return (
    <>
      <title>Sobre Nosotros | QuaraStore</title>
      <meta
        name="description"
        content="Conozca más sobre QuaraStore, su destino definitivo para adquirir los mejores juegos digitales. Ofrecemos una experiencia de compra sencilla, rápida y segura."
      />
      <Navbar />
      <div className="flex flex-col w-full items-center bg-gray-100 min-h-screen py-10">
        <h1 className="text-5xl text-center mt-8 font-bold text-sky-600 underline mb-10">
          Bienvenido a QuaraStore
        </h1>
        <section className="w-full max-w-4xl rounded-md shadow-lg p-8 bg-white">
          <article className="mb-8">
            <h3 className="text-3xl font-bold text-sky-600 underline mb-4">
              Estimado/a:
            </h3>
            <div className="ml-4 text-lg leading-relaxed">
              <p>
                Nos complace presentarle QuaraStore, su destino definitivo para
                adquirir los mejores juegos digitales. Nuestra plataforma en
                línea está diseñada para ofrecer una experiencia de compra
                sencilla, rápida y segura, con una amplia variedad de títulos
                para todas las edades y gustos.
              </p>
              <p className="mt-4">
                En QuaraStore, nos apasiona el mundo de los videojuegos y nos
                comprometemos a proporcionar a nuestros clientes acceso a los
                últimos lanzamientos, así como a los clásicos favoritos. Ya sea
                que esté buscando juegos de acción, aventuras, deportes,
                estrategia, o cualquier otro género, encontrará una selección
                inigualable en nuestro sitio web.
              </p>
              <p className="mt-4">
                Algunos de los beneficios de comprar en QuaraStore incluyen:
              </p>
              <ul className="list-disc ml-8 mt-2">
                <li>
                  <strong>Variedad y Calidad:</strong> Ofrecemos una extensa
                  colección de juegos de desarrolladores reconocidos y
                  emergentes, garantizando opciones para todos los jugadores.
                </li>
                <li>
                  <strong>Precios Competitivos:</strong> Nuestros precios están
                  diseñados para ser accesibles, con ofertas especiales y
                  descuentos regulares.
                </li>
                <li>
                  <strong>Facilidad de Uso:</strong> Nuestra plataforma es
                  intuitiva y fácil de navegar, lo que permite encontrar y
                  adquirir juegos de manera rápida y eficiente.
                </li>
                <li>
                  <strong>Seguridad:</strong> Implementamos las últimas
                  tecnologías de seguridad para proteger sus datos y garantizar
                  transacciones seguras.
                </li>
              </ul>
              <p className="mt-4">
                Nos esforzamos por brindar un servicio al cliente excepcional.
                Nuestro equipo de soporte está disponible para asistirle con
                cualquier consulta o problema que pueda tener, asegurando que su
                experiencia de compra sea positiva y sin inconvenientes.
              </p>
              <p className="mt-4">
                Le invitamos a visitar nuestro sitio web en{' '}
                <a
                  href="https://quarastore.com"
                  className="text-sky-600 underline"
                >
                  quarastore.com
                </a>{' '}
                para explorar nuestra oferta de juegos digitales y aprovechar
                nuestras promociones exclusivas. También puede seguirnos en
                nuestras redes sociales [enlace a redes sociales] para
                mantenerse actualizado sobre nuevos lanzamientos y ofertas
                especiales.
              </p>
              <p className="mt-4">
                Agradecemos su interés y estamos emocionados de ofrecerle una
                experiencia de juego digital incomparable.
              </p>
              <p className="mt-4">Atentamente,</p>
              <p className="mt-4">
                Fundadores: Arias Lautaro & Gonzales Santiago
              </p>
              <p className="mt-4">Nombre de la Tienda: QuaraStore</p>
              <p className="mt-4">
                Correo Electrónico de Contacto:{' '}
                <a
                  href="mailto:quarastorecontact@gmail.com"
                  className="text-sky-600 underline"
                >
                  quarastorecontact@gmail.com
                </a>
              </p>
            </div>
          </article>
        </section>
      </div>
    </>
  );
};
