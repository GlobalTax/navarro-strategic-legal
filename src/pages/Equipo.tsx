import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import MobileCTA from "@/components/MobileCTA";
import { Card } from "@/components/ui/card";
import { Mail, Linkedin } from "lucide-react";

const Equipo = () => {
  const team = [
    {
      name: "María Navarro",
      role: "Socia Fundadora",
      area: "Derecho Fiscal y M&A",
      description: "25+ años de experiencia en planificación fiscal internacional y operaciones corporativas complejas.",
      email: "maria.navarro@navarrolegal.es"
    },
    {
      name: "Carlos Jiménez",
      role: "Socio",
      area: "Derecho Mercantil",
      description: "Especialista en gobierno corporativo y reestructuraciones empresariales con trayectoria en grandes despachos.",
      email: "carlos.jimenez@navarrolegal.es"
    },
    {
      name: "Laura Martínez",
      role: "Socia",
      area: "Empresa Familiar",
      description: "Experta en planificación sucesoria y estructuración patrimonial de grupos familiares.",
      email: "laura.martinez@navarrolegal.es"
    },
    {
      name: "David Rodríguez",
      role: "Of Counsel",
      area: "Laboral y Contabilidad",
      description: "Especialista en relaciones laborales complejas y gestión integral de recursos humanos.",
      email: "david.rodriguez@navarrolegal.es"
    }
  ];

  return (
    <div className="min-h-screen bg-background">
      <Navigation />
      
      {/* Hero Section */}
      <section className="pt-32 pb-20 bg-gradient-to-br from-primary to-primary/90">
        <div className="container-custom text-center text-primary-foreground animate-fade-in">
          <h1 className="text-5xl md:text-6xl font-serif font-bold mb-6">Nuestro equipo</h1>
          <p className="text-xl md:text-2xl text-primary-foreground/90 max-w-3xl mx-auto">
            Profesionales comprometidos con la excelencia y tu éxito
          </p>
        </div>
      </section>

      {/* Introduction */}
      <section className="section-spacing">
        <div className="container-custom">
          <div className="max-w-3xl mx-auto text-center mb-20">
            <h2 className="text-4xl font-serif font-bold mb-6">
              Experiencia al servicio de tu proyecto
            </h2>
            <p className="text-lg text-muted-foreground leading-relaxed">
              Nuestro equipo multidisciplinar combina décadas de experiencia en los mejores 
              despachos internacionales con un enfoque cercano y personalizado. Cada miembro 
              aporta conocimiento especializado y pasión por resolver los desafíos más complejos.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {team.map((member, index) => (
              <Card key={index} className="p-8 border-border hover:shadow-lg transition-all duration-300">
                <div className="mb-6">
                  <h3 className="text-2xl font-serif font-bold mb-1">{member.name}</h3>
                  <p className="text-accent font-medium mb-2">{member.role}</p>
                  <p className="text-sm text-muted-foreground font-medium">{member.area}</p>
                </div>
                <p className="text-muted-foreground mb-6 leading-relaxed">{member.description}</p>
                <div className="flex gap-4">
                  <a 
                    href={`mailto:${member.email}`}
                    className="flex items-center gap-2 text-sm text-accent hover:text-accent/80 transition-colors"
                  >
                    <Mail size={16} />
                    Contactar
                  </a>
                  <a 
                    href="#"
                    className="flex items-center gap-2 text-sm text-accent hover:text-accent/80 transition-colors"
                  >
                    <Linkedin size={16} />
                    LinkedIn
                  </a>
                </div>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Values Section */}
      <section className="section-spacing bg-secondary/30">
        <div className="container-custom">
          <div className="max-w-3xl mx-auto text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-serif font-bold mb-6">
              Nuestros valores
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-5xl mx-auto">
            <div className="text-center">
              <div className="text-5xl font-serif font-bold text-accent mb-4">Excelencia</div>
              <p className="text-muted-foreground">
                Compromiso inquebrantable con la calidad en cada proyecto que asumimos
              </p>
            </div>
            <div className="text-center">
              <div className="text-5xl font-serif font-bold text-accent mb-4">Cercanía</div>
              <p className="text-muted-foreground">
                Relaciones duraderas basadas en confianza, transparencia y disponibilidad
              </p>
            </div>
            <div className="text-center">
              <div className="text-5xl font-serif font-bold text-accent mb-4">Innovación</div>
              <p className="text-muted-foreground">
                Soluciones creativas que combinan tradición jurídica con visión contemporánea
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Join Section */}
      <section className="section-spacing">
        <div className="container-custom">
          <Card className="p-12 text-center bg-primary text-primary-foreground border-0">
            <h2 className="text-4xl font-serif font-bold mb-4">¿Quieres unirte a nuestro equipo?</h2>
            <p className="text-xl text-primary-foreground/90 mb-6 max-w-2xl mx-auto">
              Estamos siempre en búsqueda de talento excepcional que comparta nuestra visión
            </p>
            <a 
              href="mailto:rrhh@navarrolegal.es"
              className="inline-block bg-accent hover:bg-accent/90 text-foreground px-8 py-3 rounded-full font-medium transition-all"
            >
              Envía tu CV
            </a>
          </Card>
        </div>
      </section>

      <Footer />
      <MobileCTA />
    </div>
  );
};

export default Equipo;
