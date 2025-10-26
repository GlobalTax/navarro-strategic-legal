import { Badge } from "@/components/ui/badge";

interface CaseStatusBadgeProps {
  status: 'draft' | 'in_review' | 'published';
}

const CaseStatusBadge = ({ status }: CaseStatusBadgeProps) => {
  const statusConfig = {
    draft: { label: 'Borrador', variant: 'secondary' as const },
    in_review: { label: 'En Revisión', variant: 'default' as const },
    published: { label: 'Publicado', variant: 'default' as const }
  };

  const config = statusConfig[status];

  return (
    <Badge 
      variant={config.variant}
      className={
        status === 'draft' ? 'bg-muted text-muted-foreground' :
        status === 'in_review' ? 'bg-yellow-500/10 text-yellow-700 dark:text-yellow-400' :
        'bg-green-500/10 text-green-700 dark:text-green-400'
      }
    >
      {config.label}
    </Badge>
  );
};

export default CaseStatusBadge;
