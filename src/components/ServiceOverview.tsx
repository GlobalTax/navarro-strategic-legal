import { LucideIcon, CheckCircle2 } from "lucide-react";
import { Card } from "@/components/ui/card";

interface ServiceOverviewProps {
  title: string;
  description: string[];
  icon: LucideIcon;
  services: string[];
}

const ServiceOverview = ({ title, description, icon: Icon, services }: ServiceOverviewProps) => {
  return (
    <section className="section-spacing">
      <div className="container-custom">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          <div className="relative">
            <h2 className="text-4xl font-serif font-bold mb-6 text-[#1A1A1A]">{title}</h2>
            {description.map((paragraph, index) => (
              <p key={index} className="text-lg text-muted-foreground mb-6 leading-relaxed">
                {paragraph}
              </p>
            ))}
            <Icon
              className="absolute top-0 right-0 w-48 h-48 text-accent opacity-5 -z-10"
              strokeWidth={1}
            />
          </div>

          <Card className="p-8 border-border">
            <h3 className="text-2xl font-serif font-semibold mb-6">Servicios especializados</h3>
            <ul className="space-y-3">
              {services.map((service, index) => (
                <li key={index} className="flex items-start gap-3">
                  <CheckCircle2 className="w-5 h-5 text-accent mt-0.5 flex-shrink-0" strokeWidth={2} />
                  <span className="text-muted-foreground">{service}</span>
                </li>
              ))}
            </ul>
          </Card>
        </div>
      </div>
    </section>
  );
};

export default ServiceOverview;
