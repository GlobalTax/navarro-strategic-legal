import { TrendingUp, TrendingDown, Minus } from "lucide-react";
import { Card } from "@/components/ui/card";
import { useCountUp } from "@/hooks/useCountUp";
import { useIntersectionObserver } from "@/hooks/useIntersectionObserver";
import { useRef } from "react";

interface KPICardProps {
  label: string;
  value: string | number;
  unit: string;
  trend?: 'up' | 'down' | 'neutral';
}

const KPICard = ({ label, value, unit, trend = 'neutral' }: KPICardProps) => {
  const ref = useRef<HTMLDivElement>(null);
  const isVisible = useIntersectionObserver(ref, { threshold: 0.2 });
  
  const numericValue = typeof value === 'string' ? parseFloat(value.replace(/[^0-9.-]/g, '')) : value;
  const isNumber = !isNaN(numericValue);
  const animatedValue = useCountUp(isNumber ? numericValue : 0, 2000, isVisible);

  const trendConfig = {
    up: { icon: TrendingUp, color: 'text-green-600 dark:text-green-400' },
    down: { icon: TrendingDown, color: 'text-red-600 dark:text-red-400' },
    neutral: { icon: Minus, color: 'text-muted-foreground' }
  };

  const TrendIcon = trendConfig[trend].icon;

  return (
    <Card ref={ref} className="p-4 hover:shadow-lg transition-shadow">
      <div className="flex items-start justify-between">
        <div className="flex-1">
          <p className="text-sm text-muted-foreground mb-2">{label}</p>
          <div className="flex items-baseline gap-1">
            <span className="text-3xl font-bold text-foreground">
              {isNumber ? animatedValue.toLocaleString('es-ES') : value}
            </span>
            <span className="text-lg text-muted-foreground">{unit}</span>
          </div>
        </div>
        <TrendIcon className={`w-5 h-5 ${trendConfig[trend].color}`} />
      </div>
    </Card>
  );
};

export default KPICard;
