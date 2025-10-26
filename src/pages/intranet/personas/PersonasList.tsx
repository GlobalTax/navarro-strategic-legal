import { useState } from "react";
import { IntranetLayout } from "@/components/intranet/IntranetLayout";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Plus, Search, MoreVertical, Eye, Edit, UserX } from "lucide-react";
import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { StatusBadge } from "@/components/intranet/StatusBadge";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { useNavigate } from "react-router-dom";
import { OffboardingModal } from "@/components/intranet/OffboardingModal";
import { format } from "date-fns";

export default function PersonasList() {
  const navigate = useNavigate();
  const [search, setSearch] = useState("");
  const [areaFilter, setAreaFilter] = useState<string>("all");
  const [oficinaFilter, setOficinaFilter] = useState<string>("all");
  const [estadoFilter, setEstadoFilter] = useState<string>("all");
  const [offboardingEmployee, setOffboardingEmployee] = useState<any>(null);

  const { data: empleados, isLoading, refetch } = useQuery({
    queryKey: ['empleados', search, areaFilter, oficinaFilter, estadoFilter],
    queryFn: async () => {
      let query = supabase
        .from('empleados')
        .select('*')
        .order('created_at', { ascending: false });

      if (search) {
        query = query.ilike('nombre', `%${search}%`);
      }

      if (areaFilter !== 'all') {
        query = query.eq('area', areaFilter);
      }

      if (oficinaFilter !== 'all') {
        query = query.eq('oficina', oficinaFilter);
      }

      if (estadoFilter === 'activo') {
        query = query.eq('activo', true);
      } else if (estadoFilter === 'inactivo') {
        query = query.eq('activo', false);
      }

      const { data, error } = await query;
      if (error) throw error;
      return data;
    },
  });

  // Get unique areas and oficinas for filters
  const areas = [...new Set(empleados?.map(e => e.area).filter(Boolean))] as string[];
  const oficinas = [...new Set(empleados?.map(e => e.oficina).filter(Boolean))] as string[];

  return (
    <IntranetLayout>
      <div className="container-custom py-8">
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="text-4xl font-serif font-bold mb-2">Personas</h1>
            <p className="text-muted-foreground">
              Gestión de empleados y movimientos
            </p>
          </div>
          <Button onClick={() => navigate('/intranet/personas/new')}>
            <Plus className="mr-2 h-4 w-4" />
            Nueva Alta
          </Button>
        </div>

        {/* Filters */}
        <div className="bg-card rounded-lg border p-4 mb-6">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Buscar por nombre..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="pl-10"
              />
            </div>

            <Select value={areaFilter} onValueChange={setAreaFilter}>
              <SelectTrigger>
                <SelectValue placeholder="Todas las áreas" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">Todas las áreas</SelectItem>
                {areas.map(area => (
                  <SelectItem key={area} value={area}>{area}</SelectItem>
                ))}
              </SelectContent>
            </Select>

            <Select value={oficinaFilter} onValueChange={setOficinaFilter}>
              <SelectTrigger>
                <SelectValue placeholder="Todas las oficinas" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">Todas las oficinas</SelectItem>
                {oficinas.map(oficina => (
                  <SelectItem key={oficina} value={oficina}>{oficina}</SelectItem>
                ))}
              </SelectContent>
            </Select>

            <Select value={estadoFilter} onValueChange={setEstadoFilter}>
              <SelectTrigger>
                <SelectValue placeholder="Todos los estados" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">Todos</SelectItem>
                <SelectItem value="activo">Activos</SelectItem>
                <SelectItem value="inactivo">Inactivos</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>

        {/* Table */}
        <div className="bg-card rounded-lg border">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Nombre</TableHead>
                <TableHead>Rol</TableHead>
                <TableHead>Área</TableHead>
                <TableHead>Oficina</TableHead>
                <TableHead>Estado</TableHead>
                <TableHead>Inicio</TableHead>
                <TableHead>Fin</TableHead>
                <TableHead className="text-right">Acciones</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {isLoading ? (
                <TableRow>
                  <TableCell colSpan={8} className="text-center py-8">
                    Cargando...
                  </TableCell>
                </TableRow>
              ) : empleados && empleados.length > 0 ? (
                empleados.map((empleado) => (
                  <TableRow key={empleado.id}>
                    <TableCell className="font-medium">{empleado.nombre}</TableCell>
                    <TableCell>{empleado.rol || empleado.puesto || '-'}</TableCell>
                    <TableCell>{empleado.area || empleado.departamento || '-'}</TableCell>
                    <TableCell>{empleado.oficina || '-'}</TableCell>
                    <TableCell>
                      <StatusBadge status={empleado.activo ? 'active' : 'inactive'} />
                    </TableCell>
                    <TableCell>
                      {empleado.fecha_alta 
                        ? format(new Date(empleado.fecha_alta), 'dd/MM/yyyy')
                        : '-'}
                    </TableCell>
                    <TableCell>
                      {empleado.fecha_baja 
                        ? format(new Date(empleado.fecha_baja), 'dd/MM/yyyy')
                        : '-'}
                    </TableCell>
                    <TableCell className="text-right">
                      <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                          <Button variant="ghost" size="icon">
                            <MoreVertical className="h-4 w-4" />
                          </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end">
                          <DropdownMenuItem 
                            onClick={() => navigate(`/intranet/personas/${empleado.id}`)}
                          >
                            <Eye className="mr-2 h-4 w-4" />
                            Ver Detalles
                          </DropdownMenuItem>
                          <DropdownMenuItem 
                            onClick={() => navigate(`/intranet/personas/${empleado.id}/edit`)}
                          >
                            <Edit className="mr-2 h-4 w-4" />
                            Editar
                          </DropdownMenuItem>
                          {empleado.activo && (
                            <DropdownMenuItem 
                              onClick={() => setOffboardingEmployee(empleado)}
                              className="text-destructive"
                            >
                              <UserX className="mr-2 h-4 w-4" />
                              Iniciar Baja
                            </DropdownMenuItem>
                          )}
                        </DropdownMenuContent>
                      </DropdownMenu>
                    </TableCell>
                  </TableRow>
                ))
              ) : (
                <TableRow>
                  <TableCell colSpan={8} className="text-center py-8 text-muted-foreground">
                    No se encontraron empleados
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        </div>
      </div>

      {offboardingEmployee && (
        <OffboardingModal
          employee={offboardingEmployee}
          open={!!offboardingEmployee}
          onClose={() => setOffboardingEmployee(null)}
          onSuccess={() => {
            setOffboardingEmployee(null);
            refetch();
          }}
        />
      )}
    </IntranetLayout>
  );
}
