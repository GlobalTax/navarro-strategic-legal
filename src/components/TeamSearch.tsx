import { Input } from "@/components/ui/input";
import { Search, X } from "lucide-react";

interface TeamSearchProps {
  value: string;
  onChange: (value: string) => void;
}

const TeamSearch = ({ value, onChange }: TeamSearchProps) => {
  return (
    <div className="relative max-w-xl mx-auto">
      <Search
        className="absolute left-4 top-1/2 -translate-y-1/2 text-muted-foreground"
        size={20}
      />
      <Input
        type="text"
        placeholder="Buscar por nombre, especialidad o área..."
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="h-12 pl-12 pr-12 text-base"
        aria-label="Buscar profesionales"
      />
      {value && (
        <button
          onClick={() => onChange("")}
          className="absolute right-4 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground transition-colors"
          aria-label="Limpiar búsqueda"
        >
          <X size={20} />
        </button>
      )}
    </div>
  );
};

export default TeamSearch;
