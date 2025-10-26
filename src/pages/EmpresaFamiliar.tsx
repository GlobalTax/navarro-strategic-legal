import { Link } from "react-router-dom";
import { Heart, Shield, TrendingUp, Users, ArrowRight } from "lucide-react";
import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import MobileCTA from "@/components/MobileCTA";
import { Card } from "@/components/ui/card";

const EmpresaFamiliar = () => {
  const pillars = [
    {
      icon: Heart,
      title: "Comprensión profunda",
      description: "Entendemos que una empresa familiar es más que un negocio: es un legado, una historia y un proyecto de vida compartido."
    },
    {
      icon: Shield,
      title: "Protección del patrimonio",
      description: "Estructuras legales sólidas que protegen tu patrimonio familiar ante cualquier eventualidad."
    },
    {
      icon: TrendingUp,
      title: "Planificación sucesoria",
      description: "Diseñamos planes de sucesión que garantizan la continuidad del negocio y minimizan conflictos."
    },
    {
      icon: Users,
      title: "Gobernanza familiar",
      description: "Implementamos protocolos y órganos de gobierno que profesionalizan la toma de decisiones."
    }
  ];

  return (
    <div className="min-h-screen bg-background">
      <Navigation />
      
      {/* Hero Section */}
      <section className="pt-32 pb-20 bg-gradient-to-br from-primary to-primary/90">
        <div className="container-custom text-center text-primary-foreground animate-fade-in">
          <h1 className="text-5xl md:text-6xl font-serif font-bold mb-6">Empresa Familiar</h1>
          <p className="text-xl md:text-2xl text-primary-foreground/90 max-w-3xl mx-auto">
            Protegiendo tu legado, asegurando tu futuro
          </p>
        </div>
      </section>

      {/* Introduction */}
      <section className="section-spacing">
        <div className="container-custom">
          <div className="max-w-3xl mx-auto text-center mb-20">
            <h2 className="text-4xl md:text-5xl font-serif font-bold mb-6">
              El corazón de la economía
            </h2>
            <p className="text-lg text-muted-foreground leading-relaxed">
              Las empresas familiares representan más del 85% del tejido empresarial español. 
              Son pilares fundamentales de nuestra economía, generadoras de empleo y custodias 
              de tradiciones empresariales que pasan de generación en generación. 
              En Navarro, entendemos su naturaleza única y los desafíos específicos que enfrentan.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {pillars.map((pillar, index) => (
              <Card key={index} className="p-8 border-border hover:border-accent/50 transition-colors">
                <div className="w-16 h-16 rounded-2xl bg-accent/10 flex items-center justify-center mb-6">
                  <pillar.icon className="w-8 h-8 text-accent" />
                </div>
                <h3 className="text-2xl font-serif font-semibold mb-4">{pillar.title}</h3>
                <p className="text-muted-foreground leading-relaxed">{pillar.description}</p>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Challenges Section */}
      <section className="section-spacing bg-secondary/30">
        <div className="container-custom">
          <div className="max-w-3xl mx-auto text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-serif font-bold mb-6">
              Desafíos comunes que abordamos
            </h2>
          </div>

          <div className="max-w-4xl mx-auto space-y-8">
            <Card className="p-8 border-border">
              <h3 className="text-xl font-semibold mb-3">Sucesión generacional</h3>
              <p className="text-muted-foreground">
                Solo el 30% de las empresas familiares sobreviven a la segunda generación. 
                Diseñamos planes de sucesión estratégicos que aseguran una transición fluida 
                y minimizan conflictos familiares.
              </p>
            </Card>

            <Card className="p-8 border-border">
              <h3 className="text-xl font-semibold mb-3">Profesionalización</h3>
              <p className="text-muted-foreground">
                Equilibramos los valores familiares con las mejores prácticas de gestión empresarial. 
                Implementamos estructuras de gobierno corporativo adaptadas a tu realidad.
              </p>
            </Card>

            <Card className="p-8 border-border">
              <h3 className="text-xl font-semibold mb-3">Optimización fiscal</h3>
              <p className="text-muted-foreground">
                Estructuras fiscales eficientes que protegen el patrimonio familiar y optimizan 
                la carga tributaria en transmisiones patrimoniales y donaciones.
              </p>
            </Card>

            <Card className="p-8 border-border">
              <h3 className="text-xl font-semibold mb-3">Resolución de conflictos</h3>
              <p className="text-muted-foreground">
                Mediación y arbitraje en disputas familiares. Protocolos claros que previenen 
                conflictos y preservan la armonía familiar y empresarial.
              </p>
            </Card>
          </div>
        </div>
      </section>

      {/* Process Section */}
      <section className="section-spacing">
        <div className="container-custom">
          <div className="max-w-3xl mx-auto text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-serif font-bold mb-6">
              Nuestro enfoque
            </h2>
            <p className="text-lg text-muted-foreground">
              Un proceso estructurado que combina experiencia legal con sensibilidad familiar
            </p>
          </div>

          <div className="max-w-4xl mx-auto space-y-6">
            {[
              { step: "01", title: "Diagnóstico integral", desc: "Analizamos la estructura actual de tu empresa familiar y patrimonio" },
              { step: "02", title: "Diseño estratégico", desc: "Desarrollamos un plan personalizado que contempla aspectos legales, fiscales y de gobernanza" },
              { step: "03", title: "Implementación", desc: "Ejecutamos las estructuras legales necesarias: protocolos, holdings, pactos parasociales" },
              { step: "04", title: "Acompañamiento continuo", desc: "Revisión periódica y adaptación ante cambios legislativos o circunstancias familiares" }
            ].map((item, index) => (
              <div key={index} className="flex gap-6 items-start">
                <div className="flex-shrink-0 w-16 h-16 rounded-full bg-accent/10 flex items-center justify-center">
                  <span className="text-xl font-bold text-accent">{item.step}</span>
                </div>
                <div>
                  <h3 className="text-xl font-semibold mb-2">{item.title}</h3>
                  <p className="text-muted-foreground">{item.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="section-spacing bg-primary text-primary-foreground">
        <div className="container-custom text-center">
          <h2 className="text-4xl md:text-5xl font-serif font-bold mb-6">
            ¿Preparado para asegurar el futuro de tu empresa familiar?
          </h2>
          <p className="text-xl text-primary-foreground/90 mb-8 max-w-2xl mx-auto">
            Agenda una consulta inicial confidencial y sin compromiso
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

export default EmpresaFamiliar;
