import { SectionHeading } from "@/components/ui/SectionHeading";
import { site } from "@/data/site";

const LAST_UPDATED = "18 de agosto de 2026";

const SECTIONS = [
  { id: "responsable", title: "Responsable del tratamiento de la información" },
  { id: "informacion", title: "Información que podemos recopilar" },
  { id: "finalidad", title: "Finalidad del tratamiento" },
  { id: "cookies", title: "Cookies y tecnologías similares" },
  { id: "comparticion", title: "Compartición de información" },
  { id: "terceros", title: "Servicios de terceros" },
  { id: "seguridad", title: "Seguridad de la información" },
  { id: "conservacion", title: "Conservación de los datos" },
  { id: "derechos", title: "Derechos de los usuarios" },
  { id: "menores", title: "Información de menores de edad" },
  { id: "comunicaciones", title: "Comunicaciones" },
  { id: "transferencias", title: "Transferencias internacionales" },
  { id: "cambios", title: "Cambios en esta Política de Privacidad" },
  { id: "legislacion", title: "Legislación aplicable" },
  { id: "contacto", title: "Contacto" },
] as const;

type SectionId = (typeof SECTIONS)[number]["id"];

function Section({
  id,
  children,
}: {
  id: SectionId;
  children: React.ReactNode;
}) {
  const index = SECTIONS.findIndex((section) => section.id === id);
  const { title } = SECTIONS[index];

  return (
    <section
      id={id}
      aria-labelledby={`${id}-title`}
      className="scroll-mt-24 border-t border-slate-200 pt-8 dark:border-slate-800"
    >
      <h2
        id={`${id}-title`}
        className="mb-4 flex items-baseline gap-3 text-xl font-semibold tracking-tight text-slate-900 dark:text-white"
      >
        <span className="text-sm font-medium tabular-nums text-slate-400 dark:text-slate-500">
          {String(index + 1).padStart(2, "0")}
        </span>
        {title}
      </h2>
      <div className="space-y-4 text-slate-600 dark:text-slate-300">
        {children}
      </div>
    </section>
  );
}

function Subheading({ children }: { children: React.ReactNode }) {
  return (
    <h3 className="pt-2 text-sm font-semibold uppercase tracking-wide text-slate-700 dark:text-slate-200">
      {children}
    </h3>
  );
}

function List({ items }: { items: string[] }) {
  return (
    <ul className="list-disc space-y-1.5 pl-5 marker:text-slate-400 dark:marker:text-slate-600">
      {items.map((item) => (
        <li key={item}>{item}</li>
      ))}
    </ul>
  );
}

