import { Link } from "react-router-dom";
import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import MobileCTA from "@/components/MobileCTA";
import { Card } from "@/components/ui/card";
import { Users, ArrowRight, CheckCircle2 } from "lucide-react";

const Laboral = () => {
  const services = [
    "Elaboración de contratos de trabajo",
    "Gestión de nóminas y seguros sociales",
    "Contabilidad empresarial y auditoría",
    "Despidos individuales y colectivos (ERE)",
    "Modificaciones sustanciales de condiciones",
    "Negociación colectiva y convenios",
    "Prevención de riesgos laborales",
    "Inspecciones de trabajo",
    "Conflictos laborales y mediación",
    "Outsourcing de departamento de RRHH"
  ];

  return (
    <div className="min-h-screen bg-background">
      <Navigation />
      
      <section className="pt-32 pb-20 bg-gradient-to-br from-primary to-primary/90">
        <div className="container-custom text-primary-foreground animate-fade-in">
          <div className="flex items-center gap-4 mb-6">
            <Users className="w-16 h-16" />
            <h1 className="text-5xl md:text-6xl font-serif font-bold">Laboral & Contabilidad</h1>
          </div>
          <p className="text-xl md:text-2xl text-primary-foreground/90 max-w-3xl">
            Gestión integral de recursos humanos y contabilidad
          </p>
        </div>
      </section>

      <section className="section-spacing">
        <div className="container-custom">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            <div>
              <h2 className="text-4xl font-serif font-bold mb-6">Tu departamento de RRHH externo</h2>
              <p className="text-lg text-muted-foreground mb-6 leading-relaxed">
                Gestionamos de forma integral todos los aspectos laborales y contables de tu empresa, 
                desde la contratación hasta la gestión de nóminas y la elaboración de cuentas anuales.
              </p>
              <p className="text-lg text-muted-foreground mb-8 leading-relaxed">
                Ofrecemos un servicio completo que te permite centrarte en tu negocio mientras 
                garantizamos el cumplimiento normativo y optimizamos tus procesos de RRHH.
              </p>
              <Link 
                to="/contacto"
                className="inline-flex items-center gap-2 bg-accent hover:bg-accent/90 text-foreground px-8 py-4 rounded-full font-medium text-lg transition-all"
              >
                Solicita información
                <ArrowRight size={20} />
              </Link>
            </div>

            <Card className="p-8 border-border">
              <h3 className="text-2xl font-serif font-semibold mb-6">Servicios completos</h3>
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
          <h2 className="text-4xl font-serif font-bold text-center mb-16">Ventajas del outsourcing</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <Card className="p-8 border-border text-center">
              <div className="text-5xl font-serif font-bold text-accent mb-4">-40%</div>
              <h3 className="text-xl font-semibold mb-3">Reducción de costes</h3>
              <p className="text-muted-foreground">
                Ahorra hasta un 40% comparado con mantener un departamento interno
              </p>
            </Card>
            <Card className="p-8 border-border text-center">
              <div className="text-5xl font-serif font-bold text-accent mb-4">100%</div>
              <h3 className="text-xl font-semibold mb-3">Cumplimiento garantizado</h3>
              <p className="text-muted-foreground">
                Nos aseguramos del cumplimiento total de la normativa laboral
              </p>
            </Card>
            <Card className="p-8 border-border text-center">
              <div className="text-5xl font-serif font-bold text-accent mb-4">24/7</div>
              <h3 className="text-xl font-semibold mb-3">Disponibilidad</h3>
              <p className="text-muted-foreground">
                Soporte continuo ante cualquier incidencia o consulta urgente
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

export default Laboral;
