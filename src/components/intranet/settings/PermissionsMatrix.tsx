import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Check, X } from "lucide-react";

const PERMISSIONS_MATRIX = {
  admin: {
    'Gestionar Usuarios': true,
    'Ver Audit Logs': true,
    'Blog: Crear': true,
    'Blog: Editar Todo': true,
    'Blog: Publicar': true,
    'Blog: Eliminar': true,
    'Personas: Ver': true,
    'Personas: Crear': true,
    'Personas: Editar': true,
    'Personas: Dar de Baja': true,
    'Media: Subir': true,
    'Media: Editar': true,
    'Media: Eliminar': true,
  },
  marketing: {
    'Gestionar Usuarios': false,
    'Ver Audit Logs': false,
    'Blog: Crear': true,
    'Blog: Editar Todo': true,
    'Blog: Publicar': true,
    'Blog: Eliminar': false,
    'Personas: Ver': false,
    'Personas: Crear': false,
    'Personas: Editar': false,
    'Personas: Dar de Baja': false,
    'Media: Subir': true,
    'Media: Editar': true,
    'Media: Eliminar': false,
  },
  legal: {
    'Gestionar Usuarios': false,
    'Ver Audit Logs': false,
    'Blog: Crear': false,
    'Blog: Editar Todo': false,
    'Blog: Publicar': false,
    'Blog: Eliminar': false,
    'Personas: Ver': false,
    'Personas: Crear': false,
    'Personas: Editar': false,
    'Personas: Dar de Baja': false,
    'Media: Subir': false,
    'Media: Editar': false,
    'Media: Eliminar': false,
  },
  editor: {
    'Gestionar Usuarios': false,
    'Ver Audit Logs': false,
    'Blog: Crear': true,
    'Blog: Editar Todo': false,
    'Blog: Publicar': false,
    'Blog: Eliminar': false,
    'Personas: Ver': false,
    'Personas: Crear': false,
    'Personas: Editar': false,
    'Personas: Dar de Baja': false,
    'Media: Subir': true,
    'Media: Editar': false,
    'Media: Eliminar': false,
  },
  hr: {
    'Gestionar Usuarios': false,
    'Ver Audit Logs': false,
    'Blog: Crear': false,
    'Blog: Editar Todo': false,
    'Blog: Publicar': false,
    'Blog: Eliminar': false,
    'Personas: Ver': true,
    'Personas: Crear': true,
    'Personas: Editar': true,
    'Personas: Dar de Baja': true,
    'Media: Subir': false,
    'Media: Editar': false,
    'Media: Eliminar': false,
  },
  viewer: {
    'Gestionar Usuarios': false,
    'Ver Audit Logs': false,
    'Blog: Crear': false,
    'Blog: Editar Todo': false,
    'Blog: Publicar': false,
    'Blog: Eliminar': false,
    'Personas: Ver': false,
    'Personas: Crear': false,
    'Personas: Editar': false,
    'Personas: Dar de Baja': false,
    'Media: Subir': false,
    'Media: Editar': false,
    'Media: Eliminar': false,
  },
};

export const PermissionsMatrix = () => {
  const permissions = Object.keys(PERMISSIONS_MATRIX.admin);
  const roles = Object.keys(PERMISSIONS_MATRIX) as Array<keyof typeof PERMISSIONS_MATRIX>;

  return (
    <div className="rounded-md border">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead className="w-[300px]">Permiso</TableHead>
            {roles.map(role => (
              <TableHead key={role} className="text-center">
                <span className="capitalize">{role}</span>
              </TableHead>
            ))}
          </TableRow>
        </TableHeader>
        <TableBody>
          {permissions.map(permission => (
            <TableRow key={permission}>
              <TableCell className="font-medium">{permission}</TableCell>
              {roles.map(role => (
                <TableCell key={role} className="text-center">
                  {PERMISSIONS_MATRIX[role][permission as keyof typeof PERMISSIONS_MATRIX.admin] ? (
                    <Check className="h-5 w-5 text-primary mx-auto" />
                  ) : (
                    <X className="h-5 w-5 text-muted-foreground mx-auto" />
                  )}
                </TableCell>
              ))}
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
};
