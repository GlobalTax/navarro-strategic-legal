import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Plus, Trash2 } from "lucide-react";
import { toast } from "sonner";
import { useState } from "react";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";

type AppRole = 'admin' | 'hr' | 'marketing' | 'legal' | 'editor' | 'viewer';

export const UsersRoles = () => {
  const queryClient = useQueryClient();
  const [selectedUser, setSelectedUser] = useState<string>('');
  const [selectedRole, setSelectedRole] = useState<AppRole>('viewer');
  const [deleteTarget, setDeleteTarget] = useState<{ userId: string; role: AppRole } | null>(null);

  const { data: users = [] } = useQuery({
    queryKey: ['users-with-roles'],
    queryFn: async () => {
      const { data: profiles } = await supabase.from('profiles').select('id, email');
      const { data: userRoles } = await supabase.from('user_roles').select('*');

      const usersMap = new Map();
      profiles?.forEach(profile => {
        usersMap.set(profile.id, {
          ...profile,
          roles: [],
        });
      });

      userRoles?.forEach(ur => {
        const user = usersMap.get(ur.user_id);
        if (user) {
          user.roles.push(ur.role);
        }
      });

      return Array.from(usersMap.values());
    },
  });

  const assignRoleMutation = useMutation({
    mutationFn: async ({ userId, role }: { userId: string; role: AppRole }) => {
      const { error } = await supabase
        .from('user_roles')
        .insert([{ user_id: userId, role: role as any }]);
      if (error) throw error;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['users-with-roles'] });
      toast.success('Rol asignado correctamente');
      setSelectedUser('');
    },
    onError: (error: any) => {
      toast.error(error.message || 'Error al asignar rol');
    },
  });

  const removeRoleMutation = useMutation({
    mutationFn: async ({ userId, role }: { userId: string; role: AppRole }) => {
      const { error } = await supabase
        .from('user_roles')
        .delete()
        .match({ user_id: userId, role });
      if (error) throw error;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['users-with-roles'] });
      toast.success('Rol eliminado correctamente');
      setDeleteTarget(null);
    },
    onError: (error: any) => {
      toast.error(error.message || 'Error al eliminar rol');
    },
  });

  const handleAssignRole = () => {
    if (!selectedUser) {
      toast.error('Selecciona un usuario');
      return;
    }
    assignRoleMutation.mutate({ userId: selectedUser, role: selectedRole });
  };

  return (
    <div className="space-y-6">
      <div className="bg-card p-4 rounded-lg border">
        <h3 className="font-semibold mb-4">Asignar Nuevo Rol</h3>
        <div className="flex gap-4">
          <Select value={selectedUser} onValueChange={setSelectedUser}>
            <SelectTrigger className="flex-1">
              <SelectValue placeholder="Seleccionar usuario" />
            </SelectTrigger>
            <SelectContent>
              {users.map(user => (
                <SelectItem key={user.id} value={user.id}>
                  {user.email}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
          <Select value={selectedRole} onValueChange={(v) => setSelectedRole(v as AppRole)}>
            <SelectTrigger className="w-[200px]">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="admin">Admin</SelectItem>
              <SelectItem value="marketing">Marketing</SelectItem>
              <SelectItem value="legal">Legal</SelectItem>
              <SelectItem value="editor">Editor</SelectItem>
              <SelectItem value="hr">HR</SelectItem>
              <SelectItem value="viewer">Viewer</SelectItem>
            </SelectContent>
          </Select>
          <Button onClick={handleAssignRole} disabled={assignRoleMutation.isPending}>
            <Plus className="h-4 w-4 mr-2" />
            Asignar
          </Button>
        </div>
      </div>

      <div className="rounded-md border">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Usuario</TableHead>
              <TableHead>Roles</TableHead>
              <TableHead className="w-[100px]">Acciones</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {users.map(user => (
              <TableRow key={user.id}>
                <TableCell className="font-medium">{user.email}</TableCell>
                <TableCell>
                  <div className="flex gap-2 flex-wrap">
                    {user.roles.length === 0 ? (
                      <span className="text-sm text-muted-foreground">Sin roles</span>
                    ) : (
                      user.roles.map((role: AppRole) => (
                        <Badge key={role} variant="secondary" className="gap-2">
                          {role}
                          <Trash2
                            className="h-3 w-3 cursor-pointer hover:text-destructive"
                            onClick={() => setDeleteTarget({ userId: user.id, role })}
                          />
                        </Badge>
                      ))
                    )}
                  </div>
                </TableCell>
                <TableCell>
                  <span className="text-sm text-muted-foreground">
                    {user.roles.length} {user.roles.length === 1 ? 'rol' : 'roles'}
                  </span>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>

      <AlertDialog open={!!deleteTarget} onOpenChange={() => setDeleteTarget(null)}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>¿Eliminar rol?</AlertDialogTitle>
            <AlertDialogDescription>
              ¿Estás seguro de que quieres eliminar el rol <strong>{deleteTarget?.role}</strong> de este usuario?
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancelar</AlertDialogCancel>
            <AlertDialogAction
              onClick={() => deleteTarget && removeRoleMutation.mutate(deleteTarget)}
            >
              Eliminar
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
};
