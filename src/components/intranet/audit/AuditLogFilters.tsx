import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import { X } from "lucide-react";

interface AuditLogFiltersProps {
  entityFilter: string;
  setEntityFilter: (value: string) => void;
  actionFilter: string;
  setActionFilter: (value: string) => void;
  searchTerm: string;
  setSearchTerm: (value: string) => void;
}

export const AuditLogFilters = ({
  entityFilter,
  setEntityFilter,
  actionFilter,
  setActionFilter,
  searchTerm,
  setSearchTerm,
}: AuditLogFiltersProps) => {
  const clearFilters = () => {
    setEntityFilter('all');
    setActionFilter('all');
    setSearchTerm('');
  };

  const hasActiveFilters = entityFilter !== 'all' || actionFilter !== 'all' || searchTerm !== '';

  return (
    <div className="bg-card p-4 rounded-lg border space-y-4">
      <div className="flex items-center justify-between">
        <h3 className="font-semibold">Filtros</h3>
        {hasActiveFilters && (
          <Button variant="ghost" size="sm" onClick={clearFilters}>
            <X className="h-4 w-4 mr-2" />
            Limpiar filtros
          </Button>
        )}
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="space-y-2">
          <Label>Entidad</Label>
          <Select value={entityFilter} onValueChange={setEntityFilter}>
            <SelectTrigger>
              <SelectValue placeholder="Todas las entidades" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">Todas</SelectItem>
              <SelectItem value="blog_posts">Posts de Blog</SelectItem>
              <SelectItem value="user_roles">Roles de Usuario</SelectItem>
              <SelectItem value="media_files">Archivos Media</SelectItem>
              <SelectItem value="empleados">Empleados</SelectItem>
            </SelectContent>
          </Select>
        </div>

        <div className="space-y-2">
          <Label>Acción</Label>
          <Select value={actionFilter} onValueChange={setActionFilter}>
            <SelectTrigger>
              <SelectValue placeholder="Todas las acciones" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">Todas</SelectItem>
              <SelectItem value="CREATE">Crear</SelectItem>
              <SelectItem value="UPDATE">Actualizar</SelectItem>
              <SelectItem value="DELETE">Eliminar</SelectItem>
              <SelectItem value="ALTA">Alta</SelectItem>
              <SelectItem value="BAJA">Baja</SelectItem>
              <SelectItem value="MOVIMIENTO">Movimiento</SelectItem>
            </SelectContent>
          </Select>
        </div>

        <div className="space-y-2">
          <Label>Búsqueda</Label>
          <Input
            placeholder="Buscar por ID o descripción..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
      </div>
    </div>
  );
};
