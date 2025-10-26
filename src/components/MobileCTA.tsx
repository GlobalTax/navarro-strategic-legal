import { Link } from "react-router-dom";
import { Phone } from "lucide-react";
import { Button } from "@/components/ui/button";

const MobileCTA = () => {
  return (
    <div className="fixed bottom-0 left-0 right-0 lg:hidden bg-background border-t border-border shadow-lg z-40 p-4">
      <Button asChild className="w-full bg-accent hover:bg-accent/90 text-foreground">
        <Link to="/contacto" className="flex items-center justify-center gap-2">
          <Phone size={18} />
          Agenda una llamada
        </Link>
      </Button>
    </div>
  );
};

export default MobileCTA;
