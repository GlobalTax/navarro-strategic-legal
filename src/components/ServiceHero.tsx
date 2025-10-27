import { Link } from "react-router-dom";
import { LucideIcon, ArrowRight } from "lucide-react";

interface ServiceHeroProps {
  icon: LucideIcon;
  title: string;
  subtitle: string;
  ctaText?: string;
  ctaLink?: string;
}

const ServiceHero = ({
  icon: Icon,
  title,
  subtitle,
  ctaText = "Solicita una consulta",
  ctaLink = "/contacto",
}: ServiceHeroProps) => {
  return (
    <section className="pt-32 pb-20 bg-white">
      <div className="container-custom animate-fade-in">
        <div className="flex items-center gap-4 mb-6">
          <Icon className="w-16 h-16 text-[#1A1A1A]" strokeWidth={2} />
          <h1 className="text-5xl md:text-6xl font-serif text-[#1A1A1A]">{title}</h1>
        </div>
        <p className="text-xl md:text-2xl text-muted-foreground max-w-3xl mb-8">
          {subtitle}
        </p>
        <Link
          to={ctaLink}
          className="inline-flex items-center gap-2 bg-accent hover:bg-accent/90 text-foreground px-8 py-4 rounded-full font-medium font-inter text-lg transition-all hover:scale-105"
        >
          {ctaText}
          <ArrowRight size={20} />
        </Link>
      </div>
    </section>
  );
};

export default ServiceHero;
