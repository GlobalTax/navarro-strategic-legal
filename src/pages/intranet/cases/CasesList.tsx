import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { useAuth } from "@/contexts/AuthContext";
import { IntranetLayout } from "@/components/intranet/IntranetLayout";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Plus, Search, History, Trash2, Edit } from "lucide-react";
import { useNavigate } from "react-router-dom";
import CaseStatusBadge from "@/components/intranet/cases/CaseStatusBadge";
import { Badge } from "@/components/ui/badge";
import { useToast } from "@/hooks/use-toast";

const CasesList = () => {
  const { hasAnyRole } = useAuth();
  const navigate = useNavigate();
  const { toast } = useToast();
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState<string>("all");
  const [areaFilter, setAreaFilter] = useState<string>("all");

  const canCreate = hasAnyRole(['admin', 'marketing']);

  const { data: cases, isLoading, refetch } = useQuery({
    queryKey: ['case-studies'],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('case_studies' as any)
        .select('*')
        .order('created_at', { ascending: false });
      
      if (error) throw error;
      return data || [];
    }
  });

  const handleDelete = async (id: string) => {
    if (!confirm('¿Estás seguro de que quieres eliminar este caso de éxito?')) return;

    const { error } = await supabase
      .from('case_studies' as any)
      .delete()
      .eq('id', id);

    if (error) {
      toast({
        title: "Error",
        description: "No se pudo eliminar el caso de éxito",
        variant: "destructive"
      });
    } else {
      toast({ title: "Caso eliminado correctamente" });
      refetch();
    }
  };

  const filteredCases = cases?.filter((c: any) => {
    const matchesSearch = searchTerm === "" || 
      c.cliente?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      c.sector?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      c.resultado?.toLowerCase().includes(searchTerm.toLowerCase());
    
    const matchesStatus = statusFilter === "all" || c.status === statusFilter;
    const matchesArea = areaFilter === "all" || c.area === areaFilter;

    return matchesSearch && matchesStatus && matchesArea;
  });

  return (
    <IntranetLayout>
      <div className="space-y-6">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold text-foreground">Casos de Éxito</h1>
            <p className="text-muted-foreground">Gestiona los casos de éxito publicados</p>
          </div>
          {canCreate && (
            <Button onClick={() => navigate('/intranet/cases/new')}>
              <Plus className="w-4 h-4 mr-2" />
              Nuevo Caso
            </Button>
          )}
        </div>

        {/* Filters */}
        <div className="flex flex-col sm:flex-row gap-4">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
            <Input
              placeholder="Buscar por cliente, sector o resultado..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10"
            />
          </div>
          <Select value={statusFilter} onValueChange={setStatusFilter}>
            <SelectTrigger className="w-full sm:w-[180px]">
              <SelectValue placeholder="Estado" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">Todos los estados</SelectItem>
              <SelectItem value="draft">Borrador</SelectItem>
              <SelectItem value="in_review">En Revisión</SelectItem>
              <SelectItem value="published">Publicado</SelectItem>
            </SelectContent>
          </Select>
          <Select value={areaFilter} onValueChange={setAreaFilter}>
            <SelectTrigger className="w-full sm:w-[180px]">
              <SelectValue placeholder="Área" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">Todas las áreas</SelectItem>
              <SelectItem value="Fiscal">Fiscal</SelectItem>
              <SelectItem value="Mercantil">Mercantil</SelectItem>
              <SelectItem value="Laboral">Laboral</SelectItem>
              <SelectItem value="M&A">M&A</SelectItem>
            </SelectContent>
          </Select>
        </div>

        {/* Cases List */}
        {isLoading ? (
          <div className="text-center py-12 text-muted-foreground">Cargando...</div>
        ) : filteredCases?.length === 0 ? (
          <div className="text-center py-12 text-muted-foreground">
            {cases?.length === 0 
              ? "No hay casos de éxito aún. ¡Crea el primero!"
              : "No se encontraron casos con los filtros aplicados"
            }
          </div>
        ) : (
          <div className="grid gap-4">
            {filteredCases?.map((caseStudy: any) => (
              <div
                key={caseStudy.id}
                className="border rounded-lg p-6 hover:shadow-md transition-shadow bg-card"
              >
                <div className="flex items-start justify-between gap-4">
                  <div className="flex-1 space-y-3">
                    <div className="flex items-center gap-3 flex-wrap">
                      <h3 className="text-xl font-semibold text-foreground">
                        {caseStudy.confidencial ? 'Cliente Anónimo' : caseStudy.cliente || 'Sin nombre'}
                      </h3>
                      <CaseStatusBadge status={caseStudy.status} />
                      {caseStudy.confidencial && (
                        <Badge variant="outline">Confidencial</Badge>
                      )}
                      {caseStudy.legal_aprobado && (
                        <Badge variant="outline" className="bg-green-500/10 text-green-700 dark:text-green-400">
                          Legal Aprobado
                        </Badge>
                      )}
                    </div>
                    <div className="flex gap-2">
                      <Badge variant="secondary">{caseStudy.sector}</Badge>
                      <Badge variant="secondary">{caseStudy.area}</Badge>
                    </div>
                    <p className="text-sm text-muted-foreground line-clamp-2">
                      {caseStudy.resultado}
                    </p>
                    {caseStudy.kpis && JSON.parse(caseStudy.kpis as any).length > 0 && (
                      <div className="flex gap-4 text-sm">
                        {JSON.parse(caseStudy.kpis as any).slice(0, 3).map((kpi: any, idx: number) => (
                          <span key={idx} className="text-muted-foreground">
                            <strong className="text-foreground">{kpi.value}{kpi.unit}</strong> {kpi.label}
                          </span>
                        ))}
                      </div>
                    )}
                  </div>
                  <div className="flex gap-2">
                    <Button
                      size="sm"
                      variant="ghost"
                      onClick={() => navigate(`/intranet/cases/${caseStudy.id}/edit`)}
                    >
                      <Edit className="w-4 h-4" />
                    </Button>
                    <Button
                      size="sm"
                      variant="ghost"
                      onClick={() => navigate(`/intranet/cases/${caseStudy.id}/history`)}
                    >
                      <History className="w-4 h-4" />
                    </Button>
                    {hasAnyRole(['admin']) && (
                      <Button
                        size="sm"
                        variant="ghost"
                        onClick={() => handleDelete(caseStudy.id)}
                      >
                        <Trash2 className="w-4 h-4" />
                      </Button>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </IntranetLayout>
  );
};

export default CasesList;
