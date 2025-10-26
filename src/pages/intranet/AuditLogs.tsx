import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { IntranetLayout } from "@/components/intranet/IntranetLayout";
import { AuditLogFilters } from "@/components/intranet/audit/AuditLogFilters";
import { AuditLogTable } from "@/components/intranet/audit/AuditLogTable";
import { AuditLogDrawer } from "@/components/intranet/audit/AuditLogDrawer";
import { useAuth } from "@/contexts/AuthContext";
import { Button } from "@/components/ui/button";
import { Download } from "lucide-react";
import { toast } from "sonner";

export default function AuditLogs() {
  const { hasRole } = useAuth();
  const [entityFilter, setEntityFilter] = useState('all');
  const [actionFilter, setActionFilter] = useState('all');
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedLog, setSelectedLog] = useState<any>(null);
  const [drawerOpen, setDrawerOpen] = useState(false);

  const { data: logs = [], isLoading } = useQuery({
    queryKey: ['audit-logs', entityFilter, actionFilter, searchTerm],
    queryFn: async () => {
      let query = supabase
        .from('audit_logs')
        .select('*')
        .order('created_at', { ascending: false })
        .limit(100);

      if (entityFilter !== 'all') {
        query = query.eq('entity', entityFilter);
      }

      if (actionFilter !== 'all') {
        query = query.eq('action', actionFilter);
      }

      if (searchTerm) {
        query = query.or(`entity_id.ilike.%${searchTerm}%,actor.ilike.%${searchTerm}%`);
      }

      const { data, error } = await query;
      if (error) throw error;
      return data;
    },
    enabled: hasRole('admin'),
  });

  const handleRowClick = (log: any) => {
    setSelectedLog(log);
    setDrawerOpen(true);
  };

  const handleExportCSV = () => {
    if (logs.length === 0) {
      toast.error('No hay datos para exportar');
      return;
    }

    const headers = ['Fecha', 'Usuario', 'Acción', 'Entidad', 'ID Entidad'];
    const rows = logs.map(log => [
      new Date(log.created_at).toLocaleString('es-ES'),
      log.actor || 'Sistema',
      log.action,
      log.entity,
      log.entity_id,
    ]);

    const csvContent = [
      headers.join(','),
      ...rows.map(row => row.join(',')),
    ].join('\n');

    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
    const link = document.createElement('a');
    link.href = URL.createObjectURL(blob);
    link.download = `audit-logs-${new Date().toISOString().split('T')[0]}.csv`;
    link.click();

    toast.success('Audit logs exportados correctamente');
  };

  if (!hasRole('admin')) {
    return (
      <IntranetLayout>
        <div className="p-8 text-center">
          <p className="text-muted-foreground">No tienes permisos para ver los registros de auditoría.</p>
        </div>
      </IntranetLayout>
    );
  }

  return (
    <IntranetLayout>
      <div className="p-8 space-y-6">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold">Registros de Auditoría</h1>
            <p className="text-muted-foreground">
              Historial completo de cambios en el sistema
            </p>
          </div>
          <Button onClick={handleExportCSV} variant="outline">
            <Download className="h-4 w-4 mr-2" />
            Exportar CSV
          </Button>
        </div>

        <AuditLogFilters
          entityFilter={entityFilter}
          setEntityFilter={setEntityFilter}
          actionFilter={actionFilter}
          setActionFilter={setActionFilter}
          searchTerm={searchTerm}
          setSearchTerm={setSearchTerm}
        />

        {isLoading ? (
          <div className="text-center py-12 text-muted-foreground">
            Cargando registros...
          </div>
        ) : (
          <AuditLogTable logs={logs} onRowClick={handleRowClick} />
        )}

        <AuditLogDrawer
          log={selectedLog}
          open={drawerOpen}
          onOpenChange={setDrawerOpen}
        />
      </div>
    </IntranetLayout>
  );
}
