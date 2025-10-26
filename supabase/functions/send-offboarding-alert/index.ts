import { serve } from "https://deno.land/std@0.190.0/http/server.ts";
import { createClient } from 'https://esm.sh/@supabase/supabase-js@2';

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
};

const handler = async (req: Request): Promise<Response> => {
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const { employee_id } = await req.json();

    const supabase = createClient(
      Deno.env.get('SUPABASE_URL') ?? '',
      Deno.env.get('SUPABASE_SERVICE_ROLE_KEY') ?? ''
    );

    // Fetch employee data
    const { data: employee, error: empError } = await supabase
      .from('empleados')
      .select('*')
      .eq('id', employee_id)
      .single();

    if (empError || !employee) {
      throw new Error('Employee not found');
    }

    console.log(`Processing offboarding alert for employee: ${employee.nombre}`);

    // Get IT and HR users
    const { data: alertUsers } = await supabase
      .from('user_roles')
      .select('user_id, profiles!inner(email)')
      .in('role', ['admin', 'hr']);

    if (alertUsers && alertUsers.length > 0 && Deno.env.get("BREVO_API_KEY")) {
      // Send email to IT and HR
      const emailResponse = await fetch("https://api.brevo.com/v3/smtp/email", {
        method: "POST",
        headers: {
          "api-key": Deno.env.get("BREVO_API_KEY")!,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          sender: { email: "rrhh@navarrolegal.es", name: "Sistema RRHH" },
          to: alertUsers.map((u: any) => ({ email: u.profiles.email })),
          subject: `⚠️ Baja de Empleado: ${employee.nombre}`,
          htmlContent: `
            <h2>Baja de Empleado</h2>
            <p>Se ha procesado la baja de <strong>${employee.nombre}</strong>.</p>
            <p><strong>Detalles:</strong></p>
            <ul>
              <li>Área: ${employee.area || 'N/A'}</li>
              <li>Oficina: ${employee.oficina || 'N/A'}</li>
              <li>Fecha de baja: ${employee.fecha_baja || 'No especificada'}</li>
            </ul>
            <p><strong>Acciones requeridas:</strong></p>
            <ul>
              <li>✅ Desactivar accesos de sistemas</li>
              <li>✅ Recuperar equipos</li>
              <li>✅ Procesar liquidación</li>
            </ul>
          `,
        }),
      });

      if (!emailResponse.ok) {
        console.error('Failed to send offboarding email:', await emailResponse.text());
      } else {
        console.log('Offboarding email sent successfully');
      }

      // Create in-app notifications
      const notifications = alertUsers.map((user: any) => ({
        user_id: user.user_id,
        title: 'Baja de Empleado',
        message: `${employee.nombre} ha causado baja. Revisa acciones pendientes.`,
        type: 'warning',
        category: 'employee',
        entity_type: 'empleados',
        entity_id: employee.id,
        action_url: `/intranet/personas/${employee.id}`,
      }));

      await supabase.from('notifications').insert(notifications);
      console.log(`Created ${notifications.length} offboarding notifications`);
    }

    return new Response(
      JSON.stringify({ success: true, employee: employee.nombre }),
      { headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
    );

  } catch (error: any) {
    console.error('Error in send-offboarding-alert:', error);
    return new Response(
      JSON.stringify({ error: error.message }),
      { status: 400, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
    );
  }
};

serve(handler);
