import { useParams, useNavigate } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { IntranetLayout } from "@/components/intranet/IntranetLayout";
import { Button } from "@/components/ui/button";
import { ArrowLeft, CheckCircle, Edit } from "lucide-react";

const CasesHistory = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const { data: caseStudy } = useQuery({
    queryKey: ['case-study', id],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('case_studies' as any)
        .select('*')
        .eq('id', id)
        .single();
      if (error) throw error;
      return data;
    }
  });

  const { data: history } = useQuery({
    queryKey: ['case-study-history', id],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('case_study_state_changes' as any)
        .select('*')
        .eq('case_study_id', id)
        .order('changed_at', { ascending: false });
      
      if (error) throw error;
      return data || [];
    }
  });

  return (
    <IntranetLayout>
      <div className="max-w-4xl mx-auto space-y-6">
        <div className="flex items-center gap-4">
          <Button variant="ghost" size="sm" onClick={() => navigate('/intranet/cases')}>
            <ArrowLeft className="w-4 h-4" />
          </Button>
          <div>
            <h1 className="text-3xl font-bold">Historial del Caso</h1>
            <p className="text-muted-foreground">
              {(caseStudy as any)?.confidencial ? 'Cliente Anónimo' : (caseStudy as any)?.cliente || 'Sin nombre'}
            </p>
          </div>
        </div>

        <div className="relative">
          {/* Timeline Line */}
          <div className="absolute left-4 top-0 bottom-0 w-0.5 bg-border" />

          {/* Timeline Items */}
          <div className="space-y-6">
            {history?.map((event: any, index: number) => (
              <div key={event.id} className="relative flex gap-6 items-start">
                {/* Timeline Dot */}
                <div className={`relative z-10 w-8 h-8 rounded-full flex items-center justify-center ${
                  event.approval_type 
                    ? 'bg-green-500 text-white' 
                    : 'bg-primary text-primary-foreground'
                }`}>
                  {event.approval_type ? (
                    <CheckCircle className="w-4 h-4" />
                  ) : (
                    <Edit className="w-4 h-4" />
                  )}
                </div>

                {/* Event Content */}
                <div className="flex-1 bg-card border rounded-lg p-4">
                  <div className="flex items-start justify-between">
                    <div>
                      <h3 className="font-semibold text-foreground">
                        {event.approval_type 
                          ? `Aprobación ${event.approval_type === 'marketing' ? 'Marketing' : 'Legal'}`
                          : `${event.from_status ? `${event.from_status} → ` : ''}${event.to_status}`
                        }
                      </h3>
                      {event.notes && (
                        <p className="text-sm text-muted-foreground mt-1">{event.notes}</p>
                      )}
                    </div>
                    <span className="text-xs text-muted-foreground">
                      {new Date(event.changed_at).toLocaleString('es-ES')}
                    </span>
                  </div>
                </div>
              </div>
            ))}

            {history?.length === 0 && (
              <div className="text-center py-12 text-muted-foreground">
                No hay historial disponible
              </div>
            )}
          </div>
        </div>
      </div>
    </IntranetLayout>
  );
};

export default CasesHistory;
