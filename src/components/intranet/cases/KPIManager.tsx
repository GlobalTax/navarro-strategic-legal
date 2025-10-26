import { useState } from "react";
import { Plus, Trash2, GripVertical } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Card } from "@/components/ui/card";
import KPICard from "./KPICard";

export interface KPI {
  id: string;
  label: string;
  value: string;
  unit: string;
  trend: 'up' | 'down' | 'neutral';
}

interface KPIManagerProps {
  kpis: KPI[];
  onChange: (kpis: KPI[]) => void;
}

const KPIManager = ({ kpis, onChange }: KPIManagerProps) => {
  const [editingId, setEditingId] = useState<string | null>(null);

  const addKPI = () => {
    const newKPI: KPI = {
      id: crypto.randomUUID(),
      label: '',
      value: '',
      unit: '€',
      trend: 'neutral'
    };
    onChange([...kpis, newKPI]);
    setEditingId(newKPI.id);
  };

  const updateKPI = (id: string, field: keyof KPI, value: string) => {
    onChange(kpis.map(kpi => kpi.id === id ? { ...kpi, [field]: value } : kpi));
  };

  const removeKPI = (id: string) => {
    onChange(kpis.filter(kpi => kpi.id !== id));
  };

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <Label className="text-base">KPIs (Indicadores Clave)</Label>
        <Button type="button" onClick={addKPI} size="sm">
          <Plus className="w-4 h-4 mr-2" />
          Añadir KPI
        </Button>
      </div>

      {kpis.length === 0 && (
        <p className="text-sm text-muted-foreground text-center py-8">
          No hay KPIs. Añade indicadores para mostrar resultados medibles.
        </p>
      )}

      <div className="space-y-3">
        {kpis.map((kpi) => (
          <Card key={kpi.id} className="p-4">
            {editingId === kpi.id ? (
              <div className="space-y-3">
                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <Label className="text-xs">Etiqueta</Label>
                    <Input
                      value={kpi.label}
                      onChange={(e) => updateKPI(kpi.id, 'label', e.target.value)}
                      placeholder="ej. Ahorro fiscal"
                    />
                  </div>
                  <div>
                    <Label className="text-xs">Valor</Label>
                    <Input
                      value={kpi.value}
                      onChange={(e) => updateKPI(kpi.id, 'value', e.target.value)}
                      placeholder="ej. 150000"
                    />
                  </div>
                </div>
                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <Label className="text-xs">Unidad</Label>
                    <Input
                      value={kpi.unit}
                      onChange={(e) => updateKPI(kpi.id, 'unit', e.target.value)}
                      placeholder="ej. €, %, meses"
                    />
                  </div>
                  <div>
                    <Label className="text-xs">Tendencia</Label>
                    <Select
                      value={kpi.trend}
                      onValueChange={(value) => updateKPI(kpi.id, 'trend', value)}
                    >
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="up">⬆ Positiva (subida)</SelectItem>
                        <SelectItem value="down">⬇ Positiva (bajada)</SelectItem>
                        <SelectItem value="neutral">→ Neutral</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>
                <div className="flex gap-2">
                  <Button
                    type="button"
                    size="sm"
                    onClick={() => setEditingId(null)}
                  >
                    Guardar
                  </Button>
                  <Button
                    type="button"
                    size="sm"
                    variant="ghost"
                    onClick={() => removeKPI(kpi.id)}
                  >
                    <Trash2 className="w-4 h-4" />
                  </Button>
                </div>
              </div>
            ) : (
              <div className="flex items-center gap-3">
                <GripVertical className="w-4 h-4 text-muted-foreground cursor-move" />
                <div className="flex-1">
                  <KPICard
                    label={kpi.label || 'Sin etiqueta'}
                    value={kpi.value || '0'}
                    unit={kpi.unit || ''}
                    trend={kpi.trend}
                  />
                </div>
                <div className="flex gap-2">
                  <Button
                    type="button"
                    size="sm"
                    variant="ghost"
                    onClick={() => setEditingId(kpi.id)}
                  >
                    Editar
                  </Button>
                  <Button
                    type="button"
                    size="sm"
                    variant="ghost"
                    onClick={() => removeKPI(kpi.id)}
                  >
                    <Trash2 className="w-4 h-4" />
                  </Button>
                </div>
              </div>
            )}
          </Card>
        ))}
      </div>
    </div>
  );
};

export default KPIManager;
