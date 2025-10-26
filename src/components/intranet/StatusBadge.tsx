import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";

type BadgeStatus = 
  | 'draft' 
  | 'published' 
  | 'archived' 
  | 'pending' 
  | 'approved' 
  | 'rejected' 
  | 'active' 
  | 'inactive';

interface StatusBadgeProps {
  status: BadgeStatus;
  className?: string;
}

const statusConfig: Record<BadgeStatus, { label: string; className: string }> = {
  draft: { label: 'Borrador', className: 'bg-muted text-muted-foreground' },
  published: { label: 'Publicado', className: 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200' },
  archived: { label: 'Archivado', className: 'bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200' },
  pending: { label: 'Pendiente', className: 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-200' },
  approved: { label: 'Aprobado', className: 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200' },
  rejected: { label: 'Rechazado', className: 'bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200' },
  active: { label: 'Activo', className: 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200' },
  inactive: { label: 'Inactivo', className: 'bg-muted text-muted-foreground' },
};

export function StatusBadge({ status, className }: StatusBadgeProps) {
  const config = statusConfig[status];
  
  return (
    <Badge 
      variant="secondary" 
      className={cn(config.className, 'text-xs', className)}
    >
      {config.label}
    </Badge>
  );
}
