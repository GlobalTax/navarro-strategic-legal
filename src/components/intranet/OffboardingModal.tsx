import { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "sonner";

interface OffboardingModalProps {
  employee: any;
  open: boolean;
  onClose: () => void;
  onSuccess: () => void;
}

export function OffboardingModal({ employee, open, onClose, onSuccess }: OffboardingModalProps) {
  const [loading, setLoading] = useState(false);
  const [fechaBaja, setFechaBaja] = useState(new Date().toISOString().split('T')[0]);
  const [checklist, setChecklist] = useState({
    it: false,
    legal: false,
    recursos: false,
  });

  const allChecked = checklist.it && checklist.legal && checklist.recursos;

  const handleOffboard = async () => {
    if (!allChecked) {
      toast.error("Por favor completa todos los items del checklist");
      return;
    }

    setLoading(true);
    try {
      const { error } = await supabase
        .from('empleados')
        .update({
          activo: false,
          fecha_baja: fechaBaja,
        })
        .eq('id', employee.id);

      if (error) throw error;

      toast.success(`Baja procesada correctamente para ${employee.nombre}`);
      onSuccess();
    } catch (error: any) {
      toast.error(error.message || "Error al procesar la baja");
    } finally {
      setLoading(false);
    }
  };

  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent className="max-w-md">
        <DialogHeader>
          <DialogTitle>Iniciar Baja - {employee?.nombre}</DialogTitle>
          <DialogDescription>
            Completa el proceso de offboarding antes de confirmar la baja
          </DialogDescription>
        </DialogHeader>

        <div className="space-y-4 py-4">
          <div>
            <Label htmlFor="fecha_baja">Fecha de baja</Label>
            <Input
              id="fecha_baja"
              type="date"
              value={fechaBaja}
              onChange={(e) => setFechaBaja(e.target.value)}
              className="mt-2"
            />
          </div>

          <div className="space-y-3 pt-4">
            <p className="text-sm font-medium">Checklist de Offboarding</p>
            
            <div className="flex items-center space-x-2">
              <Checkbox
                id="it"
                checked={checklist.it}
                onCheckedChange={(checked) =>
                  setChecklist({ ...checklist, it: checked as boolean })
                }
              />
              <Label htmlFor="it" className="cursor-pointer">
                IT: Accesos revocados, equipos devueltos
              </Label>
            </div>

            <div className="flex items-center space-x-2">
              <Checkbox
                id="legal"
                checked={checklist.legal}
                onCheckedChange={(checked) =>
                  setChecklist({ ...checklist, legal: checked as boolean })
                }
              />
              <Label htmlFor="legal" className="cursor-pointer">
                Legal: Documentación de baja firmada
              </Label>
            </div>

            <div className="flex items-center space-x-2">
              <Checkbox
                id="recursos"
                checked={checklist.recursos}
                onCheckedChange={(checked) =>
                  setChecklist({ ...checklist, recursos: checked as boolean })
                }
              />
              <Label htmlFor="recursos" className="cursor-pointer">
                Recursos: Liquidación calculada, entrevista salida
              </Label>
            </div>
          </div>
        </div>

        <DialogFooter>
          <Button variant="outline" onClick={onClose} disabled={loading}>
            Cancelar
          </Button>
          <Button
            onClick={handleOffboard}
            disabled={!allChecked || loading}
            variant="destructive"
          >
            {loading ? "Procesando..." : "Confirmar Baja"}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
