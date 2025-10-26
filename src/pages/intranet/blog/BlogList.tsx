import { useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import { supabase } from '@/integrations/supabase/client';
import { useAuth } from '@/contexts/AuthContext';
import IntranetLayout from '@/components/intranet/IntranetLayout';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Tabs, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Badge } from '@/components/ui/badge';
import { Card } from '@/components/ui/card';
import { Plus, Search, MoreVertical, Edit, Archive, Trash2, History, Eye } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { format } from 'date-fns';
import { es } from 'date-fns/locale';
import { BLOG_STATUS_CONFIG, BLOG_CATEGORIES } from '@/lib/blog-helpers';
import type { BlogStatus } from '@/lib/blog-helpers';
import ConfirmationModal from '@/components/intranet/ConfirmationModal';
import { toast } from '@/hooks/use-toast';

const BlogList = () => {
  const navigate = useNavigate();
  const { user, hasAnyRole } = useAuth();
  const [search, setSearch] = useState('');
  const [statusFilter, setStatusFilter] = useState<BlogStatus | 'all'>('all');
  const [categoryFilter, setCategoryFilter] = useState<string>('all');
  const [deletePostId, setDeletePostId] = useState<string | null>(null);

  const { data: posts, isLoading, refetch } = useQuery({
    queryKey: ['blog-posts', statusFilter, categoryFilter, search],
    queryFn: async () => {
      let query = supabase
        .from('blog_posts')
        .select('*, author:author_id(email)')
        .order('created_at', { ascending: false });

      if (statusFilter !== 'all') {
        query = query.eq('status', statusFilter);
      }

      if (categoryFilter !== 'all') {
        query = query.eq('blog_category', categoryFilter);
      }

      if (search) {
        query = query.or(`title_es.ilike.%${search}%,title_en.ilike.%${search}%`);
      }

      const { data, error } = await query;
      if (error) throw error;
      return data;
    },
  });

  const handleDelete = async () => {
    if (!deletePostId) return;

    const { error } = await supabase.from('blog_posts').delete().eq('id', deletePostId);

    if (error) {
      toast({
        title: 'Error',
        description: 'No se pudo eliminar el post',
        variant: 'destructive',
      });
    } else {
      toast({
        title: 'Post eliminado',
        description: 'El post se ha eliminado correctamente',
      });
      refetch();
    }
    setDeletePostId(null);
  };

  const handleArchive = async (postId: string) => {
    const { error } = await supabase
      .from('blog_posts')
      .update({ status: 'archived' })
      .eq('id', postId);

    if (error) {
      toast({
        title: 'Error',
        description: 'No se pudo archivar el post',
        variant: 'destructive',
      });
    } else {
      toast({
        title: 'Post archivado',
        description: 'El post se ha archivado correctamente',
      });
      refetch();
    }
  };

  const getStatusBadge = (status: BlogStatus) => {
    const config = BLOG_STATUS_CONFIG[status];
    return (
      <Badge variant="outline" className={`${config.bgColor} ${config.color} border-0`}>
        {config.label}
      </Badge>
    );
  };

  return (
    <IntranetLayout>
      <div className="space-y-6">
        <div className="flex justify-between items-center">
          <div>
            <h1 className="text-3xl font-bold">Blog & Insights</h1>
            <p className="text-muted-foreground">Gestiona el contenido del blog</p>
          </div>
          {hasAnyRole(['admin', 'marketing', 'editor']) && (
            <Button onClick={() => navigate('/intranet/blog/new')}>
              <Plus className="h-4 w-4 mr-2" />
              Nuevo Post
            </Button>
          )}
        </div>

        <Card className="p-6">
          <div className="space-y-4">
            <Tabs value={statusFilter} onValueChange={(v) => setStatusFilter(v as BlogStatus | 'all')}>
              <TabsList>
                <TabsTrigger value="all">Todos</TabsTrigger>
                <TabsTrigger value="draft">Borradores</TabsTrigger>
                <TabsTrigger value="in_review">En Revisión</TabsTrigger>
                <TabsTrigger value="scheduled">Programados</TabsTrigger>
                <TabsTrigger value="published">Publicados</TabsTrigger>
                <TabsTrigger value="archived">Archivados</TabsTrigger>
              </TabsList>
            </Tabs>

            <div className="flex gap-4">
              <div className="relative flex-1">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                <Input
                  placeholder="Buscar por título..."
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                  className="pl-9"
                />
              </div>
              <Select value={categoryFilter} onValueChange={setCategoryFilter}>
                <SelectTrigger className="w-[200px]">
                  <SelectValue placeholder="Categoría" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">Todas las categorías</SelectItem>
                  {BLOG_CATEGORIES.map((cat) => (
                    <SelectItem key={cat} value={cat}>
                      {cat}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </div>
        </Card>

        <Card>
          {isLoading ? (
            <div className="p-8 text-center text-muted-foreground">Cargando...</div>
          ) : posts && posts.length > 0 ? (
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Imagen</TableHead>
                  <TableHead>Título</TableHead>
                  <TableHead>Estado</TableHead>
                  <TableHead>Categoría</TableHead>
                  <TableHead>Autor</TableHead>
                  <TableHead>Fecha</TableHead>
                  <TableHead>Acciones</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {posts.map((post: any) => (
                  <TableRow key={post.id}>
                    <TableCell>
                      {post.featured_image_url ? (
                        <img
                          src={post.featured_image_url}
                          alt=""
                          className="w-16 h-16 object-cover rounded"
                        />
                      ) : (
                        <div className="w-16 h-16 bg-muted rounded flex items-center justify-center">
                          <Eye className="h-6 w-6 text-muted-foreground" />
                        </div>
                      )}
                    </TableCell>
                    <TableCell>
                      <div className="max-w-xs truncate font-medium">{post.title_es}</div>
                    </TableCell>
                    <TableCell>{getStatusBadge(post.status)}</TableCell>
                    <TableCell>
                      {post.blog_category && (
                        <Badge variant="outline">{post.blog_category}</Badge>
                      )}
                    </TableCell>
                    <TableCell className="text-sm text-muted-foreground">
                      {post.author?.email || 'Sin autor'}
                    </TableCell>
                    <TableCell className="text-sm text-muted-foreground">
                      {post.published_at
                        ? format(new Date(post.published_at), 'dd/MM/yyyy', { locale: es })
                        : post.scheduled_at
                        ? format(new Date(post.scheduled_at), 'dd/MM/yyyy', { locale: es })
                        : format(new Date(post.created_at), 'dd/MM/yyyy', { locale: es })}
                    </TableCell>
                    <TableCell>
                      <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                          <Button variant="ghost" size="sm">
                            <MoreVertical className="h-4 w-4" />
                          </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end">
                          <DropdownMenuItem onClick={() => navigate(`/intranet/blog/${post.id}/edit`)}>
                            <Edit className="h-4 w-4 mr-2" />
                            Editar
                          </DropdownMenuItem>
                          <DropdownMenuItem onClick={() => navigate(`/intranet/blog/${post.id}/history`)}>
                            <History className="h-4 w-4 mr-2" />
                            Historial
                          </DropdownMenuItem>
                          {post.status !== 'archived' && hasAnyRole(['admin', 'marketing']) && (
                            <DropdownMenuItem onClick={() => handleArchive(post.id)}>
                              <Archive className="h-4 w-4 mr-2" />
                              Archivar
                            </DropdownMenuItem>
                          )}
                          {hasAnyRole(['admin']) && (
                            <DropdownMenuItem
                              onClick={() => setDeletePostId(post.id)}
                              className="text-destructive"
                            >
                              <Trash2 className="h-4 w-4 mr-2" />
                              Eliminar
                            </DropdownMenuItem>
                          )}
                        </DropdownMenuContent>
                      </DropdownMenu>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          ) : (
            <div className="p-8 text-center text-muted-foreground">
              No se encontraron posts
            </div>
          )}
        </Card>
      </div>

      <ConfirmationModal
        open={!!deletePostId}
        onOpenChange={(open) => !open && setDeletePostId(null)}
        title="Eliminar post"
        description="¿Estás seguro de que quieres eliminar este post? Esta acción no se puede deshacer."
        confirmText="Eliminar"
        variant="destructive"
        onConfirm={handleDelete}
      />
    </IntranetLayout>
  );
};

export default BlogList;
