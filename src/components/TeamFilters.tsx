import { Badge } from "@/components/ui/badge";
import { X } from "lucide-react";

interface TeamFiltersProps {
  activeArea: string;
  activeSeniority: string;
  onAreaChange: (area: string) => void;
  onSeniorityChange: (seniority: string) => void;
  onClear: () => void;
  showClear: boolean;
}

const areas = ["Todas", "Fiscal", "Mercantil", "Laboral", "M&A", "Empresa Familiar"];
const seniorities = ["Todos", "Socio", "Asociado", "Of Counsel"];

const TeamFilters = ({
  activeArea,
  activeSeniority,
  onAreaChange,
  onSeniorityChange,
  onClear,
  showClear,
}: TeamFiltersProps) => {
  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <h3 className="text-lg font-semibold">Filtrar por:</h3>
        {showClear && (
          <button
            onClick={onClear}
            className="flex items-center gap-2 text-sm text-muted-foreground hover:text-accent transition-colors"
          >
            <X size={16} />
            Limpiar filtros
          </button>
        )}
      </div>

      {/* Area filters */}
      <div>
        <p className="text-sm font-medium text-muted-foreground mb-3">Área</p>
        <div className="flex flex-wrap gap-2">
          {areas.map((area) => (
            <Badge
              key={area}
              onClick={() => onAreaChange(area)}
              onKeyDown={(e) => {
                if (e.key === "Enter" || e.key === " ") {
                  e.preventDefault();
                  onAreaChange(area);
                }
              }}
              role="button"
              tabIndex={0}
              aria-pressed={activeArea === area}
              className={`cursor-pointer px-4 py-2 transition-all duration-200 ${
                activeArea === area
                  ? "bg-accent text-accent-foreground border-accent filter-badge-active"
                  : "bg-secondary text-secondary-foreground hover:bg-accent/20 border-border"
              }`}
              variant="outline"
            >
              {area}
            </Badge>
          ))}
        </div>
      </div>

      {/* Seniority filters */}
      <div>
        <p className="text-sm font-medium text-muted-foreground mb-3">Seniority</p>
        <div className="flex flex-wrap gap-2">
          {seniorities.map((seniority) => (
            <Badge
              key={seniority}
              onClick={() => onSeniorityChange(seniority)}
              onKeyDown={(e) => {
                if (e.key === "Enter" || e.key === " ") {
                  e.preventDefault();
                  onSeniorityChange(seniority);
                }
              }}
              role="button"
              tabIndex={0}
              aria-pressed={activeSeniority === seniority}
              className={`cursor-pointer px-4 py-2 transition-all duration-200 ${
                activeSeniority === seniority
                  ? "bg-accent text-accent-foreground border-accent filter-badge-active"
                  : "bg-secondary text-secondary-foreground hover:bg-accent/20 border-border"
              }`}
              variant="outline"
            >
              {seniority}
            </Badge>
          ))}
        </div>
      </div>
    </div>
  );
};

export default TeamFilters;
