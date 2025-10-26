import { Link } from "react-router-dom";
import { ArrowRight, Shield, Users, TrendingUp, Building2, Scale, Compass, Heart } from "lucide-react";
import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import MobileCTA from "@/components/MobileCTA";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import CountUpStat from "@/components/CountUpStat";
import ValuePillar from "@/components/ValuePillar";
import CasoCard from "@/components/CasoCard";
import TeamMember from "@/components/TeamMember";

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
      <section className="relative min-h-[90vh] flex items-center justify-center overflow-hidden hero-texture">
        <div className="absolute inset-0 bg-gradient-to-br from-background via-background to-secondary" />
        <div className="container-custom relative z-10 text-center animate-fade-in py-20">
          <h1 className="text-5xl md:text-7xl font-serif font-bold mb-6 leading-tight text-foreground">
            Asesoramiento estratégico<br />y legal para empresas y grupos
          </h1>
          <p className="text-xl md:text-2xl mb-12 text-muted-foreground max-w-3xl mx-auto font-light">
            Especialistas en empresa familiar: continuidad, gobernanza y crecimiento con seguridad jurídica
          </p>
          
          {/* Stats Row */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 max-w-4xl mx-auto mb-12">
            <CountUpStat value={70} label="profesionales" prefix="+" />
            <CountUpStat value={87} label="clientes recurrentes" suffix="%" />
            <CountUpStat value={10} label="áreas de práctica" />
            <CountUpStat value={40} label="cliente internacional" suffix="%" />
          </div>

          <Button asChild size="lg" className="bg-accent hover:bg-accent/90 text-accent-foreground text-lg px-8">
            <Link to="/contacto" className="flex items-center gap-2">
              Agenda una llamada
              <ArrowRight size={20} />
            </Link>
          </Button>
        </div>
      </section>

      {/* Value Pillars Section */}
      <section className="section-spacing">
        <div className="container-custom">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
            <ValuePillar
              icon={Scale}
              title="Excelencia Legal"
              description="Expertise técnico respaldado por décadas de experiencia en derecho empresarial y fiscal."
            />
            <ValuePillar
              icon={Compass}
              title="Visión Estratégica"
              description="Anticipamos escenarios y diseñamos soluciones que protegen y potencian tu crecimiento."
            />
            <ValuePillar
              icon={Heart}
              title="Enfoque Familiar"
              description="Entendemos las dinámicas únicas de las empresas familiares y su legado multigeneracional."
            />
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
                className="p-8 card-lift group border-border hover:border-accent/50"
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

      {/* Empresa Familiar Highlight - Full Width Parallax */}
      <section className="parallax-section min-h-[60vh] flex items-center justify-center relative py-32 bg-gradient-to-br from-primary/95 to-primary/80">
        <div className="absolute inset-0 bg-gradient-to-r from-primary/90 to-primary/70" />
        <div className="container-custom relative z-10 text-center text-primary-foreground">
          <blockquote className="text-4xl md:text-6xl font-serif font-bold mb-8 leading-tight">
            "El legado no se improvisa;<br />se planifica."
          </blockquote>
          <p className="text-xl md:text-2xl mb-8 text-primary-foreground/90 max-w-2xl mx-auto">
            Entendemos los desafíos únicos de las empresas familiares: sucesión, gobernanza, 
            crecimiento y protección del legado.
          </p>
          <Button asChild size="lg" className="bg-accent hover:bg-accent/90 text-accent-foreground">
            <Link to="/empresa-familiar" className="flex items-center gap-2">
              Conoce nuestra filosofía
              <ArrowRight size={20} />
            </Link>
          </Button>
        </div>
      </section>

      {/* Casos de Éxito Section */}
      <section className="section-spacing bg-secondary/30">
        <div className="container-custom">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-serif font-bold mb-4">Casos de éxito</h2>
            <p className="text-lg text-muted-foreground">Resultados que hablan por sí mismos</p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <CasoCard
              clientType="Grupo empresarial familiar"
              result="Reestructuración societaria para sucesión generacional sin fricción fiscal"
              industry="Retail"
              gradientClass="bg-gradient-to-br from-accent/10 to-transparent"
            />
            <CasoCard
              clientType="Startup tecnológica"
              result="Due diligence y estructuración M&A para adquisición estratégica"
              industry="SaaS"
              gradientClass="bg-gradient-to-br from-secondary to-accent/5"
            />
            <CasoCard
              clientType="Patrimonio familiar"
              result="Planificación sucesoria internacional con optimización tributaria"
              industry="Inmobiliario"
              gradientClass="bg-gradient-to-br from-muted to-transparent"
            />
          </div>
        </div>
      </section>

      {/* Equipo Teaser Section */}
      <section className="section-spacing">
        <div className="container-custom">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-serif font-bold mb-4">
              El equipo detrás de cada estrategia
            </h2>
            <p className="text-lg text-muted-foreground">
              Profesionales especializados comprometidos con tu éxito
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-12 mb-12">
            <TeamMember name="María Navarro" title="Socia fundadora" />
            <TeamMember name="Carlos Jiménez" title="Derecho Fiscal" />
            <TeamMember name="Ana Rodríguez" title="M&A" />
          </div>
          
          <div className="text-center">
            <Link 
              to="/equipo"
              className="inline-flex items-center gap-2 text-accent font-medium text-lg hover:gap-3 transition-all"
            >
              Conoce al equipo
              <ArrowRight size={20} />
            </Link>
          </div>
        </div>
      </section>

      {/* Final CTA Section */}
      <section className="gradient-cta py-24">
        <div className="container-custom text-center">
          <h2 className="text-4xl md:text-5xl font-serif font-bold mb-4 text-primary-foreground">
            ¿Hablamos de tu proyecto?
          </h2>
          <p className="text-xl mb-8 text-primary-foreground/90 max-w-2xl mx-auto">
            Agenda una consulta estratégica sin compromiso
          </p>
          <Button 
            asChild 
            size="lg" 
            className="bg-background text-foreground hover:bg-background/90 animate-pulse-soft"
          >
            <Link to="/contacto" className="flex items-center gap-2">
              Agenda una llamada
              <ArrowRight size={20} />
            </Link>
          </Button>
        </div>
      </section>

      <Footer />
      <MobileCTA />
    </div>
  );
};

export default Index;
