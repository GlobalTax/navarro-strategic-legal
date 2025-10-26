import { LucideIcon } from "lucide-react";
import { Card } from "@/components/ui/card";

interface Benefit {
  icon: LucideIcon;
  title: string;
  description: string;
}

interface KeyBenefitsProps {
  benefits: Benefit[];
}

const KeyBenefits = ({ benefits }: KeyBenefitsProps) => {
  return (
    <section className="section-spacing bg-secondary/30">
      <div className="container-custom">
        <h2 className="text-4xl font-serif font-bold text-center mb-16 text-[#1A1A1A]">
          Por qué elegirnos
        </h2>
        <div className={`grid grid-cols-1 md:grid-cols-2 ${benefits.length === 3 ? 'lg:grid-cols-3' : 'lg:grid-cols-2'} gap-8`}>
          {benefits.map((benefit, index) => {
            const Icon = benefit.icon;
            return (
              <Card
                key={index}
                className="p-8 border-border text-center transition-all duration-300 hover:scale-105 hover:shadow-lg"
              >
                <div className="flex justify-center mb-6">
                  <Icon className="w-12 h-12 text-accent" strokeWidth={2} />
                </div>
                <h3 className="text-xl font-semibold mb-3 text-[#1A1A1A]">{benefit.title}</h3>
                <p className="text-muted-foreground leading-relaxed">{benefit.description}</p>
              </Card>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default KeyBenefits;
