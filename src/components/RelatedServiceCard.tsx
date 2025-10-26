import { Link } from "react-router-dom";
import { LucideIcon, ArrowRight } from "lucide-react";
import { Badge } from "@/components/ui/badge";

interface RelatedServiceCardProps {
  icon: LucideIcon;
  title: string;
  description: string;
  tag: string;
  link: string;
}

const RelatedServiceCard = ({
  icon: Icon,
  title,
  description,
  tag,
  link,
}: RelatedServiceCardProps) => {
  return (
    <Link to={link}>
      <div className="bg-card rounded-2xl p-8 border border-border h-full transition-all duration-300 hover:-translate-y-1 hover:shadow-xl group">
        <div className="flex justify-between items-start mb-6">
          <Icon className="w-12 h-12 text-accent" strokeWidth={2} />
          <Badge variant="secondary" className="text-xs">
            {tag}
          </Badge>
        </div>
        <h3 className="text-xl font-semibold mb-3 text-foreground">{title}</h3>
        <p className="text-muted-foreground mb-6 leading-relaxed">{description}</p>
        <div className="flex items-center gap-2 text-accent font-medium group-hover:gap-3 transition-all">
          Más información
          <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform" />
        </div>
      </div>
    </Link>
  );
};

export default RelatedServiceCard;
