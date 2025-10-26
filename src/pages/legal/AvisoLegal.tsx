import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";

const AvisoLegal = () => {
  return (
    <div className="min-h-screen bg-background">
      <Navigation />
      
      <section className="pt-32 pb-20">
        <div className="container-custom max-w-4xl">
          <h1 className="text-5xl font-serif font-bold mb-8">Aviso Legal</h1>
          
          <div className="prose prose-lg max-w-none space-y-8">
            <section>
              <h2 className="text-3xl font-serif font-semibold mb-4">1. Datos identificativos</h2>
              <p className="text-muted-foreground leading-relaxed">
                En cumplimiento del artículo 10 de la Ley 34/2002, de 11 de julio, de Servicios de la 
                Sociedad de la Información y Comercio Electrónico, se informa de los datos identificativos:
              </p>
              <ul className="list-disc pl-6 text-muted-foreground space-y-2">
                <li>Denominación social: Navarro Asesoramiento Legal S.L.</li>
                <li>NIF: B-12345678</li>
                <li>Domicilio social: Calle Serrano 123, 5º, 28006 Madrid</li>
                <li>Email: info@navarrolegal.es</li>
                <li>Teléfono: +34 900 000 000</li>
              </ul>
            </section>

            <section>
              <h2 className="text-3xl font-serif font-semibold mb-4">2. Objeto</h2>
              <p className="text-muted-foreground leading-relaxed">
                El presente aviso legal regula el uso del sitio web www.navarrolegal.es (en adelante, 
                el SITIO WEB), del que es titular Navarro Asesoramiento Legal S.L.
              </p>
            </section>

            <section>
              <h2 className="text-3xl font-serif font-semibold mb-4">3. Condiciones de uso</h2>
              <p className="text-muted-foreground leading-relaxed">
                El acceso y utilización del SITIO WEB atribuye la condición de usuario e implica la 
                aceptación plena de todas las condiciones incluidas en este aviso legal. El usuario se 
                compromete a hacer un uso correcto del SITIO WEB de conformidad con la ley.
              </p>
            </section>

            <section>
              <h2 className="text-3xl font-serif font-semibold mb-4">4. Propiedad intelectual e industrial</h2>
              <p className="text-muted-foreground leading-relaxed">
                Todos los contenidos del SITIO WEB, incluyendo textos, fotografías, gráficos, imágenes, 
                tecnología, software, links y demás contenidos audiovisuales o sonoros, así como su diseño 
                gráfico y códigos fuente, son propiedad intelectual de Navarro Asesoramiento Legal S.L.
              </p>
            </section>

            <section>
              <h2 className="text-3xl font-serif font-semibold mb-4">5. Responsabilidad</h2>
              <p className="text-muted-foreground leading-relaxed">
                Navarro Asesoramiento Legal S.L. no se hace responsable de la información y contenidos 
                almacenados en foros, redes sociales o cualesquiera otros medios que permitan a terceros 
                publicar contenidos de forma independiente en el SITIO WEB.
              </p>
            </section>

            <section>
              <h2 className="text-3xl font-serif font-semibold mb-4">6. Legislación aplicable</h2>
              <p className="text-muted-foreground leading-relaxed">
                Las presentes condiciones se regirán por la legislación española. Para la resolución de 
                cualquier controversia las partes se someten a los Juzgados y Tribunales de Madrid.
              </p>
            </section>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default AvisoLegal;
