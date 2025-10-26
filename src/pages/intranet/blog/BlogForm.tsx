import { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { useQuery, useMutation } from '@tanstack/react-query';
import { supabase } from '@/integrations/supabase/client';
import { useAuth } from '@/contexts/AuthContext';
import IntranetLayout from '@/components/intranet/IntranetLayout';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Card } from '@/components/ui/card';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Badge } from '@/components/ui/badge';
import { Textarea } from '@/components/ui/textarea';
import { Eye, Save, Send, Clock, Upload, X } from 'lucide-react';
import RichTextEditor from '@/components/intranet/RichTextEditor';
import MediaPickerModal from '@/components/intranet/MediaPickerModal';
import SEOPreview from '@/components/intranet/SEOPreview';
import BlogPreview from '@/components/intranet/BlogPreview';
import ScheduleModal from '@/components/intranet/ScheduleModal';
import ConfirmationModal from '@/components/intranet/ConfirmationModal';
import { toast } from '@/hooks/use-toast';
import { generateSlug, calculateReadTime, BLOG_CATEGORIES, BLOG_STATUS_CONFIG, canTransitionStatus } from '@/lib/blog-helpers';
import type { BlogStatus } from '@/lib/blog-helpers';

const BlogForm = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { user, hasAnyRole } = useAuth();
  const isEdit = !!id;

  const [language, setLanguage] = useState<'es' | 'en'>('es');
  const [showMediaPicker, setShowMediaPicker] = useState(false);
  const [showPreview, setShowPreview] = useState(false);
  const [showScheduleModal, setShowScheduleModal] = useState(false);
  const [confirmAction, setConfirmAction] = useState<{ type: string; status?: BlogStatus } | null>(null);

  const [formData, setFormData] = useState({
    title_es: '',
    slug_es: '',
    content_es: '',
    excerpt_es: '',
    seo_title_es: '',
    seo_description_es: '',
    title_en: '',
    slug_en: '',
    content_en: '',
    excerpt_en: '',
    seo_title_en: '',
    seo_description_en: '',
    featured_image_url: '',
    featured_image_alt_es: '',
    featured_image_alt_en: '',
    blog_category: '',
    tags: [] as string[],
    status: 'draft' as BlogStatus,
    scheduled_at: null as Date | null,
  });

  const [tagInput, setTagInput] = useState('');
  const [autoSaving, setAutoSaving] = useState(false);

  // Fetch existing post if editing
  const { data: existingPost } = useQuery({
    queryKey: ['blog-post', id],
    queryFn: async () => {
      if (!id) return null;
      const { data, error } = await supabase
        .from('blog_posts')
        .select('*')
        .eq('id', id)
        .single();
      if (error) throw error;
      return data;
    },
    enabled: isEdit,
  });

  useEffect(() => {
    if (existingPost) {
      setFormData({
        title_es: existingPost.title_es || '',
        slug_es: existingPost.slug_es || '',
        content_es: existingPost.content_es || '',
        excerpt_es: existingPost.excerpt_es || '',
        seo_title_es: existingPost.seo_title_es || '',
        seo_description_es: existingPost.seo_description_es || '',
        title_en: existingPost.title_en || '',
        slug_en: existingPost.slug_en || '',
        content_en: existingPost.content_en || '',
        excerpt_en: existingPost.excerpt_en || '',
        seo_title_en: existingPost.seo_title_en || '',
        seo_description_en: existingPost.seo_description_en || '',
        featured_image_url: existingPost.featured_image_url || '',
        featured_image_alt_es: existingPost.featured_image_alt_es || '',
        featured_image_alt_en: existingPost.featured_image_alt_en || '',
        blog_category: existingPost.blog_category || '',
        tags: existingPost.tags || [],
        status: existingPost.status as BlogStatus,
        scheduled_at: existingPost.scheduled_at ? new Date(existingPost.scheduled_at) : null,
      });
    }
  }, [existingPost]);

  // Auto-generate slug from title
  useEffect(() => {
    if (language === 'es' && formData.title_es && !isEdit) {
      setFormData((prev) => ({ ...prev, slug_es: generateSlug(formData.title_es) }));
    } else if (language === 'en' && formData.title_en && !isEdit) {
      setFormData((prev) => ({ ...prev, slug_en: generateSlug(formData.title_en) }));
    }
  }, [formData.title_es, formData.title_en, language, isEdit]);

  // Auto-save draft every 30 seconds
  useEffect(() => {
    if (!isEdit || formData.status !== 'draft') return;

    const interval = setInterval(async () => {
      if (!id) return;
      setAutoSaving(true);
      const { error } = await supabase
        .from('blog_posts')
        .update({
          ...formData,
          read_time_minutes: calculateReadTime(formData.content_es),
        })
        .eq('id', id);

      if (!error) {
        toast({
          title: 'Borrador guardado',
          description: 'Los cambios se han guardado automáticamente',
        });
      }
      setAutoSaving(false);
    }, 30000);

    return () => clearInterval(interval);
  }, [formData, id, isEdit]);

  const saveMutation = useMutation({
    mutationFn: async (data: typeof formData) => {
      const payload = {
        ...data,
        read_time_minutes: calculateReadTime(data.content_es),
        author_id: user?.id,
      };

      if (isEdit && id) {
        const { data: result, error } = await supabase
          .from('blog_posts')
          .update(payload)
          .eq('id', id)
          .select()
          .single();
        if (error) throw error;
        return result;
      } else {
        const { data: result, error } = await supabase
          .from('blog_posts')
          .insert(payload)
          .select()
          .single();
        if (error) throw error;
        return result;
      }
    },
    onSuccess: (data) => {
      toast({
        title: isEdit ? 'Post actualizado' : 'Post creado',
        description: 'Los cambios se han guardado correctamente',
      });
      if (!isEdit) {
        navigate(`/intranet/blog/${data.id}/edit`);
      }
    },
    onError: (error: any) => {
      toast({
        title: 'Error',
        description: error.message,
        variant: 'destructive',
      });
    },
  });

  const handleSave = (newStatus?: BlogStatus) => {
    const dataToSave = {
      ...formData,
      status: newStatus || formData.status,
    };
    saveMutation.mutate(dataToSave);
  };

  const handleSchedule = (date: Date) => {
    const dataToSave = {
      ...formData,
      status: 'scheduled' as BlogStatus,
      scheduled_at: date,
    };
    saveMutation.mutate(dataToSave);
  };

  const handleStatusChange = (newStatus: BlogStatus) => {
    const userRole = hasAnyRole(['admin']) ? 'admin' : hasAnyRole(['marketing']) ? 'marketing' : 'editor';
    const isAuthor = existingPost?.author_id === user?.id;

    if (!canTransitionStatus(formData.status, newStatus, userRole, isAuthor)) {
      toast({
        title: 'Acción no permitida',
        description: 'No tienes permisos para realizar esta acción',
        variant: 'destructive',
      });
      return;
    }

    if (newStatus === 'scheduled') {
      setShowScheduleModal(true);
    } else {
      setConfirmAction({ type: 'status', status: newStatus });
    }
  };

  const addTag = () => {
    if (tagInput && !formData.tags.includes(tagInput)) {
      setFormData((prev) => ({ ...prev, tags: [...prev.tags, tagInput] }));
      setTagInput('');
    }
  };

  const removeTag = (tag: string) => {
    setFormData((prev) => ({ ...prev, tags: prev.tags.filter((t) => t !== tag) }));
  };

  const currentTitle = language === 'es' ? formData.title_es : formData.title_en;
  const currentContent = language === 'es' ? formData.content_es : formData.content_en;
  const currentSlug = language === 'es' ? formData.slug_es : formData.slug_en;
  const currentSeoTitle = language === 'es' ? formData.seo_title_es : formData.seo_title_en;
  const currentSeoDesc = language === 'es' ? formData.seo_description_es : formData.seo_description_en;

  const statusConfig = BLOG_STATUS_CONFIG[formData.status];

  return (
    <IntranetLayout>
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Main Editor */}
        <div className="lg:col-span-2 space-y-6">
          <div className="flex justify-between items-center">
            <div>
              <h1 className="text-3xl font-bold">{isEdit ? 'Editar Post' : 'Nuevo Post'}</h1>
              {autoSaving && <p className="text-sm text-muted-foreground">Guardando...</p>}
            </div>
            <Button variant="outline" onClick={() => setShowPreview(true)}>
              <Eye className="h-4 w-4 mr-2" />
              Vista Previa
            </Button>
          </div>

          <Card className="p-6">
            <Tabs value={language} onValueChange={(v) => setLanguage(v as 'es' | 'en')}>
              <TabsList className="mb-4">
                <TabsTrigger value="es">🇪🇸 Español</TabsTrigger>
                <TabsTrigger value="en">🇬🇧 English</TabsTrigger>
              </TabsList>

              <TabsContent value={language} className="space-y-4">
                <div>
                  <Label htmlFor="title">Título *</Label>
                  <Input
                    id="title"
                    value={currentTitle}
                    onChange={(e) =>
                      setFormData((prev) => ({
                        ...prev,
                        [language === 'es' ? 'title_es' : 'title_en']: e.target.value,
                      }))
                    }
                    placeholder="Título del post"
                  />
                </div>

                <div>
                  <Label htmlFor="slug">Slug (URL)</Label>
                  <Input
                    id="slug"
                    value={currentSlug}
                    onChange={(e) =>
                      setFormData((prev) => ({
                        ...prev,
                        [language === 'es' ? 'slug_es' : 'slug_en']: e.target.value,
                      }))
                    }
                    placeholder="slug-del-post"
                  />
                  <p className="text-xs text-muted-foreground mt-1">
                    navarrolegal.es/insights/{currentSlug || 'slug-del-post'}
                  </p>
                </div>

                <div>
                  <Label>Contenido *</Label>
                  <RichTextEditor
                    content={currentContent}
                    onChange={(html) =>
                      setFormData((prev) => ({
                        ...prev,
                        [language === 'es' ? 'content_es' : 'content_en']: html,
                      }))
                    }
                    onImageInsert={() => setShowMediaPicker(true)}
                  />
                </div>

                <div>
                  <Label htmlFor="excerpt">Extracto</Label>
                  <Textarea
                    id="excerpt"
                    value={language === 'es' ? formData.excerpt_es : formData.excerpt_en}
                    onChange={(e) =>
                      setFormData((prev) => ({
                        ...prev,
                        [language === 'es' ? 'excerpt_es' : 'excerpt_en']: e.target.value,
                      }))
                    }
                    placeholder="Breve resumen del post (200 caracteres)"
                    rows={3}
                    maxLength={200}
                  />
                </div>

                <div className="space-y-3">
                  <Label>SEO Meta</Label>
                  <Input
                    placeholder="Título SEO (máx. 60 caracteres)"
                    value={currentSeoTitle}
                    onChange={(e) =>
                      setFormData((prev) => ({
                        ...prev,
                        [language === 'es' ? 'seo_title_es' : 'seo_title_en']: e.target.value,
                      }))
                    }
                    maxLength={60}
                  />
                  <Textarea
                    placeholder="Descripción SEO (máx. 160 caracteres)"
                    value={currentSeoDesc}
                    onChange={(e) =>
                      setFormData((prev) => ({
                        ...prev,
                        [language === 'es' ? 'seo_description_es' : 'seo_description_en']: e.target.value,
                      }))
                    }
                    rows={2}
                    maxLength={160}
                  />
                </div>
              </TabsContent>
            </Tabs>
          </Card>
        </div>

        {/* Sidebar */}
        <div className="space-y-6">
          {/* Status & Publishing */}
          <Card className="p-6">
            <h3 className="font-semibold mb-4">Estado & Publicación</h3>
            <div className={`${statusConfig.bgColor} ${statusConfig.color} px-4 py-2 rounded-lg text-center font-medium mb-4`}>
              {statusConfig.label}
            </div>

            <div className="space-y-2">
              <Button
                className="w-full"
                variant="outline"
                onClick={() => handleSave()}
                disabled={saveMutation.isPending}
              >
                <Save className="h-4 w-4 mr-2" />
                Guardar Borrador
              </Button>

              {formData.status === 'draft' && (
                <Button
                  className="w-full"
                  onClick={() => handleStatusChange('in_review')}
                  disabled={saveMutation.isPending}
                >
                  <Send className="h-4 w-4 mr-2" />
                  Enviar a Revisión
                </Button>
              )}

              {(formData.status === 'draft' || formData.status === 'in_review') && hasAnyRole(['admin', 'marketing']) && (
                <>
                  <Button
                    className="w-full"
                    variant="outline"
                    onClick={() => setShowScheduleModal(true)}
                    disabled={saveMutation.isPending}
                  >
                    <Clock className="h-4 w-4 mr-2" />
                    Programar
                  </Button>
                  <Button
                    className="w-full"
                    onClick={() => handleStatusChange('published')}
                    disabled={saveMutation.isPending}
                  >
                    Publicar Ahora
                  </Button>
                </>
              )}
            </div>
          </Card>

          {/* Featured Image */}
          <Card className="p-6">
            <h3 className="font-semibold mb-4">Imagen Destacada</h3>
            {formData.featured_image_url ? (
              <div className="space-y-3">
                <img
                  src={formData.featured_image_url}
                  alt="Featured"
                  className="w-full h-48 object-cover rounded"
                />
                <Button
                  variant="outline"
                  size="sm"
                  className="w-full"
                  onClick={() => setFormData((prev) => ({ ...prev, featured_image_url: '' }))}
                >
                  <X className="h-4 w-4 mr-2" />
                  Quitar
                </Button>
              </div>
            ) : (
              <Button
                variant="outline"
                className="w-full"
                onClick={() => setShowMediaPicker(true)}
              >
                <Upload className="h-4 w-4 mr-2" />
                Seleccionar Imagen
              </Button>
            )}
          </Card>

          {/* Category & Tags */}
          <Card className="p-6">
            <h3 className="font-semibold mb-4">Categoría & Tags</h3>
            <div className="space-y-4">
              <div>
                <Label>Categoría</Label>
                <Select
                  value={formData.blog_category}
                  onValueChange={(v) => setFormData((prev) => ({ ...prev, blog_category: v }))}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Selecciona" />
                  </SelectTrigger>
                  <SelectContent>
                    {BLOG_CATEGORIES.map((cat) => (
                      <SelectItem key={cat} value={cat}>
                        {cat}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              <div>
                <Label>Tags</Label>
                <div className="flex gap-2">
                  <Input
                    value={tagInput}
                    onChange={(e) => setTagInput(e.target.value)}
                    onKeyDown={(e) => e.key === 'Enter' && (e.preventDefault(), addTag())}
                    placeholder="Añadir tag"
                  />
                  <Button type="button" onClick={addTag} size="sm">
                    +
                  </Button>
                </div>
                <div className="flex flex-wrap gap-2 mt-2">
                  {formData.tags.map((tag) => (
                    <Badge key={tag} variant="secondary">
                      {tag}
                      <button
                        onClick={() => removeTag(tag)}
                        className="ml-1 hover:text-destructive"
                      >
                        ×
                      </button>
                    </Badge>
                  ))}
                </div>
              </div>
            </div>
          </Card>

          {/* SEO Preview */}
          <SEOPreview
            title={currentSeoTitle || currentTitle}
            description={currentSeoDesc || (language === 'es' ? formData.excerpt_es : formData.excerpt_en)}
            slug={currentSlug}
          />
        </div>
      </div>

      <MediaPickerModal
        open={showMediaPicker}
        onOpenChange={setShowMediaPicker}
        onSelect={(url) => setFormData((prev) => ({ ...prev, featured_image_url: url }))}
      />

      <BlogPreview
        open={showPreview}
        onOpenChange={setShowPreview}
        title={currentTitle}
        content={currentContent}
        category={formData.blog_category}
        tags={formData.tags}
        featuredImage={formData.featured_image_url}
        language={language}
      />

      <ScheduleModal
        open={showScheduleModal}
        onOpenChange={setShowScheduleModal}
        onSchedule={handleSchedule}
      />

      <ConfirmationModal
        open={!!confirmAction}
        onOpenChange={(open) => !open && setConfirmAction(null)}
        title={`Cambiar estado a ${confirmAction?.status ? BLOG_STATUS_CONFIG[confirmAction.status].label : ''}`}
        description="¿Estás seguro de que quieres cambiar el estado de este post?"
        onConfirm={() => confirmAction?.status && handleSave(confirmAction.status)}
      />
    </IntranetLayout>
  );
};

export default BlogForm;
