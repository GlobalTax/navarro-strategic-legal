import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
} from "@/components/ui/sheet";
import { Badge } from "@/components/ui/badge";
import { formatDistanceToNow } from "date-fns";
import { es } from "date-fns/locale";

interface AuditLogDrawerProps {
  log: any;
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export const AuditLogDrawer = ({ log, open, onOpenChange }: AuditLogDrawerProps) => {
  if (!log) return null;

  const renderDiff = () => {
    if (!log.data) return null;

    // Check if it's an UPDATE with before/after
    if (log.data.before && log.data.after) {
      const before = log.data.before;
      const after = log.data.after;
      
      const changes = Object.keys(after).reduce((acc: any, key) => {
        if (JSON.stringify(before[key]) !== JSON.stringify(after[key])) {
          acc[key] = { before: before[key], after: after[key] };
        }
        return acc;
      }, {});

      if (Object.keys(changes).length === 0) {
        return <p className="text-sm text-muted-foreground">Sin cambios detectados</p>;
      }

      return (
        <div className="space-y-4">
          {Object.entries(changes).map(([field, { before, after }]: [string, any]) => (
            <div key={field} className="border-l-2 border-primary pl-3 space-y-2">
              <p className="font-semibold text-sm">{field}</p>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
                <div className="bg-destructive/10 p-3 rounded-md">
                  <span className="text-xs font-medium text-destructive block mb-1">Antes:</span>
                  <pre className="text-xs overflow-auto">
                    {JSON.stringify(before, null, 2)}
                  </pre>
                </div>
                <div className="bg-primary/10 p-3 rounded-md">
                  <span className="text-xs font-medium text-primary block mb-1">Después:</span>
                  <pre className="text-xs overflow-auto">
                    {JSON.stringify(after, null, 2)}
                  </pre>
                </div>
              </div>
            </div>
          ))}
        </div>
      );
    }

    // For CREATE or DELETE, just show the data
    return (
      <div className="bg-muted p-4 rounded-md">
        <pre className="text-xs overflow-auto">
          {JSON.stringify(log.data, null, 2)}
        </pre>
      </div>
    );
  };

  const getActionBadgeVariant = (action: string) => {
    switch (action) {
      case 'CREATE':
      case 'ALTA':
        return 'default';
      case 'UPDATE':
      case 'MOVIMIENTO':
        return 'secondary';
      case 'DELETE':
      case 'BAJA':
        return 'destructive';
      default:
        return 'outline';
    }
  };

  return (
    <Sheet open={open} onOpenChange={onOpenChange}>
      <SheetContent className="sm:max-w-2xl overflow-y-auto">
        <SheetHeader>
          <SheetTitle>Detalles del Registro de Auditoría</SheetTitle>
          <SheetDescription>
            {formatDistanceToNow(new Date(log.created_at), {
              addSuffix: true,
              locale: es,
            })}
          </SheetDescription>
        </SheetHeader>

        <div className="mt-6 space-y-6">
          <div className="grid grid-cols-2 gap-4">
            <div>
              <p className="text-sm font-medium text-muted-foreground">Entidad</p>
              <p className="text-sm font-semibold">{log.entity}</p>
            </div>
            <div>
              <p className="text-sm font-medium text-muted-foreground">Acción</p>
              <Badge variant={getActionBadgeVariant(log.action)}>
                {log.action}
              </Badge>
            </div>
            <div>
              <p className="text-sm font-medium text-muted-foreground">Usuario</p>
              <p className="text-sm">{log.actor || 'Sistema'}</p>
            </div>
            <div>
              <p className="text-sm font-medium text-muted-foreground">ID de Entidad</p>
              <p className="text-sm font-mono text-xs">{log.entity_id}</p>
            </div>
          </div>

          <div>
            <p className="text-sm font-medium mb-3">
              {log.action === 'UPDATE' ? 'Cambios Realizados' : 'Datos'}
            </p>
            {renderDiff()}
          </div>
        </div>
      </SheetContent>
    </Sheet>
  );
};
