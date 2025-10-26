import { useState } from 'react';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { supabase } from '@/integrations/supabase/client';
import { IntranetLayout } from '@/components/intranet/IntranetLayout';
import MediaUploadZone from '@/components/intranet/media/MediaUploadZone';
import MediaFilters from '@/components/intranet/media/MediaFilters';
import MediaGrid from '@/components/intranet/media/MediaGrid';
import MediaPreviewModal from '@/components/intranet/media/MediaPreviewModal';
import { Button } from '@/components/ui/button';
import { Grid3x3, List } from 'lucide-react';
import { toast } from '@/hooks/use-toast';

const MediaLibrary = () => {
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');
  const [filters, setFilters] = useState({ search: '', type: 'all', tag: 'all' });
  const [selectedFile, setSelectedFile] = useState<any>(null);
  const [previewOpen, setPreviewOpen] = useState(false);
  const queryClient = useQueryClient();

  const { data: mediaFiles, isLoading } = useQuery({
    queryKey: ['media-files', filters],
    queryFn: async () => {
      let query = supabase
        .from('media_files')
        .select('*')
        .order('created_at', { ascending: false });

      if (filters.type !== 'all') {
        query = query.eq('file_type', filters.type);
      }

      if (filters.search) {
        query = query.or(`file_name.ilike.%${filters.search}%,title.ilike.%${filters.search}%`);
      }

      const { data, error } = await query;
      if (error) throw error;
      return data || [];
    },
  });

  const deleteMutation = useMutation({
    mutationFn: async (id: string) => {
      const file = mediaFiles?.find((f) => f.id === id);
      if (!file) throw new Error('File not found');

      // Delete from storage
      const { error: storageError } = await supabase.storage
        .from('media-library')
        .remove([file.original_path]);

      if (storageError) throw storageError;

      // Delete from database
      const { error: dbError } = await supabase
        .from('media_files')
        .delete()
        .eq('id', id);

      if (dbError) throw dbError;
    },
    onSuccess: () => {
      toast({
        title: 'Archivo eliminado',
        description: 'El archivo se ha eliminado correctamente',
      });
      queryClient.invalidateQueries({ queryKey: ['media-files'] });
    },
    onError: (error: any) => {
      toast({
        title: 'Error al eliminar',
        description: error.message,
        variant: 'destructive',
      });
    },
  });

  const handleUploadComplete = () => {
    queryClient.invalidateQueries({ queryKey: ['media-files'] });
  };

  const handleSelectFile = (file: any) => {
    setSelectedFile(file);
    setPreviewOpen(true);
  };

  const handleUpdateFile = () => {
    queryClient.invalidateQueries({ queryKey: ['media-files'] });
  };

  return (
    <IntranetLayout>
      <div className="container mx-auto p-6 space-y-6">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold">Biblioteca de Medios</h1>
            <p className="text-muted-foreground">
              Gestiona imágenes y documentos compartidos
            </p>
          </div>
          <div className="flex gap-2">
            <Button
              variant={viewMode === 'grid' ? 'default' : 'outline'}
              size="icon"
              onClick={() => setViewMode('grid')}
            >
              <Grid3x3 className="h-4 w-4" />
            </Button>
            <Button
              variant={viewMode === 'list' ? 'default' : 'outline'}
              size="icon"
              onClick={() => setViewMode('list')}
            >
              <List className="h-4 w-4" />
            </Button>
          </div>
        </div>

        <MediaUploadZone onUploadComplete={handleUploadComplete} />

        <MediaFilters onFilterChange={setFilters} />

        {isLoading ? (
          <div className="text-center py-12 text-muted-foreground">
            Cargando archivos...
          </div>
        ) : mediaFiles && mediaFiles.length > 0 ? (
          <MediaGrid
            files={mediaFiles}
            onSelect={handleSelectFile}
            onDelete={(id) => deleteMutation.mutate(id)}
          />
        ) : (
          <div className="text-center py-12 text-muted-foreground">
            No se encontraron archivos. Sube tu primer archivo arriba.
          </div>
        )}

        <MediaPreviewModal
          file={selectedFile}
          open={previewOpen}
          onOpenChange={setPreviewOpen}
          onUpdate={handleUpdateFile}
        />
      </div>
    </IntranetLayout>
  );
};

export default MediaLibrary;
