import { IntranetLayout } from "@/components/intranet/IntranetLayout";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { ChevronLeft, Edit, Calendar } from "lucide-react";
import { useNavigate, useParams } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { StatusBadge } from "@/components/intranet/StatusBadge";
import { format } from "date-fns";

export default function PersonasDetail() {
  const { id } = useParams();
  const navigate = useNavigate();

  const { data: empleado, isLoading } = useQuery({
    queryKey: ['empleado', id],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('empleados')
        .select('*')
        .eq('id', id)
        .single();
      
      if (error) throw error;
      return data;
    },
  });

  const { data: movimientos } = useQuery({
    queryKey: ['empleado-movimientos', id],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('audit_logs')
        .select('*')
        .eq('entity', 'empleados')
        .eq('entity_id', id)
        .order('created_at', { ascending: false });
      
      if (error) throw error;
      return data;
    },
  });

  if (isLoading) {
    return (
      <IntranetLayout>
        <div className="container-custom py-8">
          <p>Cargando...</p>
        </div>
      </IntranetLayout>
    );
  }

  if (!empleado) {
    return (
      <IntranetLayout>
        <div className="container-custom py-8">
          <p>Empleado no encontrado</p>
        </div>
      </IntranetLayout>
    );
  }

  return (
    <IntranetLayout>
      <div className="container-custom py-8">
        <div className="flex items-center justify-between mb-8">
          <Button
            variant="ghost"
            onClick={() => navigate('/intranet/personas')}
          >
            <ChevronLeft className="mr-2 h-4 w-4" />
            Volver
          </Button>
          <Button onClick={() => navigate(`/intranet/personas/${id}/edit`)}>
            <Edit className="mr-2 h-4 w-4" />
            Editar
          </Button>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Left Column - Details */}
          <div className="lg:col-span-2 space-y-6">
            <Card className="p-6">
              <div className="flex items-start justify-between mb-6">
                <div>
                  <h1 className="text-3xl font-serif font-bold mb-2">
                    {empleado.nombre}
                  </h1>
                  <p className="text-lg text-muted-foreground">{empleado.rol || empleado.puesto}</p>
                </div>
                <StatusBadge status={empleado.activo ? 'active' : 'inactive'} />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <p className="text-sm text-muted-foreground">Email</p>
                  <p className="font-medium">{empleado.email || '-'}</p>
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">NIF</p>
                  <p className="font-medium">{empleado.nif || '-'}</p>
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">Área</p>
                  <p className="font-medium">{empleado.area || empleado.departamento || '-'}</p>
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">Oficina</p>
                  <p className="font-medium">{empleado.oficina || '-'}</p>
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">Fecha de Alta</p>
                  <p className="font-medium">
                    {empleado.fecha_alta 
                      ? format(new Date(empleado.fecha_alta), 'dd/MM/yyyy')
                      : '-'}
                  </p>
                </div>
                {empleado.fecha_baja && (
                  <div>
                    <p className="text-sm text-muted-foreground">Fecha de Baja</p>
                    <p className="font-medium">
                      {format(new Date(empleado.fecha_baja), 'dd/MM/yyyy')}
                    </p>
                  </div>
                )}
              </div>
            </Card>
          </div>

          {/* Right Column - Timeline */}
          <div>
            <Card className="p-6">
              <h2 className="text-xl font-semibold mb-4 flex items-center gap-2">
                <Calendar className="h-5 w-5" />
                Timeline de Movimientos
              </h2>
              
              <div className="space-y-4">
                {movimientos && movimientos.length > 0 ? (
                  movimientos.map((mov, index) => (
                    <div key={mov.id} className="relative pl-6 pb-4 border-l-2 last:border-l-0">
                      <div className="absolute left-0 top-0 -translate-x-1/2 w-3 h-3 rounded-full bg-accent" />
                      <div className="space-y-1">
                        <p className="text-sm font-medium">{mov.action}</p>
                        <p className="text-xs text-muted-foreground">
                          {format(new Date(mov.created_at), 'dd/MM/yyyy HH:mm')}
                        </p>
                        {mov.data && (
                          <div className="text-xs text-muted-foreground mt-2 p-2 bg-muted rounded">
                            {Object.entries(mov.data as any).map(([key, value]) => (
                              <div key={key}>
                                <span className="font-medium">{key}:</span> {String(value)}
                              </div>
                            ))}
                          </div>
                        )}
                      </div>
                    </div>
                  ))
                ) : (
                  <p className="text-sm text-muted-foreground">No hay movimientos registrados</p>
                )}
              </div>
            </Card>
          </div>
        </div>
      </div>
    </IntranetLayout>
  );
}
