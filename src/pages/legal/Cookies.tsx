import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";

const Cookies = () => {
  return (
    <div className="min-h-screen bg-background">
      <Navigation />
      
      <section className="pt-32 pb-20">
        <div className="container-custom max-w-4xl">
          <h1 className="text-5xl font-serif font-bold mb-8">Política de Cookies</h1>
          
          <div className="prose prose-lg max-w-none space-y-8">
            <section>
              <h2 className="text-3xl font-serif font-semibold mb-4">1. ¿Qué son las cookies?</h2>
              <p className="text-muted-foreground leading-relaxed">
                Las cookies son pequeños archivos de texto que se almacenan en tu dispositivo cuando 
                visitas un sitio web. Permiten que el sitio web recuerde tus acciones y preferencias 
                durante un período de tiempo.
              </p>
            </section>

            <section>
              <h2 className="text-3xl font-serif font-semibold mb-4">2. Tipos de cookies que utilizamos</h2>
              
              <h3 className="text-xl font-semibold mt-6 mb-3">Cookies técnicas (necesarias)</h3>
              <p className="text-muted-foreground leading-relaxed">
                Son imprescindibles para el funcionamiento del sitio web y no pueden desactivarse. 
                Generalmente se establecen en respuesta a acciones realizadas por ti.
              </p>

              <h3 className="text-xl font-semibold mt-6 mb-3">Cookies analíticas</h3>
              <p className="text-muted-foreground leading-relaxed">
                Nos permiten contar las visitas y fuentes de tráfico para medir y mejorar el rendimiento 
                de nuestro sitio web. Nos ayudan a saber qué páginas son las más populares.
              </p>

              <h3 className="text-xl font-semibold mt-6 mb-3">Cookies de funcionalidad</h3>
              <p className="text-muted-foreground leading-relaxed">
                Permiten que el sitio web ofrezca una mejor funcionalidad y personalización, como 
                recordar tus preferencias de idioma o región.
              </p>
            </section>

            <section>
              <h2 className="text-3xl font-serif font-semibold mb-4">3. Cookies de terceros</h2>
              <p className="text-muted-foreground leading-relaxed mb-4">
                Utilizamos servicios de terceros que pueden establecer cookies:
              </p>
              <ul className="list-disc pl-6 text-muted-foreground space-y-2">
                <li>Google Analytics: Para análisis de tráfico web</li>
                <li>Redes sociales: Si compartes contenido en redes sociales</li>
              </ul>
            </section>

            <section>
              <h2 className="text-3xl font-serif font-semibold mb-4">4. Gestión de cookies</h2>
              <p className="text-muted-foreground leading-relaxed mb-4">
                Puedes controlar y/o eliminar las cookies según desees. Puedes eliminar todas las 
                cookies que ya están en tu dispositivo y configurar la mayoría de los navegadores 
                para que no se instalen.
              </p>
              <p className="text-muted-foreground leading-relaxed">
                Sin embargo, si haces esto, es posible que tengas que ajustar manualmente algunas 
                preferencias cada vez que visites el sitio web.
              </p>
            </section>

            <section>
              <h2 className="text-3xl font-serif font-semibold mb-4">5. Más información</h2>
              <p className="text-muted-foreground leading-relaxed">
                Si tienes dudas sobre nuestra política de cookies, puedes contactarnos en 
                info@navarrolegal.es
              </p>
            </section>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default Cookies;
