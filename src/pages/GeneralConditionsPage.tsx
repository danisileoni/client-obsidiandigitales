import { Navbar } from '@/components/common/Navbar';

export const GeneralConditionsPage = () => {
  return (
    <>
      <head>
        <title>Condiciones Generales | QuaraStore</title>
        <meta
          name="description"
          content="Lea las condiciones generales de uso de nuestro sitio web y servicios en QuaraStore. Información sobre registro, compras, entregas, reembolsos y más."
        />
      </head>
      <Navbar />
      <div className="flex flex-col w-full items-center bg-gray-100 min-h-screen py-10">
        <h1 className="text-5xl text-center mt-8 font-bold text-sky-600 underline mb-10">
          Condiciones Generales
        </h1>
        <section className="w-full max-w-4xl rounded-md shadow-lg p-8 bg-white">
          <article className="mb-8">
            <h3 className="text-3xl font-bold text-sky-600 underline mb-4">
              Introducción
            </h3>
            <div className="ml-4 text-lg leading-relaxed">
              <p>
                Estas condiciones generales rigen el uso de nuestro sitio web y
                los servicios que ofrecemos. Al acceder o utilizar nuestro sitio
                web, usted acepta cumplir con estas condiciones generales.
              </p>
            </div>
          </article>
          <article className="mb-8">
            <h3 className="text-3xl font-bold text-sky-600 underline mb-4">
              Registro y Cuenta
            </h3>
            <div className="ml-4 text-lg leading-relaxed">
              <p>
                Para acceder a algunos servicios, es necesario registrarse y
                crear una cuenta. Usted es responsable de mantener la
                confidencialidad de su información de cuenta y contraseña, y
                acepta notificar de inmediato cualquier uso no autorizado de su
                cuenta.
              </p>
            </div>
          </article>
          <article className="mb-8">
            <h3 className="text-3xl font-bold text-sky-600 underline mb-4">
              Compras y Pagos
            </h3>
            <div className="ml-4 text-lg leading-relaxed">
              <p>
                Todas las compras realizadas a través de nuestro sitio web están
                sujetas a disponibilidad y confirmación del precio. Nos
                reservamos el derecho de rechazar cualquier pedido. Los precios
                pueden cambiar sin previo aviso.
              </p>
            </div>
          </article>
          <article className="mb-8">
            <h3 className="text-3xl font-bold text-sky-600 underline mb-4">
              Entrega de Productos
            </h3>
            <div className="ml-4 text-lg leading-relaxed">
              <p>
                Los juegos digitales comprados serán entregados mediante el
                correo electrónico proporcionado al registrarse en la página
                web. Se les enviarán el correo, la contraseña, y el instructivo
                de instalación automáticamente, una vez realizado el pago. En
                caso de que no esté disponible de inmediato, la entrega podría
                demorar hasta 24 horas.
              </p>
              <p className="mt-2">
                Para recibir el código de inicio de sesión, por favor
                contáctenos a través de WhatsApp.
              </p>
            </div>
          </article>
          <article className="mb-8">
            <h3 className="text-3xl font-bold text-sky-600 underline mb-4">
              Políticas de Reembolso
            </h3>
            <div className="ml-4 text-lg leading-relaxed">
              <p>
                Nuestros productos siempre incluyen garantía, siempre y cuando
                se respeten las condiciones de uso brindadas al momento de la
                compra. Nuestra garantía es generalmente para siempre, pero es
                importante aclarar que no se aplicará si el servicio adquirido
                presenta problemas en el futuro, ya que eso sería un error ajeno
                a nuestro sistema. Por eso, aclaramos esta situación de
                antemano.
              </p>
              <p className="mt-2">
                Si nuestros productos presentan algún tipo de
                falla/inconveniente una vez entregados, tenemos un plazo de 72
                horas para solucionarlo. En caso de no poder solucionar el
                problema, procederemos a reembolsar el 100% del valor del
                producto.
              </p>
            </div>
          </article>
          <article className="mb-8">
            <h3 className="text-3xl font-bold text-sky-600 underline mb-4">
              Propiedad Intelectual
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
              Uso Aceptable
            </h3>
            <div className="ml-4 text-lg leading-relaxed">
              <p>
                Usted se compromete a no utilizar nuestro sitio web para ningún
                propósito ilegal o prohibido por estas condiciones. No puede
                intentar obtener acceso no autorizado a nuestro sistema o
                participar en cualquier actividad que interfiera con el
                funcionamiento del sitio web.
              </p>
            </div>
          </article>
          <article className="mb-8">
            <h3 className="text-3xl font-bold text-sky-600 underline mb-4">
              Limitación de Responsabilidad
            </h3>
            <div className="ml-4 text-lg leading-relaxed">
              <p>
                QuaraStore no será responsable de ningún daño directo,
                indirecto, incidental, especial o consecuente que resulte del
                uso o la imposibilidad de uso de nuestros servicios.
              </p>
            </div>
          </article>
          <article className="mb-8">
            <h3 className="text-3xl font-bold text-sky-600 underline mb-4">
              Modificaciones de las Condiciones
            </h3>
            <div className="ml-4 text-lg leading-relaxed">
              <p>
                Podemos modificar estas condiciones generales en cualquier
                momento. Las modificaciones serán efectivas cuando se publiquen
                en nuestro sitio web. Su uso continuado del sitio web después de
                la publicación de cualquier cambio constituye su aceptación de
                dichos cambios.
              </p>
            </div>
          </article>
          <article className="mb-8">
            <h3 className="text-3xl font-bold text-sky-600 underline mb-4">
              Baneo en su cuenta PlayStation
            </h3>
            <div className="ml-4 text-lg leading-relaxed">
              <p>
                En caso de que su cuenta de PlayStation sea baneada, no nos
                hacemos cargo ya que es problema de la empresa misma.
              </p>
            </div>
          </article>
        </section>
      </div>
    </>
  );
};
