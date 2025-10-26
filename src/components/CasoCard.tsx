import { Badge } from "@/components/ui/badge";

interface CasoCardProps {
  clientType: string;
  result: string;
  industry: string;
  gradientClass: string;
}

const CasoCard = ({ clientType, result, industry, gradientClass }: CasoCardProps) => {
  return (
    <div
      className={`${gradientClass} rounded-2xl p-8 transition-all duration-300 hover:scale-105 hover:shadow-lg border border-border`}
    >
      <Badge variant="secondary" className="mb-4">
        {industry}
      </Badge>
      <p className="text-sm font-medium text-muted-foreground mb-3">{clientType}</p>
      <p className="text-lg leading-relaxed text-foreground">{result}</p>
    </div>
  );
};

export default CasoCard;
