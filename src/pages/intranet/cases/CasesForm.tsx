import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useQuery, useMutation } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { useAuth } from "@/contexts/AuthContext";
import { IntranetLayout } from "@/components/intranet/IntranetLayout";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Switch } from "@/components/ui/switch";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useToast } from "@/hooks/use-toast";
import { ArrowLeft, Save, Send, CheckCircle, XCircle } from "lucide-react";
import KPIManager, { KPI } from "@/components/intranet/cases/KPIManager";
import ApprovalProgressBar from "@/components/intranet/cases/ApprovalProgressBar";
import MediaPickerModal from "@/components/intranet/MediaPickerModal";

const CasesForm = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { toast } = useToast();
  const { user, hasAnyRole, hasRole } = useAuth();
  const isEditing = !!id;

  const [formData, setFormData] = useState({
    cliente: '',
    sector: '',
    area: 'Fiscal',
    reto: '',
    solucion: '',
    resultado: '',
    confidencial: false,
    featured_image: '',
    tags: [] as string[],
  });
  const [kpis, setKpis] = useState<KPI[]>([]);
  const [tagInput, setTagInput] = useState('');
  const [showMediaPicker, setShowMediaPicker] = useState(false);
  const [bucket] = useState('case-studies-media');

  const { data: caseStudy, isLoading } = useQuery({
    queryKey: ['case-study', id],
    queryFn: async () => {
      if (!id) return null;
      const { data, error } = await supabase
        .from('case_studies' as any)
        .select('*')
        .eq('id', id)
        .single();
      
      if (error) throw error;
      return data;
    },
    enabled: isEditing,
  });

  useEffect(() => {
    if (caseStudy) {
      const study = caseStudy as any;
      setFormData({
        cliente: study.cliente || '',
        sector: study.sector || '',
        area: study.area || 'Fiscal',
        reto: study.reto || '',
        solucion: study.solucion || '',
        resultado: study.resultado || '',
        confidencial: study.confidencial || false,
        featured_image: study.featured_image || '',
        tags: study.tags || [],
      });
      setKpis(study.kpis ? JSON.parse(study.kpis) : []);
    }
  }, [caseStudy]);

  const saveMutation = useMutation({
    mutationFn: async (status: string) => {
      const payload = {
        ...formData,
        cliente: formData.confidencial ? null : formData.cliente,
        kpis: JSON.stringify(kpis),
        status,
        created_by: user?.id,
      };

      if (isEditing) {
        const { error } = await supabase
          .from('case_studies' as any)
          .update(payload)
          .eq('id', id);
        if (error) throw error;
      } else {
        const { error } = await supabase
          .from('case_studies' as any)
          .insert(payload);
        if (error) throw error;
      }
    },
    onSuccess: () => {
      toast({ title: isEditing ? "Caso actualizado" : "Caso creado" });
      navigate('/intranet/cases');
    },
    onError: () => {
      toast({
        title: "Error",
        description: "No se pudo guardar el caso",
        variant: "destructive"
      });
    }
  });

  const approveMutation = useMutation({
    mutationFn: async (type: 'marketing' | 'legal') => {
      const updates: any = {};
      if (type === 'marketing') {
        updates.marketing_approved_by = user?.id;
        updates.marketing_approved_at = new Date().toISOString();
      } else {
        updates.legal_approved_by = user?.id;
        updates.legal_approved_at = new Date().toISOString();
        updates.legal_aprobado = true;
      }

      const { error } = await supabase
        .from('case_studies' as any)
        .update(updates)
        .eq('id', id);
      
      if (error) throw error;
    },
    onSuccess: () => {
      toast({ title: "Aprobación registrada" });
      window.location.reload();
    }
  });

  const addTag = () => {
    if (tagInput.trim() && !formData.tags.includes(tagInput.trim())) {
      setFormData({ ...formData, tags: [...formData.tags, tagInput.trim()] });
      setTagInput('');
    }
  };

  const canApproveMarketing = hasAnyRole(['admin', 'marketing']) && !(caseStudy as any)?.marketing_approved_at;
  const canApproveLegal = hasRole('legal') && (caseStudy as any)?.marketing_approved_at && !(caseStudy as any)?.legal_approved_at;
  const canPublish = (caseStudy as any)?.marketing_approved_at && (caseStudy as any)?.legal_approved_at && (caseStudy as any)?.status !== 'published';

  if (isLoading) return <IntranetLayout><div className="text-center py-12">Cargando...</div></IntranetLayout>;

  return (
    <IntranetLayout>
      <div className="max-w-4xl mx-auto space-y-6">
        <div className="flex items-center gap-4">
          <Button variant="ghost" size="sm" onClick={() => navigate('/intranet/cases')}>
            <ArrowLeft className="w-4 h-4" />
          </Button>
          <div>
            <h1 className="text-3xl font-bold">{isEditing ? 'Editar Caso' : 'Nuevo Caso de Éxito'}</h1>
          </div>
        </div>

        {isEditing && caseStudy && (
          <ApprovalProgressBar
            marketingApproved={!!(caseStudy as any).marketing_approved_at}
            marketingApprovedAt={(caseStudy as any).marketing_approved_at}
            legalApproved={!!(caseStudy as any).legal_approved_at}
            legalApprovedAt={(caseStudy as any).legal_approved_at}
            published={(caseStudy as any).status === 'published'}
            publishedAt={(caseStudy as any).published_at}
          />
        )}

        <div className="space-y-6 bg-card p-6 rounded-lg border">
          <div className="flex items-center gap-4">
            <div className="flex items-center space-x-2">
              <Switch
                checked={formData.confidencial}
                onCheckedChange={(checked) => {
                  setFormData({ ...formData, confidencial: checked, cliente: checked ? '' : formData.cliente });
                }}
              />
              <Label>Confidencial (oculta cliente)</Label>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <Label>Cliente {formData.confidencial && <span className="text-muted-foreground">(deshabilitado)</span>}</Label>
              <Input
                value={formData.cliente}
                onChange={(e) => setFormData({ ...formData, cliente: e.target.value })}
                disabled={formData.confidencial}
                placeholder={formData.confidencial ? 'Cliente Anónimo' : 'Nombre del cliente'}
              />
            </div>
            <div>
              <Label>Sector *</Label>
              <Input
                value={formData.sector}
                onChange={(e) => setFormData({ ...formData, sector: e.target.value })}
                placeholder="ej. Tecnología, Retail..."
                required
              />
            </div>
          </div>

          <div>
            <Label>Área *</Label>
            <Select value={formData.area} onValueChange={(value) => setFormData({ ...formData, area: value })}>
              <SelectTrigger>
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="Fiscal">Fiscal</SelectItem>
                <SelectItem value="Mercantil">Mercantil</SelectItem>
                <SelectItem value="Laboral">Laboral</SelectItem>
                <SelectItem value="M&A">M&A</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div>
            <Label>Reto *</Label>
            <Textarea
              value={formData.reto}
              onChange={(e) => setFormData({ ...formData, reto: e.target.value })}
              placeholder="Describe el desafío o problemática del cliente"
              rows={3}
              required
            />
          </div>

          <div>
            <Label>Solución *</Label>
            <Textarea
              value={formData.solucion}
              onChange={(e) => setFormData({ ...formData, solucion: e.target.value })}
              placeholder="Describe la solución implementada"
              rows={3}
              required
            />
          </div>

          <div>
            <Label>Resultado *</Label>
            <Textarea
              value={formData.resultado}
              onChange={(e) => setFormData({ ...formData, resultado: e.target.value })}
              placeholder="Describe los resultados obtenidos"
              rows={3}
              required
            />
          </div>

          <KPIManager kpis={kpis} onChange={setKpis} />

          <div>
            <Label>Imagen Destacada</Label>
            <div className="flex gap-2">
              <Input value={formData.featured_image} onChange={(e) => setFormData({ ...formData, featured_image: e.target.value })} placeholder="URL de la imagen" />
              <Button type="button" variant="outline" onClick={() => setShowMediaPicker(true)}>
                Seleccionar
              </Button>
            </div>
          </div>

          <div>
            <Label>Etiquetas</Label>
            <div className="flex gap-2 mb-2">
              <Input value={tagInput} onChange={(e) => setTagInput(e.target.value)} onKeyPress={(e) => e.key === 'Enter' && (e.preventDefault(), addTag())} placeholder="Añadir etiqueta" />
              <Button type="button" onClick={addTag}>Añadir</Button>
            </div>
            <div className="flex flex-wrap gap-2">
              {formData.tags.map((tag, i) => (
                <span key={i} className="px-3 py-1 bg-secondary text-secondary-foreground rounded-full text-sm cursor-pointer" onClick={() => setFormData({ ...formData, tags: formData.tags.filter((_, idx) => idx !== i) })}>
                  {tag} ×
                </span>
              ))}
            </div>
          </div>
        </div>

        <div className="flex gap-3 justify-end">
          {canApproveMarketing && (
            <Button variant="outline" onClick={() => approveMutation.mutate('marketing')}>
              <CheckCircle className="w-4 h-4 mr-2" />
              Aprobar (Marketing)
            </Button>
          )}
          {canApproveLegal && (
            <Button variant="outline" onClick={() => approveMutation.mutate('legal')}>
              <CheckCircle className="w-4 h-4 mr-2" />
              Aprobar (Legal)
            </Button>
          )}
          <Button variant="outline" onClick={() => saveMutation.mutate('draft')}>
            <Save className="w-4 h-4 mr-2" />
            Guardar Borrador
          </Button>
          <Button onClick={() => saveMutation.mutate('in_review')}>
            <Send className="w-4 h-4 mr-2" />
            Enviar a Revisión
          </Button>
          {canPublish && (
            <Button onClick={() => saveMutation.mutate('published')}>
              Publicar
            </Button>
          )}
        </div>
      </div>

      {showMediaPicker && (
        <MediaPickerModal
          open={showMediaPicker}
          onOpenChange={setShowMediaPicker}
          onSelect={(url) => {
            setFormData({ ...formData, featured_image: url });
            setShowMediaPicker(false);
          }}
        />
      )}
    </IntranetLayout>
  );
};

export default CasesForm;
