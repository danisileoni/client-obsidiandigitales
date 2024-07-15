import { Navbar } from '@/components/common/Navbar';

export const LegalPolicyPage = () => {
  return (
    <>
      <title>Información Legal | QuaraStore</title>
      <meta
        name="description"
        content="Consulte nuestra información legal, incluyendo datos del responsable, propósito del sitio web, legislación aplicable, derechos de autor y contacto legal."
      />
      <Navbar />
      <div className="flex flex-col w-full items-center bg-gray-100 min-h-screen py-10">
        <h1 className="text-5xl text-center mt-8 font-bold text-sky-600 underline mb-10">
          Información Legal
        </h1>
        <section className="w-full max-w-4xl rounded-md shadow-lg p-8 bg-white">
          <article className="mb-8">
            <h3 className="text-3xl font-bold text-sky-600 underline mb-4">
              Datos del Responsable
            </h3>
            <div className="ml-4 text-lg leading-relaxed">
              <p>
                <strong>Nombre del Responsable:</strong> QuaraStore
              </p>
              <p>
                <strong>Teléfono:</strong> +54 +54 351 7410781
              </p>
              <p>
                <strong>Correo Electrónico:</strong> quarastorecontact@gmail.com
              </p>
            </div>
          </article>
          <article className="mb-8">
            <h3 className="text-3xl font-bold text-sky-600 underline mb-4">
              Propósito del Sitio Web
            </h3>
            <div className="ml-4 text-lg leading-relaxed">
              <p>
                El propósito de QuaraStore es ofrecer una plataforma en línea
                para la compra de juegos digitales. La utilización de este sitio
                web está sujeta a las condiciones generales descritas
                anteriormente.
              </p>
            </div>
          </article>
          <article className="mb-8">
            <h3 className="text-3xl font-bold text-sky-600 underline mb-4">
              Legislación y Jurisdicción Aplicable
            </h3>
            <div className="ml-4 text-lg leading-relaxed">
              <p>
                Estas condiciones generales y cualquier disputa o reclamación
                relacionada con ellas se regirán e interpretarán de acuerdo con
                las leyes de Argentina. Cualquier disputa relacionada con el uso
                de nuestro sitio web será competencia exclusiva de los
                tribunales de La Ciudad de Buenos Aires.
              </p>
            </div>
          </article>
          <article className="mb-8">
            <h3 className="text-3xl font-bold text-sky-600 underline mb-4">
              Derechos de Autor y Marcas Registradas
            </h3>
            <div className="ml-4 text-lg leading-relaxed">
              <p>
                Todo el contenido de nuestro sitio web, incluyendo pero no
                limitado a textos, gráficos, logotipos, imágenes, clips de
                audio, video y software, es propiedad de QuaraStore o sus
                proveedores de contenido, exceptuando el código de la página que
                es propiedad de Daniele Armando Sileoni y está protegido por
                leyes de propiedad intelectual.
              </p>
            </div>
          </article>
          <article className="mb-8">
            <h3 className="text-3xl font-bold text-sky-600 underline mb-4">
              Enlaces a Sitios de Terceros
            </h3>
            <div className="ml-4 text-lg leading-relaxed">
              <p>
                Nuestro sitio web puede contener enlaces a sitios web de
                terceros. No tenemos control sobre el contenido o las prácticas
                de privacidad de estos sitios y no asumimos ninguna
                responsabilidad por ellos. Le recomendamos que lea las políticas
                de privacidad de cualquier sitio web de terceros que visite.
              </p>
            </div>
          </article>
          <article className="mb-8">
            <h3 className="text-3xl font-bold text-sky-600 underline mb-4">
              Contacto Legal
            </h3>
            <div className="ml-4 text-lg leading-relaxed">
              <p>
                Para cualquier consulta legal o reclamación relacionada con
                nuestro sitio web, puede contactarnos en:
              </p>
              <p>
                <strong>Correo Electrónico:</strong> quarastorecontact@gmail.com
              </p>
              <p>
                <strong>Teléfono:</strong> +54 351 7410781
              </p>
            </div>
          </article>
        </section>
      </div>
    </>
  );
};
