import { Link } from "react-router-dom";
import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import MobileCTA from "@/components/MobileCTA";
import { Card } from "@/components/ui/card";
import { Shield, ArrowRight, CheckCircle2 } from "lucide-react";

const Fiscal = () => {
  const services = [
    "Planificación fiscal nacional e internacional",
    "Optimización de estructuras fiscales",
    "Reestructuraciones empresariales",
    "Operaciones de M&A desde perspectiva fiscal",
    "Régimen fiscal de grupos de sociedades",
    "Precios de transferencia",
    "Defensa ante inspecciones fiscales",
    "Procedimientos tributarios y recursos",
    "Fiscalidad de operaciones inmobiliarias",
    "Impuestos especiales y aduanas"
  ];

  return (
    <div className="min-h-screen bg-background">
      <Navigation />
      
      <section className="pt-32 pb-20 bg-gradient-to-br from-primary to-primary/90">
        <div className="container-custom text-primary-foreground animate-fade-in">
          <div className="flex items-center gap-4 mb-6">
            <Shield className="w-16 h-16" />
            <h1 className="text-5xl md:text-6xl font-serif font-bold">Derecho Fiscal</h1>
          </div>
          <p className="text-xl md:text-2xl text-primary-foreground/90 max-w-3xl">
            Planificación fiscal estratégica y optimización tributaria
          </p>
        </div>
      </section>

      <section className="section-spacing">
        <div className="container-custom">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            <div>
              <h2 className="text-4xl font-serif font-bold mb-6">Experiencia fiscal integral</h2>
              <p className="text-lg text-muted-foreground mb-6 leading-relaxed">
                En Navarro ofrecemos asesoramiento fiscal estratégico que va más allá del cumplimiento normativo. 
                Diseñamos estructuras fiscales eficientes que optimizan tu carga tributaria dentro del marco legal, 
                anticipando cambios legislativos y minimizando riesgos.
              </p>
              <p className="text-lg text-muted-foreground mb-8 leading-relaxed">
                Nuestro equipo cuenta con amplia experiencia en operaciones complejas, tanto a nivel nacional 
                como internacional, y en la defensa de los intereses de nuestros clientes ante la Administración Tributaria.
              </p>
              <Link 
                to="/contacto"
                className="inline-flex items-center gap-2 bg-accent hover:bg-accent/90 text-foreground px-8 py-4 rounded-full font-medium text-lg transition-all"
              >
                Consulta tu caso
                <ArrowRight size={20} />
              </Link>
            </div>

            <Card className="p-8 border-border">
              <h3 className="text-2xl font-serif font-semibold mb-6">Áreas de especialización</h3>
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
          <h2 className="text-4xl font-serif font-bold text-center mb-16">Nuestra metodología</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <Card className="p-8 border-border text-center">
              <div className="text-5xl font-serif font-bold text-accent mb-4">01</div>
              <h3 className="text-xl font-semibold mb-3">Análisis exhaustivo</h3>
              <p className="text-muted-foreground">
                Estudiamos tu situación fiscal actual y detectamos oportunidades de optimización
              </p>
            </Card>
            <Card className="p-8 border-border text-center">
              <div className="text-5xl font-serif font-bold text-accent mb-4">02</div>
              <h3 className="text-xl font-semibold mb-3">Estrategia personalizada</h3>
              <p className="text-muted-foreground">
                Diseñamos una estrategia fiscal ajustada a tus objetivos empresariales
              </p>
            </Card>
            <Card className="p-8 border-border text-center">
              <div className="text-5xl font-serif font-bold text-accent mb-4">03</div>
              <h3 className="text-xl font-semibold mb-3">Implementación y seguimiento</h3>
              <p className="text-muted-foreground">
                Ejecutamos la estrategia y realizamos seguimiento continuo de cambios normativos
              </p>
            </Card>
          </div>
        </div>
      </section>

      <Footer />
      <MobileCTA />
    </div>
  );
};

export default Fiscal;
