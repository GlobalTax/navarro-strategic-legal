import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { formatDistanceToNow } from "date-fns";
import { es } from "date-fns/locale";

interface AuditLogTableProps {
  logs: any[];
  onRowClick: (log: any) => void;
}

export const AuditLogTable = ({ logs, onRowClick }: AuditLogTableProps) => {
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

  if (logs.length === 0) {
    return (
      <div className="text-center py-12 text-muted-foreground">
        No se encontraron registros de auditoría
      </div>
    );
  }

  return (
    <div className="rounded-md border">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Fecha</TableHead>
            <TableHead>Usuario</TableHead>
            <TableHead>Acción</TableHead>
            <TableHead>Entidad</TableHead>
            <TableHead>Detalles</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {logs.map((log) => (
            <TableRow
              key={log.id}
              className="cursor-pointer hover:bg-muted/50"
              onClick={() => onRowClick(log)}
            >
              <TableCell className="font-medium">
                {formatDistanceToNow(new Date(log.created_at), {
                  addSuffix: true,
                  locale: es,
                })}
              </TableCell>
              <TableCell>{log.actor || 'Sistema'}</TableCell>
              <TableCell>
                <Badge variant={getActionBadgeVariant(log.action)}>
                  {log.action}
                </Badge>
              </TableCell>
              <TableCell>{log.entity}</TableCell>
              <TableCell className="max-w-xs truncate">
                {log.entity_id}
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
};
