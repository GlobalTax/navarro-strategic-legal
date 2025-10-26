import { Link } from "react-router-dom";
import { ArrowRight, Shield, Users, TrendingUp, Building2 } from "lucide-react";
import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import MobileCTA from "@/components/MobileCTA";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";

const Index = () => {
  const services = [
    {
      icon: Shield,
      title: "Derecho Fiscal",
      description: "Planificación fiscal estratégica y optimización tributaria para empresas y patrimonios familiares.",
      link: "/servicios/fiscal"
    },
    {
      icon: Building2,
      title: "Derecho Mercantil",
      description: "Asesoramiento integral en operaciones societarias, contratos comerciales y gobierno corporativo.",
      link: "/servicios/mercantil"
    },
    {
      icon: Users,
      title: "Laboral & Contabilidad",
      description: "Gestión completa de relaciones laborales, nóminas y contabilidad empresarial.",
      link: "/servicios/laboral"
    },
    {
      icon: TrendingUp,
      title: "Operaciones M&A",
      description: "Due diligence, negociación y estructuración de operaciones de fusión y adquisición.",
      link: "/servicios/ma"
    }
  ];

  return (
    <div className="min-h-screen bg-background">
      <Navigation />
      
      {/* Hero Section */}
      <section className="relative min-h-[90vh] flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-primary via-primary/95 to-primary/90" />
        <div className="container-custom relative z-10 text-center text-primary-foreground animate-fade-in">
          <h1 className="text-5xl md:text-7xl font-serif font-bold mb-6 leading-tight">
            Asesoramiento estratégico<br />y legal de alto nivel
          </h1>
          <p className="text-xl md:text-2xl mb-12 text-primary-foreground/90 max-w-3xl mx-auto font-light">
            Para empresas y grupos familiares que buscan soluciones integrales con visión de futuro
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button asChild size="lg" className="bg-accent hover:bg-accent/90 text-foreground text-lg px-8">
              <Link to="/contacto" className="flex items-center gap-2">
                Agenda una consulta
                <ArrowRight size={20} />
              </Link>
            </Button>
            <Button asChild size="lg" variant="outline" className="bg-transparent border-primary-foreground text-primary-foreground hover:bg-primary-foreground/10 text-lg px-8">
              <Link to="/servicios">
                Descubre nuestros servicios
              </Link>
            </Button>
          </div>
        </div>
      </section>

      {/* Philosophy Section */}
      <section className="section-spacing">
        <div className="container-custom">
          <div className="max-w-3xl mx-auto text-center animate-fade-in">
            <p className="text-sm uppercase tracking-wider text-accent mb-4 font-medium">Nuestra filosofía</p>
            <h2 className="text-4xl md:text-5xl font-serif font-bold mb-6">
              Donde la estrategia encuentra el derecho
            </h2>
            <p className="text-lg text-muted-foreground leading-relaxed">
              En Navarro combinamos experiencia legal sólida con visión estratégica empresarial. 
              No solo resolvemos problemas legales, sino que anticipamos oportunidades y diseñamos 
              soluciones que impulsan el crecimiento sostenible de tu empresa o patrimonio familiar.
            </p>
          </div>
        </div>
      </section>

      {/* Services Grid */}
      <section className="section-spacing bg-secondary/30">
        <div className="container-custom">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-serif font-bold mb-4">Áreas de práctica</h2>
            <p className="text-lg text-muted-foreground">Soluciones especializadas para cada necesidad</p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {services.map((service, index) => (
              <Card 
                key={index}
                className="p-8 hover:shadow-lg transition-all duration-300 group border-border hover:border-accent/50"
              >
                <service.icon className="w-12 h-12 text-accent mb-6 group-hover:scale-110 transition-transform" />
                <h3 className="text-2xl font-serif font-semibold mb-4">{service.title}</h3>
                <p className="text-muted-foreground mb-6 leading-relaxed">{service.description}</p>
                <Link 
                  to={service.link}
                  className="inline-flex items-center gap-2 text-accent font-medium hover:gap-3 transition-all"
                >
                  Ver más
                  <ArrowRight size={18} />
                </Link>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Family Business CTA */}
      <section className="section-spacing">
        <div className="container-custom">
          <div className="bg-primary text-primary-foreground rounded-3xl p-12 md:p-16 text-center">
            <h2 className="text-4xl md:text-5xl font-serif font-bold mb-6">
              ¿Lideras una empresa familiar?
            </h2>
            <p className="text-xl mb-8 text-primary-foreground/90 max-w-2xl mx-auto">
              Entendemos los desafíos únicos de las empresas familiares: sucesión, gobernanza, 
              crecimiento y protección del legado.
            </p>
            <Button asChild size="lg" className="bg-accent hover:bg-accent/90 text-foreground">
              <Link to="/empresa-familiar" className="flex items-center gap-2">
                Conoce nuestra filosofía
                <ArrowRight size={20} />
              </Link>
            </Button>
          </div>
        </div>
      </section>

      {/* Trust Section */}
      <section className="section-spacing bg-secondary/30">
        <div className="container-custom text-center">
          <div className="max-w-3xl mx-auto">
            <h2 className="text-4xl md:text-5xl font-serif font-bold mb-6">
              Construimos relaciones duraderas
            </h2>
            <p className="text-lg text-muted-foreground leading-relaxed mb-12">
              Más allá de ser asesores legales, somos tu socio estratégico de confianza. 
              Trabajamos codo a codo contigo para entender tu visión y construir soluciones 
              que perduren en el tiempo.
            </p>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <div>
                <div className="text-5xl font-serif font-bold text-accent mb-2">25+</div>
                <p className="text-muted-foreground">Años de experiencia</p>
              </div>
              <div>
                <div className="text-5xl font-serif font-bold text-accent mb-2">300+</div>
                <p className="text-muted-foreground">Clientes atendidos</p>
              </div>
              <div>
                <div className="text-5xl font-serif font-bold text-accent mb-2">98%</div>
                <p className="text-muted-foreground">Satisfacción del cliente</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      <Footer />
      <MobileCTA />
    </div>
  );
};

export default Index;
