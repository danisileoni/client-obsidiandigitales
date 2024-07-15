import { Navbar } from '@/components/common/Navbar';

export const PrivacyPolicyPage = () => {
  return (
    <>
      <head>
        <title>Políticas de Privacidad | QuaraStore</title>
        <meta
          name="description"
          content="Consulte nuestras políticas de privacidad para conocer cómo recopilamos, usamos y protegemos su información personal en QuaraStore."
        />
      </head>
      <Navbar />
      <div className="flex flex-col w-full items-center bg-gray-100 min-h-screen py-10">
        <h1 className="text-5xl text-center mt-8 font-bold text-sky-600 underline mb-10">
          Políticas de Privacidad
        </h1>
        <section className="w-full max-w-4xl rounded-md shadow-lg p-8 bg-white">
          <article className="mb-8">
            <h3 className="text-3xl font-bold text-sky-600 underline mb-4">
              Introducción
            </h3>
            <div className="ml-4 text-lg leading-relaxed">
              <p>
                Bienvenido a QuaraStore ("nosotros", "nuestro", "nuestra"). Nos
                comprometemos a proteger y respetar su privacidad. Esta política
                de privacidad describe cómo recopilamos, usamos y protegemos su
                información personal cuando visita y utiliza nuestro sitio web
                QuaraStore.com.
              </p>
            </div>
          </article>
          <article className="mb-8">
            <h3 className="text-3xl font-bold text-sky-600 underline mb-4">
              Información que Recopilamos
            </h3>
            <div className="ml-4 text-lg leading-relaxed">
              <p>Recopilamos y procesamos los siguientes datos personales:</p>
              <ul className="list-disc list-inside mt-2">
                <li>
                  <strong>Información de contacto:</strong> nombre, dirección de
                  correo electrónico.
                </li>
                <li>
                  <strong>Datos de cuenta:</strong> nombre de usuario,
                  contraseña encriptada.
                </li>
                <li>
                  <strong>Información de pago:</strong> número de pedido.
                </li>
                <li>
                  <strong>Datos técnicos:</strong> dirección IP, tipo y versión
                  del navegador, configuración de zona horaria, tipos y
                  versiones de complementos del navegador, sistema operativo y
                  plataforma.
                </li>
                <li>
                  <strong>Datos de uso:</strong> información sobre cómo usa
                  nuestro sitio web, productos y servicios.
                </li>
              </ul>
            </div>
          </article>
          <article className="mb-8">
            <h3 className="text-3xl font-bold text-sky-600 underline mb-4">
              Uso de la Información
            </h3>
            <div className="ml-4 text-lg leading-relaxed">
              <p>Utilizamos su información personal para:</p>
              <ul className="list-disc list-inside mt-2">
                <li>Proveer y administrar nuestros servicios y productos.</li>
                <li>
                  Procesar sus transacciones y enviarle confirmaciones de
                  compra.
                </li>
                <li>
                  Mejorar nuestro sitio web y personalizar su experiencia.
                </li>
                <li>
                  Cumplir con nuestras obligaciones legales y resolver cualquier
                  disputa que pueda surgir.
                </li>
              </ul>
            </div>
          </article>
          <article className="mb-8">
            <h3 className="text-3xl font-bold text-sky-600 underline mb-4">
              Compartir Información
            </h3>
            <div className="ml-4 text-lg leading-relaxed">
              <p>
                No compartimos su información personal con terceros, excepto en
                las siguientes circunstancias:
              </p>
              <ul className="list-disc list-inside mt-2">
                <li>
                  Con proveedores de servicios externos que nos ayudan a operar
                  nuestro sitio web, realizar nuestro negocio o prestar
                  servicios a nuestros clientes, siempre y cuando dichos
                  terceros se comprometan a mantener esta información
                  confidencial.
                </li>
                <li>
                  Cuando sea necesario para cumplir con la ley, una orden
                  judicial o un proceso legal.
                </li>
                <li>
                  Para proteger nuestros derechos, propiedad o seguridad y los
                  de nuestros usuarios u otros.
                </li>
              </ul>
            </div>
          </article>
          <article className="mb-8">
            <h3 className="text-3xl font-bold text-sky-600 underline mb-4">
              Seguridad de la Información
            </h3>
            <div className="ml-4 text-lg leading-relaxed">
              <p>
                Implementamos medidas de seguridad adecuadas para proteger su
                información personal contra acceso no autorizado, alteración,
                divulgación o destrucción. Sin embargo, ninguna transmisión de
                datos por Internet o sistema de almacenamiento puede garantizar
                ser 100% seguro.
              </p>
            </div>
          </article>
          <article className="mb-8">
            <h3 className="text-3xl font-bold text-sky-600 underline mb-4">
              Sus Derechos
            </h3>
            <div className="ml-4 text-lg leading-relaxed">
              <p>
                Dependiendo de su jurisdicción, usted puede tener derechos
                legales sobre su información personal, como el derecho a
                acceder, corregir o eliminar los datos que tenemos sobre usted.
                Para ejercer estos derechos, por favor contáctenos a través de
                los medios indicados en la sección de Contacto.
              </p>
            </div>
          </article>
          <article className="mb-8">
            <h3 className="text-3xl font-bold text-sky-600 underline mb-4">
              Cambios en esta Política de Privacidad
            </h3>
            <div className="ml-4 text-lg leading-relaxed">
              <p>
                Nos reservamos el derecho a actualizar esta política de
                privacidad en cualquier momento. Le notificaremos cualquier
                cambio publicando la nueva política en nuestro sitio web. Le
                recomendamos revisar periódicamente esta página para estar al
                tanto de cualquier cambio.
              </p>
            </div>
          </article>
          <article className="mb-8">
            <h3 className="text-3xl font-bold text-sky-600 underline mb-4">
              Contacto
            </h3>
            <div className="ml-4 text-lg leading-relaxed">
              <p>
                Para preguntas o comentarios sobre esta política de privacidad,
                puede contactarnos en:
              </p>
              <ul className="list-disc list-inside mt-2">
                <li>
                  <strong>Correo electrónico:</strong>{' '}
                  quarastorecontact@gmail.com
                </li>
                <li>
                  <strong>Dirección:</strong> Tienda Digital
                </li>
              </ul>
            </div>
          </article>
        </section>
      </div>
    </>
  );
};
