import { LucideIcon } from "lucide-react";

interface ValuePillarProps {
  icon: LucideIcon;
  title: string;
  description: string;
}

const ValuePillar = ({ icon: Icon, title, description }: ValuePillarProps) => {
  return (
    <div className="text-center animate-fade-in">
      <div className="flex justify-center mb-6">
        <Icon className="w-12 h-12 text-accent" />
      </div>
      <h3 className="text-2xl font-serif font-semibold mb-4">{title}</h3>
      <p className="text-muted-foreground leading-relaxed">{description}</p>
    </div>
  );
};

export default ValuePillar;
