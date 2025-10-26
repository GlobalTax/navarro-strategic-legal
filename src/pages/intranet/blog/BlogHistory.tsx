import { useParams } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';
import { supabase } from '@/integrations/supabase/client';
import { IntranetLayout } from '@/components/intranet/IntranetLayout';
import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { format } from 'date-fns';
import { es } from 'date-fns/locale';
import { BLOG_STATUS_CONFIG } from '@/lib/blog-helpers';
import type { BlogStatus } from '@/lib/blog-helpers';
import { ArrowRight } from 'lucide-react';

const BlogHistory = () => {
  const { id } = useParams();

  const { data: post } = useQuery({
    queryKey: ['blog-post', id],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('blog_posts' as any)
        .select('title_es')
        .eq('id', id)
        .single();
      if (error) throw error;
      return data as any;
    },
  });

  const { data: history, isLoading } = useQuery({
    queryKey: ['blog-history', id],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('blog_post_state_changes' as any)
        .select('*, changer:changed_by(email)')
        .eq('post_id', id)
        .order('changed_at', { ascending: false });
      if (error) throw error;
      return data as any;
    },
  });

  return (
    <IntranetLayout>
      <div className="max-w-4xl mx-auto space-y-6">
        <div>
          <h1 className="text-3xl font-bold">Historial del Post</h1>
          {post && <p className="text-muted-foreground">{post.title_es}</p>}
        </div>

        <Card className="p-6">
          {isLoading ? (
            <div className="text-center py-8 text-muted-foreground">Cargando...</div>
          ) : history && history.length > 0 ? (
            <div className="relative">
              <div className="absolute left-4 top-4 bottom-4 w-0.5 bg-border" />
              <div className="space-y-6">
                {history.map((item: any, index: number) => {
                  const fromConfig = item.from_status ? BLOG_STATUS_CONFIG[item.from_status as BlogStatus] : null;
                  const toConfig = BLOG_STATUS_CONFIG[item.to_status as BlogStatus];

                  return (
                    <div key={item.id} className="relative pl-12">
                      <div className="absolute left-0 top-0 w-8 h-8 rounded-full bg-accent flex items-center justify-center border-4 border-background">
                        <div className="w-3 h-3 rounded-full bg-background" />
                      </div>

                      <div className="space-y-2">
                        <div className="flex items-center gap-2 flex-wrap">
                          {fromConfig && (
                            <Badge
                              variant="outline"
                              className={`${fromConfig.bgColor} ${fromConfig.color} border-0`}
                            >
                              {fromConfig.label}
                            </Badge>
                          )}
                          {fromConfig && <ArrowRight className="h-4 w-4 text-muted-foreground" />}
                          <Badge
                            variant="outline"
                            className={`${toConfig.bgColor} ${toConfig.color} border-0`}
                          >
                            {toConfig.label}
                          </Badge>
                        </div>

                        <div className="text-sm text-muted-foreground">
                          <span className="font-medium">{item.changer?.email || 'Sistema'}</span>
                          <span className="mx-2">·</span>
                          <span>
                            {format(new Date(item.changed_at), "d 'de' MMMM 'de' yyyy, HH:mm", {
                              locale: es,
                            })}
                          </span>
                        </div>

                        {item.notes && (
                          <p className="text-sm text-muted-foreground italic">{item.notes}</p>
                        )}
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          ) : (
            <div className="text-center py-8 text-muted-foreground">
              No hay historial disponible
            </div>
          )}
        </Card>
      </div>
    </IntranetLayout>
  );
};

export default BlogHistory;
