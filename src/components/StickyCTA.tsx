import { Link } from "react-router-dom";
import { useStickyCTA } from "@/hooks/useStickyCTA";

interface StickyCTAProps {
  text?: string;
  link?: string;
}

const StickyCTA = ({ text = "Solicita consulta", link = "/contacto" }: StickyCTAProps) => {
  const showCTA = useStickyCTA();

  return (
    <div
      className={`fixed bottom-20 left-4 right-4 z-40 md:hidden transition-all duration-300 ${
        showCTA ? "translate-y-0 opacity-100" : "translate-y-32 opacity-0"
      }`}
      aria-live="polite"
    >
      <Link
        to={link}
        className="block w-full bg-accent hover:bg-accent/90 text-foreground text-center px-8 py-4 rounded-full shadow-lg font-medium transition-all hover:scale-105"
      >
        {text}
      </Link>
    </div>
  );
};

export default StickyCTA;
