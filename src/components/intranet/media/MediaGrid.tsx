import { FileText, Image as ImageIcon, Trash2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from '@/components/ui/alert-dialog';
import { useState } from 'react';

interface MediaFile {
  id: string;
  file_name: string;
  file_type: string;
  original_url: string;
  thumbnail_url: string | null;
  usage_count: number;
  created_at: string;
}

interface MediaGridProps {
  files: MediaFile[];
  onSelect: (file: MediaFile) => void;
  onDelete: (id: string) => void;
}

const MediaGrid = ({ files, onSelect, onDelete }: MediaGridProps) => {
  const [deleteId, setDeleteId] = useState<string | null>(null);

  const handleDelete = () => {
    if (deleteId) {
      onDelete(deleteId);
      setDeleteId(null);
    }
  };

  return (
    <>
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
        {files.map((file) => (
          <div
            key={file.id}
            className="group relative aspect-square rounded-lg border border-border overflow-hidden cursor-pointer hover:ring-2 hover:ring-primary transition-all"
            onClick={() => onSelect(file)}
          >
            {file.file_type === 'image' ? (
              <img
                src={file.thumbnail_url || file.original_url}
                alt={file.file_name}
                className="w-full h-full object-cover"
              />
            ) : (
              <div className="w-full h-full flex items-center justify-center bg-muted">
                <FileText className="h-16 w-16 text-muted-foreground" />
              </div>
            )}
            <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity">
              <div className="absolute bottom-0 left-0 right-0 p-3">
                <p className="text-white text-sm font-medium truncate">
                  {file.file_name}
                </p>
                <div className="flex items-center gap-2 mt-2">
                  <Badge variant="secondary" className="text-xs">
                    {file.file_type === 'image' ? (
                      <ImageIcon className="h-3 w-3 mr-1" />
                    ) : (
                      <FileText className="h-3 w-3 mr-1" />
                    )}
                    {file.file_type}
                  </Badge>
                  {file.usage_count > 0 && (
                    <Badge variant="outline" className="text-xs bg-background/80">
                      {file.usage_count} usos
                    </Badge>
                  )}
                </div>
              </div>
              <Button
                variant="destructive"
                size="icon"
                className="absolute top-2 right-2 opacity-0 group-hover:opacity-100"
                onClick={(e) => {
                  e.stopPropagation();
                  setDeleteId(file.id);
                }}
              >
                <Trash2 className="h-4 w-4" />
              </Button>
            </div>
          </div>
        ))}
      </div>

      <AlertDialog open={!!deleteId} onOpenChange={() => setDeleteId(null)}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>¿Eliminar archivo?</AlertDialogTitle>
            <AlertDialogDescription>
              Esta acción no se puede deshacer. El archivo será eliminado permanentemente.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancelar</AlertDialogCancel>
            <AlertDialogAction onClick={handleDelete}>Eliminar</AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </>
  );
};

export default MediaGrid;
