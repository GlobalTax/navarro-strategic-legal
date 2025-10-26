import { useRef } from "react";
import { useCountUp } from "@/hooks/useCountUp";
import { useIntersectionObserver } from "@/hooks/useIntersectionObserver";

interface CountUpStatProps {
  value: number;
  label: string;
  suffix?: string;
  prefix?: string;
}

const CountUpStat = ({ value, label, suffix = "", prefix = "" }: CountUpStatProps) => {
  const ref = useRef<HTMLDivElement>(null);
  const isVisible = useIntersectionObserver(ref, { threshold: 0.3 });
  const count = useCountUp(value, 2000, isVisible);

  return (
    <div ref={ref} className="animate-count-up">
      <div className="text-3xl md:text-4xl font-serif font-bold text-foreground mb-2">
        {prefix}{count}{suffix}
      </div>
      <p className="text-sm text-muted-foreground">{label}</p>
    </div>
  );
};

export default CountUpStat;
