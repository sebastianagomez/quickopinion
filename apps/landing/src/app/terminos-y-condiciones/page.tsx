import { Header } from '@/components/Header';
import { Footer } from '@/components/Footer';

export const metadata = {
  title: 'Términos y Condiciones | QuickOpinion',
  description: 'Términos y condiciones de uso de QuickOpinion',
};

export default function TerminosPage() {
  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="flex-1 pt-24 pb-16 px-4 bg-gray-50">
        <div className="max-w-4xl mx-auto">
          <div className="bg-white rounded-2xl shadow-lg p-8 md:p-12">
            <h1 className="text-3xl md:text-4xl font-bold text-dark mb-8">
              Términos y Condiciones
            </h1>

            <div className="prose prose-gray max-w-none space-y-6 text-gray-700 leading-relaxed">
              <section>
                <h2 className="text-2xl font-bold text-dark mb-4">
                  1. Aceptación de los Términos
                </h2>
                <p>
                  Al acceder y utilizar QuickOpinion, aceptás estar sujeto a
                  estos términos y condiciones de uso. Si no estás de acuerdo
                  con alguno de estos términos, no deberías utilizar nuestro
                  servicio.
                </p>
              </section>

              <section>
                <h2 className="text-2xl font-bold text-dark mb-4">
                  2. Descripción del Servicio
                </h2>
                <p>
                  QuickOpinion es una plataforma que permite a negocios
                  gastronómicos crear trivias interactivas para capturar datos
                  de clientes, fidelizar y ofrecer cupones de descuento.
                </p>
              </section>

              <section>
                <h2 className="text-2xl font-bold text-dark mb-4">
                  3. Protección de Datos
                </h2>
                <p>
                  Nos comprometemos a proteger la privacidad y seguridad de los
                  datos de todos los usuarios. Los datos personales recopilados
                  se utilizan exclusivamente para los fines informados al
                  momento de la recolección.
                </p>
                <p className="mt-2">
                  Los usuarios tienen derecho a acceder, rectificar y eliminar
                  sus datos personales en cualquier momento contactándonos
                  directamente.
                </p>
              </section>

              <section>
                <h2 className="text-2xl font-bold text-dark mb-4">
                  4. Uso del Servicio
                </h2>
                <p>
                  Los clientes de QuickOpinion se comprometen a utilizar el
                  servicio de manera responsable, respetando las leyes
                  aplicables y los derechos de los usuarios finales.
                </p>
              </section>

              <section>
                <h2 className="text-2xl font-bold text-dark mb-4">
                  5. Propiedad Intelectual
                </h2>
                <p>
                  Todo el contenido, diseño y funcionalidades de QuickOpinion
                  son propiedad exclusiva de la empresa y están protegidos por
                  las leyes de propiedad intelectual.
                </p>
              </section>

              <section>
                <h2 className="text-2xl font-bold text-dark mb-4">
                  6. Modificaciones
                </h2>
                <p>
                  Nos reservamos el derecho de modificar estos términos en
                  cualquier momento. Las modificaciones entrarán en vigencia
                  inmediatamente después de su publicación en esta página.
                </p>
              </section>

              <section>
                <h2 className="text-2xl font-bold text-dark mb-4">
                  7. Contacto
                </h2>
                <p>
                  Para cualquier consulta sobre estos términos, podés
                  contactarnos a través del formulario en nuestra página
                  principal.
                </p>
              </section>

              <p className="text-sm text-gray-500 mt-8">
                Última actualización: {new Date().toLocaleDateString('es-AR')}
              </p>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
}
