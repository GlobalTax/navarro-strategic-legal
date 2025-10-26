import { Card } from '@/components/ui/card';
import { FileText } from 'lucide-react';

interface SEOPreviewProps {
  title: string;
  description: string;
  slug: string;
}

const SEOPreview = ({ title, description, slug }: SEOPreviewProps) => {
  const displayTitle = title || 'Título del post';
  const displayDescription = description || 'Descripción del post...';
  const displayUrl = `navarrolegal.es/insights/${slug || 'slug-del-post'}`;

  const titleLength = displayTitle.length;
  const descLength = displayDescription.length;

  const getTitleColor = () => {
    if (titleLength > 60) return 'text-destructive';
    if (titleLength > 50) return 'text-yellow-500';
    return 'text-green-500';
  };

  const getDescColor = () => {
    if (descLength > 160) return 'text-destructive';
    if (descLength > 150) return 'text-yellow-500';
    return 'text-green-500';
  };

  return (
    <Card className="p-4">
      <div className="flex items-center gap-2 mb-3">
        <FileText className="h-4 w-4 text-muted-foreground" />
        <h3 className="font-semibold text-sm">Vista Previa SEO</h3>
      </div>

      <div className="space-y-1 p-3 bg-muted/50 rounded-lg">
        <div className="text-[#1A0DAB] text-lg font-medium line-clamp-1">
          {displayTitle}
        </div>
        <div className="text-[#006621] text-sm truncate">{displayUrl}</div>
        <div className="text-[#545454] text-sm line-clamp-2">{displayDescription}</div>
      </div>

      <div className="mt-3 space-y-1 text-xs">
        <div className="flex justify-between">
          <span className="text-muted-foreground">Título:</span>
          <span className={getTitleColor()}>
            {titleLength}/60 caracteres
          </span>
        </div>
        <div className="flex justify-between">
          <span className="text-muted-foreground">Descripción:</span>
          <span className={getDescColor()}>
            {descLength}/160 caracteres
          </span>
        </div>
      </div>
    </Card>
  );
};

export default SEOPreview;
