import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";

const Privacidad = () => {
  return (
    <div className="min-h-screen bg-background">
      <Navigation />
      
      <section className="pt-32 pb-20">
        <div className="container-custom max-w-4xl">
          <h1 className="text-5xl font-serif font-bold mb-8">Política de Privacidad</h1>
          
          <div className="prose prose-lg max-w-none space-y-8">
            <section>
              <h2 className="text-3xl font-serif font-semibold mb-4">1. Responsable del tratamiento</h2>
              <p className="text-muted-foreground leading-relaxed">
                Navarro Asesoramiento Legal S.L., con NIF B-12345678 y domicilio en Calle Serrano 123, 5º, 
                28006 Madrid, es el responsable del tratamiento de los datos personales que nos proporciones.
              </p>
            </section>

            <section>
              <h2 className="text-3xl font-serif font-semibold mb-4">2. Finalidad del tratamiento</h2>
              <p className="text-muted-foreground leading-relaxed mb-4">
                Tus datos personales serán tratados con las siguientes finalidades:
              </p>
              <ul className="list-disc pl-6 text-muted-foreground space-y-2">
                <li>Gestión de consultas y solicitudes de información</li>
                <li>Prestación de servicios legales solicitados</li>
                <li>Envío de comunicaciones comerciales (con tu consentimiento)</li>
                <li>Cumplimiento de obligaciones legales</li>
              </ul>
            </section>

            <section>
              <h2 className="text-3xl font-serif font-semibold mb-4">3. Legitimación</h2>
              <p className="text-muted-foreground leading-relaxed">
                La base legal para el tratamiento de tus datos es la ejecución de un contrato, el 
                consentimiento del interesado y el cumplimiento de obligaciones legales.
              </p>
            </section>

            <section>
              <h2 className="text-3xl font-serif font-semibold mb-4">4. Conservación de datos</h2>
              <p className="text-muted-foreground leading-relaxed">
                Los datos personales se conservarán mientras sean necesarios para las finalidades 
                descritas y, en todo caso, durante los plazos legalmente establecidos.
              </p>
            </section>

            <section>
              <h2 className="text-3xl font-serif font-semibold mb-4">5. Derechos del interesado</h2>
              <p className="text-muted-foreground leading-relaxed mb-4">
                Puedes ejercer los siguientes derechos:
              </p>
              <ul className="list-disc pl-6 text-muted-foreground space-y-2">
                <li>Acceso a tus datos personales</li>
                <li>Rectificación de datos inexactos</li>
                <li>Supresión de los datos</li>
                <li>Limitación del tratamiento</li>
                <li>Portabilidad de los datos</li>
                <li>Oposición al tratamiento</li>
              </ul>
              <p className="text-muted-foreground leading-relaxed mt-4">
                Para ejercer estos derechos, puedes contactarnos en info@navarrolegal.es
              </p>
            </section>

            <section>
              <h2 className="text-3xl font-serif font-semibold mb-4">6. Seguridad</h2>
              <p className="text-muted-foreground leading-relaxed">
                Hemos implementado las medidas técnicas y organizativas necesarias para garantizar la 
                seguridad de tus datos personales y evitar su alteración, pérdida o acceso no autorizado.
              </p>
            </section>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default Privacidad;
