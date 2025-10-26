import { Link } from "react-router-dom";
import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import MobileCTA from "@/components/MobileCTA";
import { Card } from "@/components/ui/card";
import { TrendingUp, ArrowRight, CheckCircle2 } from "lucide-react";

const MA = () => {
  const services = [
    "Due diligence legal y fiscal completo",
    "Valoración de empresas y negocios",
    "Estructuración de operaciones",
    "Negociación de términos y condiciones",
    "Redacción de documentación contractual",
    "Coordinación con asesores financieros",
    "Gestión de autorizaciones regulatorias",
    "Planes de integración post-cierre",
    "Operaciones de MBO/MBI",
    "Spin-offs y carve-outs"
  ];

  return (
    <div className="min-h-screen bg-background">
      <Navigation />
      
      <section className="pt-32 pb-20 bg-gradient-to-br from-primary to-primary/90">
        <div className="container-custom text-primary-foreground animate-fade-in">
          <div className="flex items-center gap-4 mb-6">
            <TrendingUp className="w-16 h-16" />
            <h1 className="text-5xl md:text-6xl font-serif font-bold">Operaciones M&A</h1>
          </div>
          <p className="text-xl md:text-2xl text-primary-foreground/90 max-w-3xl">
            Acompañamiento integral en fusiones y adquisiciones
          </p>
        </div>
      </section>

      <section className="section-spacing">
        <div className="container-custom">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            <div>
              <h2 className="text-4xl font-serif font-bold mb-6">Expertos en operaciones complejas</h2>
              <p className="text-lg text-muted-foreground mb-6 leading-relaxed">
                Las operaciones de M&A son momentos críticos que requieren experiencia, precisión y visión estratégica. 
                En Navarro hemos participado en decenas de operaciones, tanto en el lado comprador como vendedor.
              </p>
              <p className="text-lg text-muted-foreground mb-8 leading-relaxed">
                Coordinamos equipos multidisciplinares para asegurar que cada aspecto legal, fiscal y financiero 
                está cubierto, maximizando el valor de la operación y minimizando riesgos.
              </p>
              <Link 
                to="/contacto"
                className="inline-flex items-center gap-2 bg-accent hover:bg-accent/90 text-foreground px-8 py-4 rounded-full font-medium text-lg transition-all"
              >
                Consulta tu operación
                <ArrowRight size={20} />
              </Link>
            </div>

            <Card className="p-8 border-border">
              <h3 className="text-2xl font-serif font-semibold mb-6">Servicios M&A</h3>
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
          <h2 className="text-4xl font-serif font-bold text-center mb-16">Proceso de M&A</h2>
          <div className="space-y-6 max-w-4xl mx-auto">
            {[
              { phase: "Fase 1", title: "Preparación", desc: "Definición de objetivos, valoración preliminar y estructuración inicial" },
              { phase: "Fase 2", title: "Due Diligence", desc: "Análisis exhaustivo legal, fiscal, laboral y financiero del target" },
              { phase: "Fase 3", title: "Negociación", desc: "Discusión de términos, precio, garantías y condiciones" },
              { phase: "Fase 4", title: "Documentación", desc: "Elaboración de contratos de compraventa y documentos complementarios" },
              { phase: "Fase 5", title: "Cierre", desc: "Cumplimiento de condiciones precedentes y formalización de la operación" },
              { phase: "Fase 6", title: "Post-cierre", desc: "Integración, seguimiento de garantías y gestión de earn-outs" }
            ].map((item, index) => (
              <div key={index} className="flex gap-6 items-start">
                <div className="flex-shrink-0 w-24 h-16 rounded-2xl bg-accent/10 flex items-center justify-center">
                  <span className="text-sm font-bold text-accent">{item.phase}</span>
                </div>
                <div className="flex-1 pt-2">
                  <h3 className="text-xl font-semibold mb-2">{item.title}</h3>
                  <p className="text-muted-foreground">{item.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <Footer />
      <MobileCTA />
    </div>
  );
};

export default MA;
