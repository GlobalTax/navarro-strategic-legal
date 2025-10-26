import { LucideIcon } from "lucide-react";

interface CycleStageProps {
  icon: LucideIcon;
  title: string;
  description: string;
  stage: number;
  showConnector?: boolean;
}

const CycleStage = ({
  icon: Icon,
  title,
  description,
  stage,
  showConnector = false,
}: CycleStageProps) => {
  const bgIntensity = stage === 1 ? "bg-accent/10" : stage === 2 ? "bg-accent/20" : "bg-accent/30";

  return (
    <div className="relative">
      <div
        className={`${bgIntensity} rounded-3xl p-10 border border-border transition-all duration-300 hover:scale-[1.02] hover:shadow-lg`}
      >
        <div className="flex justify-center mb-6">
          <Icon className="w-16 h-16 text-accent" strokeWidth={2} />
        </div>
        <h3 className="text-2xl font-serif font-semibold text-center mb-4 text-foreground">
          {title}
        </h3>
        <p className="text-base text-muted-foreground leading-relaxed text-center">
          {description}
        </p>
      </div>
      {showConnector && (
        <div className="hidden lg:block absolute top-1/2 left-full w-full h-0.5 -translate-y-1/2 pointer-events-none">
          <div className="w-full h-full bg-gradient-to-r from-accent via-accent/50 to-transparent" />
          <div className="absolute right-0 top-1/2 -translate-y-1/2 text-accent text-2xl -mr-3">
            →
          </div>
        </div>
      )}
    </div>
  );
};

export default CycleStage;