export function PrivacyPolicy() {
  return (
    <div className="mx-auto max-w-3xl px-6 py-16">
      <SectionHeading eyebrow="Legal" title="Política de Privacidad" />

      <p className="mt-2 text-sm text-slate-500 dark:text-slate-400">
        Última actualización: {LAST_UPDATED}
      </p>

      {/* Introducción */}
      <div className="mt-8 space-y-4 text-slate-600 dark:text-slate-300">
        <p>
          {site.company} es una marca independiente dedicada al desarrollo de
          software, aplicaciones web y móviles, soluciones digitales,
          herramientas tecnológicas y otros proyectos relacionados con la
          tecnología.
        </p>
        <p>
          La presente Política de Privacidad explica cómo {site.company} recopila,
          utiliza, almacena, protege y, cuando corresponde, comparte información
          personal de los usuarios, clientes y visitantes de sus productos y
          servicios.
        </p>
        <p>
          Al utilizar cualquiera de los sitios web, aplicaciones, plataformas,
          servicios o productos desarrollados o administrados por {site.company}, el
          usuario acepta las prácticas descritas en esta Política de Privacidad.
        </p>
      </div>

      {/* Índice */}
      <nav
        aria-label="Contenido de la política"
        className="mt-10 rounded-lg border border-slate-200 bg-slate-50 p-6 dark:border-slate-800 dark:bg-slate-900/50"
      >
        <h2 className="mb-3 text-sm font-semibold uppercase tracking-wide text-slate-700 dark:text-slate-200">
          Contenido
        </h2>
        <ol className="grid gap-x-8 gap-y-1.5 text-sm sm:grid-cols-2">
          {SECTIONS.map((section, index) => (
            <li key={section.id} className="flex gap-2">
              <span className="tabular-nums text-slate-400 dark:text-slate-500">
                {String(index + 1).padStart(2, "0")}
              </span>
              <a
                href={`#${section.id}`}
                className="text-slate-600 underline-offset-4 hover:text-slate-900 hover:underline dark:text-slate-300 dark:hover:text-white"
              >
                {section.title}
              </a>
            </li>
          ))}
        </ol>
      </nav>

      <div className="mt-12 space-y-12">
        <Section id="responsable">
          <p>
            {site.company} actúa como una marca independiente de desarrollo
            tecnológico. Dependiendo del proyecto, producto o servicio
            utilizado, {site.company} podrá actuar como responsable o encargado del
            tratamiento de los datos personales.
          </p>
          <p>
            Cuando un producto desarrollado por {site.company} sea utilizado por una
            empresa, institución u organización que determine sus propios fines
            para el tratamiento de datos, dicha entidad podrá ser responsable
            del tratamiento de la información de sus usuarios.
          </p>
        </Section>

        <Section id="informacion">
          <p>
            Dependiendo del producto o servicio utilizado, podemos recopilar
            diferentes tipos de información.
          </p>

          <Subheading>Información proporcionada por el usuario</Subheading>
          <List
            items={[
              "Nombre y apellidos.",
              "Dirección de correo electrónico.",
              "Número telefónico.",
              "Información de contacto.",
              "Nombre de usuario.",
              "Información necesaria para crear o administrar una cuenta.",
              "Información proporcionada mediante formularios, solicitudes de soporte o comunicaciones.",
              "Información relacionada con proyectos o servicios contratados.",
            ]}
          />

          <Subheading>Información recopilada automáticamente</Subheading>
          <List
            items={[
              "Dirección IP.",
              "Tipo de dispositivo.",
              "Sistema operativo.",
              "Tipo y versión del navegador.",
              "Información básica sobre el uso de nuestras aplicaciones o sitios web.",
              "Fecha y hora de acceso.",
              "Información técnica necesaria para garantizar el funcionamiento y la seguridad del servicio.",
              "Datos de diagnóstico y registros técnicos, cuando sean necesarios.",
            ]}
          />

          <p>
            {site.company} procurará recopilar únicamente la información necesaria
            para prestar adecuadamente el servicio correspondiente.
          </p>
        </Section>

        <Section id="finalidad">
          <p>La información recopilada podrá utilizarse para:</p>
          <List
            items={[
              "Crear y administrar cuentas de usuario.",
              "Proporcionar las funciones de nuestras aplicaciones, sitios web y servicios.",
              "Procesar solicitudes realizadas por los usuarios.",
              "Prestar soporte técnico.",
              "Mantener, mejorar y desarrollar nuestros productos tecnológicos.",
              "Detectar y prevenir errores, fraudes, abusos o actividades no autorizadas.",
              "Garantizar la seguridad de nuestros sistemas.",
              "Cumplir obligaciones legales aplicables.",
              "Comunicarnos con los usuarios respecto de sus cuentas, solicitudes, servicios o proyectos.",
              "Analizar de manera técnica y estadística el funcionamiento de nuestros productos.",
              "Desarrollar nuevas funcionalidades y mejorar la experiencia de usuario.",
            ]}
          />
          <p>
            {site.company} no utilizará los datos personales para finalidades
            incompatibles con aquellas para las cuales fueron recopilados, salvo
            que exista una base legal que permita dicho tratamiento.
          </p>
        </Section>

        <Section id="cookies">
          <p>
            Nuestros sitios web y aplicaciones pueden utilizar cookies,
            almacenamiento local y tecnologías similares para mantener sesiones,
            recordar determinadas preferencias, mejorar la seguridad, obtener
            estadísticas de uso y proporcionar funcionalidades necesarias para
            el funcionamiento del servicio.
          </p>
          <p>
            El usuario puede configurar su navegador para bloquear o eliminar
            determinadas cookies. Sin embargo, algunas funcionalidades podrían
            dejar de funcionar correctamente.
          </p>
          <p>
            Cuando un proyecto utilice servicios de terceros que empleen cookies
            o tecnologías similares, dicho tratamiento podrá estar sujeto
            también a las políticas de privacidad de esos terceros.
          </p>
        </Section>

        <Section id="comparticion">
          <p>
            {site.company} no vende ni comercializa información personal de sus
            usuarios. La información podrá ser compartida únicamente cuando
            resulte necesario para prestar el servicio, cumplir una obligación
            legal, proteger los sistemas o defender derechos legítimos.
          </p>
          <p>
            Esto puede incluir proveedores tecnológicos que presten servicios
            de:
          </p>
          <List
            items={[
              "Alojamiento y almacenamiento.",
              "Bases de datos.",
              "Servicios de correo electrónico.",
              "Autenticación.",
              "Analítica y monitoreo.",
              "Procesamiento de pagos, cuando corresponda.",
              "Infraestructura tecnológica.",
              "Seguridad informática.",
              "Soporte y mantenimiento.",
            ]}
          />
          <p>
            Estos proveedores únicamente deberán acceder a la información
            necesaria para prestar el servicio correspondiente y estarán sujetos
            a las condiciones aplicables a dicho tratamiento.
          </p>
        </Section>

        <Section id="terceros">
          <p>
            Algunos productos de {site.company} pueden utilizar servicios
            proporcionados por terceros, como proveedores de alojamiento,
            plataformas de autenticación, servicios de mapas, analítica,
            almacenamiento, notificaciones, pagos u otras herramientas
            tecnológicas.
          </p>
          <p>
            Cuando esto ocurra, dichos terceros podrán procesar determinada
            información de acuerdo con sus propias políticas y condiciones de
            privacidad. La utilización de servicios externos estará determinada
            por las características particulares de cada proyecto.
          </p>
        </Section>

        <Section id="seguridad">
          <p>
            {site.company} implementará medidas técnicas y organizativas razonables
            destinadas a proteger la información contra acceso no autorizado,
            pérdida, alteración, divulgación o destrucción.
          </p>
          <p>
            Estas medidas pueden incluir controles de acceso, autenticación,
            cifrado, almacenamiento seguro, monitoreo y procedimientos de
            seguridad, dependiendo de las características y necesidades de cada
            proyecto.
          </p>
          <p>
            Sin embargo, ningún sistema conectado a Internet puede garantizar
            una seguridad absoluta. Por esa razón, {site.company} no puede
            garantizar que la información estará completamente libre de riesgos
            de seguridad.
          </p>
        </Section>

        <Section id="conservacion">
          <p>
            Los datos personales serán conservados durante el tiempo necesario
            para cumplir las finalidades para las cuales fueron recopilados,
            prestar el servicio correspondiente, mantener registros técnicos o
            cumplir obligaciones legales.
          </p>
          <p>
            Cuando la información deje de ser necesaria, podrá ser eliminada,
            anonimizada o almacenada de forma segura cuando exista una
            obligación legal o legítima para conservarla.
          </p>
          <p>
            Los períodos de conservación pueden variar según el tipo de
            información y el proyecto correspondiente.
          </p>
        </Section>

        <Section id="derechos">
          <p>
            De acuerdo con la legislación aplicable, los usuarios podrán ejercer
            determinados derechos sobre sus datos personales, incluyendo:
          </p>
          <List
            items={[
              "Conocer qué información personal es tratada.",
              "Solicitar la actualización o corrección de información incorrecta.",
              "Solicitar la eliminación de información cuando legalmente corresponda.",
              "Solicitar información sobre el uso de sus datos.",
              "Revocar determinadas autorizaciones, cuando sea legalmente posible.",
              "Presentar consultas, solicitudes o reclamaciones relacionadas con el tratamiento de sus datos.",
            ]}
          />
          <p>
            Las solicitudes podrán estar sujetas a mecanismos razonables de
            verificación de identidad para evitar que terceros accedan
            indebidamente a información personal.
          </p>
        </Section>

        <Section id="menores">
          <p>
            Los productos y servicios de {site.company} no están destinados, salvo
            indicación expresa en contrario, a recopilar deliberadamente
            información personal de menores de edad sin las autorizaciones
            correspondientes.
          </p>
          <p>
            Cuando un proyecto esté dirigido a niños, niñas o adolescentes, se
            podrán establecer condiciones y mecanismos adicionales de protección
            de datos de acuerdo con la legislación aplicable.
          </p>
          <p>
            Si se detecta que se ha recopilado información personal de un menor
            de manera indebida, {site.company} podrá tomar medidas razonables para
            eliminar dicha información.
          </p>
        </Section>

        <Section id="comunicaciones">
          <p>
            {site.company} podrá enviar comunicaciones relacionadas directamente con
            los servicios utilizados por el usuario, incluyendo mensajes sobre
            funcionamiento, seguridad, mantenimiento, cambios importantes,
            solicitudes de soporte o modificaciones de los servicios.
          </p>
          <p>
            Las comunicaciones comerciales, cuando existan, estarán sujetas a
            los mecanismos de autorización y cancelación correspondientes.
          </p>
        </Section>

        <Section id="transferencias">
          <p>
            Algunos proveedores tecnológicos utilizados por {site.company} pueden
            almacenar o procesar información en servidores ubicados fuera del
            país del usuario.
          </p>
          <p>
            Cuando corresponda, {site.company} procurará adoptar las medidas
            necesarias para que dichas transferencias se realicen de conformidad
            con la legislación aplicable y utilizando proveedores que implementen
            medidas adecuadas de protección de la información.
          </p>
        </Section>

        <Section id="cambios">
          <p>
            {site.company} podrá modificar esta Política de Privacidad cuando sea
            necesario debido a cambios en sus servicios, tecnologías utilizadas,
            requisitos legales o prácticas de tratamiento de información.
          </p>
          <p>
            Cuando se realicen modificaciones relevantes, se podrá actualizar la
            fecha de última actualización y, cuando resulte apropiado, informar
            a los usuarios mediante los canales disponibles.
          </p>
          <p>
            El uso continuado de los servicios después de la publicación de una
            modificación podrá implicar la aceptación de la política
            actualizada, en los casos permitidos por la legislación aplicable.
          </p>
        </Section>

        <Section id="legislacion">
          <p>
            Esta Política de Privacidad se interpretará de acuerdo con la
            legislación aplicable al tratamiento de datos personales y, cuando
            corresponda, con las normas colombianas relacionadas con la
            protección de datos personales, incluyendo la{" "}
            <strong className="font-semibold text-slate-900 dark:text-white">
              Ley 1581 de 2012
            </strong>
            , sus normas reglamentarias y las disposiciones que las modifiquen o
            sustituyan.
          </p>
          <p>
            La aplicación de determinadas disposiciones podrá variar dependiendo
            del país donde se encuentre el usuario y de la naturaleza del
            servicio utilizado.
          </p>
        </Section>

        <Section id="contacto">
          <p>
            Para realizar consultas relacionadas con esta Política de
            Privacidad, solicitar información sobre el tratamiento de datos
            personales o ejercer los derechos que correspondan, el usuario podrá
            comunicarse con {site.name} mediante los canales oficiales
            publicados en sus sitios web o aplicaciones.
          </p>

          <div className="rounded-lg border border-slate-200 bg-slate-50 p-6 dark:border-slate-800 dark:bg-slate-900/50">
            <p className="font-semibold text-slate-900 dark:text-white">
              {site.name}
            </p>
            <p className="mt-1 text-sm">
              Marca independiente de desarrollo de software, aplicaciones y
              soluciones tecnológicas.
            </p>
            <dl className="mt-4 space-y-1 text-sm">
              <div className="flex gap-2">
                <dt className="text-slate-500 dark:text-slate-400">Correo:</dt>
                <dd>
                  <a
                    href={`mailto:${site.email}`}
                    className="underline underline-offset-4 hover:text-slate-900 dark:hover:text-white"
                  >
                    {site.email}
                  </a>
                </dd>
              </div>
              {site.socials.map((social) => (
                <div key={social.url} className="flex gap-2">
                  <dt className="text-slate-500 dark:text-slate-400">
                    {social.label}:
                  </dt>
                  <dd>
                    <a
                      href={social.url}
                      className="underline underline-offset-4 hover:text-slate-900 dark:hover:text-white"
                    >
                      {social.url}
                    </a>
                  </dd>
                </div>
              ))}
            </dl>
          </div>
        </Section>
      </div>

      <p className="mt-12 border-t border-slate-200 pt-6 text-sm text-slate-500 dark:border-slate-800 dark:text-slate-400">
        Esta Política de Privacidad constituye una política general de{" "}
        {site.company}. Determinados productos, aplicaciones o proyectos pueden
        contar con condiciones de privacidad adicionales o específicas cuando la
        naturaleza del servicio lo requiera.
      </p>
    </div>
  );
}