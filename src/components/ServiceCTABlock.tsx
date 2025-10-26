import { Link } from "react-router-dom";
import { ArrowRight } from "lucide-react";

interface ServiceCTABlockProps {
  title?: string;
  subtitle?: string;
  ctaText?: string;
  ctaLink?: string;
}

const ServiceCTABlock = ({
  title = "¿Necesitas asesoramiento especializado?",
  subtitle = "Agenda una consulta estratégica sin compromiso",
  ctaText = "Solicita una consulta",
  ctaLink = "/contacto",
}: ServiceCTABlockProps) => {
  return (
    <section className="py-24 bg-gradient-to-br from-accent/10 to-white">
      <div className="container-custom">
        <div className="max-w-3xl mx-auto text-center">
          <h2 className="text-4xl md:text-5xl font-serif font-bold mb-6 text-[#1A1A1A]">
            {title}
          </h2>
          <p className="text-xl text-muted-foreground mb-8">{subtitle}</p>
          <Link
            to={ctaLink}
            className="inline-flex items-center gap-2 bg-accent hover:bg-accent/90 text-foreground px-12 py-5 rounded-full font-medium text-lg transition-all hover:scale-105 hover:animate-pulse-soft shadow-lg"
          >
            {ctaText}
            <ArrowRight size={20} />
          </Link>
        </div>
      </div>
    </section>
  );
};

export default ServiceCTABlock;
