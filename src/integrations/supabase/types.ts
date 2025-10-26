export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export type Database = {
  // Allows to automatically instantiate createClient with right options
  // instead of createClient<Database, { PostgrestVersion: 'XX' }>(URL, KEY)
  __InternalSupabase: {
    PostgrestVersion: "12.2.3 (519615d)"
  }
  public: {
    Tables: {
      audit_logs: {
        Row: {
          action: string | null
          actor: string | null
          created_at: string | null
          data: Json | null
          entity: string | null
          entity_id: string | null
          id: string
        }
        Insert: {
          action?: string | null
          actor?: string | null
          created_at?: string | null
          data?: Json | null
          entity?: string | null
          entity_id?: string | null
          id?: string
        }
        Update: {
          action?: string | null
          actor?: string | null
          created_at?: string | null
          data?: Json | null
          entity?: string | null
          entity_id?: string | null
          id?: string
        }
        Relationships: []
      }
      candidatos: {
        Row: {
          anos_experiencia: number | null
          created_at: string | null
          created_by: string | null
          cv_url: string | null
          departamento: string | null
          email: string
          empleado_id: string | null
          empresa_actual: string | null
          estado: string | null
          fecha_disponibilidad: string | null
          fuente: string | null
          id: string
          idiomas: string[] | null
          linkedin_url: string | null
          nivel_estudios: string | null
          nombre: string
          notas: string | null
          preferencia_trabajo: string | null
          puesto_actual: string | null
          puesto_solicitado: string
          salario_esperado: number | null
          skills: string[] | null
          telefono: string | null
          updated_at: string | null
        }
        Insert: {
          anos_experiencia?: number | null
          created_at?: string | null
          created_by?: string | null
          cv_url?: string | null
          departamento?: string | null
          email: string
          empleado_id?: string | null
          empresa_actual?: string | null
          estado?: string | null
          fecha_disponibilidad?: string | null
          fuente?: string | null
          id?: string
          idiomas?: string[] | null
          linkedin_url?: string | null
          nivel_estudios?: string | null
          nombre: string
          notas?: string | null
          preferencia_trabajo?: string | null
          puesto_actual?: string | null
          puesto_solicitado: string
          salario_esperado?: number | null
          skills?: string[] | null
          telefono?: string | null
          updated_at?: string | null
        }
        Update: {
          anos_experiencia?: number | null
          created_at?: string | null
          created_by?: string | null
          cv_url?: string | null
          departamento?: string | null
          email?: string
          empleado_id?: string | null
          empresa_actual?: string | null
          estado?: string | null
          fecha_disponibilidad?: string | null
          fuente?: string | null
          id?: string
          idiomas?: string[] | null
          linkedin_url?: string | null
          nivel_estudios?: string | null
          nombre?: string
          notas?: string | null
          preferencia_trabajo?: string | null
          puesto_actual?: string | null
          puesto_solicitado?: string
          salario_esperado?: number | null
          skills?: string[] | null
          telefono?: string | null
          updated_at?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "candidatos_created_by_fkey"
            columns: ["created_by"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "candidatos_empleado_id_fkey"
            columns: ["empleado_id"]
            isOneToOne: false
            referencedRelation: "empleados"
            referencedColumns: ["id"]
          },
        ]
      }
      cierres_nomina: {
        Row: {
          anio: number
          created_at: string | null
          created_by: string | null
          desviacion: number | null
          estado: string
          fecha_cierre: string | null
          fecha_comparacion: string | null
          fecha_inicio: string | null
          id: string
          mes: number
          observaciones: string | null
          responsable: string | null
          total_previsto: number | null
          total_real: number | null
          updated_at: string | null
        }
        Insert: {
          anio: number
          created_at?: string | null
          created_by?: string | null
          desviacion?: number | null
          estado?: string
          fecha_cierre?: string | null
          fecha_comparacion?: string | null
          fecha_inicio?: string | null
          id?: string
          mes: number
          observaciones?: string | null
          responsable?: string | null
          total_previsto?: number | null
          total_real?: number | null
          updated_at?: string | null
        }
        Update: {
          anio?: number
          created_at?: string | null
          created_by?: string | null
          desviacion?: number | null
          estado?: string
          fecha_cierre?: string | null
          fecha_comparacion?: string | null
          fecha_inicio?: string | null
          id?: string
          mes?: number
          observaciones?: string | null
          responsable?: string | null
          total_previsto?: number | null
          total_real?: number | null
          updated_at?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "cierres_nomina_created_by_fkey"
            columns: ["created_by"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
        ]
      }
      comparativas_nomina: {
        Row: {
          bruto_previsto: number | null
          bruto_real: number | null
          cierre_id: string
          coste_previsto: number | null
          coste_real: number | null
          created_at: string | null
          diferencia_bruto: number | null
          diferencia_coste: number | null
          discrepancia: boolean | null
          empleado_id: string
          id: string
          nomina_id: string | null
          observaciones: string | null
          porcentaje_desviacion: number | null
        }
        Insert: {
          bruto_previsto?: number | null
          bruto_real?: number | null
          cierre_id: string
          coste_previsto?: number | null
          coste_real?: number | null
          created_at?: string | null
          diferencia_bruto?: number | null
          diferencia_coste?: number | null
          discrepancia?: boolean | null
          empleado_id: string
          id?: string
          nomina_id?: string | null
          observaciones?: string | null
          porcentaje_desviacion?: number | null
        }
        Update: {
          bruto_previsto?: number | null
          bruto_real?: number | null
          cierre_id?: string
          coste_previsto?: number | null
          coste_real?: number | null
          created_at?: string | null
          diferencia_bruto?: number | null
          diferencia_coste?: number | null
          discrepancia?: boolean | null
          empleado_id?: string
          id?: string
          nomina_id?: string | null
          observaciones?: string | null
          porcentaje_desviacion?: number | null
        }
        Relationships: [
          {
            foreignKeyName: "comparativas_nomina_cierre_id_fkey"
            columns: ["cierre_id"]
            isOneToOne: false
            referencedRelation: "cierres_nomina"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "comparativas_nomina_empleado_id_fkey"
            columns: ["empleado_id"]
            isOneToOne: false
            referencedRelation: "empleados"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "comparativas_nomina_nomina_id_fkey"
            columns: ["nomina_id"]
            isOneToOne: false
            referencedRelation: "nominas"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "comparativas_nomina_nomina_id_fkey"
            columns: ["nomina_id"]
            isOneToOne: false
            referencedRelation: "nominas_summary"
            referencedColumns: ["id"]
          },
        ]
      }
      empleados: {
        Row: {
          activo: boolean | null
          area: string | null
          avatar_url: string | null
          bonus: number | null
          contrato_url: string | null
          coste_seg_social: number | null
          coste_total_anual: number | null
          coste_total_mensual: number | null
          created_at: string | null
          departamento: string | null
          email: string | null
          fecha_alta: string | null
          fecha_baja: string | null
          firma_url: string | null
          id: string
          nif: string | null
          nombre: string
          notas: string | null
          oficina: string | null
          puesto: string | null
          rol: string | null
          salario_base: number | null
          tipo_contrato: string | null
          variable: number | null
        }
        Insert: {
          activo?: boolean | null
          area?: string | null
          avatar_url?: string | null
          bonus?: number | null
          contrato_url?: string | null
          coste_seg_social?: number | null
          coste_total_anual?: number | null
          coste_total_mensual?: number | null
          created_at?: string | null
          departamento?: string | null
          email?: string | null
          fecha_alta?: string | null
          fecha_baja?: string | null
          firma_url?: string | null
          id?: string
          nif?: string | null
          nombre: string
          notas?: string | null
          oficina?: string | null
          puesto?: string | null
          rol?: string | null
          salario_base?: number | null
          tipo_contrato?: string | null
          variable?: number | null
        }
        Update: {
          activo?: boolean | null
          area?: string | null
          avatar_url?: string | null
          bonus?: number | null
          contrato_url?: string | null
          coste_seg_social?: number | null
          coste_total_anual?: number | null
          coste_total_mensual?: number | null
          created_at?: string | null
          departamento?: string | null
          email?: string | null
          fecha_alta?: string | null
          fecha_baja?: string | null
          firma_url?: string | null
          id?: string
          nif?: string | null
          nombre?: string
          notas?: string | null
          oficina?: string | null
          puesto?: string | null
          rol?: string | null
          salario_base?: number | null
          tipo_contrato?: string | null
          variable?: number | null
        }
        Relationships: []
      }
      entrevistas: {
        Row: {
          candidato_id: string
          created_at: string | null
          created_by: string | null
          debilidades: string[] | null
          duracion_minutos: number | null
          entrevistador_id: string
          estado: string | null
          fecha_hora: string
          fortalezas: string[] | null
          id: string
          meeting_url: string | null
          notas_evaluacion: string | null
          puntuacion: number | null
          recomendacion: string | null
          ronda: number | null
          tipo: string | null
          ubicacion: string | null
          updated_at: string | null
        }
        Insert: {
          candidato_id: string
          created_at?: string | null
          created_by?: string | null
          debilidades?: string[] | null
          duracion_minutos?: number | null
          entrevistador_id: string
          estado?: string | null
          fecha_hora: string
          fortalezas?: string[] | null
          id?: string
          meeting_url?: string | null
          notas_evaluacion?: string | null
          puntuacion?: number | null
          recomendacion?: string | null
          ronda?: number | null
          tipo?: string | null
          ubicacion?: string | null
          updated_at?: string | null
        }
        Update: {
          candidato_id?: string
          created_at?: string | null
          created_by?: string | null
          debilidades?: string[] | null
          duracion_minutos?: number | null
          entrevistador_id?: string
          estado?: string | null
          fecha_hora?: string
          fortalezas?: string[] | null
          id?: string
          meeting_url?: string | null
          notas_evaluacion?: string | null
          puntuacion?: number | null
          recomendacion?: string | null
          ronda?: number | null
          tipo?: string | null
          ubicacion?: string | null
          updated_at?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "entrevistas_candidato_id_fkey"
            columns: ["candidato_id"]
            isOneToOne: false
            referencedRelation: "candidatos"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "entrevistas_created_by_fkey"
            columns: ["created_by"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "entrevistas_entrevistador_id_fkey"
            columns: ["entrevistador_id"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
        ]
      }
      movimientos_mes: {
        Row: {
          aprobado: boolean | null
          cierre_id: string
          created_at: string | null
          descripcion: string | null
          empleado_id: string
          fecha_efectiva: string | null
          fecha_revision: string | null
          id: string
          importe_impacto: number | null
          revisado: boolean | null
          revisado_por: string | null
          tipo: string
          valor_anterior: number | null
          valor_nuevo: number | null
        }
        Insert: {
          aprobado?: boolean | null
          cierre_id: string
          created_at?: string | null
          descripcion?: string | null
          empleado_id: string
          fecha_efectiva?: string | null
          fecha_revision?: string | null
          id?: string
          importe_impacto?: number | null
          revisado?: boolean | null
          revisado_por?: string | null
          tipo: string
          valor_anterior?: number | null
          valor_nuevo?: number | null
        }
        Update: {
          aprobado?: boolean | null
          cierre_id?: string
          created_at?: string | null
          descripcion?: string | null
          empleado_id?: string
          fecha_efectiva?: string | null
          fecha_revision?: string | null
          id?: string
          importe_impacto?: number | null
          revisado?: boolean | null
          revisado_por?: string | null
          tipo?: string
          valor_anterior?: number | null
          valor_nuevo?: number | null
        }
        Relationships: [
          {
            foreignKeyName: "movimientos_mes_cierre_id_fkey"
            columns: ["cierre_id"]
            isOneToOne: false
            referencedRelation: "cierres_nomina"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "movimientos_mes_empleado_id_fkey"
            columns: ["empleado_id"]
            isOneToOne: false
            referencedRelation: "empleados"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "movimientos_mes_revisado_por_fkey"
            columns: ["revisado_por"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
        ]
      }
      nominas: {
        Row: {
          anio: number | null
          bruto: number | null
          coste_empresa: number | null
          empleado_id: string | null
          fecha_subida: string | null
          id: string
          mes: number | null
          neto: number | null
          pdf_url: string | null
        }
        Insert: {
          anio?: number | null
          bruto?: number | null
          coste_empresa?: number | null
          empleado_id?: string | null
          fecha_subida?: string | null
          id?: string
          mes?: number | null
          neto?: number | null
          pdf_url?: string | null
        }
        Update: {
          anio?: number | null
          bruto?: number | null
          coste_empresa?: number | null
          empleado_id?: string | null
          fecha_subida?: string | null
          id?: string
          mes?: number | null
          neto?: number | null
          pdf_url?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "nominas_empleado_id_fkey"
            columns: ["empleado_id"]
            isOneToOne: false
            referencedRelation: "empleados"
            referencedColumns: ["id"]
          },
        ]
      }
      presupuestos: {
        Row: {
          anio: number
          created_at: string | null
          departamento: string
          id: string
          importe_anual: number
        }
        Insert: {
          anio: number
          created_at?: string | null
          departamento: string
          id?: string
          importe_anual?: number
        }
        Update: {
          anio?: number
          created_at?: string | null
          departamento?: string
          id?: string
          importe_anual?: number
        }
        Relationships: []
      }
      previsiones_nomina: {
        Row: {
          bonus_previsto: number | null
          bruto_previsto: number | null
          cierre_id: string
          confirmado: boolean | null
          coste_ss_previsto: number | null
          coste_total_previsto: number | null
          created_at: string | null
          empleado_id: string
          id: string
          notas: string | null
          updated_at: string | null
          variable_previsto: number | null
        }
        Insert: {
          bonus_previsto?: number | null
          bruto_previsto?: number | null
          cierre_id: string
          confirmado?: boolean | null
          coste_ss_previsto?: number | null
          coste_total_previsto?: number | null
          created_at?: string | null
          empleado_id: string
          id?: string
          notas?: string | null
          updated_at?: string | null
          variable_previsto?: number | null
        }
        Update: {
          bonus_previsto?: number | null
          bruto_previsto?: number | null
          cierre_id?: string
          confirmado?: boolean | null
          coste_ss_previsto?: number | null
          coste_total_previsto?: number | null
          created_at?: string | null
          empleado_id?: string
          id?: string
          notas?: string | null
          updated_at?: string | null
          variable_previsto?: number | null
        }
        Relationships: [
          {
            foreignKeyName: "previsiones_nomina_cierre_id_fkey"
            columns: ["cierre_id"]
            isOneToOne: false
            referencedRelation: "cierres_nomina"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "previsiones_nomina_empleado_id_fkey"
            columns: ["empleado_id"]
            isOneToOne: false
            referencedRelation: "empleados"
            referencedColumns: ["id"]
          },
        ]
      }
      profiles: {
        Row: {
          created_at: string | null
          email: string | null
          id: string
          role: string
        }
        Insert: {
          created_at?: string | null
          email?: string | null
          id: string
          role?: string
        }
        Update: {
          created_at?: string | null
          email?: string | null
          id?: string
          role?: string
        }
        Relationships: []
      }
      simulaciones: {
        Row: {
          descripcion: string | null
          detalles: Json | null
          fecha: string | null
          id: string
          resultado_total: number | null
          subida_fija: number | null
          subida_porcentaje: number | null
          usuario: string | null
        }
        Insert: {
          descripcion?: string | null
          detalles?: Json | null
          fecha?: string | null
          id?: string
          resultado_total?: number | null
          subida_fija?: number | null
          subida_porcentaje?: number | null
          usuario?: string | null
        }
        Update: {
          descripcion?: string | null
          detalles?: Json | null
          fecha?: string | null
          id?: string
          resultado_total?: number | null
          subida_fija?: number | null
          subida_porcentaje?: number | null
          usuario?: string | null
        }
        Relationships: []
      }
    }
    Views: {
      nominas_summary: {
        Row: {
          anio: number | null
          bruto: number | null
          coste_empresa: number | null
          empleado_id: string | null
          fecha_subida: string | null
          id: string | null
          mes: number | null
          neto: number | null
        }
        Insert: {
          anio?: number | null
          bruto?: number | null
          coste_empresa?: number | null
          empleado_id?: string | null
          fecha_subida?: string | null
          id?: string | null
          mes?: number | null
          neto?: number | null
        }
        Update: {
          anio?: number | null
          bruto?: number | null
          coste_empresa?: number | null
          empleado_id?: string | null
          fecha_subida?: string | null
          id?: string | null
          mes?: number | null
          neto?: number | null
        }
        Relationships: [
          {
            foreignKeyName: "nominas_empleado_id_fkey"
            columns: ["empleado_id"]
            isOneToOne: false
            referencedRelation: "empleados"
            referencedColumns: ["id"]
          },
        ]
      }
    }
    Functions: {
      [_ in never]: never
    }
    Enums: {
      [_ in never]: never
    }
    CompositeTypes: {
      [_ in never]: never
    }
  }
}

type DatabaseWithoutInternals = Omit<Database, "__InternalSupabase">

type DefaultSchema = DatabaseWithoutInternals[Extract<keyof Database, "public">]

export type Tables<
  DefaultSchemaTableNameOrOptions extends
    | keyof (DefaultSchema["Tables"] & DefaultSchema["Views"])
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof (DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
        DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Views"])
    : never = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? (DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
      DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Views"])[TableName] extends {
      Row: infer R
    }
    ? R
    : never
  : DefaultSchemaTableNameOrOptions extends keyof (DefaultSchema["Tables"] &
        DefaultSchema["Views"])
    ? (DefaultSchema["Tables"] &
        DefaultSchema["Views"])[DefaultSchemaTableNameOrOptions] extends {
        Row: infer R
      }
      ? R
      : never
    : never

export type TablesInsert<
  DefaultSchemaTableNameOrOptions extends
    | keyof DefaultSchema["Tables"]
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Insert: infer I
    }
    ? I
    : never
  : DefaultSchemaTableNameOrOptions extends keyof DefaultSchema["Tables"]
    ? DefaultSchema["Tables"][DefaultSchemaTableNameOrOptions] extends {
        Insert: infer I
      }
      ? I
      : never
    : never

export type TablesUpdate<
  DefaultSchemaTableNameOrOptions extends
    | keyof DefaultSchema["Tables"]
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Update: infer U
    }
    ? U
    : never
  : DefaultSchemaTableNameOrOptions extends keyof DefaultSchema["Tables"]
    ? DefaultSchema["Tables"][DefaultSchemaTableNameOrOptions] extends {
        Update: infer U
      }
      ? U
      : never
    : never

export type Enums<
  DefaultSchemaEnumNameOrOptions extends
    | keyof DefaultSchema["Enums"]
    | { schema: keyof DatabaseWithoutInternals },
  EnumName extends DefaultSchemaEnumNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"]
    : never = never,
> = DefaultSchemaEnumNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"][EnumName]
  : DefaultSchemaEnumNameOrOptions extends keyof DefaultSchema["Enums"]
    ? DefaultSchema["Enums"][DefaultSchemaEnumNameOrOptions]
    : never

export type CompositeTypes<
  PublicCompositeTypeNameOrOptions extends
    | keyof DefaultSchema["CompositeTypes"]
    | { schema: keyof DatabaseWithoutInternals },
  CompositeTypeName extends PublicCompositeTypeNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"]
    : never = never,
> = PublicCompositeTypeNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"][CompositeTypeName]
  : PublicCompositeTypeNameOrOptions extends keyof DefaultSchema["CompositeTypes"]
    ? DefaultSchema["CompositeTypes"][PublicCompositeTypeNameOrOptions]
    : never

export const Constants = {
  public: {
    Enums: {},
  },
} as const
