import React from 'react';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { Badge } from '@/components/ui/badge';
import { format } from 'date-fns';
import { es } from 'date-fns/locale';
import DOMPurify from 'dompurify';

interface BlogPreviewProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  title: string;
  content: string;
  category?: string;
  tags?: string[];
  featuredImage?: string;
  language: 'es' | 'en';
}

const BlogPreview = ({
  open,
  onOpenChange,
  title,
  content,
  category,
  tags,
  featuredImage,
  language,
}: BlogPreviewProps) => {
  const sanitizedContent = DOMPurify.sanitize(content);

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-4xl max-h-[90vh] overflow-auto">
        <DialogHeader>
          <DialogTitle>Vista Previa - {language === 'es' ? 'Español' : 'English'}</DialogTitle>
        </DialogHeader>

        <div className="bg-muted/30 p-2 rounded text-xs text-muted-foreground mb-4">
          ⚠️ Esta es una vista previa. Los cambios no guardados no se mostrarán en la versión publicada.
        </div>

        <article className="space-y-6">
          {featuredImage && (
            <img
              src={featuredImage}
              alt={title}
              className="w-full h-64 object-cover rounded-lg"
            />
          )}

          <div className="space-y-2">
            {category && (
              <Badge variant="secondary">{category}</Badge>
            )}
            <h1 className="text-4xl font-serif font-bold text-foreground">
              {title || 'Sin título'}
            </h1>
            <div className="flex items-center gap-4 text-sm text-muted-foreground">
              <span>{format(new Date(), "d 'de' MMMM 'de' yyyy", { locale: es })}</span>
              <span>·</span>
              <span>Vista previa</span>
            </div>
          </div>

          <div
            className="prose prose-lg max-w-none"
            dangerouslySetInnerHTML={{ __html: sanitizedContent }}
          />

          {tags && tags.length > 0 && (
            <div className="pt-6 border-t border-border">
              <div className="flex flex-wrap gap-2">
                {tags.map((tag) => (
                  <Badge key={tag} variant="outline">
                    {tag}
                  </Badge>
                ))}
              </div>
            </div>
          )}
        </article>
      </DialogContent>
    </Dialog>
  );
};

export default BlogPreview;
