import { useState } from 'react';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import { Badge } from '@/components/ui/badge';
import { Copy, Save, FileText } from 'lucide-react';
import { toast } from '@/hooks/use-toast';
import { supabase } from '@/integrations/supabase/client';

interface MediaFile {
  id: string;
  file_name: string;
  file_type: string;
  original_url: string;
  thumbnail_url: string | null;
  card_url: string | null;
  hero_url: string | null;
  title: string | null;
  alt_text: string | null;
  description: string | null;
  tags: string[];
  usage_count: number;
  file_size: number;
  width: number | null;
  height: number | null;
  uploaded_at: string;
}

interface MediaPreviewModalProps {
  file: MediaFile | null;
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onUpdate: () => void;
}

const MediaPreviewModal = ({ file, open, onOpenChange, onUpdate }: MediaPreviewModalProps) => {
  const [title, setTitle] = useState('');
  const [altText, setAltText] = useState('');
  const [description, setDescription] = useState('');
  const [saving, setSaving] = useState(false);

  const handleOpen = (isOpen: boolean) => {
    if (isOpen && file) {
      setTitle(file.title || '');
      setAltText(file.alt_text || '');
      setDescription(file.description || '');
    }
    onOpenChange(isOpen);
  };

  const copyToClipboard = (url: string, label: string) => {
    navigator.clipboard.writeText(url);
    toast({
      title: 'Copiado',
      description: `URL ${label} copiada al portapapeles`,
    });
  };

  const handleSave = async () => {
    if (!file) return;

    setSaving(true);
    try {
      const { error } = await supabase
        .from('media_files')
        .update({
          title,
          alt_text: altText,
          description,
        })
        .eq('id', file.id);

      if (error) throw error;

      toast({
        title: 'Guardado',
        description: 'Los metadatos se han actualizado correctamente',
      });
      onUpdate();
    } catch (error: any) {
      toast({
        title: 'Error',
        description: error.message,
        variant: 'destructive',
      });
    } finally {
      setSaving(false);
    }
  };

  if (!file) return null;

  const formatFileSize = (bytes: number) => {
    if (bytes < 1024) return `${bytes} B`;
    if (bytes < 1048576) return `${(bytes / 1024).toFixed(1)} KB`;
    return `${(bytes / 1048576).toFixed(1)} MB`;
  };

  return (
    <Dialog open={open} onOpenChange={handleOpen}>
      <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>{file.file_name}</DialogTitle>
        </DialogHeader>

        <div className="grid md:grid-cols-2 gap-6">
          <div className="space-y-4">
            <div className="rounded-lg border border-border overflow-hidden bg-muted aspect-square flex items-center justify-center">
              {file.file_type === 'image' ? (
                <img
                  src={file.original_url}
                  alt={file.alt_text || file.file_name}
                  className="max-w-full max-h-full object-contain"
                />
              ) : (
                <FileText className="h-24 w-24 text-muted-foreground" />
              )}
            </div>

            <div className="space-y-2">
              <div className="flex items-center justify-between text-sm">
                <span className="text-muted-foreground">Tamaño:</span>
                <span className="font-medium">{formatFileSize(file.file_size)}</span>
              </div>
              {file.width && file.height && (
                <div className="flex items-center justify-between text-sm">
                  <span className="text-muted-foreground">Dimensiones:</span>
                  <span className="font-medium">{file.width} × {file.height}px</span>
                </div>
              )}
              <div className="flex items-center justify-between text-sm">
                <span className="text-muted-foreground">Usos:</span>
                <Badge variant="secondary">{file.usage_count}</Badge>
              </div>
            </div>

            {file.file_type === 'image' && (
              <div className="space-y-2">
                <Label>Copiar URLs</Label>
                <div className="space-y-2">
                  <Button
                    variant="outline"
                    size="sm"
                    className="w-full justify-between"
                    onClick={() => copyToClipboard(file.original_url, 'original')}
                  >
                    <span>Original</span>
                    <Copy className="h-4 w-4" />
                  </Button>
                  {file.thumbnail_url && (
                    <Button
                      variant="outline"
                      size="sm"
                      className="w-full justify-between"
                      onClick={() => copyToClipboard(file.thumbnail_url!, 'thumbnail')}
                    >
                      <span>Miniatura (150px)</span>
                      <Copy className="h-4 w-4" />
                    </Button>
                  )}
                  {file.card_url && (
                    <Button
                      variant="outline"
                      size="sm"
                      className="w-full justify-between"
                      onClick={() => copyToClipboard(file.card_url!, 'tarjeta')}
                    >
                      <span>Tarjeta (600px)</span>
                      <Copy className="h-4 w-4" />
                    </Button>
                  )}
                  {file.hero_url && (
                    <Button
                      variant="outline"
                      size="sm"
                      className="w-full justify-between"
                      onClick={() => copyToClipboard(file.hero_url!, 'hero')}
                    >
                      <span>Hero (1920px)</span>
                      <Copy className="h-4 w-4" />
                    </Button>
                  )}
                </div>
              </div>
            )}
          </div>

          <div className="space-y-4">
            <div>
              <Label htmlFor="title">Título</Label>
              <Input
                id="title"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                placeholder="Título descriptivo"
              />
            </div>

            {file.file_type === 'image' && (
              <div>
                <Label htmlFor="altText">Texto alternativo</Label>
                <Input
                  id="altText"
                  value={altText}
                  onChange={(e) => setAltText(e.target.value)}
                  placeholder="Descripción para accesibilidad"
                />
              </div>
            )}

            <div>
              <Label htmlFor="description">Descripción</Label>
              <Textarea
                id="description"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                placeholder="Descripción del archivo"
                rows={4}
              />
            </div>

            <Button
              onClick={handleSave}
              disabled={saving}
              className="w-full"
            >
              <Save className="h-4 w-4 mr-2" />
              {saving ? 'Guardando...' : 'Guardar cambios'}
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default MediaPreviewModal;
