import { Link } from "react-router-dom";
import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import MobileCTA from "@/components/MobileCTA";
import { Card } from "@/components/ui/card";
import { Building2, ArrowRight, CheckCircle2 } from "lucide-react";

const Mercantil = () => {
  const services = [
    "Constitución y modificación de sociedades",
    "Fusiones, escisiones y transformaciones",
    "Operaciones de reestructuración empresarial",
    "Redacción y negociación de contratos mercantiles",
    "Pactos de socios y acuerdos parasociales",
    "Gobierno corporativo y compliance",
    "Financiación empresarial y operaciones de capital",
    "Asesoramiento en juntas y consejos de administración",
    "Propiedad industrial e intelectual",
    "Derecho de la competencia y distribución comercial"
  ];

  return (
    <div className="min-h-screen bg-background">
      <Navigation />
      
      <section className="pt-32 pb-20 bg-gradient-to-br from-primary to-primary/90">
        <div className="container-custom text-primary-foreground animate-fade-in">
          <div className="flex items-center gap-4 mb-6">
            <Building2 className="w-16 h-16" />
            <h1 className="text-5xl md:text-6xl font-serif font-bold">Derecho Mercantil</h1>
          </div>
          <p className="text-xl md:text-2xl text-primary-foreground/90 max-w-3xl">
            Asesoramiento societario integral y operaciones corporativas
          </p>
        </div>
      </section>

      <section className="section-spacing">
        <div className="container-custom">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            <div>
              <h2 className="text-4xl font-serif font-bold mb-6">Tu partner corporativo de confianza</h2>
              <p className="text-lg text-muted-foreground mb-6 leading-relaxed">
                Desde la constitución de tu empresa hasta las operaciones más complejas de reestructuración, 
                en Navarro te acompañamos en cada etapa del ciclo de vida corporativo.
              </p>
              <p className="text-lg text-muted-foreground mb-8 leading-relaxed">
                Nuestro enfoque combina rigor legal con pragmatismo empresarial, asegurando soluciones 
                que no solo cumplan con la normativa, sino que impulsen tus objetivos de negocio.
              </p>
              <Link 
                to="/contacto"
                className="inline-flex items-center gap-2 bg-accent hover:bg-accent/90 text-foreground px-8 py-4 rounded-full font-medium text-lg transition-all"
              >
                Agenda una consulta
                <ArrowRight size={20} />
              </Link>
            </div>

            <Card className="p-8 border-border">
              <h3 className="text-2xl font-serif font-semibold mb-6">Servicios especializados</h3>
              <ul className="space-y-3">
                {services.map((service, index) => (
                  <li key={index} className="flex items-start gap-3">
                    <CheckCircle2 className="w-5 h-5 text-accent mt-0.5 flex-shrink-0" />
                    <span className="text-muted-foreground">{service}</span>
                  </li>
                ))}
              </ul>
            </Card>
          </div>
        </div>
      </section>

      <section className="section-spacing bg-secondary/30">
        <div className="container-custom">
          <h2 className="text-4xl font-serif font-bold text-center mb-16">Casos de éxito</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <Card className="p-8 border-border">
              <h3 className="text-xl font-semibold mb-3">Reestructuración de grupo familiar</h3>
              <p className="text-muted-foreground mb-4">
                Diseño e implementación de una estructura de holding para optimizar la gobernanza 
                y fiscalidad de un grupo familiar con 8 sociedades operativas.
              </p>
              <span className="text-sm text-accent font-medium">Sector: Retail</span>
            </Card>
            <Card className="p-8 border-border">
              <h3 className="text-xl font-semibold mb-3">Entrada de socio inversor</h3>
              <p className="text-muted-foreground mb-4">
                Negociación y estructuración de la entrada de un fondo de private equity en una 
                empresa tecnológica, incluyendo pacto de socios y governance completo.
              </p>
              <span className="text-sm text-accent font-medium">Sector: Tecnología</span>
            </Card>
          </div>
        </div>
      </section>

      <Footer />
      <MobileCTA />
    </div>
  );
};

export default Mercantil;
