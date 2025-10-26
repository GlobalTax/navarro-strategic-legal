import { Link } from "react-router-dom";
import { Shield, Building2, Users, TrendingUp, ArrowRight } from "lucide-react";
import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import MobileCTA from "@/components/MobileCTA";
import { Card } from "@/components/ui/card";

const Servicios = () => {
  const services = [
    {
      icon: Shield,
      title: "Derecho Fiscal",
      description: "Planificación fiscal estratégica, optimización tributaria y defensa en inspecciones fiscales.",
      areas: ["Planificación fiscal nacional e internacional", "Reestructuraciones empresariales", "Operaciones de M&A desde perspectiva fiscal", "Defensa ante inspecciones"],
      link: "/servicios/fiscal"
    },
    {
      icon: Building2,
      title: "Derecho Mercantil",
      description: "Asesoramiento societario integral, desde constitución hasta restructuración empresarial.",
      areas: ["Operaciones societarias", "Contratos comerciales", "Gobierno corporativo", "Financiación empresarial"],
      link: "/servicios/mercantil"
    },
    {
      icon: Users,
      title: "Laboral & Contabilidad",
      description: "Gestión completa de recursos humanos y contabilidad empresarial con visión estratégica.",
      areas: ["Contratos laborales", "Gestión de nóminas", "Contabilidad y auditoría", "Conflictos laborales"],
      link: "/servicios/laboral"
    },
    {
      icon: TrendingUp,
      title: "Operaciones M&A",
      description: "Acompañamiento completo en fusiones, adquisiciones y desinversiones estratégicas.",
      areas: ["Due diligence legal y fiscal", "Valoración de empresas", "Negociación y estructuración", "Ejecución e integración"],
      link: "/servicios/ma"
    }
  ];

  return (
    <div className="min-h-screen bg-background">
      <Navigation />
      
      {/* Hero Section */}
      <section className="pt-32 pb-20 bg-gradient-to-br from-primary to-primary/90">
        <div className="container-custom text-center text-primary-foreground animate-fade-in">
          <h1 className="text-5xl md:text-6xl font-serif font-bold mb-6">Nuestros servicios</h1>
          <p className="text-xl md:text-2xl text-primary-foreground/90 max-w-3xl mx-auto">
            Soluciones jurídicas integrales diseñadas para empresas y familias que buscan excelencia
          </p>
        </div>
      </section>

      {/* Services Detail Section */}
      <section className="section-spacing">
        <div className="container-custom space-y-16">
          {services.map((service, index) => (
            <Card 
              key={index}
              className="p-8 md:p-12 hover:shadow-xl transition-all duration-300 border-border"
            >
              <div className="flex flex-col md:flex-row gap-8">
                <div className="flex-shrink-0">
                  <div className="w-20 h-20 rounded-2xl bg-accent/10 flex items-center justify-center">
                    <service.icon className="w-10 h-10 text-accent" />
                  </div>
                </div>
                <div className="flex-1">
                  <h2 className="text-3xl font-serif font-bold mb-4">{service.title}</h2>
                  <p className="text-lg text-muted-foreground mb-6">{service.description}</p>
                  <div className="mb-6">
                    <h3 className="font-semibold mb-3">Áreas específicas:</h3>
                    <ul className="grid grid-cols-1 md:grid-cols-2 gap-2">
                      {service.areas.map((area, i) => (
                        <li key={i} className="flex items-start gap-2">
                          <span className="text-accent mt-1">•</span>
                          <span className="text-muted-foreground">{area}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                  <Link 
                    to={service.link}
                    className="inline-flex items-center gap-2 text-accent font-medium hover:gap-3 transition-all"
                  >
                    Ver detalles completos
                    <ArrowRight size={18} />
                  </Link>
                </div>
              </div>
            </Card>
          ))}
        </div>
      </section>

      {/* CTA Section */}
      <section className="section-spacing bg-secondary/30">
        <div className="container-custom text-center">
          <h2 className="text-4xl md:text-5xl font-serif font-bold mb-6">
            ¿Necesitas asesoramiento especializado?
          </h2>
          <p className="text-xl text-muted-foreground mb-8 max-w-2xl mx-auto">
            Agenda una consulta inicial sin compromiso y descubre cómo podemos ayudarte
          </p>
          <Link 
            to="/contacto"
            className="inline-flex items-center gap-2 bg-accent hover:bg-accent/90 text-foreground px-8 py-4 rounded-full font-medium text-lg transition-all"
          >
            Contacta con nosotros
            <ArrowRight size={20} />
          </Link>
        </div>
      </section>

      <Footer />
      <MobileCTA />
    </div>
  );
};

export default Servicios;
