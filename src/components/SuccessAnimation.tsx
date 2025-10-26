import { useEffect } from "react";
import { CheckCircle } from "lucide-react";

interface SuccessAnimationProps {
  show: boolean;
  onComplete: () => void;
}

const SuccessAnimation = ({ show, onComplete }: SuccessAnimationProps) => {
  useEffect(() => {
    if (show) {
      const timer = setTimeout(() => {
        onComplete();
      }, 3000);
      return () => clearTimeout(timer);
    }
  }, [show, onComplete]);

  if (!show) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-background/80 backdrop-blur-sm animate-fade-in">
      <div className="flex flex-col items-center gap-4 animate-scale-in">
        <CheckCircle 
          className="w-20 h-20 text-accent animate-[scale-in_0.5s_ease-out]" 
          strokeWidth={1.5}
        />
        <div className="text-center space-y-2">
          <h3 className="text-2xl font-serif font-bold text-foreground">
            ¡Mensaje enviado!
          </h3>
          <p className="text-muted-foreground">
            Te responderemos en breve
          </p>
        </div>
      </div>
    </div>
  );
};

export default SuccessAnimation;
