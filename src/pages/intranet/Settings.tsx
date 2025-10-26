import { IntranetLayout } from "@/components/intranet/IntranetLayout";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { UsersRoles } from "./settings/UsersRoles";
import { PermissionsMatrix } from "@/components/intranet/settings/PermissionsMatrix";
import { useAuth } from "@/contexts/AuthContext";

export default function Settings() {
  const { hasRole } = useAuth();

  if (!hasRole('admin')) {
    return (
      <IntranetLayout>
        <div className="p-8 text-center">
          <p className="text-muted-foreground">No tienes permisos para acceder a la configuración.</p>
        </div>
      </IntranetLayout>
    );
  }

  return (
    <IntranetLayout>
      <div className="p-8 space-y-6">
        <div>
          <h1 className="text-3xl font-bold">Configuración</h1>
          <p className="text-muted-foreground">
            Gestiona usuarios, roles y permisos del sistema
          </p>
        </div>

        <Tabs defaultValue="users" className="space-y-4">
          <TabsList>
            <TabsTrigger value="users">Usuarios y Roles</TabsTrigger>
            <TabsTrigger value="permissions">Matriz de Permisos</TabsTrigger>
          </TabsList>

          <TabsContent value="users" className="space-y-4">
            <UsersRoles />
          </TabsContent>

          <TabsContent value="permissions" className="space-y-4">
            <div className="space-y-4">
              <p className="text-sm text-muted-foreground">
                Esta matriz muestra todos los permisos asignados a cada rol del sistema.
              </p>
              <PermissionsMatrix />
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </IntranetLayout>
  );
}
