import { useAuth } from "@/contexts/AuthContext";
import { IntranetLayout } from "@/components/intranet/IntranetLayout";
import { Card } from "@/components/ui/card";
import { Users, FileText, Award, FolderOpen } from "lucide-react";
import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";

export default function Dashboard() {
  const { user, roles } = useAuth();

  const { data: stats } = useQuery({
    queryKey: ['dashboard-stats', roles],
    queryFn: async () => {
      const results: any = { employees: 0, posts: 0, cases: 0, media: 0 };

      // Fetch employee count if user has HR or admin role
      if (roles.includes('admin') || roles.includes('hr')) {
        const { count } = await supabase
          .from('empleados')
          .select('*', { count: 'exact', head: true });
        results.employees = count || 0;
      }

      // Fetch blog posts count
      if (roles.includes('admin') || roles.includes('marketing') || roles.includes('editor')) {
        const { count } = await supabase
          .from('blog_posts' as any)
          .select('*', { count: 'exact', head: true });
        results.posts = count || 0;
      }

      // Fetch case studies count
      if (roles.includes('admin') || roles.includes('legal') || roles.includes('marketing')) {
        const { count } = await supabase
          .from('case_studies' as any)
          .select('*', { count: 'exact', head: true });
        results.cases = count || 0;
      }

      // Fetch media files count
      if (roles.includes('admin') || roles.includes('editor') || roles.includes('marketing')) {
        const { count } = await supabase
          .from('media_files' as any)
          .select('*', { count: 'exact', head: true });
        results.media = count || 0;
      }

      return results;
    },
  });

  const { data: recentActivity } = useQuery({
    queryKey: ['recent-activity'],
    queryFn: async () => {
      const { data } = await supabase
        .from('audit_logs')
        .select('*')
        .order('created_at', { ascending: false })
        .limit(5);
      return data || [];
    },
  });

  const statCards = [
    {
      title: "Empleados",
      value: stats?.employees || 0,
      icon: Users,
      visible: roles.includes('admin') || roles.includes('hr'),
    },
    {
      title: "Posts",
      value: stats?.posts || 0,
      icon: FileText,
      visible: roles.includes('admin') || roles.includes('marketing') || roles.includes('editor'),
    },
    {
      title: "Casos",
      value: stats?.cases || 0,
      icon: Award,
      visible: roles.includes('admin') || roles.includes('legal') || roles.includes('marketing'),
    },
    {
      title: "Archivos",
      value: stats?.media || 0,
      icon: FolderOpen,
      visible: roles.includes('admin') || roles.includes('editor') || roles.includes('marketing'),
    },
  ].filter(card => card.visible);

  return (
    <IntranetLayout>
      <div className="container-custom py-8">
        <div className="mb-8">
          <h1 className="text-4xl font-serif font-bold mb-2">
            Bienvenido, {user?.email?.split('@')[0]}
          </h1>
          <p className="text-muted-foreground">
            Dashboard de Navarro Intranet
          </p>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          {statCards.map((stat) => {
            const Icon = stat.icon;
            return (
              <Card key={stat.title} className="p-6">
                <div className="flex items-center justify-between mb-4">
                  <Icon className="h-8 w-8 text-accent" />
                </div>
                <div>
                  <p className="text-3xl font-bold mb-1">{stat.value}</p>
                  <p className="text-sm text-muted-foreground">{stat.title}</p>
                </div>
              </Card>
            );
          })}
        </div>

        {/* Recent Activity */}
        <Card className="p-6">
          <h2 className="text-xl font-semibold mb-4">Actividad Reciente</h2>
          <div className="space-y-3">
            {recentActivity && recentActivity.length > 0 ? (
              recentActivity.map((activity) => (
                <div
                  key={activity.id}
                  className="flex items-start gap-3 text-sm border-b pb-3 last:border-0"
                >
                  <div className="flex-1">
                    <p className="text-foreground">
                      <span className="font-medium">{activity.actor}</span>{" "}
                      {activity.action} en {activity.entity}
                    </p>
                    <p className="text-xs text-muted-foreground">
                      {new Date(activity.created_at).toLocaleString('es-ES')}
                    </p>
                  </div>
                </div>
              ))
            ) : (
              <p className="text-muted-foreground text-sm">No hay actividad reciente</p>
            )}
          </div>
        </Card>
      </div>
    </IntranetLayout>
  );
}
