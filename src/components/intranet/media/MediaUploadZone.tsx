import { useCallback } from 'react';
import { useDropzone } from 'react-dropzone';
import { Upload, FileImage, FileText } from 'lucide-react';
import { supabase } from '@/integrations/supabase/client';
import { toast } from '@/hooks/use-toast';

interface MediaUploadZoneProps {
  onUploadComplete: () => void;
}

const MediaUploadZone = ({ onUploadComplete }: MediaUploadZoneProps) => {
  const onDrop = useCallback(async (acceptedFiles: File[]) => {
    for (const file of acceptedFiles) {
      if (file.size > 10485760) {
        toast({
          title: 'Archivo demasiado grande',
          description: `${file.name} excede el límite de 10MB`,
          variant: 'destructive',
        });
        continue;
      }

      try {
        const fileExt = file.name.split('.').pop();
        const fileName = `${crypto.randomUUID()}.${fileExt}`;
        const filePath = `originals/${fileName}`;

        const { error: uploadError } = await supabase.storage
          .from('media-library')
          .upload(filePath, file);

        if (uploadError) throw uploadError;

        const { data: { user } } = await supabase.auth.getUser();
        if (!user) throw new Error('No user found');

        const { error: processError } = await supabase.functions.invoke('process-media', {
          body: {
            file_path: filePath,
            uploaded_by: user.id,
            file_name: file.name,
            mime_type: file.type,
            file_size: file.size,
          },
        });

        if (processError) throw processError;

        toast({
          title: 'Archivo subido',
          description: `${file.name} se ha subido correctamente`,
        });
      } catch (error: any) {
        toast({
          title: 'Error al subir archivo',
          description: error.message,
          variant: 'destructive',
        });
      }
    }

    onUploadComplete();
  }, [onUploadComplete]);

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: {
      'image/*': ['.jpg', '.jpeg', '.png', '.webp', '.gif', '.svg'],
      'application/pdf': ['.pdf'],
    },
    multiple: true,
  });

  return (
    <div
      {...getRootProps()}
      className={`border-2 border-dashed rounded-lg p-8 text-center cursor-pointer transition-colors ${
        isDragActive
          ? 'border-primary bg-primary/5'
          : 'border-border hover:border-primary/50'
      }`}
    >
      <input {...getInputProps()} />
      <Upload className="h-12 w-12 mx-auto mb-4 text-muted-foreground" />
      <p className="text-lg font-medium mb-2">
        {isDragActive
          ? 'Suelta los archivos aquí'
          : 'Arrastra archivos aquí o haz clic para seleccionar'}
      </p>
      <p className="text-sm text-muted-foreground mb-4">
        Imágenes (JPG, PNG, WebP, GIF, SVG) o PDFs hasta 10MB
      </p>
      <div className="flex justify-center gap-4 text-xs text-muted-foreground">
        <div className="flex items-center gap-1">
          <FileImage className="h-4 w-4" />
          <span>Imágenes</span>
        </div>
        <div className="flex items-center gap-1">
          <FileText className="h-4 w-4" />
          <span>PDFs</span>
        </div>
      </div>
    </div>
  );
};

export default MediaUploadZone;
