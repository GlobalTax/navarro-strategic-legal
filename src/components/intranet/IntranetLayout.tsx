import { ReactNode } from "react";
import { Navigate } from "react-router-dom";
import { useAuth } from "@/contexts/AuthContext";
import { Topbar } from "./Topbar";
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupContent,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarProvider,
} from "@/components/ui/sidebar";
import {
  LayoutDashboard,
  Users,
  FileText,
  Award,
  FolderOpen,
  FileSearch,
  Settings,
} from "lucide-react";
import { Link, useLocation } from "react-router-dom";
import { useTheme } from "next-themes";
import { Button } from "@/components/ui/button";
import { Moon, Sun } from "lucide-react";

type AppRole = 'admin' | 'hr' | 'marketing' | 'legal' | 'editor' | 'viewer';

interface NavItem {
  icon: typeof LayoutDashboard;
  label: string;
  path: string;
  roles: AppRole[];
}

const navigationItems: NavItem[] = [
  { icon: LayoutDashboard, label: "Dashboard", path: "/intranet/dashboard", roles: [] },
  { icon: Users, label: "Personas", path: "/intranet/personas", roles: ['admin', 'hr'] },
  { icon: FileText, label: "Blog & Insights", path: "/intranet/blog", roles: ['admin', 'marketing', 'editor'] },
  { icon: Award, label: "Casos de Éxito", path: "/intranet/cases", roles: ['admin', 'legal', 'marketing'] },
  { icon: FolderOpen, label: "Media Library", path: "/intranet/media", roles: ['admin', 'editor', 'marketing'] },
  { icon: FileSearch, label: "Audit Logs", path: "/intranet/audit", roles: ['admin'] },
  { icon: Settings, label: "Settings", path: "/intranet/settings", roles: ['admin'] },
];

export function IntranetLayout({ children }: { children: ReactNode }) {
  const { user, loading, hasAnyRole, roles } = useAuth();
  const location = useLocation();
  const { theme, setTheme } = useTheme();

  if (loading) {
    return (
      <div className="flex h-screen items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary mx-auto" />
          <p className="mt-4 text-muted-foreground">Cargando...</p>
        </div>
      </div>
    );
  }

  if (!user) {
    return <Navigate to="/intranet/login" replace />;
  }

  const visibleNavItems = navigationItems.filter(
    item => item.roles.length === 0 || hasAnyRole(item.roles)
  );

  return (
    <SidebarProvider>
      <div className="flex min-h-screen w-full">
        <Sidebar>
          <SidebarHeader className="border-b p-6">
            <h2 className="text-xl font-serif font-bold">Navarro Intranet</h2>
          </SidebarHeader>
          
          <SidebarContent>
            <SidebarGroup>
              <SidebarGroupContent>
                <SidebarMenu>
                  {visibleNavItems.map((item) => {
                    const Icon = item.icon;
                    const isActive = location.pathname === item.path || 
                                   location.pathname.startsWith(item.path + '/');
                    
                    return (
                      <SidebarMenuItem key={item.path}>
                        <SidebarMenuButton asChild isActive={isActive}>
                          <Link to={item.path}>
                            <Icon className="h-5 w-5" />
                            <span>{item.label}</span>
                          </Link>
                        </SidebarMenuButton>
                      </SidebarMenuItem>
                    );
                  })}
                </SidebarMenu>
              </SidebarGroupContent>
            </SidebarGroup>
          </SidebarContent>

          <SidebarFooter className="border-t p-4">
            <Button
              variant="ghost"
              size="sm"
              onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
              className="w-full justify-start gap-2"
            >
              <Sun className="h-4 w-4 rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0" />
              <Moon className="absolute h-4 w-4 rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100 ml-0" />
              <span className="ml-6">
                {theme === "dark" ? "Modo Claro" : "Modo Oscuro"}
              </span>
            </Button>
          </SidebarFooter>
        </Sidebar>

        <div className="flex-1 flex flex-col">
          <Topbar />
          <main className="flex-1 overflow-auto bg-background">
            {children}
          </main>
        </div>
      </div>
    </SidebarProvider>
  );
}
