import { Link } from "react-router-dom";
import { Compass, RefreshCw, Award, Shield, Building2, TrendingUp, ArrowRight } from "lucide-react";
import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import MobileCTA from "@/components/MobileCTA";
import CycleStage from "@/components/CycleStage";
import QuoteBanner from "@/components/QuoteBanner";
import RelatedServiceCard from "@/components/RelatedServiceCard";
import CasoCard from "@/components/CasoCard";
import { useScrollReveal } from "@/hooks/useScrollReveal";

const EmpresaFamiliar = () => {
  const heroReveal = useScrollReveal(0.1);
  const narrativeReveal = useScrollReveal(0.2);
  const cycleReveal = useScrollReveal(0.2);
  const servicesReveal = useScrollReveal(0.2);
  const casesReveal = useScrollReveal(0.3);
  const quoteReveal = useScrollReveal(0.4);
  const ctaReveal = useScrollReveal(0.5);

  return (
    <div className="min-h-screen bg-background">
      <Navigation />
      
      {/* Hero Section */}
      <section 
        ref={heroReveal.ref}
        className={`min-h-[70vh] pt-32 pb-20 bg-white relative overflow-hidden transition-all duration-1000 ${
          heroReveal.isVisible ? 'animate-scroll-reveal' : 'scroll-reveal-hidden'
        }`}
      >
        <div className="absolute inset-0 bg-white" />
        <div className="container-custom relative z-10 flex flex-col justify-center min-h-[50vh]">
          <h1 className="text-5xl md:text-7xl font-serif mb-6 text-foreground">
            Empresa Familiar
          </h1>
          <p className="text-xl md:text-2xl text-muted-foreground max-w-3xl mb-8">
            Continuidad, gobernanza y protección patrimonial para tu legado empresarial
          </p>
          <Link
            to="/contacto"
            className="inline-flex items-center gap-2 bg-accent hover:bg-accent/90 text-foreground px-8 py-4 rounded-full font-medium text-lg transition-all hover:scale-105 w-fit"
          >
            Solicita una consulta
            <ArrowRight size={20} />
          </Link>
        </div>
      </section>

      {/* Narrative Paragraph Section */}
      <section 
        ref={narrativeReveal.ref}
        className={`py-24 bg-secondary/20 transition-all duration-1000 ${
          narrativeReveal.isVisible ? 'animate-scroll-reveal' : 'scroll-reveal-hidden'
        }`}
      >
        <div className="container-custom">
          <div className="max-w-4xl mx-auto">
            <p className="editorial-text text-lg md:text-xl text-foreground mb-6">
              En cada empresa familiar late el pulso de generaciones. Historias de esfuerzo, 
              visión y sacrificio que se entrelazan con la evolución del mercado y la sociedad.
            </p>
            <p className="editorial-text text-lg md:text-xl text-foreground mb-6">
              Más del 85% del tejido empresarial español tiene un nombre y apellidos. Empresas 
              que son, ante todo, proyectos de vida compartidos. Proteger ese legado no es solo 
              una cuestión legal: es preservar la memoria, los valores y la continuidad de lo que 
              se ha construido con tanto empeño.
            </p>
            <p className="editorial-text text-lg md:text-xl text-foreground">
              En Navarro acompañamos a familias empresarias en los momentos más delicados: 
              la sucesión, la gobernanza, la protección patrimonial. Con sensibilidad, rigor y 
              una visión estratégica que va más allá del presente.
            </p>
          </div>
        </div>
      </section>

      {/* Cycle Graphic Section */}
      <section 
        ref={cycleReveal.ref}
        className={`section-spacing transition-all duration-1000 ${
          cycleReveal.isVisible ? 'animate-scroll-reveal' : 'scroll-reveal-hidden'
        }`}
      >
        <div className="container-custom">
          <h2 className="text-4xl font-serif text-center mb-16 text-foreground">
            El ciclo de la empresa familiar
          </h2>
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 lg:gap-12 max-w-6xl mx-auto">
            <CycleStage
              icon={Compass}
              title="Preparación"
              description="Diagnóstico de la estructura actual, identificación de sucesores y diseño del protocolo familiar. El momento de anticipar y planificar."
              stage={1}
              showConnector={true}
            />
            <CycleStage
              icon={RefreshCw}
              title="Transición"
              description="Transferencia de propiedad y gestión. Acompañamiento legal, fiscal y emocional en el momento más crítico del proceso sucesorio."
              stage={2}
              showConnector={true}
            />
            <CycleStage
              icon={Award}
              title="Continuidad"
              description="Fortalecimiento del gobierno corporativo, profesionalización de la gestión y adaptación del modelo a la nueva generación."
              stage={3}
            />
          </div>
        </div>
      </section>

      {/* Related Services Grid */}
      <section 
        ref={servicesReveal.ref}
        className={`py-24 bg-secondary/20 transition-all duration-1000 ${
          servicesReveal.isVisible ? 'animate-scroll-reveal' : 'scroll-reveal-hidden'
        }`}
      >
        <div className="container-custom">
          <h2 className="text-4xl font-serif text-center mb-12 text-foreground">
            Áreas relacionadas
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto">
            <RelatedServiceCard
              icon={Shield}
              title="Fiscalidad sucesoria"
              description="Optimización fiscal en transmisiones patrimoniales y donaciones"
              tag="Planificación"
              link="/servicios/fiscal"
            />
            <RelatedServiceCard
              icon={Building2}
              title="Estructuras societarias"
              description="Holdings, protocolos familiares y pactos parasociales"
              tag="Gobernanza"
              link="/servicios/mercantil"
            />
            <RelatedServiceCard
              icon={TrendingUp}
              title="Due diligence familiar"
              description="Análisis y valoración para operaciones de compraventa o entrada de inversores"
              tag="Transacciones"
              link="/servicios/ma"
            />
          </div>
        </div>
      </section>

      {/* Mini Case Studies */}
      <section 
        ref={casesReveal.ref}
        className={`section-spacing transition-all duration-1000 ${
          casesReveal.isVisible ? 'animate-scroll-reveal' : 'scroll-reveal-hidden'
        }`}
      >
        <div className="container-custom">
          <h2 className="text-4xl font-serif text-center mb-12 text-foreground">
            Historias de continuidad
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-6xl mx-auto">
            <CasoCard
              clientType="Grupo empresarial familiar (3ª generación)"
              result="Diseño e implementación de protocolo familiar y holding patrimonial. Transición exitosa con optimización fiscal de 1.8M€ y cero conflictos internos."
              industry="Industria manufacturera"
              gradientClass="bg-gradient-to-br from-accent/10 to-accent/5"
            />
            <CasoCard
              clientType="Empresa familiar en expansión"
              result="Estructuración de gobierno corporativo con consejo familiar y advisory board. Profesionalización sin perder identidad: aumento del 40% en valoración en 2 años."
              industry="Retail & Distribución"
              gradientClass="bg-gradient-to-br from-secondary to-accent/10"
            />
          </div>
        </div>
      </section>

      {/* Quote Banner */}
      <div 
        ref={quoteReveal.ref}
        className={`transition-all duration-1000 ${
          quoteReveal.isVisible ? 'animate-scroll-reveal' : 'scroll-reveal-hidden'
        }`}
      >
        <QuoteBanner 
          quote="Cada familia tiene su historia; nosotros la hacemos sostenible."
          author="Filosofía Navarro"
        />
      </div>

      {/* Final CTA */}
      <section 
        ref={ctaReveal.ref}
        className={`py-24 bg-white transition-all duration-1000 ${
          ctaReveal.isVisible ? 'animate-scroll-reveal' : 'scroll-reveal-hidden'
        }`}
      >
        <div className="container-custom text-center">
          <h2 className="text-4xl md:text-5xl font-serif mb-6 text-foreground">
            ¿Preparado para asegurar el futuro de tu empresa familiar?
          </h2>
          <p className="text-xl text-muted-foreground mb-8 max-w-2xl mx-auto">
            Agenda una consulta inicial confidencial y sin compromiso
          </p>
          <Link 
            to="/contacto"
            className="inline-flex items-center gap-2 bg-accent hover:bg-accent/90 text-foreground px-12 py-5 rounded-full font-medium text-lg transition-all hover:scale-105 hover:animate-pulse-soft shadow-lg"
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
